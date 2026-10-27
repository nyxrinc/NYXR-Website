import { build, loadEnv } from 'vite';
import { readFile } from 'node:fs/promises';
import { normalizeExhibitionRelease } from '../src/data/exhibition-release.mjs';
import {
  createRelease,
  readRelease,
  releaseAssets,
  siteOrigin,
  verifyAsset,
} from './release-config.mjs';

const required = process.env.VERCEL_ENV === 'production' || process.argv.includes('--release');
const env = { ...loadEnv('production', process.cwd(), 'NYXR_'), ...process.env };
const release = createRelease(await readRelease(), env, {
  required,
  requireCompanion: process.argv.includes('--companion'),
});
siteOrigin(env);
const exhibition = normalizeExhibitionRelease(
  JSON.parse(
    await readFile(new URL('../src/data/exhibition-release.json', import.meta.url), 'utf8'),
  ),
);
if (exhibition.available) {
  for (const asset of [exhibition.apk, exhibition.source]) {
    await verifyAsset(asset, { full: true });
    console.log(`Verified exhibition test asset: ${asset.filename} · ${asset.bytes} bytes`);
  }
}
if (release.available) {
  for (const asset of releaseAssets(release)) {
    await verifyAsset(asset, { full: asset === release.companion.apk });
    console.log(`Verified public asset: ${asset.filename} · ${asset.bytes} bytes`);
  }
} else
  console.log(
    'Preview only: beta download is unavailable until release assets and redistribution review are ready.',
  );
await build();
await import('./verify-build.mjs');
