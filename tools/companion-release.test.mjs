import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { createRelease, readRelease, releaseAssets, verifyAsset } from './release-config.mjs';
import { companionAcceptanceChecks } from './companion-release.mjs';
import catalog from '../src/data/plan-catalog.json' with { type: 'json' };
import { plans, featureMatrix } from '../src/data/plans.js';
import { phoneCatalogReady } from '../src/data/phone-plans.js';

const current = await readRelease();
const apkBytes = new Uint8Array([0x50, 0x4b, 3, 4, 1, 2]);
// Synthetic metadata is confined to tests; it never enters release/beta.json.
function readyRecord() {
  const record = structuredClone(current);
  record.version = '4.0.0-beta.999';
  record.distributionReady = true;
  for (const [kind, filename] of Object.entries({
    installer: `NYXR-Setup-${record.version}-x64.exe`,
    source: `NYXR-source-${record.version}.zip`,
  })) {
    record[kind].filename = filename;
    record[kind].url = `https://downloads.nyxr.test/${filename}`;
  }
  record.phoneCompanion = { ready: true, protocolVersion: 1 };
  record.companion = {
    schemaVersion: 1,
    channel: 'private-beta',
    minAndroid: 10,
    version: '0.1.0-beta.999',
    signed: true,
    distributionReady: true,
    desktop: {
      version: record.version,
      installerSha256: record.installer.sha256,
      protocolVersion: 1,
    },
    apk: {
      filename: 'NYXR-Companion-0.1.0-beta.999.apk',
      bytes: apkBytes.length,
      sha256: createHash('sha256').update(apkBytes).digest('hex'),
      signingCertificateSha256: 'a'.repeat(64),
      signatureVerified: true,
      url: 'https://downloads.nyxr.test/NYXR-Companion-0.1.0-beta.999.apk',
    },
  };
  record.companion.hardwareAcceptance = {
    passed: true,
    device: 'Motorola test fixture',
    androidApiLevel: 29,
    testedAt: '2026-10-27T08:00:00Z',
    apkSha256: record.companion.apk.sha256,
    desktopInstallerSha256: record.installer.sha256,
    checks: Object.fromEntries(companionAcceptanceChecks.map((name) => [name, true])),
  };
  return record;
}
test('current Windows metadata remains available without an Android artifact', () => {
  const release = createRelease(current, {}, { required: true });
  assert.equal(release.available, true);
  assert.equal(release.installer.url, current.installer.url);
  assert.equal(release.installer.sha256, current.installer.sha256);
  assert.equal(release.companion.available, false);
  assert.equal(release.companion.apk, null);
  assert.equal(release.companion.version, null);
  assert.equal(releaseAssets(release).length, 2);
  assert.throws(
    () => createRelease(current, {}, { requireCompanion: true }),
    /companion publication blocked/,
  );
});
test('an APK URL override alone cannot invent or unlock a companion release', () => {
  assert.equal(
    createRelease(current, { NYXR_COMPANION_APK_URL: 'https://downloads.nyxr.test/made-up.apk' })
      .companion.apk,
    null,
  );
});
test('complete independent companion gate exposes only reviewed assets', () => {
  const record = readyRecord();
  const release = createRelease(record, {}, { required: true, requireCompanion: true });
  assert.equal(release.companion.available, true);
  assert.equal(release.companion.apk.url, record.companion.apk.url);
  assert.equal(releaseAssets(release).length, 3);
});
const gates = {
  'missing APK': (r) => {
    delete r.companion.apk;
  },
  'unsigned APK': (r) => {
    r.companion.signed = false;
  },
  'unverified APK signature': (r) => {
    r.companion.apk.signatureVerified = false;
  },
  'unreviewed distribution': (r) => {
    r.companion.distributionReady = false;
  },
  'missing public APK URL': (r) => {
    delete r.companion.apk.url;
  },
  'current desktop has no phone capability': (r) => {
    delete r.phoneCompanion;
  },
  'desktop phone capability not ready': (r) => {
    r.phoneCompanion.ready = false;
  },
  'desktop version mismatch': (r) => {
    r.companion.desktop.version = '4.0.0-beta.1';
  },
  'desktop hash mismatch': (r) => {
    r.companion.desktop.installerSha256 = '0'.repeat(64);
  },
  'protocol mismatch': (r) => {
    r.companion.desktop.protocolVersion = 2;
  },
  'missing compatibility record': (r) => {
    delete r.companion.desktop;
  },
  'hardware acceptance pending': (r) => {
    r.companion.hardwareAcceptance.passed = false;
  },
  'missing hardware acceptance': (r) => {
    delete r.companion.hardwareAcceptance;
  },
  'different tested APK': (r) => {
    r.companion.hardwareAcceptance.apkSha256 = '0'.repeat(64);
  },
  'different tested desktop': (r) => {
    r.companion.hardwareAcceptance.desktopInstallerSha256 = '0'.repeat(64);
  },
  'untested Motorola': (r) => {
    r.companion.hardwareAcceptance.device = 'Other phone';
  },
  'Android below 10': (r) => {
    r.companion.hardwareAcceptance.androidApiLevel = 28;
  },
  'invalid acceptance date': (r) => {
    r.companion.hardwareAcceptance.testedAt = 'pending';
  },
  'truthy strings are not acceptance': (r) => {
    r.companion.hardwareAcceptance.passed = 'true';
  },
};
for (const name of companionAcceptanceChecks)
  gates[`missing hardware check: ${name}`] = (r) => {
    delete r.companion.hardwareAcceptance.checks[name];
  };
