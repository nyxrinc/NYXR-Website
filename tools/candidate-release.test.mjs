import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const candidate = JSON.parse(
  await readFile(new URL('../src/data/candidate-release.json', import.meta.url), 'utf8'),
);
test('candidate identities remain distinct from the public release and expose no unhosted URLs', async () => {
  const current = JSON.parse(
    await readFile(new URL('../release/beta.json', import.meta.url), 'utf8'),
  );
  assert.notEqual(candidate.version, current.version);
  assert.equal(candidate.status, 'testing');
  assert(
    !/(https?:|[A-Z]:[\\/]|public_url|pairing_token|private_key)/i.test(JSON.stringify(candidate)),
  );
  assert.equal(candidate.windows.signed, false);
  assert.equal(candidate.android.signatureVerified, true);
});
test('candidate artifact names, hashes and Android identity are complete', () => {
  assert.match(candidate.version, /^\d+\.\d+\.\d+-beta\.\d+$/);
  assert.equal(candidate.windows.filename, `NYXR-Setup-${candidate.version}-x64.exe`);
  assert.equal(candidate.android.filename, `NYXR-Companion-${candidate.version}.apk`);
  for (const asset of [candidate.windows, candidate.android]) {
    assert.match(asset.sha256, /^[a-f0-9]{64}$/);
    assert(Number.isSafeInteger(asset.bytes) && asset.bytes > 0);
  }
  assert.equal(candidate.android.minAndroid, 10);
  assert.match(candidate.android.signingCertificateSha256, /^[a-f0-9]{64}$/);
});
test('candidate metadata matches the actual local build receipt when present', async (t) => {
  let receipt;
  try {
    receipt = JSON.parse(
      await readFile(
        new URL('../../build/phone-artifacts/release-candidate.json', import.meta.url),
        'utf8',
      ),
    );
  } catch (error) {
    if (error.code === 'ENOENT')
      return t.skip(
        'Local build receipts are deliberately absent from a standalone website checkout',
      );
    throw error;
  }
  assert.equal(candidate.version, receipt.version);
  assert.equal(receipt.production_ready, false);
  for (const asset of [candidate.windows, candidate.android]) {
    const built = receipt.artifacts.find((entry) => entry.filename === asset.filename);
    assert(built);
    assert.equal(asset.bytes, built.bytes);
    assert.equal(asset.sha256, built.sha256);
  }
});
