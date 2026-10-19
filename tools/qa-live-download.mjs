// Real public download acceptance: downloads the actual installer; never executes it.
import { chromium } from 'playwright';
import { mkdir, open, stat, writeFile } from 'node:fs/promises';
import { createReadStream } from 'node:fs';
import { createHash } from 'node:crypto';
import { resolve } from 'node:path';
import assert from 'node:assert/strict';
import { createRelease, readRelease, verifyAsset } from './release-config.mjs';
import { pages } from '../src/data/pages.js';

const origin = new URL(process.env.NYXR_LIVE_URL);
assert(origin.protocol === 'https:' && !origin.username && !origin.password && !origin.search, 'Use the real public HTTPS website origin');
const release = createRelease(await readRelease(), process.env, { required: true });
const output = resolve('qa/live-download');
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ headless: true, ...(process.env.NYXR_BROWSER_PATH ? { executablePath: process.env.NYXR_BROWSER_PATH } : {}) });
const report = { origin: origin.origin, version: release.version, checks: [], errors: [], executedAt: new Date().toISOString() };
const check = (name, value) => { assert(value, name); report.checks.push(name); console.log('PASS', name); };
try {
  const context = await browser.newContext({ viewport: { width: 1650, height: 900 }, reducedMotion: 'reduce', acceptDownloads: true });
  const page = await context.newPage();
  page.on('pageerror', (error) => report.errors.push(error.message));
  const response = await page.goto(new URL('/download/', origin).href, { waitUntil: 'networkidle' });
  check('Public Download page loads without sign-in', response.status() === 200);
  check('Production security headers apply', response.headers()['x-content-type-options'] === 'nosniff' && response.headers()['x-frame-options'] === 'DENY');
  check('Real installer URL is attached to Download button', await page.getByTestId('beta-download').getAttribute('href') === release.installer.url);
  const releaseResponse = await page.request.get(new URL('/beta-release.json', origin).href);
  const remote = await releaseResponse.json();
  check('Release metadata is never cached stale', releaseResponse.headers()['cache-control']?.includes('no-store'));
  check('Deployed version/hash match release record', remote.available && remote.version === release.version && remote.installer.sha256 === release.installer.sha256);
  const started = Date.now();
  const pending = page.waitForEvent('download', { timeout: 60_000 });
  await page.getByTestId('beta-download').click();
  const download = await pending;
  check('Browser receives the correct filename', download.suggestedFilename() === release.installer.filename);
  const target = resolve(output, release.installer.filename);
  let deadline;
  try {
    await Promise.race([download.saveAs(target), new Promise((_, reject) => { deadline = setTimeout(() => reject(new Error('Actual installer download exceeded 10 minutes')), 600_000); })]);
  } finally { clearTimeout(deadline); }
  check('Actual installer transfer completes', await download.failure() === null);
  check('Downloaded installer size matches', (await stat(target)).size === release.installer.bytes);
  const handle = await open(target, 'r');
  try { const prefix = Buffer.alloc(2); await handle.read(prefix, 0, 2, 0); check('Downloaded file is a Windows executable', prefix.toString('ascii') === 'MZ'); }
  finally { await handle.close(); }
  const hash = createHash('sha256');
  for await (const chunk of createReadStream(target)) hash.update(chunk);
  check('Downloaded installer SHA-256 matches exactly', hash.digest('hex') === release.installer.sha256);
  report.downloadSeconds = Number(((Date.now() - started) / 1000).toFixed(1));
  report.installerBytes = release.installer.bytes;
  check('Download keeps the site open', new URL(page.url()).pathname === '/download/');
  const checksums = await page.request.get(new URL('/beta-SHA256SUMS.txt', origin).href);
  check('Public checksum file matches installer', checksums.status() === 200 && (await checksums.text()).includes(release.installer.sha256 + '  ' + release.installer.filename));
  check('Corresponding-source download link matches', await page.getByRole('link', { name: 'Corresponding source', exact: true }).getAttribute('href') === release.source.url);
  console.log('Verifying complete public corresponding-source download...');
  const source = await verifyAsset(release.source, { full: true });
  check('Corresponding source downloads with exact SHA-256', source.sha256Verified === true);
  for (const width of [1650, 390]) {
    await page.setViewportSize({ width, height: 900 });
    await page.evaluate(() => { document.activeElement?.blur(); window.scrollTo({ top: 0, behavior: 'instant' }); });
    check(`No horizontal overflow ${width}`, await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
    await page.screenshot({ path: resolve(output, `download-${width}.png`), fullPage: true, animations: 'disabled' });
  }
  await page.setViewportSize({ width: 1650, height: 900 });
  for (const route of pages) {
    const rendered = await page.goto(new URL(route.path, origin).href, { waitUntil: 'networkidle' });
    check(`Public direct page ${route.path}`, rendered.status() === 200 && await page.locator('main h1').count() === 1);
  }
  for (const path of ['/nyxr-missing-page-test/', '/assets/nyxr-missing-file.js']) {
    const missing = await page.request.get(new URL(path, origin).href);
    check(`Real 404 ${path}`, missing.status() === 404);
  }
  check('No browser runtime errors', report.errors.length === 0);
  await context.close();
} finally {
  await browser.close();
  await writeFile(resolve(output, 'results.json'), JSON.stringify(report, null, 2) + '\n', 'utf8');
}
console.log(`LIVE DOWNLOAD VERIFIED: ${report.checks.length} checks. Actual installer was downloaded and hashed, never executed.`);
