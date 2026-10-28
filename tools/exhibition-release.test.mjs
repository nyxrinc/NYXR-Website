import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { normalizeExhibitionRelease, exhibitionAssetUrl } from '../src/data/exhibition-release.mjs';
import { createRelease, readRelease, releaseAssets, verifyAsset } from './release-config.mjs';
import {
  exhibitionFixture,
  basicExhibitionFixture,
  unavailableExhibitionFixture,
  exhibitionApkBytes,
  exhibitionSourceBytes,
} from './exhibition-fixture.mjs';

const descriptor = JSON.parse(
  await readFile(new URL('../src/data/exhibition-release.json', import.meta.url), 'utf8'),
);

test('publication descriptor validates independently before and after real assets are supplied', () => {
  assert.match(descriptor.version, /^4\.0\.0-beta\.\d+$/);
  assert.equal(descriptor.tag, `exhibition-${descriptor.version}`);
  assert.equal(descriptor.edition, 'basic');
  assert.equal(descriptor.applicationId, 'com.nyxr.companion.exhibition');
  assert.equal(normalizeExhibitionRelease(descriptor).hardwareAccepted, false);
});

test('Basic beta 6 publication requires the matching signed APK and source', () => {
  const record = basicExhibitionFixture();
  const result = normalizeExhibitionRelease(record);
  assert.equal(result.edition, 'basic');
  assert.equal(result.apk.filename, 'NYXR-Exhibition-4.0.0-beta.6.apk');
  assert.equal(result.source.filename, 'NYXR-Exhibition-source-4.0.0-beta.6.zip');
  record.source = null;
  assert.throws(() => normalizeExhibitionRelease(record), /matching hosted source/);
});

test('legacy beta 5 defaults to full and explicit editions survive public projection', () => {
  assert.equal(normalizeExhibitionRelease(exhibitionFixture()).edition, 'full');
  for (const edition of ['full', 'basic']) {
    const record = { ...exhibitionFixture(), edition };
    assert.equal(normalizeExhibitionRelease(record).edition, edition);
  }
  for (const edition of [null, '', 'BASIC', 'unknown', true, 1, {}, ['basic']]) {
    assert.throws(() => normalizeExhibitionRelease({ ...exhibitionFixture(), edition }));
  }
});

test('unavailable fixture has no fabricated artifact metadata', () => {
  const release = normalizeExhibitionRelease(unavailableExhibitionFixture());
  assert.equal(release.available, false);
  assert.equal(release.apk, null);
  assert.equal(release.source, null);
  assert.doesNotMatch(JSON.stringify(release), /https:|sha256|[A-Z]:[\\/]/);
});

test('complete hosted-metadata fixture exposes signed test assets without asserting hardware acceptance', () => {
  const record = exhibitionFixture();
  record.hardwareAccepted = true;
  record.premium = true;
  record.accountRequired = false;
  record.internalNotes = 'private-test-value';
  record.apk.keystore = 'private-test-value';
  record.source.localPath = 'private-test-value';
  const result = normalizeExhibitionRelease(record);
  assert.equal(result.available, true);
  assert.equal(result.signed, true);
  assert.equal(result.status, 'testing');
  assert.equal(result.hardwareAccepted, false);
  assert.equal(result.apk.url, record.apk.url);
  assert.equal(result.source.sha256, record.source.sha256);
  assert.doesNotMatch(
    JSON.stringify(result),
    /private-test-value|premium|keystore|localPath|internalNotes|accountRequired/,
  );
});

const invalid = {
  'wrong schema': (r) => {
    r.schemaVersion = 2;
  },
  'public channel': (r) => {
    r.channel = 'private-beta';
  },
  'invalid version': (r) => {
    r.version = 'latest';
  },
  'incorrect release tag': (r) => {
    r.tag = 'v4.0.0-beta.5';
  },
  'production Android identity': (r) => {
    r.applicationId = 'com.nyxr.companion';
  },
  'older Android': (r) => {
    r.minAndroid = 9;
  },
  'truthy availability': (r) => {
    r.available = 'true';
  },
  'unsigned APK': (r) => {
    r.signed = false;
  },
  'truthy signing flag': (r) => {
    r.signed = 'true';
  },
  'unverified signature': (r) => {
    r.apk.signatureVerified = false;
  },
  'truthy signature verification': (r) => {
    r.apk.signatureVerified = 'true';
  },
  'missing APK': (r) => {
    r.apk = null;
  },
  'missing source': (r) => {
    r.source = null;
  },
};
for (const kind of ['apk', 'source']) {
  invalid[`${kind}: wrong filename`] = (r) => {
    r[kind].filename = 'wrong-file';
  };
  for (const bytes of [0, -1, 1.5, '123', Number.MAX_SAFE_INTEGER + 1])
    invalid[`${kind}: invalid bytes ${bytes}`] = (r) => {
      r[kind].bytes = bytes;
    };
  for (const hash of [null, '', 'pending', '0'.repeat(64), 'a'.repeat(64), 'ABCDEF'.repeat(11)])
    invalid[`${kind}: invalid hash ${String(hash).slice(0, 10)}`] = (r) => {
      r[kind].sha256 = hash;
    };
  invalid[`${kind}: missing URL`] = (r) => {
    delete r[kind].url;
  };
}
invalid['missing certificate'] = (r) => {
  delete r.apk.signingCertificateSha256;
};
invalid['placeholder certificate'] = (r) => {
  r.apk.signingCertificateSha256 = 'f'.repeat(64);
};
for (const [name, mutate] of Object.entries(invalid))
  test(`exhibition rejects ${name}`, () => {
    const record = exhibitionFixture();
    mutate(record);
    assert.throws(() => normalizeExhibitionRelease(record));
  });

