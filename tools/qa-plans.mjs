// Focused local QA. Playwright creates temporary browser profiles, never a user profile.
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { createServer } from 'vite';
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import catalog from '../src/data/plan-catalog.json' with { type: 'json' };
import {
  plans,
  featureMatrix,
  coreFeatures,
  planCurrency,
  planInterval,
} from '../src/data/plans.js';

const root = fileURLToPath(new URL('../', import.meta.url));
const live = process.env.NYXR_PLANS_LIVE_URL || '';
if (live) {
  const url = new URL(live);
  assert.equal(url.protocol, 'https:');
  assert.equal(url.origin, live);
  assert.equal(url.username + url.password + url.search + url.hash, '');
}
const output = resolve(root, live ? 'qa/plans-live' : 'qa/plans');
await mkdir(output, { recursive: true });
const report = { checks: [], viewports: [], errors: [], blockedExternalRequests: [] };
const check = (name, result = true) => {
  assert.ok(result, name);
  report.checks.push(name);
  console.log('PASS', name);
};

assert.equal(planCurrency, 'INR');
assert.equal(planInterval, 'month');
assert.deepEqual(
  plans.map((plan) => plan.id),
  ['core', 'plus', 'student_plus', 'teams'],
);
for (const plan of plans) {
  const canonical = catalog.plans.find((item) => item.id === plan.id);
  assert.equal(plan.amountMinor, canonical.amount_minor);
  assert.equal(plan.price, canonical.amount_minor / 100);
  assert.deepEqual(plan.limits, canonical.limits);
}
check('Every plan price and cloud limit comes from the generated INR monthly catalog');
assert.deepEqual(
  plans.map((plan) => plan.price),
  [0, 299, 149, 799],
);
assert.deepEqual(plans[1].limits, plans[2].limits);
assert.equal(plans[2].requiresVerification, true);
assert.equal(plans[0].href, '/download/');
assert.equal(plans[0].available, true);
assert.ok(plans.slice(1).every((plan) => !plan.available && !plan.href));
assert.ok(coreFeatures.some((value) => value.includes('PDF')));
assert.ok(featureMatrix.every((row) => row.values.length === plans.length));
assert.ok(
  featureMatrix
    .find((row) => row.label === 'NYXR-imposed local token quota')
    .values.every((value) => value === 'None'),
);
check('Free Core, verified student eligibility, planned paid CTAs and no local token quota');

