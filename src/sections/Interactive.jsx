import { useEffect, useRef, useState } from 'react';
import { Button, Eyebrow, SectionHeading, Shot } from '../components/Primitives';
import Icon from '../components/Icon';
import { themes, walkthroughs } from '../data/product';

export function InteractiveDemo() {
  const [preset, setPreset] = useState('build'),
    [input, setInput] = useState(walkthroughs.build.prompt),
    [step, setStep] = useState(-1),
    [running, setRunning] = useState(false);
  const timer = useRef();
  const script = walkthroughs[preset];
  useEffect(() => () => clearInterval(timer.current), []);
  function reset(p) {
    clearInterval(timer.current);
    setRunning(false);
    setStep(-1);
    setPreset(p);
    setInput(walkthroughs[p].prompt);
  }
  function run(e) {
    e.preventDefault();
    if (running || !input.trim()) return;
    const p =
      /notepad|computer|file|app|open/i.test(input) && !/website/i.test(input)
        ? 'computer'
        : /research|find|search/i.test(input)
          ? 'research'
          : 'build';
    setPreset(p);
    setStep(0);
    setRunning(true);
    let cursor = 0;
    const delay = matchMedia('(prefers-reduced-motion: reduce)').matches ? 250 : 850;
    timer.current = setInterval(() => {
      cursor++;
      setStep(cursor);
      if (cursor >= walkthroughs[p].steps.length - 1) {
        clearInterval(timer.current);
        setRunning(false);
      }
    }, delay);
  }
  return (
    <section className="demo-section section container" id="demo">
      <div className="demo-copy" data-reveal>
        <Eyebrow number="04">INTERACTIVE DEMO</Eyebrow>
        <h2>
          A glimpse <br />
          of the <span className="serif-word">process.</span>
        </h2>
        <p>Pick a scenario. Follow the journey from request to result in the Agent Timeline.</p>
        <span className="demo-honesty">
          <Icon name="shield" size={15} /> Scripted website demo.
          <br />
          No live AI, files, or computer actions.
        </span>
        <div className="demo-presets" role="group" aria-label="Choose a demo scenario">
          {[
            ['build', 'Build a website', 'code'],
            ['computer', 'Computer task', 'cursor'],
            ['research', 'Research an idea', 'spark'],
          ].map(([id, label, icon]) => (
            <button
              key={id}
              className={preset === id ? 'selected' : ''}
              aria-pressed={preset === id}
              onClick={() => reset(id)}
            >
              <Icon name={icon} size={17} />
              {label}
              <Icon size={14} />
            </button>
          ))}
        </div>
      </div>
      <div className="demo-console" data-reveal>
        <div className="console-top">
          <span>
            <i className="tiny-dot" /> AGENT TIMELINE
          </span>
          <span>INTERACTIVE DEMO</span>
        </div>
        <h3>{script.title}</h3>
        <ol className="demo-timeline">
          {script.steps.map(([name, desc], i) => (
            <li
              key={name}
              className={`${i < step ? 'done' : ''} ${i === step ? 'current' : ''} ${i > step ? 'pending' : ''}`}
            >
              <span className="timeline-marker">
                {i < step ? <Icon name="check" size={12} /> : String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <strong>{name}</strong>
                <p>{desc}</p>
              </div>
              {i === step && running && <i className="processing-dot" />}
            </li>
          ))}
        </ol>
        <form className="demo-input" onSubmit={run}>
          <label htmlFor="demo-command" className="sr-only">
            A command for the scripted demo
          </label>
          <span className="demo-prompt">›</span>
          <input
            id="demo-command"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            maxLength={300}
            autoComplete="off"
          />
          <button type="submit" aria-label="Run scripted demo" disabled={running || !input.trim()}>
            <Icon name={running ? 'timeline' : 'arrow'} size={19} />
          </button>
        </form>
        <div className="demo-result" aria-live="polite">
          {step === -1
            ? 'Ready when you are.'
            : running
              ? `${script.steps[step][0]}…`
              : 'Walkthrough complete. Try another scenario.'}
          {step >= 0 && !running && (
            <button onClick={() => reset(preset)}>
              Reset <Icon name="route" size={12} />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

export function ThemeSection({ openShot }) {
  const [selected, setSelected] = useState('nexus');
  const theme = themes.find((t) => t.id === selected);
  return (
    <section className="theme-section section container" id="personalization">
      <div className="section-title-row" data-reveal>
        <SectionHeading
          number="10"
          label="PERSONALIZATION"
          title={
            <>
              Same intelligence.
              <br />
              <span className="serif-word">Your atmosphere.</span>
            </>
          }
        />
        <div className="title-aside">
          <p>
            A name that feels like yours. A tone that fits. A workspace at the right volume,
            density, and shade.
          </p>
          <button className="text-link" onClick={() => openShot('personalization')}>
            Explore Personalization <Icon size={16} />
          </button>
        </div>
      </div>
      <div
        className={`theme-showcase theme-${selected}`}
        style={{ '--theme-accent': theme.color }}
        data-reveal
      >
        <div className="theme-controls">
          <div>
            <span className="instrument-label">CHOOSE YOUR FREQUENCY</span>
            <h3>{theme.name}</h3>
            <p>{theme.description}</p>
          </div>
          <div className="theme-buttons" role="group" aria-label="Preview a NYXR theme">
            {themes.map((t) => (
              <button
                key={t.id}
                style={{ '--swatch': t.color }}
                aria-pressed={selected === t.id}
                className={selected === t.id ? 'selected' : ''}
                onClick={() => setSelected(t.id)}
              >
                <span className="theme-swatch" />
                <span>{t.name}</span>
                <Icon name="check" size={13} />
              </button>
            ))}
          </div>
          <span className="theme-capture-note">
            REAL THEME CAPTURES
            <br />
            FROM THE WINDOWS APP
          </span>
        </div>
        <div className="theme-preview">
          <div className="theme-image-wrap">
            <img
              key={selected}
              src={`/screenshots/theme-${selected}.webp`}
              alt={`Actual NYXR Command Center in the ${theme.name} theme`}
              width="1650"
              height="920"
              loading="lazy"
            />
            {selected === 'hacker' && (
              <div className="matrix-rain" aria-hidden="true">
                {Array.from({ length: 16 }, (_, i) => (
                  <span key={i} style={{ '--i': i }}>
                    0 1 N 4 0 1 X 0 1 R 1 0
                  </span>
                ))}
              </div>
            )}
            <button
              className="theme-expand icon-button"
              aria-label={`Enlarge ${theme.name} capture`}
              onClick={() => openShot(`theme-${selected}`)}
            >
              <Icon name="expand" size={17} />
            </button>
          </div>
          <div className="theme-detail-line">
            <span>
              <i style={{ background: theme.color }} /> {theme.name.toUpperCase()}
            </span>
            <span>APPEARANCE / LIVE PREVIEW</span>
          </div>
        </div>
      </div>
      <div className="personalization-items" data-reveal>
        {[
          ['sliders', 'Conversation style', 'Compact or detailed. Casual or professional.'],
          ['voice', 'Voice & behavior', 'Speech, hands-free, transcript, and how you work.'],
          ['shield', 'Context & privacy', 'Control context use. Understand local and cloud.'],
        ].map(([ic, t, d]) => (
          <div key={t}>
            <Icon name={ic} size={18} />
            <div>
              <h3>{t}</h3>
              <p>{d}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function MotionSection() {
  const video = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [error, setError] = useState(false);
  return (
    <section className="motion-section section container" id="in-motion">
      <div className="section-title-row" data-reveal>
        <SectionHeading
          number="13"
          label="PRODUCT FILM"
          title={
            <>
              See NYXR
              <br />
              <span className="text-cyan">in its element.</span>
            </>
          }
        />
        <p className="title-aside">
          A short look around the real Windows interface. Command Center, Chat, the coding
          workspace, Student, and the live core editor.
        </p>
      </div>
      <div
        className={`video-frame ${playing ? 'playing' : ''} ${hasPlayed ? 'has-played' : ''}`}
        data-reveal
      >
        <video
          ref={video}
          controls={hasPlayed}
          playsInline
          preload="none"
          poster="/screenshots/dashboard.webp"
          width="1320"
          height="736"
          aria-label="Twenty-second tour of current NYXR interface captures from a clean showcase session"
          onPlay={() => {
            setHasPlayed(true);
            setPlaying(true);
          }}
          onPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
          onError={() => setError(true)}
        >
          <source src="/videos/nyxr-in-motion.webm" type="video/webm" />
          Your browser does not support WebM video.
        </video>
        {!hasPlayed && (
          <button
            className="video-play"
            aria-label="Play NYXR product film"
            onClick={() => {
              video.current.play().catch(() => setError(true));
            }}
          >
            <span className="play-circle">
              <Icon name="play" size={26} />
            </span>
            <span>
              {error ? 'Try playback again' : 'Take a look inside'}
              <small>00:20 / CURRENT APP CAPTURES</small>
            </span>
          </button>
        )}
        <div className="video-corners" aria-hidden="true" />
      </div>
      <p className="capture-caption">
        Real NYXR UI captures from an isolated showcase session. Authored project and conversation
        data. External services, microphone, and inference were disabled.
      </p>
    </section>
  );
}
