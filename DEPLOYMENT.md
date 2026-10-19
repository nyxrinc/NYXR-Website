# NYXR website on Vercel

This is the website source, not the desktop application. Use Node 24 and `npm ci`.
Keep installers in release asset storage, outside this repository's tracked source and Vercel deployment.

## Current status

The website builds locally. **No live Vercel deployment or public installer upload has been verified.**
The existing `4.0.0-beta.1` installer is unsigned and was built for private testing.
Its matching Stockfish source/provenance and dependency notices have not been completed.
Do not upload that private artifact as a public release. `release/beta.json` deliberately has
`distributionReady: false`; adding URLs alone cannot make it downloadable.

Website publication and desktop stable release are separate. A publicly downloadable beta
may describe limited features honestly, but must still include the matching source and
required redistribution notices. Do not mark the desktop's production release gates passed.

## 1. Publish reviewed beta assets

Use GitHub Releases in `https://github.com/nyxrinc/NYXR-Website` (or a permanent HTTPS object store).
GitHub release assets accommodate the approximately 538 MB installer; do not commit the EXE
to Git or copy it into `public/`. Vercel serves the small website and links directly to the asset.

After the redistribution review and corrected build, create an immutable **pre-release** tag,
such as `v4.0.0-beta.2` if the current binary changes. Upload:

- The reviewed Windows x64 installer.
- A matching `NYXR-source-VERSION.zip`, including corresponding third-party source/notices
  and reproducible build instructions as required by the bundled components.
- `SHA256SUMS.txt` and release notes covering unsigned status, prerequisites, tested scope,
  unavailable hosted accounts, manual Chrome extension setup and known issues.

Keep installer/source assets at the same release version. Do not overwrite an already published
binary under an existing version. Update `release/beta.json` with the actual filenames, exact
byte sizes and SHA-256 values; set the publication date and `distributionReady: true` only
after the review is complete. Do not reuse the old private build's hashes for a rebuilt installer.

## 2. Vercel project settings

Import `nyxrinc/NYXR-Website`. For the prepared standalone website repository:

| Setting | Value |
|---|---|
| Root Directory | repository root (`.`) |
| Framework | Vite |
| Node.js | 24.x |
| Install | `npm ci` |
| Build | `npm run build:vercel` |
| Output | `dist` |

If importing a repository that also contains the desktop app, set Root Directory to
`NYXR Website`, **never** to the desktop repository root. Do not enable source files outside
the root directory. `vercel.json` supplies build, output, headers and URL normalization.

Add these **public configuration** values under the Vercel project's Environment Variables:

```text
NYXR_BETA_INSTALLER_URL=https://github.com/nyxrinc/NYXR-Website/releases/download/vVERSION/NYXR-Setup-VERSION-x64.exe
NYXR_BETA_SOURCE_URL=https://github.com/nyxrinc/NYXR-Website/releases/download/vVERSION/NYXR-source-VERSION.zip
NYXR_SITE_URL=https://YOUR-ACTUAL-PRODUCTION-DOMAIN
```

Replace placeholders with real published URLs; never put provider keys, account credentials,
Vercel tokens, signed URL tokens or desktop data in these fields. `NYXR_SITE_URL` is optional
until a domain exists. It generates correct canonical, social-image and sitemap URLs.
Apply it only to Production so preview pages do not claim preview domains as canonical.

**Production builds intentionally fail** while the beta is not distribution-ready or either
asset is missing/unreachable. Preview builds can render the honest unavailable state while
the release is prepared. This prevents publishing a broken or fictional download.

## 3. Verify before production

```text
npm ci
npm run test:deployment
npm run build
npm run qa:deployment
npm run check:release -- --full
npm run build:release
```

`check:release -- --full` streams both actual public assets and checks every byte against
the configured hashes without running them. It can transfer over 538 MB. The normal Vercel
build uses a two-byte range probe with total file size and file-signature checks, avoiding
a full installer download on each build. Requests have bounded timeouts.

`qa:deployment` uses isolated Chromium. Install Playwright Chromium if needed. It checks
actual built directory pages and 404s, and uses a **harmless binary fixture** to exercise the
available download UI. That fixture test does not prove a public asset or Vercel deployment works.

After a Vercel Preview deployment:

1. Open `/`, `/download/`, `/students/`, `/slideshows/`, `/pricing/`, `/privacy/` and `/terms/`
   directly; refresh each. Check desktop and mobile navigation.
2. Check an unknown path and `/assets/missing.js` return real 404 responses, not a 200 home page.
3. Confirm the reviewed beta link downloads the EXE rather than HTML or a sign-in screen.
4. Compare the downloaded SHA-256; verify source and checksum links too.
5. Inspect headers, screenshots, browser errors and canonical URLs on the deployed origin.
6. Promote the tested deployment to Production and repeat the live download check.

No catch-all rewrite is needed: the build emits a directory index for every supported route.
Avoid `/(.*) -> /index.html`; it can conceal broken assets and download URLs as successful pages.

## Data protection and rollback

The allowlisted deployment contains only `src`, public showcase assets, build tools and release
metadata. `.capture-data`, `.capture-frames`, QA output, caches, node_modules, credentials,
desktop state, installers and source archives are excluded. `verify-build.mjs` rejects unexpected
files, oversized assets and missing page entries. No analytics or live AI service was added.

Use Vercel's previous known-good deployment to roll back the website. Never delete or replace
release assets that users have already downloaded. Publish a new beta version to fix a binary.

References: [Vercel limits](https://vercel.com/docs/limits),
[Vite on Vercel](https://vercel.com/docs/frameworks/frontend/vite),
[GitHub Releases](https://docs.github.com/en/repositories/releasing-projects-on-github/about-releases).
