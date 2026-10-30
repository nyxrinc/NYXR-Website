import { Button, Eyebrow } from './Primitives';
import Icon from './Icon';
import { recentCapabilities, sourceUpdate } from '../data/whats-new';

export function SourceAvailability({ compact = false }) {
  return (
    <aside className={`source-availability ${compact ? 'is-compact' : ''}`}>
      <Icon name="timeline" size={19} />
      <div>
        <strong>New in the desktop source</strong>
        <p>
          These additions follow the public Windows beta 3 installer. Check the release notes for
          what each download includes.
        </p>
      </div>
      <a href={sourceUpdate.href}>
        Release details <Icon size={14} />
      </a>
    </aside>
  );
}

export default function SourceUpdates({ page, all = false }) {
  const items = all
    ? recentCapabilities
    : recentCapabilities.filter((item) => item.pages.includes(page));
  if (!items.length) return null;
  const anchors = {
    providers: 'openjarvis-models',
    voice: 'voice-presets',
    personalization: 'interface-sounds',
    computer: 'browser-recovery',
    coding: 'source-recovery',
    chat: 'connected-conversation',
    intelligence: 'inference-and-action',
    macros: 'macro-verification',
  };
  return (
    <section
      className="source-updates container"
      id={anchors[page] || 'latest-features'}
      aria-labelledby={`source-updates-${page || 'all'}`}
    >
      <header className="source-section-heading">
        <div>
          <Eyebrow>{sourceUpdate.label}</Eyebrow>
          <h2 id={`source-updates-${page || 'all'}`}>
            {all ? 'More of NYXR, connected.' : 'Built around the way you work.'}
          </h2>
        </div>
        <a className="text-link" href={sourceUpdate.href}>
          What changed <Icon size={16} />
        </a>
      </header>
      <div className="source-feature-grid">
        {items.map((item) => (
          <article
            key={item.id}
            id={item.id === 'background-replies' ? 'background-replies' : undefined}
          >
            <span className="source-feature-icon">
              <Icon name={item.icon} size={23} />
            </span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
            <p className="source-feature-detail">{item.detail}</p>
            {!(page === 'computer' && item.id === 'verified-actions') && (
              <a className="text-link" href={item.href}>
                {item.link}
                <Icon size={15} />
              </a>
            )}
          </article>
        ))}
      </div>
      {page === 'personalization' && (
        <aside className="desktop-theme-range">
          <strong>More atmospheres in the desktop app</strong>
          <p>Frutiger Aero · Verdigris · Porcelain Rose</p>
          <span>
            Alongside NEXUS and the themes previewed above. Every theme keeps the NYXR core; coding
            uses JetBrains Mono.
          </span>
        </aside>
      )}
      <SourceAvailability compact />
    </section>
  );
}

export function HomeEvolution() {
  return (
    <section className="home-evolution container" aria-labelledby="evolution-title">
      <div className="evolution-intro">
        <Eyebrow>NYXR / NEXT IN ORBIT</Eyebrow>
        <h2 id="evolution-title">
          Your assistant.
          <br />
          <span className="text-cyan">More connected.</span>
        </h2>
        <p>
          Choose how NYXR thinks, how it sounds, and which work it takes on. The same core brings it
          together.
        </p>
        <a className="text-link" href={sourceUpdate.href}>
          Latest development notes <Icon size={16} />
        </a>
      </div>
      <div className="evolution-links">
        {recentCapabilities.slice(0, 3).map((item, index) => (
          <a href={item.href} key={item.id}>
            <span className="evolution-index">0{index + 1}</span>
            <div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
            <Icon size={20} />
          </a>
        ))}
        <span className="evolution-caption">
          LATEST SOURCE · {sourceUpdate.date.toUpperCase()} ·{' '}
          <a href="/download/">Compare downloads</a>
        </span>
      </div>
    </section>
  );
}

export function DownloadSourceNote() {
  return (
    <aside
      className="download-source-update"
      id="latest-source"
      aria-labelledby="download-source-title"
    >
      <div>
        <Eyebrow>LATEST DEVELOPMENT / {sourceUpdate.date.toUpperCase()}</Eyebrow>
        <h2 id="download-source-title">Know what you’re installing.</h2>
        <p>
          The current source adds OpenJarvis cloud setup, British voice presets, JARVIS sounds and
          scoped Background Replies. These are newer than the Windows beta 3 download above.
        </p>
        <p>
          Existing downloads keep their original versions, checksums and limitations. A new
          installer will be listed after its own build and release checks.
        </p>
      </div>
      <Button href={sourceUpdate.href} secondary>
        Compare source &amp; releases
      </Button>
    </aside>
  );
}