for (const [name, mutate] of Object.entries(gates))
  test(`Android blocked: ${name}; Windows retained`, () => {
    const record = readyRecord();
    mutate(record);
    const release = createRelease(record, {}, { required: true });
    assert.equal(release.available, true);
    assert.equal(release.companion.available, false);
    assert.equal(release.companion.apk, null);
    assert.throws(
      () => createRelease(record, {}, { requireCompanion: true }),
      /companion publication blocked/,
    );
  });
test('unavailable Windows also blocks a complete companion release', () => {
  const record = readyRecord();
  record.distributionReady = false;
  const release = createRelease(record, {});
  assert.equal(release.companion.available, false);
  assert.deepEqual(releaseAssets(release), []);
});
const invalid = {
  'bad schema': (r) => {
    r.companion.schemaVersion = 2;
  },
  'public channel': (r) => {
    r.companion.channel = 'stable';
  },
  'different minimum Android': (r) => {
    r.companion.minAndroid = 9;
  },
  'wrong APK filename': (r) => {
    r.companion.apk.filename = 'different.apk';
  },
  'bad version': (r) => {
    r.companion.version = 'next';
  },
  'missing signing certificate': (r) => {
    delete r.companion.apk.signingCertificateSha256;
  },
  'bad APK hash': (r) => {
    r.companion.apk.sha256 = 'pending';
  },
  'zero APK size': (r) => {
    r.companion.apk.bytes = 0;
  },
  'fractional APK size': (r) => {
    r.companion.apk.bytes = 5.5;
  },
};
for (const [name, mutate] of Object.entries(invalid))
  test(`reject invalid companion metadata: ${name}`, () => {
    const record = readyRecord();
    mutate(record);
    assert.throws(() => createRelease(record, {}));
  });
for (const url of [
  'http://cdn.example/NYXR-Companion-0.1.0-beta.999.apk',
  'https://key@cdn.example/NYXR-Companion-0.1.0-beta.999.apk',
  'https://cdn.example/NYXR-Companion-0.1.0-beta.999.apk?token=secret',
  'https://cdn.example/releases/latest/download/NYXR-Companion-0.1.0-beta.999.apk',
  'https://cdn.example/wrong.apk',
])
  test(`reject unsafe APK URL: ${url.split('/')[0]} / ${url.includes('?') ? 'query' : 'asset'}`, () => {
    const record = readyRecord();
    record.companion.apk.url = url;
    assert.throws(() => createRelease(record, {}));
  });
test('public companion projection excludes local evidence, notes and secrets', () => {
  const record = readyRecord();
  record.companion.internalNotes = 'private-test-value';
  record.companion.apk.keystore = 'private-test-value';
  record.companion.hardwareAcceptance.evidencePath = 'private-test-value';
  const json = JSON.stringify(createRelease(record, { PRIVATE_KEY: 'private-test-value' }));
  assert.doesNotMatch(
    json,
    /private-test-value|evidencePath|internalNotes|keystore|hardwareAcceptance/,
  );
});
test('APK binary verification rejects HTML, corrupt bytes and mismatched hashes', async () => {
  const asset = createRelease(readyRecord(), {}).companion.apk;
  const fetcher =
    (data, type = 'application/vnd.android.package-archive') =>
    async () =>
      new Response(data, {
        headers: { 'Content-Type': type, 'Content-Length': String(apkBytes.length) },
      });
  assert.equal(
    (await verifyAsset(asset, { full: true, fetcher: fetcher(apkBytes) })).sha256Verified,
    true,
  );
  await assert.rejects(
    () => verifyAsset(asset, { fetcher: fetcher('<html>', 'text/html') }),
    /binary download/,
  );
  await assert.rejects(
    () => verifyAsset(asset, { fetcher: fetcher(new Uint8Array(6)) }),
    /signature/,
  );
  await assert.rejects(
    () => verifyAsset(asset, { full: true, fetcher: fetcher(new Uint8Array(6)) }),
    /verification failed/,
  );
  const zeros = new Uint8Array(6);
  await assert.rejects(
    () =>
      verifyAsset(
        { ...asset, sha256: createHash('sha256').update(zeros).digest('hex') },
        { full: true, fetcher: fetcher(zeros) },
      ),
    /signature/,
  );
});
test('generated phone policy is Core 30/day + one phone, with unlimited paid tiers kept inactive', () => {
  assert.equal(phoneCatalogReady, true);
  assert.equal(catalog.plans[0].limits.phone_actions_per_day, 30);
  assert.equal(catalog.plans[0].limits.phone_limit, 1);
  for (const plan of catalog.plans.slice(1)) {
    assert.equal(plan.limits.phone_actions_per_day, null);
    assert.equal(plan.limits.phone_limit, null);
    const presentation = plans.find((p) => p.id === plan.id);
    assert.equal(presentation.available, false);
    assert.equal(presentation.href, undefined);
  }
  const actions = featureMatrix.find((row) => row.label === 'Phone actions / private beta');
  assert.match(actions.values[0], /30\/day/);
  for (const value of actions.values.slice(1)) assert.match(value, /verified entitlement/);
});
