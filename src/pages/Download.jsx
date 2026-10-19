import { useState } from 'react';
import Icon from '../components/Icon';
import { Button, Eyebrow } from '../components/Primitives';
import { betaRelease as release, betaSize } from '../data/release';

export default function Download() {
  const [copyStatus, setCopyStatus] = useState('');
  async function copyChecksum() {
    try {
      await navigator.clipboard.writeText(release.installer.sha256);
      setCopyStatus('Checksum copied.');
    } catch {
      setCopyStatus('Select the checksum below to copy it.');
    }
  }
  return (
    <section className="download-page container">
      <div className="download-copy" data-reveal>
        <Eyebrow>NYXR / WINDOWS BETA</Eyebrow>
        <span className="release-status">
          <i /> {release.available ? 'BETA AVAILABLE' : 'PREPARING THE BETA'}
        </span>
        <h1>
          Your desktop.
          <br />A little more <span className="text-cyan">capable.</span>
        </h1>
        <p>
          Bring NYXR to Windows. Talk through an idea, build a project, learn from your PDFs or
          automate a workflow — with your own AI provider or an explicitly selected local model.
        </p>
        <a className="text-link" href="/features/">
          Explore NYXR <Icon size={16} />
        </a>
      </div>
      <article className="release-card" data-reveal aria-labelledby="release-title">
        <div className="release-card-top">
          <span>EARLY ACCESS / WINDOWS</span>
          <Icon name="download" size={18} />
        </div>
        <div className="release-logo">
          <img
            src="/logos/nyxr-brand-core.png"
            alt="NYXR orbital core"
            width="1280"
            height="1280"
          />
        </div>
        <h2 id="release-title">NYXR {release.version}</h2>
        <p>A self-contained installer. No Python or Node setup.</p>
        <dl className="release-details">
          <div>
            <dt>Platform</dt>
            <dd>{release.platform}</dd>
          </div>
          <div>
            <dt>Installer</dt>
            <dd>{betaSize}</dd>
          </div>
          <div>
            <dt>Release channel</dt>
            <dd className="text-cyan">Beta · early access</dd>
          </div>
        </dl>
        {release.available ? (
          <>
            <Button
              href={release.installer.url}
              download={release.installer.filename}
              icon="download"
              data-testid="beta-download"
            >
              Download Windows beta
            </Button>
            <span className="release-note">Direct installer download · no sign-in required</span>
            <div className="release-resource-links">
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
              <summary>Verify your download</summary>
              <p>Compare the file’s SHA-256 with this value before running it.</p>
              <code>{release.installer.sha256}</code>
              <button type="button" onClick={copyChecksum}>
                Copy SHA-256
              </button>
              <span role="status">{copyStatus}</span>
            </details>
          </>
        ) : (
          <>
            <Button disabled icon="download" aria-describedby="beta-unavailable">
              Beta download being prepared
            </Button>
            <span className="release-note" id="beta-unavailable">
              The installer is built. The public download will open here after distribution checks
              and file hosting are complete.
            </span>
          </>
        )}
        <p className="release-beta-warning">
          {release.signed
            ? 'Early software: '
            : 'Unsigned beta: Windows may show a security warning. '}
          Use on a test computer first and keep backups of important work.
        </p>
      </article>
      <div className="beta-setup" data-reveal>
        <article>
          <span>01 / YOUR AI</span>
          <h3>Connect what works for you.</h3>
          <p>
            Bring your own provider credentials or choose an installed Ollama model. NYXR accounts
            are optional and do not include AI credits. Local models never start automatically by
            default.
          </p>
        </article>
        <article>
          <span>02 / BROWSER TASKS</span>
          <h3>Give Chrome a connection.</h3>
          <p>
            The beta includes the Native Messaging host and extension files. Open Chrome setup in
            NYXR for manual extension setup. A Chrome Web Store listing is not available yet.
          </p>
        </article>
        <article>
          <span>03 / EARLY ACCESS</span>
          <h3>Help shape what comes next.</h3>
          <p>
            Hosted NYXR sign-in is not available in this beta. Clean-machine, voice and browser
            testing is ongoing. Your provider connection works independently of NYXR account setup.
          </p>
        </article>
      </div>
      <div className="release-footnote">
        <span>YOUR WORKSPACE. YOUR CHOICE.</span>
        <p>
          Windows x64 only. No local LLM weights are included. Upgrade and uninstall preserve your local
          user data by default. Need a hand? <a href="/guide/">Read the guide</a> or{' '}
          <a href="/contact/">contact NYXR</a>.
        </p>
      </div>
    </section>
  );
}
