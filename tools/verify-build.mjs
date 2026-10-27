import { readdir, readFile, stat } from 'node:fs/promises';
import { resolve, relative } from 'node:path';
import assert from 'node:assert/strict';
import { pages } from '../src/data/pages.js';

const root = resolve('dist');
let bytes = 0,
  count = 0;
async function visit(folder) {
  for (const entry of await readdir(folder, { withFileTypes: true })) {
    const path = resolve(folder, entry.name),
      name = relative(root, path).replaceAll('\\', '/');
    assert(!entry.isSymbolicLink(), `Symlink must not be deployed: ${name}`);
    assert(
      !/(^|\/)(node_modules|\.capture-data|\.capture-frames|\.venv|\.env[^/]*|credentials?|runtime|build)(\/|$)|\.(exe|apk|aab|jks|keystore|zip|db|sqlite\d*|log|py|pyc|map)$/i.test(
        name,
      ),
      `Private/unexpected deploy file: ${name}`,
    );
    if (entry.isDirectory()) await visit(path);
    else {
      const info = await stat(path);
      bytes += info.size;
      count++;
      assert(
        info.size < 20_000_000,
        `Oversized website asset: ${name}. Host installers outside Vercel.`,
      );
    }
  }
}
await visit(root);
assert(bytes < 25_000_000, 'Unexpectedly large site payload; inspect before deployment');
for (const page of pages) {
  const html = await readFile(resolve(root, '.' + page.path, 'index.html'), 'utf8');
  assert(html.includes('<div id="root">'), `Missing page entry: ${page.path}`);
  for (const match of html.matchAll(/(?:src|href)="(\/assets\/[^"?#]+)"/g))
    assert(
      (await stat(resolve(root, '.' + match[1]))).isFile(),
      `Missing bundled asset ${match[1]}`,
    );
}
assert((await readFile(resolve(root, '404.html'), 'utf8')).includes('noindex'));
const release = JSON.parse(await readFile(resolve(root, 'beta-release.json'), 'utf8'));
assert(!JSON.stringify(release).includes('blockers'), 'Internal review notes must not be public');
assert(
  release.available || (!release.installer.url && !release.source.url),
  'Unavailable release exposes download URLs',
);
assert(
  release.companion && (release.companion.available || release.companion.apk === null),
  'Unavailable companion exposes an APK',
);
if (release.companion.available) {
  assert(
    release.available && release.companion.desktopCompatible && release.companion.hardwareAccepted,
    'Companion requires compatible desktop and hardware acceptance',
  );
  const checksums = await readFile(resolve(root, 'beta-SHA256SUMS.txt'), 'utf8');
  assert(checksums.includes(`${release.companion.apk.sha256}  ${release.companion.apk.filename}`));
}
const vercel = JSON.parse(await readFile('vercel.json', 'utf8'));
assert.equal(vercel.outputDirectory, 'dist');
assert(
  !vercel.rewrites?.some((item) => /\(\.\*\)|:path\*/.test(item.source)),
  'Catch-all rewrite would hide broken asset/download URLs',
);
console.log(
  `Deployment output verified: ${pages.length} page entries · ${count} files · ${(bytes / 1_000_000).toFixed(2)} MB · no installer or local state included`,
);
