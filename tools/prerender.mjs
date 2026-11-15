// Makes every page readable without JavaScript.
//
// The site is a React app: before this step each page's HTML was an empty
// <div id="root"></div>, so AI readers and link previews that do not run
// JavaScript (Gemini, ChatGPT browsing, Slack, WhatsApp...) saw nothing.
//
// 1. Always: write dist/llms.txt, a plain-text guide to the site for AI tools.
// 2. When a local browser exists (Playwright's Chromium, Chrome or Edge): open
//    each built page with reduced motion and copy the rendered page into its
//    index.html. The browser app still starts as usual and replaces that copy.
//
// Each local render is also saved to prerender/snapshots.json.gz with a
// fingerprint of the source. A build machine without a browser (Vercel's)
// reuses those snapshots only when the fingerprint matches exactly, so the
// pre-filled HTML can never show out-of-date text; otherwise it skips with a
// note and the site still works, just without the pre-filled HTML.
import { createServer } from 'node:http';
import { createHash } from 'node:crypto';
import { gzipSync, gunzipSync } from 'node:zlib';
import { mkdir, readdir, readFile, writeFile, stat } from 'node:fs/promises';
import { extname, resolve, normalize, relative, sep } from 'node:path';
import { pages } from '../src/data/pages.js';

const root = resolve('dist');
const origin = (process.env.NYXR_SITE_ORIGIN || 'https://nyxr-website.vercel.app').replace(/\/$/, '');
const FULL_FORM = 'Natural-language eXecution & Reasoning';
const SNAPSHOTS = resolve('prerender', 'snapshots.json.gz');
const TEXT_FILE = /\.(jsx?|mjs|css|html|json|txt|svg|md)$/i;

// Same answer on Windows (CRLF checkout) and Linux (LF): text line endings are normalised.
export async function sourceFingerprint() {
  const files = [];
  async function walk(folder) {
    for (const entry of await readdir(folder, { withFileTypes: true }).catch(() => [])) {
      const path = resolve(folder, entry.name);
      if (entry.isDirectory()) await walk(path);
      else files.push(path);
    }
  }
  for (const folder of ['src', 'public']) await walk(resolve(folder));
  files.push(resolve('index.html'), resolve('vite.config.js'), resolve('package-lock.json'), resolve('release', 'beta.json'));
  const hash = createHash('sha256');
  for (const file of files.sort()) {
    const name = relative(resolve('.'), file).split(sep).join('/');
    let data = await readFile(file).catch(() => null);
    if (data === null) continue;
    if (TEXT_FILE.test(name)) data = Buffer.from(data.toString('utf8').split('\r\n').join('\n'));
    hash.update(name).update('|').update(data).update('|');
  }
  return hash.digest('hex');
}

async function fill(file, html) {
  const shell = await readFile(file, 'utf8');
  if (!shell.includes('<div id="root"></div>')) return false;
  await writeFile(file, shell.replace('<div id="root"></div>', `<div id="root">${html}</div>`), 'utf8');
  return true;
}

async function fromSnapshots(reason) {
  try {
    const saved = JSON.parse(gunzipSync(await readFile(SNAPSHOTS)).toString('utf8'));
    if (saved.fingerprint !== (await sourceFingerprint())) {
      console.log(
        `Pre-render skipped (${reason}); saved snapshots are for different source. ` +
          'Run npm run build on a PC with Chrome to refresh them.',
      );
      return;
    }
    let done = 0;
    for (const page of pages) {
      const html = saved.pages[page.path];
      if (html && (await fill(resolve(root, '.' + page.path, 'index.html'), html))) done++;
    }
    console.log(`Pre-rendered ${done} pages from saved snapshots (source fingerprint matches).`);
  } catch (error) {
    console.log(`Pre-render skipped (${reason}); no usable snapshots: ${String(error.message).split('\n')[0]}`);
  }
}

async function writeLlms() {
  const groups = {};
  for (const page of pages) (groups[page.group || 'Pages'] ||= []).push(page);
  const lines = [
    '# NYXR',
    '',
    `> NYXR (${FULL_FORM}) is a Windows desktop AI assistant: one living core for chat, voice,`,
    '> coding, Game Studio, Student study tools, music, pictures, computer control and an Android',
    '> companion. It works with the AI plans already signed in on your PC (Claude, Codex,',
    '> Antigravity/Gemini) or 15+ cloud providers with your own key.',
    '',
    'Every page below is plain HTML: no JavaScript is needed to read it.',
    '',
  ];
  for (const [group, items] of Object.entries(groups)) {
    lines.push(`## ${group}`, '');
    for (const page of items) lines.push(`- [${page.label}](${origin}${page.path}): ${page.description || ''}`.trim());
    lines.push('');
  }
  await writeFile(resolve(root, 'llms.txt'), lines.join('\n'), 'utf8');
  console.log('Wrote dist/llms.txt');
}

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.woff2': 'font/woff2',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.txt': 'text/plain',
};

