import { createRelease, readRelease, releaseAssets, verifyAsset } from './release-config.mjs';
import { loadEnv } from 'vite';
const env = { ...loadEnv('production', process.cwd(), 'NYXR_'), ...process.env };
const release = createRelease(await readRelease(), env, {
  required: true,
  requireCompanion: process.argv.includes('--companion'),
});
for (const asset of releaseAssets(release)) {
  console.log(
    await verifyAsset(asset, {
      full: asset === release.companion.apk || process.argv.includes('--full'),
    }),
  );
}
