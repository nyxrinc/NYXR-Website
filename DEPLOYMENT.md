# NYXR website on Vercel

This is the website source, not the desktop application. Use Node 24 and `npm ci`.
Keep installers in release asset storage, outside this repository's tracked source and Vercel deployment.

## Deployment and release model

Production domain: https://nyxr-website.vercel.app
Repository: https://github.com/nyxrinc/NYXR-Website

`release/beta.json` is the authoritative version, size, SHA-256 and public asset
record. Downloads require `distributionReady: true` plus installer and matching
source URLs. The build probes both public assets before publishing Production.
A previous protected preview is not evidence that Production is publicly reachable.

The current limited Windows beta is **unsigned**. Hosted NYXR accounts/email
verification, Chrome Web Store distribution, physical voice tests and clean-laptop
acceptance are separate from the executed local fixture checks. The beta includes
manual extension files; user provider credentials or an explicitly selected local
model power the app. NYXR does not include AI credits.

Website publication and desktop stable release are separate. Do not mark the
desktop's signing, clean-machine or production-service gates passed just because
a limited beta download is available. Matching source and dependency-source parts,
notices, release notes and the exact-artifact acceptance record accompany each beta.

## 1. Publish reviewed beta assets

Use GitHub Releases in `https://github.com/nyxrinc/NYXR-Website` (or a permanent HTTPS object store).
GitHub release assets host the large Windows installer; do not commit the EXE
to Git or copy it into `public/`. Vercel serves the small website and links directly to the asset.

After the redistribution review and corrected build, create an immutable **pre-release** tag,
such as `v4.0.0-beta.3` for the NEXUS update. Upload:

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

The public installer/source URLs normally live in `release/beta.json`. These
optional **public configuration** overrides can replace them; never put credentials
in a release URL. Set `NYXR_SITE_URL` for Production (already configured for this
project) so canonical/social links and the sitemap use the public domain:

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
the configured hashes without running them. It can transfer about 630 MB. The normal Vercel
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

## 5. Verify the real public download

After production deployment, run from the website root:

```powershell
$env:NYXR_LIVE_URL = 'https://nyxr-website.vercel.app'
npm run qa:download-live
```

This downloads the actual installer through the public button without executing
it, verifies filename, size, executable signature and full SHA-256, verifies the
complete app-source download, checks all public pages and real 404s, and captures
desktop/mobile screenshots. Review those images before claiming visual QA passed.
Results and downloaded artifacts stay under ignored `qa/live-download/` and must
never enter a deployment. This transfer is about 630 MB. The dependency-source
bundle is separately available on the same versioned GitHub release.

Keep actual publication receipts and acceptance results with their exact build;
commands in this document are instructions, not a claim they passed. The GitHub
release's `BETA_ACCEPTANCE.json` describes the executed desktop fixture scope.
