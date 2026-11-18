import Core from '../components/Core';
import Icon from '../components/Icon';
import { Button, Eyebrow } from '../components/Primitives';
import { carriesOver, comparison, highlights, nyxr5, shots, timeline } from '../data/nyxr5';

/** Introducing NYXR 5: what it is, what changed since the first NYXR 4 build, and its honest status. */
export default function Nyxr5() {
  return (
    <div className="nyxr5-page">
      <section className="nyxr5-hero container" aria-labelledby="nyxr5-title">
        <div className="nyxr5-hero-copy" data-reveal>
          <Eyebrow>NYXR / INTRODUCING</Eyebrow>
          <span className="nyxr5-status">
            <i /> NYXR 5 · {nyxr5.status}
          </span>
          <h1 id="nyxr5-title">
            Introducing <span className="text-cyan">NYXR 5.</span>
          </h1>
          <h2>Lighter. Calmer. Closer to you.</h2>
          <p>
            A new NYXR app, rebuilt around the same engine. A living core on Home, a Game Studio
            that works like an IDE, a hands-free bar you can talk to from any app, and themes that
            answer your cursor. All while sitting at about zero CPU when you are not using it.
          </p>
          <div className="button-row">
            <Button href="/download/#nyxr5-preview" icon="download">
              Download NYXR 5
            </Button>
            <Button href="#what-changed" secondary>
              What changed
            </Button>
          </div>
          <p className="nyxr5-note">{nyxr5.statusNote}</p>
        </div>
        <div className="nyxr5-hero-core" aria-hidden="true">
          <div className="nyxr5-rings">
            <i />
            <i />
            <i />
          </div>
          <Core />
          <span className="nyxr5-five">5</span>
        </div>
      </section>

      <section className="nyxr5-highlights container" aria-labelledby="nyxr5-highlights-title">
        <header data-reveal>
          <Eyebrow>WHAT’S NEW</Eyebrow>
          <h2 id="nyxr5-highlights-title">Six things you will notice first.</h2>
        </header>
        <div className="nyxr5-grid">
          {highlights.map((h, i) => (
            <article key={h.title} data-reveal style={{ '--i': i }}>
              <span className="source-feature-icon">
                <Icon name={h.icon} size={23} />
              </span>
              <h3>{h.title}</h3>
              <p>{h.text}</p>
              <p className="source-feature-detail">{h.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="nyxr5-gallery container" aria-labelledby="nyxr5-gallery-title">
        <header data-reveal>
          <Eyebrow>SEE IT</Eyebrow>
          <h2 id="nyxr5-gallery-title">The real app, as it installs.</h2>
          <p>Screenshots of the NYXR 5 preview on a fresh install, with no account or AI provider connected.</p>
        </header>
        <div className="nyxr5-shots">
          {shots.map((s) => (
            <figure key={s.src} data-reveal>
              <img src={s.src} alt={s.alt} width="1600" height="1000" loading="lazy" />
              <figcaption>{s.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="nyxr5-compare container" id="what-changed" aria-labelledby="nyxr5-compare-title">
        <header data-reveal>
          <Eyebrow>THEN / NOW</Eyebrow>
          <h2 id="nyxr5-compare-title">From the first NYXR 4 build to NYXR 5.</h2>
          <p>
            The first NYXR 4 build was a single Python file: one window, one model, a HUD and a
            command terminal. Here is what each part became, side by side.
          </p>
        </header>
        <div className="nyxr5-table" role="table" aria-label="First NYXR 4 build compared with NYXR 5">
          <div className="nyxr5-row nyxr5-row-head" role="row">
            <span role="columnheader">Area</span>
            <span role="columnheader">First NYXR 4 build</span>
            <span role="columnheader">NYXR 5</span>
          </div>
          {comparison.map(([area, then, now]) => (
            <div className="nyxr5-row" role="row" key={area} data-reveal>
              <span role="rowheader">{area}</span>
              <span role="cell" data-label="First NYXR 4 build" className={then === 'None.' ? 'nyxr5-none' : ''}>{then}</span>
              <span role="cell" data-label="NYXR 5">{now}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="nyxr5-keeps container" aria-labelledby="nyxr5-keeps-title">
        <div data-reveal>
          <Eyebrow>WHAT STAYS</Eyebrow>
          <h2 id="nyxr5-keeps-title">
            A new app.
            <br />
            <span className="text-cyan">The same engine.</span>
          </h2>
          <p>
            NYXR 5 does not start over. The engine behind every NYXR 4 beta runs inside it, so
            everything you rely on comes along.
          </p>
        </div>
        <ul>
          {carriesOver.map((item) => (
            <li key={item} data-reveal>
              <Icon name="check" size={15} /> {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="nyxr5-timeline container" aria-labelledby="nyxr5-timeline-title">
        <Eyebrow>HOW WE GOT HERE</Eyebrow>
        <h2 id="nyxr5-timeline-title">Three steps, one core.</h2>
        <ol>
          {timeline.map(([title, text], i) => (
            <li key={title} data-reveal>
              <span>{String(i + 1).padStart(2, '0')}</span>
              <strong>{title}</strong>
              <p>{text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="nyxr5-cta container" aria-labelledby="nyxr5-cta-title" data-reveal>
        <h2 id="nyxr5-cta-title">Get NYXR 5.</h2>
        <p>
          One click installs it, no admin rights needed. A short setup finds the AI you already have and tests your microphone and voice, then a starter quest shows you around. It keeps your chats, projects and settings from NYXR 4.
        </p>
        <div className="button-row">
          <Button href="/download/#nyxr5-preview" icon="download">
            Download NYXR 5
          </Button>
          
          <Button href="/updates/#nyxr-5" secondary>
            NYXR 5 release notes
          </Button>
        </div>
      </section>
    </div>
  );
}

/** The home page's banner for NYXR 5. */
export function Nyxr5Intro() {
  return (
    <section className="nyxr5-intro container" aria-labelledby="nyxr5-intro-title">
      <a href="/nyxr-5/" className="nyxr5-intro-card" data-reveal>
        <div className="nyxr5-intro-copy">
          <Eyebrow>NEW / AVAILABLE NOW</Eyebrow>
          <h2 id="nyxr5-intro-title">
            Introducing <span className="text-cyan">NYXR 5.</span>
          </h2>
          <p>
            A lighter app around the same engine: a living core, Game Studio as an IDE, a hands-free
            bar for every app, and the Nemesis theme.
          </p>
          <span className="text-link">
            See what changed <Icon size={16} />
          </span>
        </div>
        <ul className="nyxr5-intro-points" aria-label="NYXR 5 highlights">
          {highlights.slice(0, 4).map((h) => (
            <li key={h.title}>
              <Icon name={h.icon} size={17} />
              {h.title}
            </li>
          ))}
        </ul>
      </a>
    </section>
  );
}
