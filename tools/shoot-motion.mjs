// Screenshots of the new motion sections (desktop + phone) and console errors.
// Usage: node tools/shoot-motion.mjs <outDir>
import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFile, stat, mkdir } from 'node:fs/promises';
import { extname, resolve } from 'node:path';

const out = resolve(process.argv[2] || 'qa/motion');
await mkdir(out, { recursive: true });
const root = resolve('dist');
const server = createServer(async (req, res) => {
  let path = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  if (path.endsWith('/')) path += 'index.html';
  try {
    const file = resolve(root, '.' + path);
    if (!(await stat(file)).isFile()) throw 0;
    const type = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png' }[extname(file)] || 'application/octet-stream';
    res.writeHead(200, { 'content-type': type });
    res.end(await readFile(file));
  } catch {
    res.writeHead(404);
    res.end();
  }
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const base = `http://127.0.0.1:${server.address().port}`;
const store = resolve(process.env.LOCALAPPDATA, 'ms-playwright', 'chromium_headless_shell-1243', 'chrome-headless-shell-win64', 'chrome-headless-shell.exe');
const browser = await chromium.launch({ executablePath: store });
const errors = [];
for (const [name, viewport] of [['desktop', { width: 1440, height: 900 }], ['phone', { width: 390, height: 844 }]]) {
  const page = await browser.newPage({ viewport });
  page.on('console', (m) => m.type() === 'error' && errors.push(name + ': ' + m.text()));
  page.on('pageerror', (e) => errors.push(name + ': ' + e.message));
  await page.goto(base + '/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(3500); // splash
  for (const [label, selector, offset] of [
    ['speak', '.speak-strip', -80],
    ['statements', '.statement-reveal', 160],
    ['words', '.word-reveal', 120],
    ['stats', '.stat-counters', -200],
    ['marquee', '.say-marquee', -60],
    ['how', '.how-it-works', -60],
    ['footer', '.site-footer', 0],
  ]) {
    await page.evaluate(([sel, off]) => {
      const el = document.querySelector(sel);
      if (el) scrollTo(0, el.getBoundingClientRect().top + scrollY + off);
    }, [selector, offset]);
    await page.waitForTimeout(label === 'stats' ? 1700 : 900);
    await page.screenshot({ path: resolve(out, `${name}-${label}.png`) });
  }
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
  if (overflow > 1) errors.push(`${name}: horizontal overflow ${overflow}px`);
  await page.close();
}
await browser.close();
server.close();
console.log(errors.length ? 'PROBLEMS\n' + errors.join('\n') : 'NO_CONSOLE_ERRORS');
