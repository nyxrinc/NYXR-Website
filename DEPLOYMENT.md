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

## Android companion release contract

### Separate Exhibition Test channel — beta 5

`src/data/exhibition-release.json` controls only `/download/#exhibition-test`.
It is committed as unavailable, with `apk: null`, `source: null` and no invented
hashes or hosted URLs. The setup instructions live at `/guide/#exhibition-test`;
Phone and Updates link to this separate channel. Public beta 3 and the public
companion/candidate gates remain independent and unchanged.

The integration owner publishes the real assets before filling this descriptor.
For version `4.0.0-beta.5`, use immutable tag `exhibition-4.0.0-beta.5` and:

- `apk.filename`: `NYXR-Exhibition-4.0.0-beta.5.apk`.
- `source.filename`: `NYXR-Exhibition-source-4.0.0-beta.5.zip`, containing matching
  source, notices and build instructions. The PC must run the updated repository;
  this source link does not make the public beta 3 installer compatible.
- Both assets require their actual positive integer `bytes`, lowercase 64-digit
  `sha256` and permanent public HTTPS `url` ending in `/TAG/FILENAME`.
- `apk.signingCertificateSha256` is the actual signing certificate fingerprint.
  Set `apk.signatureVerified: true` and top-level `signed: true` only after the
  Android owner verifies the exact APK signature with Android build tools.
- Keep `schemaVersion: 1`, `channel: "exhibition-test"`, `minAndroid: 10` and
  `applicationId: "com.nyxr.companion.exhibition"`. Set `available: true` only
  after the exact signed APK and matching source are actually hosted.

The normalizer rejects malformed identities, mismatched tags/filenames, missing
signing evidence, invalid sizes/hashes and unsafe URLs (including local/private
IP addresses, credentials, query strings, fragments, escapes and mutable links).
Unavailable records expose no APK/source metadata. Only projected public fields
enter the bundle and separate `dist/exhibition-release.json`; it never enters
`beta-release.json` or the public beta checksum list. Build verification checks
this independent manifest. Production/release builds and `check:release` fully
verify both exhibition assets against their hashes when this channel is enabled.
The website does not perform Android signature verification itself.

Exhibition availability is testing readiness, not physical-device acceptance.
Both desktop and phone must opt in. The current PC must close NYXR and restart
the updated repository's `run_nyxr.bat`, then enable **Local exhibition testing**
in Phone settings. No account is required for the local 30 test actions per UTC
day; this grants no premium entitlement. Communication simulation stays ON by
default; permissions and exact confirmations remain required. Start with battery,
listing apps and media volume. Never claim a real call/message or physical test
passed from a simulated receipt or website fixture.

Run `npm run test:release-gating`, `npm run build` and `npm run qa:exhibition`.
The unit/browser fixture uses complete synthetic hosted metadata and intercepted
harmless bytes, without altering the descriptor or fetching an actual APK. It
checks unavailable/available UI states, checksums, links, download filenames,
accessibility, mobile/desktop overflow and preservation of production gates.
Screenshots and the scope-labeled report stay in ignored `qa/exhibition-test/`.
To use a specific installed headless Chromium, set `NYXR_BROWSER_PATH`.
These local checks do not authorize deployment or supply physical acceptance.

### Website refresh — 27 October 2026

The website now includes `/phone/` and `/updates/`, a Home phone-workflow
illustration, and a download hub with platform jump links. All illustrations are
labeled as examples rather than live device activity. The published Windows
beta remains separate from beta 4 candidates.

`src/data/candidate-release.json` records the exact locally built Windows and
signed Android beta 4 identities, sizes and checksums. It deliberately contains
no download URLs or entitlement switches. Candidate details do not activate the
companion release gate. Do not turn local build evidence into physical-device
acceptance. Use the existing `release/beta.json` companion contract below to
publish a verified pair after production configuration and release acceptance.

Run `npm run qa:refresh` for the new pages, interactive phone examples, checksum
disclosure, disabled candidate buttons, accessibility and desktop/mobile layout.
The release-gating test command also compares candidate metadata with the local
artifact receipt when available. That local receipt is not included in the
standalone website repository.

The current Windows release record is unchanged and does **not** declare phone
support. The Android card stays disabled. No APK version, URL, size, hash or signing
certificate has been invented. Do not add these fields until the Android and
desktop release owners supply verified artifacts and the parent integration owner
has checked the matching metadata. Local website fixture results are not hardware
acceptance, an APK signing check or approval to publish.

The optional `companion` object lives in the existing `release/beta.json`; absence
or `null` keeps Windows working. Its v1 fields are:

