import { build, loadEnv } from 'vite';
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
