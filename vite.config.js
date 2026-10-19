import { defineConfig, loadEnv } from 'vite';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pages } from './src/data/pages.js';
import { createRelease, readRelease, siteOrigin } from './tools/release-config.mjs';

function staticPageEntries(release, origin) {
  let output;
  const escape = (value) =>
    value
      .replaceAll('&', '&amp;')
      .replaceAll('"', '&quot;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;');
  return {
    name: 'nyxr-static-pages',
    apply: 'build',
    configResolved(config) {
      output = resolve(config.root, config.build.outDir);
    },
    async closeBundle() {
      let html = await readFile(resolve(output, 'index.html'), 'utf-8');
      if (origin) {
        html = html.replaceAll(
          'content="/og-cover.png"',
          `content="${escape(origin)}/og-cover.png"`,
        );
        html = html.replace(
          '</head>',
          `  <link rel="canonical" href="${escape(origin)}/" />\n  </head>`,
        );
        await writeFile(resolve(output, 'index.html'), html, 'utf-8');
      }
      for (const page of pages.filter((p) => p.path !== '/')) {
        const folder = resolve(output, page.path.slice(1));
        const title = escape(`${page.label} — NYXR`);
        const description = escape(page.description);
        let pageHtml = html
          .replace(/<title>.*?<\/title>/s, `<title>${title}</title>`)
          .replace(
            /(<meta\s+(?:name|property)="(?:description|og:description|twitter:description)"\s+content=")[^"]*(")/g,
            `$1${description}$2`,
          )
          .replace(
            /(<meta\s+(?:name|property)="(?:og:title|twitter:title)"\s+content=")[^"]*(")/g,
            `$1${title}$2`,
          )
          .replace(/<link[^>]*rel="preload"[^>]*dashboard\.webp[^>]*>/g, '');
        if (origin)
          pageHtml = pageHtml.replace(
            `rel="canonical" href="${escape(origin)}/"`,
            `rel="canonical" href="${escape(origin + page.path)}"`,
          );
        await mkdir(folder, { recursive: true });
        await writeFile(resolve(folder, 'index.html'), pageHtml, 'utf-8');
      }
      await writeFile(
        resolve(output, '404.html'),
        html
          .replace(/<title>.*?<\/title>/s, '<title>Page not found — NYXR</title>')
          .replace(/<link rel="canonical"[^>]*>/g, '')
          .replace('</head>', '<meta name="robots" content="noindex" /></head>'),
        'utf-8',
      );
      await writeFile(
        resolve(output, 'beta-release.json'),
        JSON.stringify(release, null, 2) + '\n',
        'utf-8',
      );
      if (release.available)
        await writeFile(
          resolve(output, 'beta-SHA256SUMS.txt'),
          [release.installer, release.source]
            .map((asset) => `${asset.sha256}  ${asset.filename}`)
            .join('\n') + '\n',
          'utf-8',
        );
      await writeFile(
        resolve(output, 'robots.txt'),
        `User-agent: *\nAllow: /\n${origin ? `Sitemap: ${origin}/sitemap.xml\n` : ''}`,
        'utf-8',
      );
      if (origin)
        await writeFile(
          resolve(output, 'sitemap.xml'),
          `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.map((page) => `  <url><loc>${escape(origin + page.path)}</loc></url>`).join('\n')}\n</urlset>\n`,
          'utf-8',
        );
    },
  };
}

export default defineConfig(async ({ mode }) => {
  const env = { ...loadEnv(mode, process.cwd(), 'NYXR_'), ...process.env };
  const release = createRelease(await readRelease(), env);
  const origin = siteOrigin(env);
  return {
    define: { __NYXR_BETA_RELEASE__: JSON.stringify(release) },
    plugins: [staticPageEntries(release, origin)],
    server: {
      host: '127.0.0.1',
      watch: {
        ignored: ['**/.capture-data/**', '**/.capture-frames/**', '**/qa/**'],
      },
    },
    preview: { host: '127.0.0.1' },
  };
});