function serve() {
  const server = createServer(async (request, response) => {
    try {
      let path = decodeURIComponent(new URL(request.url, 'http://x').pathname);
      if (path.endsWith('/')) path += 'index.html';
      const file = normalize(resolve(root, '.' + path));
      if (!file.startsWith(root + sep)) throw new Error('outside');
      const info = await stat(file);
      if (!info.isFile()) throw new Error('not a file');
      response.writeHead(200, { 'content-type': TYPES[extname(file)] || 'application/octet-stream' });
      response.end(await readFile(file));
    } catch {
      response.writeHead(404, { 'content-type': 'text/plain' });
      response.end('not found');
    }
  });
  return new Promise((done) => server.listen(0, '127.0.0.1', () => done(server)));
}

// Playwright's own browser first; otherwise any Chromium already downloaded
// by another Playwright version, then installed Chrome/Edge (a fresh,
// temporary headless profile, never the user's own).
async function launch(chromium) {
  if (process.env.NYXR_PRERENDER_BROWSER === 'off') return null;
  const tries = [{}];
  const store =
    process.env.PLAYWRIGHT_BROWSERS_PATH ||
    (process.env.LOCALAPPDATA && resolve(process.env.LOCALAPPDATA, 'ms-playwright'));
  if (store) {
    const folders = (await readdir(store).catch(() => [])).sort().reverse();
    for (const folder of folders) {
      for (const exe of [
        'chrome-headless-shell-win64/chrome-headless-shell.exe',
        'chrome-win64/chrome.exe',
        'chrome-win/chrome.exe',
        'chrome-linux/chrome',
        'chrome-headless-shell-linux64/chrome-headless-shell',
      ]) {
        const path = resolve(store, folder, exe);
        if (await stat(path).then((info) => info.isFile()).catch(() => false)) tries.push({ executablePath: path });
      }
    }
  }
  tries.push({ channel: 'chrome' }, { channel: 'msedge' });
  let last = '';
  for (const options of tries) {
    try {
      return await chromium.launch({ headless: true, ...options });
    } catch (error) {
      last = String(error.message).split('\n')[0];
    }
  }
  console.log('No local Chromium (' + last + ').');
  return null;
}

async function prerender() {
  let chromium;
  try {
    ({ chromium } = await import('playwright'));
  } catch {
    return fromSnapshots('Playwright is not installed');
  }
  const browser = await launch(chromium);
  if (!browser) return fromSnapshots('no local browser');
  const server = await serve();
  const base = `http://127.0.0.1:${server.address().port}`;
  const snapshots = {};
  let done = 0;
  try {
    const context = await browser.newContext({ reducedMotion: 'reduce', viewport: { width: 1440, height: 900 } });
    const tab = await context.newPage();
    for (const page of pages) {
      const file = resolve(root, '.' + page.path, 'index.html');
      await tab.goto(base + page.path, { waitUntil: 'networkidle' });
      await tab.waitForSelector('#root main', { timeout: 15000 });
      const html = await tab.evaluate(() => {
        const copy = document.getElementById('root').cloneNode(true);
        // Reveal state, dialogs and live media are browser-only.
        copy.querySelectorAll('[data-reveal-state]').forEach((node) => node.removeAttribute('data-reveal-state'));
        copy.querySelectorAll('dialog[open], [role="dialog"]').forEach((node) => node.remove());
        copy.querySelectorAll('video').forEach((node) => node.removeAttribute('autoplay'));
        return copy.innerHTML;
      });
      if (!html.includes('<main')) throw new Error('No page content rendered for ' + page.path);
      if (await fill(file, html)) {
        snapshots[page.path] = html;
        done++;
      }
    }
  } finally {
    await browser.close();
    server.close();
  }
  await mkdir(resolve('prerender'), { recursive: true });
  const fingerprint = await sourceFingerprint();
  await writeFile(SNAPSHOTS, gzipSync(JSON.stringify({ fingerprint, pages: snapshots }), { level: 9 }));
  console.log(`Pre-rendered ${done} pages as readable HTML; snapshots saved for remote builds.`);
}

await writeLlms();
await prerender();
