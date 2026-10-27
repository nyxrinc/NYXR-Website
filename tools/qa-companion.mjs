// Local repository QA with temporary browser profiles and harmless download bytes.
import assert from 'node:assert/strict';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { createServer } from 'vite';
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import { createRelease, readRelease } from './release-config.mjs';
import { companionAcceptanceChecks } from './companion-release.mjs';
import { createHash } from 'node:crypto';

const harmlessApk = Buffer.from('PK-NYXR-HARMLESS-APK-FIXTURE');
const harmlessHash = createHash('sha256').update(harmlessApk).digest('hex');

const output = resolve('qa/phone-companion');
await mkdir(output, { recursive: true });
const report = { checks: [], errors: [], blockedExternalRequests: [] };
const check = (name, value = true) => {
  assert.ok(value, name);
  report.checks.push(name);
  console.log('PASS', name);
};
const record = await readRelease();
let server;
const browser = await chromium.launch({
  headless: true,
  ...(process.env.NYXR_BROWSER_PATH ? { executablePath: process.env.NYXR_BROWSER_PATH } : {}),
});
const context = await browser.newContext({
  reducedMotion: 'reduce',
  viewport: { width: 1650, height: 1000 },
});
await context.route('**/*', (route) => {
  const url = new URL(route.request().url());
  if (url.hostname === '127.0.0.1') return route.continue();
  if (url.hostname === 'downloads.nyxr.test')
    return route.fulfill({
      headers: {
        'Content-Type': 'application/vnd.android.package-archive',
        'Content-Disposition': 'attachment; filename="NYXR-Companion-0.1.0-beta.999.apk"',
      },
      body: harmlessApk,
    });
  report.blockedExternalRequests.push(url.origin);
  return route.abort();
});
const page = await context.newPage();
page.on('pageerror', (error) => report.errors.push(error.message));
async function fixture(input) {
  await server?.close();
  server = await createServer({
    server: { host: '127.0.0.1', port: 0 },
    define: { __NYXR_BETA_RELEASE__: JSON.stringify(createRelease(input, {})) },
  });
  await server.listen();
  return `http://127.0.0.1:${server.httpServer.address().port}`;
}
try {
  const base = await fixture(record);
  for (const width of [390, 1366, 1650]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto(base + '/download/', { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    check(
      `${width}: Android disabled without a fabricated APK link`,
      (await page.getByRole('button', { name: 'Android beta coming soon' }).isDisabled()) &&
        (await page.getByTestId('companion-card').locator('a[href$=".apk"]').count()) === 0,
    );
    check(
      `${width}: real Windows link preserved`,
      (await page.getByTestId('beta-download').getAttribute('href')) === record.installer.url,
    );
    const card = page.getByTestId('companion-card');
    const copy = await card.innerText();
    for (const pattern of [
      /Android 10\+/,
      /same Wi-Fi/,
      /Motorola/,
      /30 phone actions\/day/,
      /1 paired phone/,
      /current Windows beta does not include phone support/,
      /Not supported/,
    ])
      assert.match(copy, pattern);
    const cards = await page.locator('.download-assets .release-card').evaluateAll((elements) =>
      elements.map((e) => {
        const b = e.getBoundingClientRect();
        return { x: b.x, y: b.y, right: b.right };
      }),
    );
    if (width > 700)
      check(
        `${width}: Windows and Android cards are adjacent`,
        Math.abs(cards[0].y - cards[1].y) < 2 && cards[1].x > cards[0].x,
      );
    check(
      `${width}: download has no overflow`,
      await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
    );
    const a11y = await new AxeBuilder({ page })
      .include('.download-assets')
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
    assert.deepEqual(
      a11y.violations.map((v) => ({ id: v.id, targets: v.nodes.map((n) => n.target) })),
      [],
    );
    await page.screenshot({ path: resolve(output, `download-${width}.png`), fullPage: true });
    await page
      .locator('.download-assets')
      .screenshot({ path: resolve(output, `download-cards-${width}.png`) });
    await card.getByRole('link', { name: 'Setup & permissions' }).click();
    await page.waitForURL('**/guide/#phone-companion');
    check(
      `${width}: setup link reaches phone guide`,
      await page.locator('#phone-companion').isVisible(),
    );
    assert.match(await page.locator('#phone-companion').innerText(), /revoke|Revoke/);
    await page
      .locator('#phone-companion')
      .screenshot({ path: resolve(output, `guide-${width}.png`) });
    for (const [path, selector, name] of [
      ['/features/', '.companion-info', 'features'],
      ['/pricing/#phone-limits', '#phone-limits', 'pricing'],
      ['/privacy/#privacy-phone-companion', '#privacy-phone-companion', 'privacy'],
    ]) {
      await page.goto(base + path, { waitUntil: 'networkidle' });
      check(
        `${width}: ${name} renders without overflow`,
        (await page.locator(selector).isVisible()) &&
          (await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)),
      );
      const audit = await new AxeBuilder({ page })
        .include(selector)
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
        .analyze();
      assert.deepEqual(
        audit.violations.map((v) => v.id),
        [],
        `${name} accessibility`,
      );
      await page.locator(selector).screenshot({ path: resolve(output, `${name}-${width}.png`) });
      if (name === 'pricing') {
        assert.match(await page.locator(selector).innerText(), /verified owners/);
        check(
          `${width}: phone matrix has all four plan values`,
          (await page
            .getByRole('row', { name: /Phone actions \/ private beta/ })
            .locator('td')
            .count()) === 4,
        );
        assert.equal(
          await page.locator('.nyxr-plans form, .nyxr-plans input[type="email"]').count(),
          0,
        );
      }
      if (name === 'privacy')
        assert.match(await page.locator(selector).innerText(), /stays local.*paired devices/s);
    }
    await page.goto(base + '/', { waitUntil: 'networkidle' });
    check(
      `${width}: Home keeps NYXR identity without pricing cards`,
      (await page.locator('main h1').count()) === 1 &&
        (await page.locator('main .tier-card, main .phone-plans').count()) === 0,
    );
  }

  // Exercise the future UI without publishing, fetching or signing any real artifact.
  const ready = structuredClone(record);
  ready.version = '4.0.0-beta.999';
  ready.installer.filename = `NYXR-Setup-${ready.version}-x64.exe`;
  ready.source.filename = `NYXR-source-${ready.version}.zip`;
  for (const asset of [ready.installer, ready.source])
    asset.url = `https://downloads.nyxr.test/${asset.filename}`;
  ready.phoneCompanion = { ready: true, protocolVersion: 1 };
  ready.companion = {
    schemaVersion: 1,
    channel: 'private-beta',
    minAndroid: 10,
    version: '0.1.0-beta.999',
    distributionReady: true,
    signed: true,
    apk: {
      filename: 'NYXR-Companion-0.1.0-beta.999.apk',
      bytes: harmlessApk.length,
      sha256: harmlessHash,
      signingCertificateSha256: 'a'.repeat(64),
      signatureVerified: true,
      url: 'https://downloads.nyxr.test/NYXR-Companion-0.1.0-beta.999.apk',
    },
    desktop: {
      version: ready.version,
      installerSha256: ready.installer.sha256,
      protocolVersion: 1,
    },
    hardwareAcceptance: {
      passed: true,
      device: 'Motorola synthetic fixture',
      androidApiLevel: 29,
      apkSha256: harmlessHash,
      desktopInstallerSha256: ready.installer.sha256,
      testedAt: '2026-10-27T08:00:00Z',
      checks: Object.fromEntries(companionAcceptanceChecks.map((c) => [c, true])),
    },
  };
  const incomplete = structuredClone(ready);
  incomplete.companion.hardwareAcceptance.passed = false;
  await page.goto((await fixture(incomplete)) + '/download/', { waitUntil: 'networkidle' });
  check(
    'Real-looking APK metadata cannot bypass hardware gate in rendered UI',
    (await page.getByRole('button', { name: 'Android beta coming soon' }).isDisabled()) &&
      (await page.getByTestId('companion-card').locator('a[href$=".apk"]').count()) === 0,
  );
  await page.goto((await fixture(ready)) + '/download/', { waitUntil: 'networkidle' });
  check(
    'Complete synthetic release exposes signed APK download',
    await page.getByTestId('companion-download').isVisible(),
  );
  assert.doesNotMatch(
    await page.getByTestId('companion-card').innerText(),
    /current Windows beta does not include phone support/,
  );
  await page.getByText('Verify Android APK', { exact: true }).click();
  assert.deepEqual(await page.locator('.companion-card code').allTextContents(), [
    harmlessHash,
    'a'.repeat(64),
  ]);
  const pending = page.waitForEvent('download');
  await page.getByTestId('companion-download').click();
  const download = await pending;
  assert.equal(download.suggestedFilename(), ready.companion.apk.filename);
  const file = resolve(output, 'harmless-apk-fixture.bin');
  await download.saveAs(file);
  assert.equal((await readFile(file)).toString(), 'PK-NYXR-HARMLESS-APK-FIXTURE');
  check('Signed APK button transfers harmless bytes with expected filename');
  assert.deepEqual(report.errors, []);
  assert.deepEqual(report.blockedExternalRequests, []);
  check('No runtime errors or external network requests');
} finally {
  await context.close();
  await browser.close();
  await server?.close();
  await writeFile(resolve(output, 'results.json'), JSON.stringify(report, null, 2) + '\n');
}
console.log(`Companion browser QA: ${report.checks.length} checks passed.`);
