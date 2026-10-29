import { Button, Eyebrow } from '../components/Primitives';
import { CandidateDetails, candidate } from '../components/CandidateRelease';
import { betaRelease } from '../data/release';
import {
  exhibitionRelease,
  ExhibitionScope,
  PlayProtectHelp,
} from '../components/ExhibitionRelease';

export default function Updates() {
  return (
    <section className="updates-page container">
      <Eyebrow>NYXR / RELEASE NOTES</Eyebrow>
      <h1>The core keeps evolving.</h1>
      <p className="updates-intro">
        What is available, what has been built, and what still needs to pass before it reaches your
        devices.
      </p>
      <article className="update-entry" aria-labelledby="exhibition-update-title">
        <header>
          <span className="release-channel">EXHIBITION TEST / SEPARATE LOCAL CHANNEL</span>
          <span>29 OCTOBER 2026</span>
        </header>
        <h2 id="exhibition-update-title">
          {exhibitionRelease.version} · Exhibition{' '}
          {exhibitionRelease.edition === 'basic' ? 'Basic' : 'Test'}
        </h2>
        <p>
          Exhibition Test uses a separate Android app identity and requires explicit opt-in on both
          the desktop and phone. Android 10+ and the same Wi-Fi are required. Update the repository
          on your current PC, close NYXR and restart with <code>run_nyxr.bat</code>; the public beta
          3 installer is not compatible. Enable Local exhibition testing in desktop Phone settings.
        </p>
        <p>
          No account required. The local allowance is 30 test actions per UTC day and grants no
          premium entitlement. Permissions and exact confirmations remain required. Start with
          battery, listing apps and media volume.
        </p>
        <p>
          The updated desktop and tester support five-digit, same-Wi-Fi pairing. Show a connection
          code on PC, enter it on Android and approve both screens. QR remains an alternative.
          Already paired? Reconnect instead of starting setup again.
        </p>
        <p>
          The current Windows repository also adds image, local text-file and readable PDF pasting
          into main and project chats, plus a FreeLLMAPI saved-key refresh fix across account sessions.
          PDF attachments provide extracted text with page references; scanned PDFs need searchable text.
          These changes require the updated repository, rather than the older public beta 3 installer.
        </p>
        <ExhibitionScope />
        <PlayProtectHelp />
        <div className="update-open">
          <strong>Testing, not hardware acceptance</strong>
          <p>
            Physical-device acceptance remains pending. Public companion release gates are
            unchanged.{' '}
            {exhibitionRelease.available
              ? 'The signed tester APK and corresponding source are linked in the separate download card.'
              : 'The tester download is unavailable until the signed APK and corresponding source are hosted and their exact metadata is recorded.'}
          </p>
        </div>
        <div className="button-row">
          <Button href="/download/#exhibition-test" secondary>
            Exhibition Test download &amp; status
          </Button>
          <a className="text-link" href="/guide/#exhibition-test">
            Exhibition Test setup guide
          </a>
        </div>
      </article>
      <article className="update-entry">
        <header>
          <span className="release-channel">IN TESTING / WINDOWS + ANDROID</span>
          <span>27 OCTOBER 2026</span>
        </header>
        <h2>{candidate.version} · Your phone joins the orbit.</h2>
        <p>
          A signed Android 10+ companion and matching Windows candidate have been built locally.
          Same-Wi-Fi pairing uses pinned TLS, short-lived setup links and approval on both devices.
        </p>
        <ul>
          <li>Phone commands join normal chat, F8 and F11 instead of a separate chatbot.</li>
          <li>Contact/SIM clarification and exact confirmations for outgoing actions.</li>
          <li>
            Supported notifications, media, apps, controls, productivity handoffs and selected
            files.
          </li>
          <li>Durable command receipts and protection against repeating uncertain sends.</li>
          <li>
            Core’s 30-action daily policy and verified premium entitlements; payments remain
            inactive.
          </li>
        </ul>
        <div className="update-evidence">
          <strong>Checked locally</strong>
          <p>
            535 Python tests, 36 Android JVM tests, 72 account-service tests and packaged desktop
            checks passed. These are automated and controlled checks, not real Motorola acceptance.
          </p>
        </div>
        <div className="update-open">
          <strong>Still required</strong>
          <p>
            Production account setup and trusted allowance keys, physical Motorola/instrumentation
            testing, clean Windows acceptance, final redistribution review, Windows signing and
            public artifact hosting. Phone execution is disabled without the account/key
            configuration.
          </p>
        </div>
        <CandidateDetails platform="windows" />
        <CandidateDetails platform="android" />
        <div className="button-row">
          <Button href="/download/#next-desktop" secondary>
            Build & download status
          </Button>
          <a className="text-link" href="/phone/">
            Explore phone capabilities
          </a>
        </div>
      </article>
      <article className="update-entry">
        <header>
          <span className="release-channel">CURRENT PUBLIC WINDOWS BETA</span>
          <span>25 OCTOBER 2026</span>
        </header>
        <h2>{betaRelease.version} · The heart of NYXR.</h2>
        <p>
          NEXUS brings the animated core back to the command center. Write for me, the F11 dock,
          skippable first-launch setup and upgrade backups accompany the existing coding, voice,
          Student and Macro workflows.
        </p>
        <p>
          This unsigned early-access Windows build does not include the phone companion. Bring your
          own AI connection or deliberately choose an installed local Ollama model.
        </p>
        <Button href="/download/" secondary>
          Current Windows download
        </Button>
      </article>
    </section>
  );
}
