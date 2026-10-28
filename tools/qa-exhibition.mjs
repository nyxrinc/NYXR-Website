// Isolated website QA only. No actual APK, Android device or physical action is tested.
import assert from 'node:assert/strict';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { createServer } from 'vite';
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import { normalizeExhibitionRelease } from '../src/data/exhibition-release.mjs';
import { readRelease } from './release-config.mjs';
import {
  exhibitionFixture,
  basicExhibitionFixture,
  unavailableExhibitionFixture,
  exhibitionApkBytes,
  exhibitionSourceBytes,
} from './exhibition-fixture.mjs';

const output = resolve('qa/exhibition-test');
await mkdir(output, { recursive: true });
const report = {
  scope:
    'Local website only; hosted metadata and transfers are intercepted synthetic fixtures. No signing verification, live hosting or physical-device acceptance.',
  checks: [],
  errors: [],
  externalRequests: [],
};
const check = (name, value = true) => {
  assert.ok(value, name);
  report.checks.push(name);
  console.log('PASS', name);
};
const current = await readRelease();
// These UI cases remain deterministic after the owner fills the real descriptor.
const unavailable = unavailableExhibitionFixture();
const hosted = exhibitionFixture();
const basicHosted = basicExhibitionFixture();
let server;
const browser = await chromium.launch({
  headless: true,
  ...(process.env.NYXR_BROWSER_PATH ? { executablePath: process.env.NYXR_BROWSER_PATH } : {}),
});
const context = await browser.newContext({ reducedMotion: 'reduce', acceptDownloads: true });
await context.route('**/*', async (route) => {
  const url = route.request().url();
  if (new URL(url).hostname === '127.0.0.1') return route.continue();
  const asset = [hosted.apk, hosted.source, basicHosted.apk, basicHosted.source].find(
    (candidate) => candidate.url === url,
  );
  if (asset)
    return route.fulfill({
      headers: {
        'Content-Type': asset.filename.endsWith('.apk')
          ? 'application/vnd.android.package-archive'
          : 'application/zip',
        'Content-Disposition': `attachment; filename="${asset.filename}"`,
      },
      body: asset.filename.endsWith('.apk') ? exhibitionApkBytes : exhibitionSourceBytes,
    });
  report.externalRequests.push(new URL(url).origin);
  return route.abort();
});
const page = await context.newPage();
page.on('pageerror', (error) => report.errors.push(error.message));
async function fixture(record) {
  await server?.close();
  server = await createServer({
    server: { host: '127.0.0.1', port: 0 },
    define: { __NYXR_EXHIBITION_RELEASE__: JSON.stringify(normalizeExhibitionRelease(record)) },
  });
  await server.listen();
  return `http://127.0.0.1:${server.httpServer.address().port}`;
}
async function navigate(url) {
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.locator('.boot-screen').waitFor({ state: 'detached' });
  await page.evaluate(() => document.fonts.ready);
}
async function audit(selector) {
  const result = await new AxeBuilder({ page })
    .include(selector)
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
    .analyze();
  assert.deepEqual(
    result.violations.map((v) => ({ id: v.id, targets: v.nodes.map((n) => n.target) })),
    [],
  );
}
async function captureElement(locator, path) {
  // Capture page coordinates from the top so fixed navigation cannot cover a tall card.
  await page.evaluate(() => {
    document.activeElement?.blur();
    window.scrollTo(0, 0);
  });
  const clip = await locator.evaluate((element) => {
    const box = element.getBoundingClientRect();
    return { x: box.x + scrollX, y: box.y + scrollY, width: box.width, height: box.height };
  });
  await page.screenshot({ path, clip, fullPage: true });
}
try {
  for (const [name, record] of [
    ['unavailable', unavailable],
    ['basic-hosted-fixture', basicHosted],
    ['hosted-fixture', hosted],
  ]) {
    const basic = record.edition === 'basic';
    const base = await fixture(record);
    for (const width of [390, 1366, 1650]) {
      await page.setViewportSize({ width, height: width === 390 ? 844 : 1000 });
      await navigate(base + '/download/#exhibition-test');
      const card = page.getByTestId('exhibition-card');
      const text = await card.innerText();
      for (const pattern of [
        /Exhibition (?:Basic|Test)/,
        /Android 10\+/,
        /same Wi-Fi/,
        /run_nyxr\.bat/,
        /public beta 3 installer is not compatible/,
        /Local exhibition testing/,
        /opt\s+in on the phone/,
        /30 test actions per UTC day/,
        /No account required/,
        /no premium/,
        /physical-device\s+acceptance is still pending/,
      ])
        assert.match(text, pattern);
      check(`${name}/${width}: testing scope and desktop prerequisites disclosed`);
      async function checkBasicScope(container) {
        const scope = await container.getByTestId('exhibition-basic-scope').innerText();
        assert.match(scope, /battery status, listing and opening apps, media volume/);
        assert.match(scope, /torch, selected files, links and productivity handoffs/);
        assert.match(
          scope,
          /Not included in Basic: calls, SMS, contacts, notification reading or replies,\s*WhatsApp actions and media playback control/,
        );
        assert.match(
          scope,
          /removes call, SMS and contacts permissions and the notification listener/,
        );
        assert.match(scope, /POST_NOTIFICATIONS/);
        assert.match(scope, /does not allow reading or replying to other apps’ notifications/);
        assert.doesNotMatch(await container.innerText(), /simulation|real communication test/i);
      }
      async function checkProtect(container) {
        const help = container.getByTestId('play-protect-help');
        assert.match(await help.innerText(), /Keep Play Protect enabled/);
        assert.match(await help.innerText(), /installation cannot be guaranteed/);
        assert.equal(
          await help.getByRole('link').getAttribute('href'),
          'https://developers.google.com/android/play-protect/warning-dev-guidance',
        );
        assert.doesNotMatch(
          await container.innerText(),
          /(?:disable|turn off|bypass)\s+(?:Google\s+)?Play Protect|install anyway/i,
        );
      }
      if (basic) await checkBasicScope(card);
      await checkProtect(card);
      check(`${name}/${width}: edition boundaries and Play Protect guidance`);
      if (name === 'unavailable') {
        check(
          `${width}: unavailable button has no fabricated APK link`,
          (await card
            .getByRole('button', { name: 'Exhibition Basic APK awaiting publication' })
            .isDisabled()) &&
            (await card.locator('a[href$=".apk"]').count()) === 0 &&
            (await card
              .locator('code')
              .filter({ hasText: /^[a-f0-9]{64}$/ })
              .count()) === 0,
        );
        assert.equal(await page.locator('a[href$=".apk"]').count(), 0);
      } else {
        check(
          `${width}: only the separate Exhibition APK is linked`,
          (await page.getByTestId('exhibition-download').getAttribute('href')) === record.apk.url &&
            (await page.locator('a[href$=".apk"]').count()) === 1,
        );
        await card.locator('summary').click();
        assert.deepEqual(await card.locator('.release-checksum code').allTextContents(), [
          record.apk.sha256,
          record.apk.signingCertificateSha256,
          record.source.sha256,
        ]);
        check(`${width}: exact fixture hashes and signing certificate shown`);
      }
      check(
        `${name}/${width}: beta 3 Windows download unchanged`,
        (await page.getByTestId('beta-download').getAttribute('href')) === current.installer.url,
      );
      check(
        `${name}/${width}: public companion and candidate gates remain closed`,
        (await page.getByRole('button', { name: 'Android beta coming soon' }).isDisabled()) &&
          (await page.getByRole('button', { name: 'Windows beta 4 in testing' }).isDisabled()) &&
          (await page.getByTestId('companion-download').count()) === 0,
      );
      check(
        `${name}/${width}: no horizontal overflow`,
        await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
      );
      await audit('#exhibition-test');
      check(`${name}/${width}: download card accessibility`);
      await captureElement(card, resolve(output, `${name}-card-${width}.png`));
      if (width !== 1366)
        await page.screenshot({
          path: resolve(output, `${name}-download-${width}.png`),
          fullPage: true,
        });

      await card.getByRole('link', { name: 'Exhibition Test setup guide', exact: true }).click();
      await page.waitForURL('**/guide/#exhibition-test');
      const guide = page.locator('#exhibition-test');
      const guideText = await guide.innerText();
      for (const pattern of [
        /Android 10/,
        /same trusted Wi-Fi/,
        /run_nyxr\.bat/,
        /public beta 3 installer is not compatible/,
        /Local exhibition testing/,
        /Both devices\s+must opt in/,
        /approve the connection on both devices/,
        /permissions or action confirmations/,
        /30 test actions\s+per UTC day/,
        /no NYXR account is required/,
        /Show my phone battery/,
        /List apps on my phone/,
        /media-volume/,
        /not passed physical-device acceptance/,
      ])
        assert.match(guideText, pattern);
      if (basic) await checkBasicScope(guide);
      else assert.match(guideText, /simulation ON/);
      await checkProtect(guide);
      check(`${name}/${width}: setup anchor reaches complete testing instructions`);
      await audit('#exhibition-test');
      check(
        `${name}/${width}: guide accessibility and no overflow`,
        await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
      );
      await captureElement(guide, resolve(output, `${name}-guide-${width}.png`));
      await guide.getByRole('link', { name: 'Exhibition Test download channel' }).click();
      await page.waitForURL('**/download/#exhibition-test');
    }
    for (const path of ['/phone/', '/updates/', '/privacy/']) {
      await navigate(base + path);
      if (basic) {
        assert.equal(await page.getByTestId('exhibition-basic-scope').count(), 1);
        assert.match(
          await page.getByTestId('play-protect-help').innerText(),
          /Keep Play Protect enabled/,
        );
      }
      if (path === '/privacy/') continue;
      const link = page.locator('main a[href="/download/#exhibition-test"]').first();
      await link.click();
      await page.waitForURL('**/download/#exhibition-test');
      check(
        `${name}: ${path} links to the separate channel`,
        await page.getByTestId('exhibition-card').isVisible(),
      );
    }
    if (record.available) {
      for (const [selector, asset, bytes] of [
        ['[data-testid="exhibition-download"]', record.apk, exhibitionApkBytes],
        ['#exhibition-test .release-checksum a', record.source, exhibitionSourceBytes],
      ]) {
        await navigate(base + '/download/#exhibition-test');
        if (asset === record.source) await page.locator('#exhibition-test summary').click();
        const event = page.waitForEvent('download');
        await page.locator(selector).click();
        const download = await event;
        assert.equal(download.suggestedFilename(), asset.filename);
        const file = resolve(
          output,
          `${name}-${asset === record.apk ? 'harmless-apk-fixture.bin' : 'harmless-source-fixture.bin'}`,
        );
        await download.saveAs(file);
        assert.deepEqual(await readFile(file), bytes);
        check(`Intercepted fixture transfers expected bytes and filename: ${asset.filename}`);
      }
    }
  }
  assert.deepEqual(report.errors, []);
  assert.deepEqual(report.externalRequests, []);
  check('No runtime errors or unhandled external requests');
  report.passed = true;
} finally {
  await context.close();
  await browser.close();
  await server?.close();
  await writeFile(resolve(output, 'results.json'), JSON.stringify(report, null, 2) + '\n');
}
console.log(`Exhibition browser QA: ${report.checks.length} checks passed.`);
