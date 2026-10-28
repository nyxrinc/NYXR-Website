// Synthetic test-only metadata, never publication or Android signature evidence.
import { createHash } from 'node:crypto';

export const exhibitionApkBytes = Buffer.from('PK-NYXR-EXHIBITION-HARMLESS-TEST-FIXTURE');
export const exhibitionSourceBytes = Buffer.from('PK-NYXR-EXHIBITION-HARMLESS-SOURCE-FIXTURE');
const sha256 = (value) => createHash('sha256').update(value).digest('hex');
export function unavailableExhibitionFixture() {
  return {
    schemaVersion: 1,
    channel: 'exhibition-test',
    version: '4.0.0-beta.6',
    tag: 'exhibition-4.0.0-beta.6',
    edition: 'basic',
    applicationId: 'com.nyxr.companion.exhibition',
    minAndroid: 10,
    available: false,
    signed: false,
    apk: null,
    source: null,
  };
}
export function exhibitionFixture() {
  const version = '4.0.0-beta.5';
  const tag = `exhibition-${version}`;
  const file = (filename, bytes) => ({
    filename,
    bytes: bytes.length,
    sha256: sha256(bytes),
    url: `https://downloads.nyxr.test/${tag}/${filename}`,
  });
  return {
    schemaVersion: 1,
    channel: 'exhibition-test',
    version,
    tag,
    applicationId: 'com.nyxr.companion.exhibition',
    minAndroid: 10,
    available: true,
    signed: true,
    apk: {
      ...file(`NYXR-Exhibition-${version}.apk`, exhibitionApkBytes),
      signatureVerified: true,
      signingCertificateSha256: sha256('synthetic certificate fingerprint; not a signing check'),
    },
    source: file(`NYXR-Exhibition-source-${version}.zip`, exhibitionSourceBytes),
  };
}

export function basicExhibitionFixture() {
  const record = exhibitionFixture();
  record.version = '4.0.0-beta.6';
  record.tag = `exhibition-${record.version}`;
  record.edition = 'basic';
  for (const kind of ['apk', 'source']) {
    record[kind].filename = record[kind].filename.replace('beta.5', 'beta.6');
    record[kind].url = `https://downloads.nyxr.test/${record.tag}/${record[kind].filename}`;
  }
  return record;
}