| Field | Required value / evidence |
|---|---|
| `schemaVersion` | `1` |
| `channel` | `private-beta` |
| `minAndroid` | `10` (API 29) |
| `version` | Actual APK semver, optionally suffixed `-beta.N` |
| `signed`, `distributionReady` | Literal `true` only after signing and distribution review |
| `apk.filename` | `NYXR-Companion-VERSION.apk`, matching the actual APK version |
| `apk.bytes`, `apk.sha256` | Positive integer byte count and lowercase 64-digit SHA-256 of the exact signed APK |
| `apk.url` | Permanent public HTTPS asset URL ending in its filename; no credentials, query, fragment or mutable `releases/latest` link |
| `apk.signingCertificateSha256` | Lowercase 64-digit SHA-256 fingerprint of the actual release signing certificate |
| `apk.signatureVerified` | Literal `true` after the Android owner runs Android build-tools `apksigner verify --verbose --print-certs` against these exact bytes; a ZIP prefix is not signing evidence |
| `desktop.version`, `desktop.installerSha256` | Exact version and installer hash of the updated desktop release in this same manifest |
| `desktop.protocolVersion` | Positive integer matching the desktop's `phoneCompanion.protocolVersion` |
| `hardwareAcceptance.passed` | Literal `true` after physical-device acceptance of this exact pair |
| `hardwareAcceptance.device` | Actual Motorola manufacturer/model description |
| `hardwareAcceptance.androidApiLevel` | Actual integer API level, at least 29 |
| `hardwareAcceptance.testedAt` | Actual ISO timestamp of hardware acceptance |
| `hardwareAcceptance.apkSha256` | Exact signed APK SHA-256 |
| `hardwareAcceptance.desktopInstallerSha256` | Exact updated Windows installer SHA-256 |
| `hardwareAcceptance.checks` | All checks below must be literal `true` |

The updated desktop's top-level `phoneCompanion` must contain `ready: true` and a
positive integer `protocolVersion`. Never attach that declaration to the existing
beta 3 installer merely to unlock the website. Release the actual rebuilt desktop
and matching source under a new version with their own sizes and hashes.

Physical-device acceptance checks are `same_wifi_pairing`,
`sms_notification_reply`, `whatsapp_notification_reply`,
`whatsapp_new_message_handoff`, `permission_revocation` and `quota_enforcement`.
Record real observations of the Motorola model, Android version, notification
reply availability, restricted/denied permissions and 30/day Core quota versus
verified entitlements. Test that a new WhatsApp message is handed off for phone
review/sending. PC call audio is outside the beta and must not be advertised.
Keep sanitized acceptance evidence with the exact release, outside the public
projection. Never include pairing tokens, private message content or signing keys.

Windows release readiness is independent of Android readiness. Missing readiness
flags or failed compatibility/acceptance keep Android disabled and suppress all
APK metadata/URLs in `dist/beta-release.json`. Malformed supplied asset metadata
fails validation. Only explicitly projected public fields enter the bundle.
An optional `NYXR_COMPANION_APK_URL` override changes the permanent public URL;
it cannot create an artifact or bypass any readiness check.

`npm run check:release -- --companion --full` and
`npm run build:release -- --companion` additionally require Android readiness.
Normal production Windows builds remain permitted while Android is pending.
When ready, release checks and the Vercel build stream and hash the whole APK;
Windows retains its existing lightweight probe unless `--full` is requested.
The generated checksum list includes the APK only when its gate passes. Signature
verification is an Android release-owner prerequisite; website tools verify the
declared size/hash and do not substitute for Android signing-tool verification.

APK/AAB files and signing stores are excluded from website deployment checks,
the Vercel upload allowlist and prepared source copies. Host APKs as immutable
release assets alongside the existing distribution model, not in `public/`.

### Shared pricing coordination

The server owner updates `../commerce/plans.json`. The website consumes
`src/data/plan-catalog.json`, generated by the existing
`../tools/sync_plan_catalog.py`. Confirm the source fields before syncing:
`phone_actions_per_day` and `phone_limit`; Core values are `30` and `1`, and
verified Plus, Student Plus and Teams use `null` for unlimited. Verified owners
have unlimited entitlements through the account service; owner status is not a
public purchasable tier or a browser preference. Selecting a Pricing preview
never grants an entitlement and does not enable payments.

To regenerate only the website copy without writing sibling-owned files, load
the existing generator with `sys.dont_write_bytecode = True`, restrict its
`COPIES` tuple to `('NYXR Website/src/data/plan-catalog.json',)`, and call
`sync()` followed by `sync(check=True)`. Do not edit the generated file by hand.
The complete generator remains the parent's responsibility when syncing all
desktop, server and website copies together.

### Local validation (no publishing)

Run `npm run test:deployment`, `npm run test:release-gating`, `npm run build`
and `npm run qa`. The existing deployment and NEXUS browser suites, the pricing
suite and the companion suite run isolated Chromium with local fixtures. The
companion suite captures desktop/mobile renders and accessibility checks, tests
the current blocked state, a staged-but-unaccepted APK, and a fully gated synthetic
APK download. All synthetic metadata and harmless bytes stay in test/QA files.
Review `qa/phone-companion/` screenshots before claiming visual QA. No command
here authorizes public deployment or modifies a remote service.