let server;
let browser;
try {
  if (!live) {
    server = await createServer({ root, server: { host: '127.0.0.1', port: 0, strictPort: true } });
    await server.listen();
  }
  const base = live || `http://127.0.0.1:${server.httpServer.address().port}`;
  browser = await chromium.launch({
    headless: true,
    ...(process.env.NYXR_BROWSER_PATH ? { executablePath: process.env.NYXR_BROWSER_PATH } : {}),
  });
  for (const width of [390, 1366, 1650]) {
    const context = await browser.newContext({
      viewport: { width, height: 1000 },
      reducedMotion: 'reduce',
      locale: 'en-IN',
    });
    // No external navigation, checkout, analytics, or installer download in QA.
    await context.route('**/*', (route) => {
      const url = new URL(route.request().url());
      if (url.protocol === 'data:' || url.origin === base) return route.continue();
      report.blockedExternalRequests.push(url.origin);
      return route.abort();
    });
    const page = await context.newPage();
    page.on('pageerror', (error) => report.errors.push(error.message));
    const response = await page.goto(base + '/pricing/', { waitUntil: 'networkidle' });
    check(`${width}: pricing route loads`, response.status() === 200);
    await page.evaluate(() => document.fonts.ready);
    assert.equal(await page.locator('.nyxr-plans h1').count(), 1);
    assert.equal(await page.locator('.tier-card').count(), 4);
    assert.equal(await page.locator('.tier-card button:disabled').count(), 3);
    assert.equal(await page.locator('.nyxr-plans form, .nyxr-plans input').count(), 0);
    assert.equal(await page.locator('.tier-core a').getAttribute('href'), '/download/');
    assert.match(
      await page.locator('[data-plan="student_plus"]').innerText(),
      /Verified student eligibility required/,
    );
    assert.match(
      await page.locator('.plans-availability').first().innerText(),
      /No checkout is live/,
    );
    assert.match(await page.locator('.plans-availability').first().innerText(), /INR-only/);
    assert.equal(await page.locator('.plans-provider-details').getAttribute('open'), null);
    assert.equal(await page.locator('.plans-provider-content').isVisible(), false);
    const initialPrices = await page.locator('.tier-price strong').allTextContents();
    assert.deepEqual(initialPrices, ['₹0', '₹299', '₹149', '₹799']);
    await page.locator('.pricing-region select[aria-label="Country / region"]').selectOption('US');
    await page.locator('.pricing-region select[aria-label="Display currency"]').selectOption('USD');
    assert.deepEqual(await page.locator('.tier-price strong').allTextContents(), initialPrices);
    assert.ok(
      (await page.locator('.tier-price').allTextContents()).every((value) => value.includes('INR')),
    );
    await page.reload({ waitUntil: 'networkidle' });
    assert.equal(
      await page.locator('.pricing-region select[aria-label="Display currency"]').inputValue(),
      'USD',
    );
    assert.deepEqual(await page.locator('.tier-price strong').allTextContents(), initialPrices);
    check(
      `${width}: changing and persisting region/currency never converts prices or unlocks a plan`,
    );
    const storageBeforePreview = await page.evaluate(() => ({ ...localStorage }));
    const submissions = [];
    page.on('request', (request) => {
      if (request.method() !== 'GET' && request.method() !== 'HEAD')
        submissions.push(request.url());
    });
    for (const plan of plans) {
      await page.getByRole('button', { name: `Preview ${plan.name}`, exact: true }).click();
      assert.equal(await page.locator('.plans-preview').getAttribute('data-preview-plan'), plan.id);
      assert.match(
        await page.locator('.plans-preview-banner').innerText(),
        /Preview only — no subscription or charge/,
      );
      assert.match(
        await page.locator('.plans-preview-price').innerText(),
        new RegExp(`₹${plan.price}`),
      );
      const limits = await page.locator('.plans-preview-limits').innerText();
      if (!plan.available) {
        assert.match(limits, /5 GB planned/);
        assert.match(limits, /3 devices planned/);
        assert.match(limits, /30 days planned/);
      } else {
        assert.match(limits, /Not included/);
        assert.doesNotMatch(limits, /0 GB|1 device/);
      }
      assert.equal(await page.locator('.tier-card button:disabled').count(), 3);
    }
    assert.deepEqual(await page.evaluate(() => ({ ...localStorage })), storageBeforePreview);
    assert.deepEqual(submissions, []);
    await page.reload({ waitUntil: 'networkidle' });
    assert.equal(await page.locator('.plans-preview').getAttribute('data-preview-plan'), 'core');
    check(
      `${width}: preview switches all four tiers locally, preserves eligibility/disabled billing and resets on reload without storage writes or submissions`,
    );
    const geometry = await page.evaluate(() => ({
      width: innerWidth,
      pageWidth: document.documentElement.scrollWidth,
      cards: [...document.querySelectorAll('.tier-card')].map((element) => {
        const box = element.getBoundingClientRect();
        return {
          left: box.left,
          right: box.right,
          width: box.width,
          scrollWidth: element.scrollWidth,
          clientWidth: element.clientWidth,
        };
      }),
      matrix: {
        width: document.querySelector('.plans-matrix-scroll').clientWidth,
        scrollWidth: document.querySelector('.plans-matrix-scroll').scrollWidth,
      },
    }));
    assert.ok(geometry.pageWidth <= width + 1, `Page overflow at ${width}: ${geometry.pageWidth}`);
    assert.ok(
      geometry.cards.every(
        (card) =>
          card.left >= 0 && card.right <= width + 1 && card.scrollWidth <= card.clientWidth + 1,
      ),
    );
    if (width === 390) {
      assert.ok(geometry.matrix.scrollWidth > geometry.matrix.width);
      await page.locator('.plans-matrix-scroll').focus();
      await page.keyboard.press('ArrowRight');
      await page.waitForTimeout(150);
      assert.ok(
        await page.locator('.plans-matrix-scroll').evaluate((element) => element.scrollLeft > 0),
      );
      await page.locator('.plans-matrix-scroll').evaluate((element) => {
        element.scrollLeft = 0;
      });
    }
    check(`${width}: cards fit and comparison scroll stays inside its keyboard-accessible region`);
    const accessibility = await new AxeBuilder({ page })
      .include('.nyxr-plans')
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
    assert.deepEqual(
      accessibility.violations.map((item) => ({
        id: item.id,
        nodes: item.nodes.map((node) => node.target),
      })),
      [],
      `Pricing accessibility at ${width}`,
    );
    check(`${width}: pricing accessibility scan has no WCAG A/AA violations`);
    await page.evaluate(() => scrollTo(0, 0));
    await page.screenshot({ path: resolve(output, `plans-${width}.png`), fullPage: true });
    await page.locator('.plans-grid').screenshot({ path: resolve(output, `cards-${width}.png`) });
    await page.locator('.plans-provider-details > summary').click();
    assert.equal(await page.locator('.plans-provider-content').isVisible(), true);
    assert.equal(await page.locator('.allowance-row').count(), 13);
    assert.ok(await page.locator('.ecosystem-attribution a').getAttribute('href'));
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
    await page.getByRole('button', { name: 'Trials, billing & local', exact: true }).click();
    assert.ok((await page.locator('.allowance-row').count()) > 0);
    check(`${width}: sourced provider disclosure and filters still work without page overflow`);
    await page.locator('.plans-provider-details > summary').click();
    await page.locator('.tier-core a').click();
    await page.waitForURL('**/download/');
    assert.equal(await page.locator('.download-page h1').count(), 1);
    assert.ok(await page.locator('article[aria-labelledby="release-title"]').isVisible());
    check(`${width}: Core CTA reaches the existing download page`);
    for (const path of ['/privacy/', '/terms/']) {
      await page.goto(base + path, { waitUntil: 'networkidle' });
      const legal = await page.locator('main').innerText();
      assert.match(legal, /not configured|no checkout/);
      assert.match(
        legal,
        path === '/privacy/' ? /opt-in encrypted cloud backup/ : /billing is INR-only/,
      );
      if (path === '/terms/') assert.match(legal, /Core stays free/);
    }
    check(`${width}: privacy and terms describe planned services and inactive billing`);
    await page.goto(base + '/', { waitUntil: 'networkidle' });
    assert.equal(await page.locator('main .nyxr-plans').count(), 0);
    assert.equal(await page.locator('main h1').count(), 1);
    const leaked = await page
      .locator('main')
      .evaluate((element) =>
        [...element.querySelectorAll('*')].some((node) => node.classList.contains('tier-card')),
      );
    assert.equal(leaked, false);
    check(`${width}: homepage identity and route remain intact`);
    report.viewports.push(geometry);
    await context.close();
  }
  assert.deepEqual(report.errors, []);
  check('No browser runtime errors');
} finally {
  await browser?.close();
  await server?.close();
  await writeFile(resolve(output, 'results.json'), JSON.stringify(report, null, 2) + '\n');
}
