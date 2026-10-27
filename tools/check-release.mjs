import { createRelease, readRelease, releaseAssets, verifyAsset } from './release-config.mjs';
import { loadEnv } from 'vite';
import { readFile } from 'node:fs/promises';
import { normalizeExhibitionRelease } from '../src/data/exhibition-release.mjs';
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
const exhibition = normalizeExhibitionRelease(
  JSON.parse(
    await readFile(new URL('../src/data/exhibition-release.json', import.meta.url), 'utf8'),
  ),
);
if (exhibition.available)
  for (const asset of [exhibition.apk, exhibition.source])
    console.log(await verifyAsset(asset, { full: true }));
