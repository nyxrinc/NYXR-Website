import { readFile } from 'node:fs/promises';
import { createCompanion } from './companion-release.mjs';

export const releaseFile = new URL('../release/beta.json', import.meta.url);

export async function readRelease() {
  return JSON.parse(await readFile(releaseFile, 'utf8'));
}

export function publicAssetUrl(value, filename) {
  if (!value?.trim()) return null;
  let url;
  try {
    url = new URL(value.trim());
  } catch {
    throw new Error(`Invalid release URL for ${filename}`);
  }
  // A public, permanent asset address, never a credential or expiring signed URL.
  if (
    url.protocol !== 'https:' ||
    url.username ||
    url.password ||
    url.search ||
    url.hash ||
    /^(localhost|127\.|\[?::1\]?$)/i.test(url.hostname) ||
    !url.pathname.endsWith(`/${filename}`) ||
    /\/releases\/latest\//.test(url.pathname)
  )
    throw new Error(
      `Use a permanent HTTPS asset URL ending in /${filename}, without credentials or query parameters`,
    );
  return url.href;
}

export function siteOrigin(env = process.env) {
  const value = env.NYXR_SITE_URL?.trim();
  if (!value) return null;
  const url = new URL(value);
  if (
    url.protocol !== 'https:' ||
    url.username ||
    url.password ||
    url.search ||
    url.hash ||
    url.pathname !== '/'
  )
    throw new Error(
      'NYXR_SITE_URL must be the public HTTPS site origin, without a path or credentials',
    );
  return url.origin;
}

export function createRelease(
  record,
  env = process.env,
  { required = false, requireCompanion = false } = {},
) {
  if (record.schemaVersion !== 1 || !/^\d+\.\d+\.\d+-beta\.\d+$/.test(record.version))
    throw new Error('Unsupported beta release metadata');
  if (
    record.installer.filename !== `NYXR-Setup-${record.version}-x64.exe` ||
    record.source.filename !== `NYXR-source-${record.version}.zip`
  )
    throw new Error('Release filenames must match the beta version');
  const installerUrl = publicAssetUrl(
    env.NYXR_BETA_INSTALLER_URL ?? record.installer.url,
    record.installer.filename,
  );
  const sourceUrl = publicAssetUrl(
    env.NYXR_BETA_SOURCE_URL ?? record.source.url,
    record.source.filename,
  );
  for (const [name, asset] of Object.entries({
    installer: record.installer,
    source: record.source,
  })) {
    if (
      !Number.isSafeInteger(asset.bytes) ||
      asset.bytes <= 0 ||
      (!/^[a-f0-9]{64}$/.test(asset.sha256) && (record.distributionReady || name === 'installer'))
    )
      throw new Error(`Invalid ${name} size or SHA-256 in release/beta.json`);
  }
  const available = record.distributionReady === true && Boolean(installerUrl && sourceUrl);
  if (required && !available)
    throw new Error(
      'Beta publication blocked: complete the redistribution review and provide both public installer and corresponding-source URLs in release/beta.json or NYXR_BETA_*_URL. See DEPLOYMENT.md.',
    );
  // Explicit projection: never bundle environment variables, local paths or internal review notes.
  const asset = (value, url) => ({
    filename: value.filename,
    bytes: value.bytes,
    sha256: value.sha256,
    url: available ? url : null,
  });
  const release = {
    schemaVersion: 1,
    version: record.version,
    platform: record.platform,
    signed: record.signed === true,
    available,
    publishedAt: record.publishedAt,
    installer: asset(record.installer, installerUrl),
    source: asset(record.source, sourceUrl),
  };
  release.companion = createCompanion(record, release, env);
  if (requireCompanion && !release.companion.available)
    throw new Error(
      'Android companion publication blocked: signed APK, compatible desktop and exact-artifact Motorola hardware acceptance are required. See DEPLOYMENT.md.',
    );
  return release;
}

export const releaseAssets = (release) => [
  ...(release.available ? [release.installer, release.source] : []),
  ...(release.companion?.available ? [release.companion.apk] : []),
];

export async function verifyAsset(asset, { full = false, fetcher = fetch } = {}) {
  const deadline = AbortSignal.timeout(full ? 600_000 : 30_000);
  const response = await fetcher(asset.url, {
    method: 'GET',
    signal: deadline,
    headers: full
      ? { 'Accept-Encoding': 'identity' }
      : { Range: 'bytes=0-1', 'Accept-Encoding': 'identity' },
  });
  try {
    if (!response.ok || new URL(response.url || asset.url).protocol !== 'https:')
      throw new Error(
        `${asset.filename}: download is not publicly reachable over HTTPS (${response.status})`,
      );
    const type = response.headers.get('content-type') || '';
    if (/text\/html|application\/json|text\/plain/.test(type))
      throw new Error(`${asset.filename}: server returned ${type}, not a binary download`);
    const range = response.headers.get('content-range');
    const size =
      response.status === 206
        ? Number(range?.match(/\/(\d+)$/)?.[1])
        : Number(response.headers.get('content-length'));
    if (size !== asset.bytes)
      throw new Error(
        `${asset.filename}: expected ${asset.bytes} bytes, received ${size || 'unknown size'}`,
      );
    const signature = asset.filename.endsWith('.exe') ? [0x4d, 0x5a] : [0x50, 0x4b];
    const reader = response.body.getReader();
    if (!full) {
      const prefix = [];
      while (prefix.length < 2) {
        const { value, done } = await reader.read();
        if (done) break;
        prefix.push(...value.subarray(0, 2 - prefix.length));
      }
      if (prefix[0] !== signature[0] || prefix[1] !== signature[1])
        throw new Error(`${asset.filename}: binary file signature does not match`);
      await reader.cancel();
      return { filename: asset.filename, bytes: size, signatureVerified: true };
    }
    const { createHash } = await import('node:crypto');
    const hash = createHash('sha256');
    let bytes = 0;
    const prefix = [];
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      bytes += value.length;
      if (prefix.length < 2) prefix.push(...value.subarray(0, 2 - prefix.length));
      if (bytes > asset.bytes) {
        await reader.cancel();
        throw new Error(`${asset.filename}: oversized download`);
      }
      hash.update(value);
    }
    if (prefix[0] !== signature[0] || prefix[1] !== signature[1])
      throw new Error(
        `${asset.filename}: binary file signature does not match; verification failed`,
      );
    if (bytes !== asset.bytes || hash.digest('hex') !== asset.sha256)
      throw new Error(`${asset.filename}: full download SHA-256/size verification failed`);
    return { filename: asset.filename, bytes, sha256Verified: true, signatureVerified: true };
  } finally {
    await response.body?.cancel().catch(() => {});
  }
}
