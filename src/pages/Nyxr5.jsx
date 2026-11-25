import Core from '../components/Core';
import Icon from '../components/Icon';
import { Button, Eyebrow } from '../components/Primitives';
import { carriesOver, comparison, highlights, highlights51, measured51, nyxr5, shots, timeline } from '../data/nyxr5';

/** Introducing NYXR 5.1: what is new, what we measured, and how it grew from the first NYXR 4 build. */
export default function Nyxr5() {
  return (
    <div className="nyxr5-page">
      <section className="nyxr5-hero container" aria-labelledby="nyxr5-title">
        <div className="nyxr5-hero-copy" data-reveal>
          <Eyebrow>NYXR / INTRODUCING</Eyebrow>
          <span className="nyxr5-status">
            <i /> NYXR 5.1 · {nyxr5.status}
          </span>
          <h1 id="nyxr5-title">
            Introducing <span className="text-cyan">NYXR 5.1.</span>
          </h1>
          <h2>Smarter. More careful. Yours to watch.</h2>
          <p>
            NYXR 5.1 reads your actual textbook page and solves the questions, checks its own maths
            and code before you see them, typesets equations properly and builds any kind of project.
            Whenever it uses your computer, you see its cursor and a Stop button.
          </p>
          <div className="button-row">
            <Button href="/download/#nyxr5-preview" icon="download">
              Download NYXR 5.1
            </Button>
            <Button href="/blog/#nyxr-5-1" secondary>
              How we measured it
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
          <span className="nyxr5-five">5.1</span>
        </div>
      </section>

      <section className="nyxr5-highlights container" aria-labelledby="nyxr51-highlights-title">
        <header data-reveal>
          <Eyebrow>NEW IN 5.1</Eyebrow>
          <h2 id="nyxr51-highlights-title">Six things 5.1 does that 5.0 couldn’t.</h2>
        </header>
        <div className="nyxr5-grid">
          {highlights51.map((h, i) => (
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

      <section className="nyxr5-highlights container" aria-labelledby="nyxr51-measured-title">
        <header data-reveal>
          <Eyebrow>MEASURED</Eyebrow>
          <h2 id="nyxr51-measured-title">Numbers, not adjectives.</h2>
          <p>
            Measured on a Windows 11 PC through NYXR’s own engine. The method, every table and what
            we didn’t get right are on the blog.
          </p>
        </header>
        <div className="nyxr51-measured" data-reveal>
          {measured51.map(([value, label]) => (
            <div key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
        <div className="button-row" style={{ marginTop: 22 }}>
          <Button href="/blog/#nyxr-5-1" secondary>
            Read the NYXR 5.1 write-up
          </Button>
        </div>
      </section>

      <section className="nyxr5-gallery container" aria-labelledby="nyxr5-gallery-title">
        <header data-reveal>
          <Eyebrow>SEE IT</Eyebrow>
          <h2 id="nyxr5-gallery-title">The real app.</h2>
          <p>Screenshots of NYXR 5 and 5.1 on a fresh data folder.</p>
        </header>
        <div className="nyxr5-shots">
          {shots.map((s) => (
            <figure key={s.src} data-reveal>
              <img src={s.src} alt={s.alt} width={s.width || 1600} height={s.height || 1000} loading="lazy" />
              <figcaption>{s.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="nyxr5-highlights container" aria-labelledby="nyxr5-highlights-title">
        <header data-reveal>
          <Eyebrow>FROM NYXR 5</Eyebrow>
          <h2 id="nyxr5-highlights-title">Still here, and still light.</h2>
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

      <section className="nyxr5-compare container" id="what-changed" aria-labelledby="nyxr5-compare-title">
        <header data-reveal>
          <Eyebrow>THEN / NOW</Eyebrow>
          <h2 id="nyxr5-compare-title">From the first NYXR 4 build to NYXR 5.1.</h2>
          <p>
            The first NYXR 4 build was a single Python file: one window, one model, a HUD and a
            command terminal. Here is what each part became, side by side.
          </p>
        </header>
        <div className="nyxr5-table" role="table" aria-label="First NYXR 4 build compared with NYXR 5.1">
          <div className="nyxr5-row nyxr5-row-head" role="row">
            <span role="columnheader">Area</span>
            <span role="columnheader">First NYXR 4 build</span>
            <span role="columnheader">NYXR 5.1</span>
          </div>
          {comparison.map(([area, then, now]) => (
            <div className="nyxr5-row" role="row" key={area} data-reveal>
              <span role="rowheader">{area}</span>
              <span role="cell" data-label="First NYXR 4 build" className={then === 'None.' ? 'nyxr5-none' : ''}>{then}</span>
              <span role="cell" data-label="NYXR 5.1">{now}</span>
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
            NYXR 5 did not start over. The engine behind every NYXR 4 beta runs inside it, so
            everything you rely on comes along, and 5.1 makes that engine sharper.
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
        <h2 id="nyxr5-timeline-title">Four steps, one core.</h2>
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
        <h2 id="nyxr5-cta-title">Get NYXR 5.1.</h2>
        <p>
          One click installs it, no admin rights needed. A short setup finds the AI you already have and tests your microphone and voice, then a starter quest shows you around. It installs over NYXR 5 previews, keeps your chats, projects and settings, and from now on updates only download what changed.
        </p>
        <div className="button-row">
          <Button href="/download/#nyxr5-preview" icon="download">
            Download NYXR 5.1
          </Button>
          <Button href="/updates/#nyxr-5-1" secondary>
            NYXR 5.1 release notes
          </Button>
        </div>
      </section>
    </div>
  );
}

/** The home page's banner for NYXR 5.1. */
export function Nyxr5Intro() {
  return (
    <section className="nyxr5-intro container" aria-labelledby="nyxr5-intro-title">
      <a href="/nyxr-5.1/" className="nyxr5-intro-card" data-reveal>
        <div className="nyxr5-intro-copy">
          <Eyebrow>NEW / NYXR 5.1</Eyebrow>
          <h2 id="nyxr5-intro-title">
            Introducing <span className="text-cyan">NYXR 5.1.</span>
          </h2>
          <p>
            It reads your textbook page and solves the questions, checks its own maths and code,
            builds any kind of project, and shows its cursor whenever it uses your PC.
          </p>
          <span className="text-link">
            See what’s new <Icon size={16} />
          </span>
        </div>
        <ul className="nyxr5-intro-points" aria-label="NYXR 5.1 highlights">
          {highlights51.slice(0, 4).map((h) => (
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
