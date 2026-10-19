import { cp, mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const site = fileURLToPath(new URL('../', import.meta.url)).replace(/[\\/]$/, '');
// CLI destination is explicit so an existing checkout is never cleared or reset.
const destination = process.argv[2];
if (!destination)
  throw new Error('Provide an empty directory or an empty cloned website repository');
const target = resolve(destination);
if (
  target === site ||
  site.startsWith(target + '\\') ||
  site.startsWith(target + '/') ||
  target.startsWith(site + '\\') ||
  target.startsWith(site + '/')
)
  throw new Error('Destination cannot be the website or its parent');
await mkdir(target, { recursive: true });
const present = await readdir(target);
if (present.some((name) => name !== '.git'))
  throw new Error(
    'Destination must be empty except for .git; no existing work will be overwritten',
  );
const files = [
  'src',
  'public',
  'release/beta.json',
  'package.json',
  'package-lock.json',
  'index.html',
  'vite.config.js',
  'vercel.json',
  '.vercelignore',
  '.gitignore',
  '.nvmrc',
  '.env.example',
  'DEPLOYMENT.md',
  ...[
    'release-config',
    'build-vercel',
    'verify-build',
    'check-release',
    'deployment.test',
    'qa-deployment',
    'prepare-deploy',
  ].map((name) => `tools/${name}.mjs`),
];
for (const name of files) {
  const to = resolve(target, name);
  await mkdir(resolve(to, '..'), { recursive: true });
  await cp(resolve(site, name), to, { recursive: true, dereference: false });
}
// Only commands whose tools are included belong in the standalone repository.
const pkg = JSON.parse(await readFile(resolve(target, 'package.json'), 'utf8'));
delete pkg.scripts['qa:smoke'];
delete pkg.scripts['qa:ui'];
pkg.scripts.qa = 'npm run test:deployment && npm run qa:deployment';
await writeFile(resolve(target, 'package.json'), JSON.stringify(pkg, null, 2) + '\n', 'utf8');
await cp(resolve(site, '../LICENSE'), resolve(target, 'LICENSE'));
await writeFile(
  resolve(target, 'README.md'),
  '# NYXR website\n\nThe official NYXR product website. Built with React and Vite; deployed as static pages.\n\nUse Node 24, `npm ci`, `npm run dev`.\n\nRead [DEPLOYMENT.md](DEPLOYMENT.md) before connecting Vercel or publishing beta downloads.\nThe desktop app is not included in this repository. Your own provider keys or a local model power NYXR.\n\nThe public beta link is guarded until reviewed installer and matching source assets are available.\nNo installer or credentials are committed here.\n',
  'utf8',
);
console.log(
  'Prepared an isolated website checkout. Review and commit this folder; desktop state and build artifacts were not copied.',
);