const sample = exhibitionFixture();
const path = `/${sample.tag}/${sample.apk.filename}`;
const unsafe = [
  `http://downloads.example.com${path}`,
  `javascript:alert(1)`,
  `//downloads.example.com${path}`,
  `https://user:secret@downloads.example.com${path}`,
  `https://downloads.example.com${path}?token=secret`,
  `https://downloads.example.com${path}?`,
  `https://downloads.example.com${path}#`,
  `https://downloads.example.com${path}#fragment`,
  `https://downloads.example.com/releases/latest/download${path}`,
  `https://downloads.example.com/v4.0.0-beta.5/${sample.apk.filename}`,
  `https://downloads.example.com${path}/wrong.apk`,
  `https://downloads.example.com:8443${path}`,
  `https://downloads.example.com/%2e%2e${path}`,
  `https://downloads.example.com/a/../${sample.tag}/${sample.apk.filename}`,
  `https://downloads.example.com\\${sample.tag}/${sample.apk.filename}`,
  ` https://downloads.example.com${path}`,
  `https://downloads.example.com${path}\n`,
  ...[
    'localhost',
    'test.localhost',
    'nas.local',
    'router.lan',
    'private.internal',
    '127.0.0.1',
    '127.1',
    '0x7f000001',
    '10.0.0.1',
    '192.168.1.10',
    '169.254.169.254',
    '[::1]',
    '[fd00::1]',
    'localhost.',
    'downloads.example.com.',
  ].map((host) => `https://${host}${path}`),
];
for (const [index, url] of unsafe.entries())
  test(`exhibition rejects unsafe URL ${index + 1}`, () => {
    assert.throws(() => exhibitionAssetUrl(url, sample.apk.filename, sample.tag));
    const record = exhibitionFixture();
    record.apk.url = url;
    assert.throws(() => normalizeExhibitionRelease(record));
    record.available = false;
    assert.throws(() => normalizeExhibitionRelease(record));
  });

test('staged metadata stays hidden until explicit publication readiness', () => {
  const record = exhibitionFixture();
  record.available = false;
  const result = normalizeExhibitionRelease(record);
  assert.equal(result.available, false);
  assert.equal(result.apk, null);
  assert.equal(result.source, null);
  assert.doesNotMatch(JSON.stringify(result), /https:|sha256/);
});

test('ready exhibition fixture cannot activate public companion or alter beta 3 assets', async () => {
  const current = await readRelease();
  const before = createRelease(current, {});
  normalizeExhibitionRelease(exhibitionFixture());
  const after = createRelease(current, { NYXR_COMPANION_APK_URL: sample.apk.url });
  assert.deepEqual(before, after);
  assert.equal(after.version, '4.0.0-beta.3');
  assert.equal(after.available, true);
  assert.equal(after.companion.available, false);
  assert.equal(after.companion.apk, null);
  assert.deepEqual(releaseAssets(after), [after.installer, after.source]);
  assert.throws(
    () => createRelease(current, {}, { requireCompanion: true }),
    /companion publication blocked/,
  );
});

test('exhibition binary fixtures verify exact size/hash and reject HTML or substituted bytes', async () => {
  const record = normalizeExhibitionRelease(exhibitionFixture());
  for (const [asset, bytes] of [
    [record.apk, exhibitionApkBytes],
    [record.source, exhibitionSourceBytes],
  ]) {
    const fetcher =
      (body, type = 'application/octet-stream') =>
      async () =>
        new Response(body, {
          headers: { 'Content-Type': type, 'Content-Length': String(bytes.length) },
        });
    assert.equal(
      (await verifyAsset(asset, { full: true, fetcher: fetcher(bytes) })).sha256Verified,
      true,
    );
    await assert.rejects(
      () => verifyAsset(asset, { full: true, fetcher: fetcher('<html>', 'text/html') }),
      /binary download/,
    );
    await assert.rejects(
      () => verifyAsset(asset, { full: true, fetcher: fetcher(Buffer.alloc(bytes.length)) }),
      /verification failed/,
    );
  }
});
