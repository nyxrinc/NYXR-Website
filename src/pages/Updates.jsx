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
      <article className="update-entry latest-source-entry" id="nexus-games">
        <header><span className="release-channel">DESKTOP SOURCE BETA / NOT A NEW INSTALLER</span><time dateTime="2026-10-31">31 OCTOBER 2026</time></header>
        <h2>Nexus worlds. Inside NYXR.</h2>
        <p>Game Studio turns a prompt into an editable Nexus project using your configured AI provider.
          NYXR contains the player; Edit in Chrome opens the separate scene and script editor.</p>
        <ul><li>Play test fills the screen. Exit play test or Esc restores NYXR.</li>
          <li>Compact AI scene authoring and tested gameplay components cover coins, keys, checkpoints,
          hazards, moving platforms, doors and goals. Custom Nyx scripts remain supported.</li>
          <li>Raw output is saved before validation. Bounded repairs and hash-bound promotion protect
          the last working game. Import/export uses standard .nexus files.</li>
          <li>Bundled Three.js allows local playback. Generation uses your provider and its quota.</li></ul>
        <div className="update-evidence"><strong>Executed acceptance checks</strong><p>Three increasingly
          difficult cloud-generated games passed real-engine compilation and automated gameplay checks.
          The native Windows Qt test covered generation, play-only rendering, full-screen play, exit and
          the separate editor handoff. Nexus’s 19 existing browser regression groups also passed.</p>
          <p>Automated interaction checks are not a guarantee for every generated game or a substitute
          for reviewing a complete level. The public Windows beta 3 binary has not been rebuilt for this update.</p></div>
        <Button href="/games/" secondary>Explore Game Studio</Button>
      </article>
      <article className="update-entry" id="october-reliability">
        <header>
          <span className="release-channel">LATEST DESKTOP SOURCE / NOT A NEW INSTALLER</span>
          <time dateTime="2026-10-30">30 OCTOBER 2026</time>
        </header>
        <h2>More ways to think. Better ways to act.</h2>
        <p>
          OpenJarvis can now use explicitly selected cloud models as well as local Ollama. NYXR
          keeps its own action tools, verification and approvals.
        </p>
        <ul>
          <li>
            OpenJarvis supports OpenRouter, OpenAI, Anthropic, Google Gemini, DeepSeek and MiniMax,
            with separate cloud keys in Windows Credential Manager.
          </li>
          <li>
            Cloud and local inference are labeled separately. Saving a key or checking
            managed-service metadata does not generate a completion.
          </li>
          <li>
            Malformed browser verification plans get one bounded repair from a fresh observation
            before input starts. Profile, tab and document targeting remain explicit.
          </li>
          <li>
            Vision requests retain compatible image routes and purpose-specific deadlines across
            fallback.
          </li>
          <li>
            Background Replies adds a WhatsApp Web source beta: drafts first, explicitly scoped
            automatic sessions, typing/draft pauses, and no replay of uncertain sends.
          </li>
          <li>
            An optional ElevenLabs British assistant preset and bundled JARVIS Interface SFX add
            voice and sound choices without silently switching providers.
          </li>
        </ul>
        <div className="update-evidence">
          <strong>Checked in the source checkout</strong>
          <p>
            493 targeted checks passed across the selected integration suites. Cloud SDK requests
            used controlled responses. No real email, WhatsApp message or billable cloud inference
            was sent during those checks. This is not packaged-release or physical-device
            acceptance.
          </p>
        </div>
        <div className="update-open">
          <strong>Download versions are unchanged</strong>
          <p>
            The public Windows installer remains {betaRelease.version}. The signed Android
            Exhibition Basic tester has its own version and limited scope. The source additions
            above do not change either artifact or its checksum.
          </p>
        </div>
        <div className="button-row">
          <Button href="/openjarvis/" secondary>
            Set up OpenJarvis
          </Button>
          <a className="text-link" href="/download/#latest-source">
            Compare download versions
          </a>
          <a className="text-link" href="/guide/#background-replies">
            Background Replies setup
          </a>
        </div>
      </article>
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
          into main and project chats, plus a FreeLLMAPI saved-key refresh fix across account
          sessions. PDF attachments provide extracted text with page references; scanned PDFs need
          searchable text. These changes require the updated repository, rather than the older
          public beta 3 installer.
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
