import { useState } from 'react';
import Icon from '../components/Icon';
import { Button, Eyebrow } from '../components/Primitives';
import { betaRelease as release, betaSize } from '../data/release';
import { CompanionDownload } from '../components/PhoneCompanion';
import { ExhibitionDownload } from '../components/ExhibitionRelease';
import { DownloadSourceNote } from '../components/SourceUpdates';
import { nyxr5Release as preview, nyxr5Size } from '../data/nyxr5';

function useCopy(text) {
  const [status, setStatus] = useState('');
  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setStatus('Checksum copied.');
    } catch {
      setStatus('Select the checksum below to copy it.');
    }
  }
  return [status, copy];
}

/** NYXR 5: the download. One-click installer, then a short setup inside the app. */
function Nyxr5Download() {
  const [copyStatus, copyChecksum] = useCopy(preview.installer.sha256);
  return (
    <section className="nyxr5-download" id="nyxr5-preview" aria-labelledby="nyxr5-download-title" data-reveal>
      <div className="nyxr5-download-shot">
        <img
          src="/screenshots/nyxr5-home.webp"
          alt="NYXR 5 Home in the Nemesis theme: the NYXR core in the centre with the dock below it"
          width="1600"
          height="1000"
          loading="lazy"
        />
      </div>
      <div className="nyxr5-download-copy">
        <span className="nyxr5-tag">WINDOWS · {preview.version.toUpperCase()}</span>
        <h2 id="nyxr5-download-title">
          NYXR <span className="text-cyan">5.1</span>
        </h2>
        <p>
          Homework solved from your real textbook page, answers that check their own maths and code,
          typeset equations, coding for any project type, Mission Control and a visible cursor whenever
          NYXR uses your PC, plus everything from NYXR 5. One click installs it, no admin rights
          needed; then a short setup picks your AI and tests your microphone and voice.{' '}
          <a href="/nyxr-5/">What’s new in NYXR 5.1</a>.
        </p>
        <dl className="release-details">
          <div>
            <dt>Platform</dt>
            <dd>{preview.platform}</dd>
          </div>
          <div>
            <dt>Installer</dt>
            <dd>{nyxr5Size}</dd>
          </div>
          <div>
            <dt>Channel</dt>
            <dd className="text-cyan">Release · small signed updates from now on</dd>
          </div>
        </dl>
        <Button
          href={preview.installer.url}
          download={preview.installer.filename}
          icon="download"
          data-testid="nyxr5-download"
        >
          Download NYXR 5.1
        </Button>
        <div className="release-resource-links">
          <a href={preview.source.url} download={preview.source.filename}>
            Corresponding source
          </a>
          <a
            href={`https://github.com/nyxrinc/NYXR-Website/releases/tag/${preview.tag}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Release notes
          </a>
        </div>
        <details className="release-checksum">
          <summary>Verify your download</summary>
          <p>Compare the file’s SHA-256 with this value before running it.</p>
          <code>{preview.installer.sha256}</code>
          <button type="button" onClick={copyChecksum}>
            Copy SHA-256
          </button>
          <span role="status">{copyStatus}</span>
        </details>
        <p className="release-beta-warning">
          Not yet code-signed: Windows SmartScreen may ask you to confirm (More info → Run anyway).
          It installs over NYXR 5 previews and keeps your chats and settings. NYXR 5 previews have no
          updater, so this one is a full download; after it, updates fetch only the files that changed.
        </p>
      </div>
    </section>
  );
}

/** NYXR 4 beta 6: still downloadable for anyone who needs the earlier app. */
function PreviousVersion() {
  const [copyStatus, copyChecksum] = useCopy(release.installer.sha256);
  if (!release.available) return null;
  return (
    <details className="previous-version" id="nyxr-4">
      <summary>
        <span>Previous version</span>
        <strong>NYXR {release.version}</strong>
        <small>{betaSize} · the earlier Qt app · same engine, fewer features</small>
      </summary>
      <div className="previous-body">
        <p>
          NYXR 4 is the earlier app NYXR 5 replaces. Both use the same chats and settings, so you can
          go back and forth. Most people should install NYXR 5.
        </p>
        <div className="release-resource-links">
          <a href={release.installer.url} download={release.installer.filename} data-testid="beta-download">
            Download NYXR {release.version}
          </a>
          <a href={release.source.url} download={release.source.filename}>
            Corresponding source
          </a>
          <a href="/beta-SHA256SUMS.txt" download>
            Checksums
          </a>
          <a
            href={`https://github.com/nyxrinc/NYXR-Website/releases/tag/v${release.version}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Release notes &amp; dependency sources
          </a>
        </div>
        <details className="release-checksum">
          <summary>Verify the NYXR 4 download</summary>
          <code>{release.installer.sha256}</code>
          <button type="button" onClick={copyChecksum}>
            Copy SHA-256
          </button>
          <span role="status">{copyStatus}</span>
        </details>
      </div>
    </details>
  );
}

export default function Download() {
  return (
    <section className="download-page container">
      <div className="download-copy" data-reveal>
        <Eyebrow>NYXR / DOWNLOAD</Eyebrow>
        <span className="release-status">
          <i /> NYXR 5 AVAILABLE
        </span>
        <h1>
          Your core.
          <br />
          On your <span className="text-cyan">PC.</span>
        </h1>
        <p>
          Talk through an idea, build a project, make a game or a song, learn from your PDFs or let
          NYXR do it for you, with the AI you already have or a free one.
        </p>
        <nav className="download-jump-links" aria-label="Downloads">
          <a href="#nyxr5-preview">NYXR 5 for Windows</a>
          <a href="#first-minutes">Your first minutes</a>
          <a href="#android-companion">Android companion</a>
          <a href="#exhibition-test">Exhibition Test</a>
          <a href="#nyxr-4">Previous version</a>
        </nav>
        <a className="text-link" href="/nyxr-5/">
          See what NYXR 5 can do <Icon size={16} />
        </a>
      </div>
      <Nyxr5Download />
      <div className="beta-setup" id="first-minutes" data-reveal>
        <article>
          <span>01 / INSTALL</span>
          <h3>One click.</h3>
          <p>
            Run the installer and press Install. It is for you only, so no administrator rights are
            needed, and NYXR 5 opens when it finishes.
          </p>
        </article>
        <article>
          <span>02 / YOUR AI</span>
          <h3>Pick it in one tap.</h3>
          <p>
            Already signed in to Antigravity, Claude Code or Codex? NYXR finds it. Or paste a free
            Groq, Gemini or OpenRouter key: setup links you to it, saves it securely and tests it.
          </p>
        </article>
        <article>
          <span>03 / YOUR VOICE</span>
          <h3>Hear yourself, hear NYXR.</h3>
          <p>
            A microphone check that stays on your PC, a try of voice typing, a sample of the spoken
            voice, and the hands-free bar: press F2 in any app, then hold F8 and talk.
          </p>
        </article>
        <article>
          <span>04 / STARTER QUEST</span>
          <h3>Learn it by doing.</h3>
          <p>
            Six first things to try wait in the sidebar, from “what time is it” to asking about your
            screen. Each one ticks itself off as you do it.
          </p>
          <a className="text-link" href="/updates/">
            Read release notes <Icon size={15} />
          </a>
        </article>
      </div>
      <div className="download-assets" id="android-companion">
        <CompanionDownload />
      </div>
      <ExhibitionDownload />
      <DownloadSourceNote />
      <PreviousVersion />
      <div className="release-footnote">
        <span>YOUR WORKSPACE. YOUR CHOICE.</span>
        <p>
          Windows 10/11 x64. No local AI models are included or started. Updates and uninstalling keep
          your chats, projects and settings. Need a hand? <a href="/guide/">Read the guide</a> or{' '}
          <a href="/contact/">contact NYXR</a>.
        </p>
      </div>
    </section>
  );
}
