import { createServer as httpServer } from 'node:http';
import { readFile, stat, mkdir, writeFile } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
import { chromium } from 'playwright';
import { createServer as viteServer } from 'vite';
import assert from 'node:assert/strict';
import { pages } from '../src/data/pages.js';
import { createRelease, readRelease } from './release-config.mjs';

const root = resolve('dist'),
  output = resolve('qa/deployment');
await mkdir(output, { recursive: true });
const report = { executedAt: new Date().toISOString(), checks: [], errors: [], viewports: [] };
const check = (name, result = true) => {
  assert(result, name);
  report.checks.push(name);
};
const mime = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.svg': 'image/svg+xml',
  '.json': 'application/json',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.webm': 'video/webm',
  '.txt': 'text/plain',
};
// A strict directory-index server: no SPA catch-all to conceal missing files.
const server = httpServer(async (req, res) => {
  try {
    const path = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    let file = resolve(root, '.' + path);
    if (!file.startsWith(root + sep) && file !== root) throw new Error('outside root');
    if ((await stat(file)).isDirectory()) file = resolve(file, 'index.html');
    const body = await readFile(file);
    res.writeHead(200, { 'Content-Type': mime[extname(file)] || 'application/octet-stream' });
    res.end(body);
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end(await readFile(resolve(root, '404.html')));
  }
});
await new Promise((done) => server.listen(0, '127.0.0.1', done));
const base = `http://127.0.0.1:${server.address().port}`;
const browser = await chromium.launch({
  headless: true,
  ...(process.env.NYXR_BROWSER_PATH ? { executablePath: process.env.NYXR_BROWSER_PATH } : {}),
});
let fixture;
try {
  const context = await browser.newContext({
    viewport: { width: 1650, height: 900 },
    reducedMotion: 'reduce',
  });
  const page = await context.newPage();
  page.on('pageerror', (error) => report.errors.push(error.message));
  page.on('response', (response) => {
    if (response.status() >= 400)
      report.errors.push(`${response.status()} ${new URL(response.url()).pathname}`);
  });
  for (const route of pages) {
    const response = await page.goto(base + route.path, { waitUntil: 'networkidle' });
    check(`Direct route ${route.path}`, response.status() === 200);
    check(`Rendered route ${route.path}`, (await page.locator('main h1').count()) === 1);
  }
  await page.goto(base + '/download/', { waitUntil: 'networkidle' });
  const metadata = JSON.parse(await readFile(resolve(root, 'beta-release.json'), 'utf8'));
  if (!metadata.available) {
    check(
      'Unavailable beta is clearly disabled',
      await page.getByRole('button', { name: 'Beta download being prepared' }).isDisabled(),
    );
    check(
      'Unavailable beta does not expose an installer link',
      (await page.locator('a[download$=".exe"]').count()) === 0,
    );
  }
  for (const [width, height] of [
    [1366, 768],
    [1650, 900],
    [1920, 1080],
    [390, 844],
  ]) {
    await page.setViewportSize({ width, height });
    check(
      `Download no horizontal overflow ${width}`,
      await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
    );
    await page.screenshot({
      path: resolve(output, `download-${width}.png`),
      fullPage: true,
      animations: 'disabled',
    });
    report.viewports.push({ width, height });
  }
  await page.setViewportSize({ width: 1650, height: 900 });
  await page.goto(base + '/', { waitUntil: 'networkidle' });
  await page.locator('.site-header a[href="/download/"]').click();
  check('Header Download opens the correct page', new URL(page.url()).pathname === '/download/');
  await page.reload({ waitUntil: 'networkidle' });
  check('Download survives refresh', await page.locator('.release-card').isVisible());
  for (const missing of ['/not-a-real-page/', '/missing-installer.exe', '/assets/missing.js'])
    check(`True 404 for ${missing}`, (await fetch(base + missing)).status === 404);

  // Exercise the published UI with isolated, harmless binary fixtures, never a public release.
  const record = await readRelease();
  const release = createRelease(
    { ...record, distributionReady: true },
    {
      NYXR_BETA_INSTALLER_URL: `https://downloads.nyxr.test/${record.installer.filename}`,
      NYXR_BETA_SOURCE_URL: `https://downloads.nyxr.test/${record.source.filename}`,
    },
    { required: true },
  );
  fixture = await viteServer({
    server: { host: '127.0.0.1', port: 0 },
    define: { __NYXR_BETA_RELEASE__: JSON.stringify(release) },
  });
  await fixture.listen();
  const fixtureBase = `http://127.0.0.1:${fixture.httpServer.address().port}`;
  await context.route('https://downloads.nyxr.test/**', (route) =>
    route.fulfill({
      status: 200,
      headers: {
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': `attachment; filename="${record.installer.filename}"`,
      },
      body: Buffer.from('MZ-NYXR-HARMLESS-DOWNLOAD-FIXTURE'),
    }),
  );
  await page.goto(fixtureBase + '/download/', { waitUntil: 'networkidle' });
  const pending = page.waitForEvent('download');
  await page.getByTestId('beta-download').click();
  const download = await pending;
  check(
    'Download uses the expected installer filename',
    download.suggestedFilename() === record.installer.filename,
  );
  const saved = resolve(output, 'harmless-download-fixture.bin');
  await download.saveAs(saved);
  check(
    'Download transfers bytes, rather than navigating to an error page',
    (await readFile(saved)).toString() === 'MZ-NYXR-HARMLESS-DOWNLOAD-FIXTURE',
  );
  check('Download retains current page', new URL(page.url()).pathname === '/download/');
  check(
    'Published UI includes matching source link',
    (await page.getByRole('link', { name: 'Corresponding source' }).getAttribute('href')) ===
      release.source.url,
  );
  await page.getByText('Verify your download', { exact: true }).click();
  check(
    'Checksum is complete',
    (await page.locator('.release-checksum code').textContent()) === record.installer.sha256,
  );
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.getByRole('button', { name: 'Copy SHA-256' }).click();
  check(
    'Checksum copies correctly',
    (await page.evaluate(() => navigator.clipboard.readText())) === record.installer.sha256,
  );
  for (const width of [1650, 390]) {
    await page.setViewportSize({ width, height: 900 });
    check(
      `Published fixture no overflow ${width}`,
      await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
    );
    await page.screenshot({
      path: resolve(output, `published-fixture-${width}.png`),
      fullPage: true,
      animations: 'disabled',
    });
  }
  check('No browser runtime or unexpected resource errors', report.errors.length === 0);
  await context.close();
} finally {
  await fixture?.close();
  await browser.close();
  await new Promise((done) => server.close(done));
  await writeFile(resolve(output, 'results.json'), JSON.stringify(report, null, 2) + '\n', 'utf8');
}
console.log(
  `Deployment browser QA: ${report.checks.length} checks passed. Published-download checks use harmless fixtures; no live installer was published.`,
);
