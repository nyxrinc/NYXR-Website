import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { preview } from 'vite';
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
const output = 'qa/site-refresh';
await mkdir(output, { recursive: true });
const server = await preview({ preview: { host: '127.0.0.1', port: 0 } });
const browser = await chromium.launch({
  headless: true,
  ...(process.env.NYXR_BROWSER_PATH ? { executablePath: process.env.NYXR_BROWSER_PATH } : {}),
});
const report = {
  checks: [],
  errors: [],
  scope: 'Built local website, isolated browser; no live APK download or physical phone actions.',
};
const check = (name, value) => {
  assert.ok(value, name);
  report.checks.push(name);
};
try {
  const context = await browser.newContext({ reducedMotion: 'reduce' });
  const page = await context.newPage();
  page.on('pageerror', (e) => report.errors.push(e.message));
  await context.route('**/*', (route) =>
    new URL(route.request().url()).hostname === '127.0.0.1' ? route.continue() : route.abort(),
  );
  const base = server.resolvedUrls.local[0];
  for (const width of [390, 1366, 1650, 1920]) {
    await page.setViewportSize({ width, height: width === 390 ? 844 : 1000 });
    for (const path of ['phone/', 'updates/', 'download/']) {
      await page.goto(base + path, { waitUntil: 'networkidle' });
      await page.locator('.boot-screen').waitFor({ state: 'detached' });
      await page.evaluate(() => document.fonts.ready);
      check(`${path} / ${width}: one clear title`, (await page.locator('main h1').count()) === 1);
      check(
        `${path} / ${width}: no horizontal overflow`,
        await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
      );
      check(
        `${path} / ${width}: build status disclosed`,
        /in testing|still required/i.test(await page.locator('main').innerText()),
      );
      if (path === 'phone/') {
        for (const label of ['Reach someone', 'Stay focused', 'Check in']) {
          const button = page.getByRole('button', { name: label, exact: true });
          await button.click();
          check(
            `${width}: example ${label} selects`,
            (await button.getAttribute('aria-pressed')) === 'true',
          );
        }
        await page.evaluate(() => {
          document.activeElement?.blur();
          window.scrollTo(0, 0);
        });
        await page.screenshot({ path: `${output}/phone-${width}.png`, fullPage: true });
        await page.screenshot({ path: `${output}/phone-viewport-${width}.png` });
      }
      if (path === 'download/') {
        check(
          `${width}: next desktop cannot masquerade as public download`,
          await page.getByRole('button', { name: 'Windows beta 4 in testing' }).isDisabled(),
        );
        check(
          `${width}: Android download remains gated`,
          await page.getByRole('button', { name: 'Android beta coming soon' }).isDisabled(),
        );
        check(
          `${width}: public companion exposes no APK link`,
          (await page.getByTestId('companion-card').locator('a[href$=".apk"]').count()) === 0,
        );
        for (const details of await page.locator('.candidate-checksum').all())
          await details.locator('summary').click();
        check(
          `${width}: exact APK checksum visible`,
          await page
            .getByText('d0150921f024f012a2f17f9aed7ef3c4f980c7806e59abed7d561ceed246238e', {
              exact: true,
            })
            .isVisible(),
        );
        await page.evaluate(() => {
          document.activeElement?.blur();
          window.scrollTo(0, 0);
        });
        await page.screenshot({ path: `${output}/download-${width}.png`, fullPage: true });
        await page.screenshot({ path: `${output}/download-viewport-${width}.png` });
      }
      if ([390, 1650].includes(width)) {
        const result = await new AxeBuilder({ page })
          .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
          .analyze();
        assert.deepEqual(
          result.violations.map((v) => ({ id: v.id, targets: v.nodes.map((n) => n.target) })),
          [],
          `${path} / ${width}: accessibility`,
        );
        report.checks.push(`${path} / ${width}: accessibility`);
      }
    }
  }
  await page.setViewportSize({ width: 1650, height: 1000 });
  await page.goto(base, { waitUntil: 'networkidle' });
  await page.locator('.phone-showcase').scrollIntoViewIfNeeded();
  await page.locator('.phone-showcase').screenshot({ path: `${output}/home-phone-1650.png` });
  await page.getByRole('link', { name: 'Meet the phone companion', exact: true }).click();
  await page.waitForURL('**/phone/');
  check('Home links to the real Phone page', await page.locator('#phone-title').isVisible());
  await page.getByRole('link', { name: 'See downloads & status', exact: true }).click();
  await page.waitForURL('**/download/#android-companion');
  check(
    'Phone links directly to Android status',
    await page.getByTestId('companion-card').isVisible(),
  );
  check('No browser runtime errors', report.errors.length === 0);
  report.passed = true;
} finally {
  await writeFile(`${output}/results.json`, JSON.stringify(report, null, 2));
  await browser.close();
  await new Promise((done) => server.httpServer.close(done));
}
console.log(
  JSON.stringify({ passed: report.passed, checks: report.checks.length, errors: report.errors }),
);
