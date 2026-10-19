import { createRelease, readRelease, verifyAsset } from './release-config.mjs';
import { loadEnv } from 'vite';
const env = { ...loadEnv('production', process.cwd(), 'NYXR_'), ...process.env };
const release = createRelease(await readRelease(), env, { required: true });
for (const asset of [release.installer, release.source]) {
  console.log(await verifyAsset(asset, { full: process.argv.includes('--full') }));
}
