import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import {
  createRelease,
  publicAssetUrl,
  readRelease,
  siteOrigin,
  verifyAsset,
} from './release-config.mjs';

const actualRelease = await readRelease();
const record = {
  ...actualRelease,
  distributionReady: false,
  installer: { ...actualRelease.installer, url: undefined },
  source: { ...actualRelease.source, url: undefined },
};
const env = {
  NYXR_BETA_INSTALLER_URL: `https://github.com/nyxrinc/NYXR-Website/releases/download/v${record.version}/${record.installer.filename}`,
  NYXR_BETA_SOURCE_URL: `https://github.com/nyxrinc/NYXR-Website/releases/download/v${record.version}/${record.source.filename}`,
};
test('unreviewed private installer never becomes public just because URLs exist', () => {
  assert.equal(createRelease(record, env).available, false);
  assert.equal(createRelease(record, env).installer.url, null);
  assert.throws(() => createRelease(record, env, { required: true }), /publication blocked/);
});
test('both assets and distribution review are required', () => {
  const reviewed = { ...record, distributionReady: true };
  assert.throws(() => createRelease(reviewed, {}, { required: true }), /publication blocked/);
  assert.throws(
    () =>
      createRelease(
        reviewed,
        { NYXR_BETA_INSTALLER_URL: env.NYXR_BETA_INSTALLER_URL },
        { required: true },
      ),
    /publication blocked/,
  );
  assert.equal(createRelease(reviewed, env, { required: true }).available, true);
});
test('public projection excludes secrets and internal review notes', () => {
  const input = {
    ...record,
    internalSecret: 'test-secret',
    installer: { ...record.installer, privateKey: 'test-secret' },
  };
  const output = JSON.stringify(createRelease(input, { ...env, API_KEY: 'test-secret' }));
  assert(!/test-secret|blockers|privateKey/.test(output));
});
test('verified versioned public URLs can live in the central release record', () => {
  const embedded = {
    ...record, distributionReady: true,
    installer: { ...record.installer, url: env.NYXR_BETA_INSTALLER_URL },
    source: { ...record.source, url: env.NYXR_BETA_SOURCE_URL },
  };
  assert.equal(createRelease(embedded, {}, { required: true }).available, true);
  assert.throws(() => createRelease(embedded, { NYXR_BETA_INSTALLER_URL: 'http://bad.example/file.exe' }), /HTTPS/);
});
for (const [name, url] of Object.entries({
  insecure: `http://cdn.example/${record.installer.filename}`,
  credential: `https://secret@cdn.example/${record.installer.filename}`,
  expiring: env.NYXR_BETA_INSTALLER_URL + '?token=secret',
  mutable: env.NYXR_BETA_INSTALLER_URL.replace(`/download/v${record.version}`, '/latest/download'),
  wrongFile: 'https://cdn.example/index.html',
  local: `https://localhost/${record.installer.filename}`,
}))
  test(`reject ${name} download URL`, () =>
    assert.throws(() => publicAssetUrl(url, record.installer.filename)));
test('invalid hashes and version mismatches fail', () => {
  assert.throws(
    () =>
      createRelease(
        { ...record, distributionReady: true, source: { ...record.source, sha256: '' } },
        env,
      ),
    /SHA-256/,
  );
  const nextVersion = record.version.replace(/beta\.(\d+)$/, (_, value) => `beta.${Number(value) + 1}`);
  assert.throws(() => createRelease({ ...record, version: nextVersion }, env), /filenames/);
});
test('canonical origin must be HTTPS without path/credentials', () => {
  assert.equal(siteOrigin({ NYXR_SITE_URL: 'https://nyxr.example' }), 'https://nyxr.example');
  for (const url of [
    'http://nyxr.example',
    'https://a:b@nyxr.example',
    'https://nyxr.example/path',
  ])
    assert.throws(() => siteOrigin({ NYXR_SITE_URL: url }));
});

const data = new Uint8Array([0x4d, 0x5a, 1, 2, 3, 4]);
const asset = {
  ...record.installer,
  url: env.NYXR_BETA_INSTALLER_URL,
  bytes: data.length,
  sha256: createHash('sha256').update(data).digest('hex'),
};
const response =
  (body = data, headers = {}, status = 200) =>
  async () =>
    new Response(body, {
      status,
      headers: {
        'content-type': 'application/octet-stream',
        'content-length': String(data.length),
        ...headers,
      },
    });
test('binary probe verifies size and signature', async () => {
  assert.equal((await verifyAsset(asset, { fetcher: response() })).signatureVerified, true);
});
test('full download verifies exact SHA-256', async () => {
  assert.equal(
    (await verifyAsset(asset, { full: true, fetcher: response() })).sha256Verified,
    true,
  );
  await assert.rejects(
    () => verifyAsset({ ...asset, sha256: '0'.repeat(64) }, { full: true, fetcher: response() }),
    /verification failed/,
  );
});
test('HTML error pages, missing files, wrong sizes and wrong signatures fail', async () => {
  await assert.rejects(
    () => verifyAsset(asset, { fetcher: response('<html>', { 'content-type': 'text/html' }) }),
    /binary download/,
  );
  await assert.rejects(() => verifyAsset(asset, { fetcher: response('', {}, 404) }), /reachable/);
  await assert.rejects(
    () => verifyAsset(asset, { fetcher: response(data, { 'content-length': '2' }) }),
    /expected/,
  );
  await assert.rejects(
    () => verifyAsset(asset, { fetcher: response(new Uint8Array(6)) }),
    /signature/,
  );
});
test('range probe validates the total file size, not just the two-byte response size', async () => {
  const fetcher = response(
    data.subarray(0, 2),
    { 'content-length': '2', 'content-range': `bytes 0-1/${data.length}` },
    206,
  );
  assert.equal((await verifyAsset(asset, { fetcher })).bytes, data.length);
});
test('split stream chunks do not break the signature probe', async () => {
  const body = new ReadableStream({
    start(controller) {
      controller.enqueue(data.subarray(0, 1));
      controller.enqueue(data.subarray(1));
      controller.close();
    },
  });
  assert.equal((await verifyAsset(asset, { fetcher: response(body) })).signatureVerified, true);
});
test('deployment config preserves true 404s and emits static directory entries', async () => {
  const config = JSON.parse(await readFile('vercel.json', 'utf8'));
  assert.equal(config.framework, 'vite');
  assert.equal(config.installCommand, 'npm ci');
  assert.equal(config.outputDirectory, 'dist');
  assert.equal(config.trailingSlash, true);
  assert(!config.rewrites);
  assert.equal(JSON.parse(await readFile('package.json', 'utf8')).engines.node, '24.x');
});
