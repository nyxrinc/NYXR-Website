import { useRef, useState } from 'react';
import { Button, Eyebrow } from '../components/Primitives';
import Core from '../components/Core';
import Icon from '../components/Icon';

const workflows = [
  {
    icon: 'code',
    label: 'MAKE SOMETHING',
    title: 'An idea, with somewhere to go.',
    text: 'Build and refine projects with a file editor, coding assistant and visible progress in one workspace.',
    href: '/coding/',
    link: 'Explore the coding workspace',
    detail: 'IDEA → PLAN → PROJECT',
  },
  {
    icon: 'cursor',
    label: 'GET THINGS DONE',
    title: 'A little less repetition.',
    text: 'Ask NYXR to help with desktop tasks, research and routines. Turn a repeated workflow into a macro.',
    href: '/computer-use/',
    link: 'Explore computer use',
    detail: 'REQUEST → ACTION → VERIFICATION',
  },
  {
    icon: 'voice',
    label: 'STAY IN YOUR FLOW',
    title: 'An assistant within reach.',
    text: 'Start a conversation, speak with F11 hands-free, or keep NYXR beside your work in the compact HUD.',
    href: '/voice/',
    link: 'Meet your voice companion',
    detail: 'CHAT · VOICE · HUD',
  },
];

export function HomeCapabilities() {
  return (
    <section
      className="home-capabilities container"
      id="inside-nyxr"
      aria-labelledby="home-capabilities-title"
    >
      <header className="home-section-intro" data-reveal>
        <div>
          <Eyebrow number="01">INSIDE NYXR</Eyebrow>
          <h2 id="home-capabilities-title">
            One assistant.
            <br />
            <span>Your kind of day.</span>
          </h2>
        </div>
        <p>
          Some days you’re building. Some days you’re figuring things out. NYXR gives your ideas,
          tools and everyday tasks a place to come together.
        </p>
      </header>
      <div className="home-workflows" data-reveal>
        {workflows.map((item) => (
          <a className="home-workflow" href={item.href} key={item.label}>
            <div className="home-workflow-top">
              <Icon name={item.icon} size={25} />
              <span>{item.label}</span>
              <Icon size={17} />
            </div>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
            <span className="home-workflow-detail">{item.detail}</span>
            <span className="home-workflow-link">
              {item.link}
              <Icon size={15} />
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}

const modes = [
  { id: 'explain', icon: 'chat', label: 'Understand', detail: 'Work through the idea.' },
  { id: 'practice', icon: 'memory', label: 'Practise', detail: 'Find out what sticks.' },
  { id: 'present', icon: 'panel', label: 'Present', detail: 'Make it yours to share.' },
];

function LessonPreview({ mode }) {
  const [revealed, setRevealed] = useState(false);
  if (mode === 'present') {
    return (
      <div className="learning-deck">
        <div className="learning-slide-trail" aria-hidden="true">
          <span>01</span>
          <i />
          <i />
          <i />
        </div>
        <div className="learning-slide">
          <span className="learning-label">CELL BIOLOGY / CHAPTER 03</span>
          <h3>
            Energy,
            <br />
            <em>made usable.</em>
          </h3>
          <div className="learning-atp" aria-hidden="true">
            <span>ATP</span>
            <i />
            <b />
          </div>
          <p>How mitochondria help power the cell.</p>
          <footer>
            <span>Source · p. 12</span>
            <span>01 / 08</span>
          </footer>
        </div>
        <div className="learning-notes">
          <Icon name="code" size={15} />
          <span>
            Editable slides <i /> Speaker notes <i /> Source references
          </span>
        </div>
      </div>
    );
  }
  if (mode === 'practice') {
    return (
      <div className="learning-quiz">
        <div className="learning-quiz-heading">
          <span className="learning-label">ACTIVE RECALL</span>
          <span>01 / 05</span>
        </div>
        <h3>
          Let’s see
          <br />
          what stuck.
        </h3>
        <p>Which molecule carries usable energy around the cell?</p>
        <div className={`learning-answer ${revealed ? 'is-revealed' : ''}`} aria-live="polite">
          {revealed ? (
            <>
              <Icon name="check" size={19} />
              <span>
                <strong>ATP</strong>Adenosine triphosphate — a useful way for cells to transfer
                energy.
              </span>
            </>
          ) : (
            <span>Take a moment. Explain it in your own words.</span>
          )}
        </div>
        <button
          className="learning-reveal"
          onClick={() => setRevealed((value) => !value)}
          aria-expanded={revealed}
        >
          {revealed ? 'Try again' : 'Reveal example answer'}
          <Icon name={revealed ? 'memory' : 'arrow'} size={15} />
        </button>
      </div>
    );
  }
  return (
    <div className="learning-conversation">
      <div className="learning-question">
        <span className="learning-label">YOUR QUESTION</span>
        <p>Why do cells need mitochondria?</p>
      </div>
      <div className="learning-tutor">
        <div className="learning-tutor-name">
          <span className="learning-n">N</span>
          <strong>NYXR</strong>
          <span>Let’s make it clear.</span>
        </div>
        <p>
          Think of them as energy converters. They help turn energy stored in food into ATP, a form
          the cell can use.
        </p>
        <div className="learning-energy" aria-hidden="true">
          <span>FOOD</span>
          <i />
          <span className="learning-energy-cell">
            <b />
            MITOCHONDRIA
          </span>
          <i />
          <strong>ATP</strong>
        </div>
        <span className="learning-citation">
          <Icon name="folder" size={13} />
          Your material · page 12
        </span>
      </div>
    </div>
  );
}

export function LearningShowcase() {
  const [mode, setMode] = useState('explain');
  const tabs = useRef([]);
  function navigate(event, index) {
    let next;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % modes.length;
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp')
      next = (index + modes.length - 1) % modes.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = modes.length - 1;
    else return;
    event.preventDefault();
    setMode(modes[next].id);
    tabs.current[next]?.focus();
  }
  return (
    <section className="home-learning container" aria-labelledby="home-learning-title">
      <div className="learning-surface" data-reveal>
        <div className="learning-copy">
          <Eyebrow number="02">A LITTLE SPACE TO LEARN</Eyebrow>
          <h2 id="home-learning-title">
            Your material.
            <br />A new way
            <br />
            <span>to make it click.</span>
          </h2>
          <p>
            Bring your PDFs into NYXR. Work through an idea with a tutor, practise what you’ve
            learned, then turn your understanding into a presentation.
          </p>
          <div
            className="learning-modes"
            role="tablist"
            aria-label="Preview the Student workflow"
            aria-orientation="vertical"
          >
            {modes.map((item, index) => (
              <button
                key={item.id}
                ref={(el) => {
                  tabs.current[index] = el;
                }}
                id={`learning-tab-${item.id}`}
                role="tab"
                aria-selected={mode === item.id}
                aria-controls="learning-preview"
                tabIndex={mode === item.id ? 0 : -1}
                onClick={() => setMode(item.id)}
                onKeyDown={(event) => navigate(event, index)}
              >
                <span className="learning-mode-icon">
                  <Icon name={item.icon} size={17} />
                </span>
                <span>
                  <strong>{item.label}</strong>
                  <small>{item.detail}</small>
                </span>
                <Icon size={14} />
              </button>
            ))}
          </div>
          <div className="learning-actions">
            <Button href="/students/">Meet your study space</Button>
            <a className="learning-slides-link" href="/slideshows/">
              Explore slideshows
              <Icon size={14} />
            </a>
          </div>
        </div>
        <div className="learning-visual">
          <div className="learning-source">
            <span className="learning-pdf-mark">PDF</span>
            <div>
              <strong>Biology · Chapter 03</strong>
              <span>Your material, kept in context.</span>
            </div>
            <span className="learning-source-page">p. 12</span>
          </div>
          <div className="learning-connector" aria-hidden="true">
            <span />
            <i />
            <b>N</b>
          </div>
          <div
            className="learning-preview"
            id="learning-preview"
            role="tabpanel"
            aria-labelledby={`learning-tab-${mode}`}
            tabIndex={0}
          >
            <div className="learning-window-bar">
              <span>
                <i />
                <i />
                <i />
              </span>
              <strong>NYXR / STUDENT</strong>
              <Icon name="spark" size={13} />
            </div>
            <div className="learning-preview-body" key={mode}>
              <LessonPreview mode={mode} />
            </div>
          </div>
          <p className="learning-preview-caption">ILLUSTRATED WORKFLOW · EXPLORE THE MODES ABOVE</p>
        </div>
        <div className="learning-surface-footer">
          <span>
            <Icon name="shield" size={14} />
            Your PDFs stay in your local library.
          </span>
          <span>Selected excerpts go to your chosen AI provider or local model.</span>
        </div>
      </div>
    </section>
  );
}

export function HomeSignature() {
  return (
    <section className="home-signature container" aria-labelledby="home-signature-title">
      <div className="home-signature-core" data-reveal>
        <Core small />
      </div>
      <div className="home-signature-copy" data-reveal>
        <Eyebrow number="03">NEXUS / INTELLIGENCE IN ORBIT</Eyebrow>
        <h2 id="home-signature-title">
          The soul of NYXR.
          <br />
          <span>Room for your world.</span>
        </h2>
        <p>
          The central core responds to what NYXR is doing: listening, speaking, coding,
          researching or waiting. NEXUS brings onyx glass, neon cyan-blue type and cursor-responsive orbital depth.
          Every theme keeps that same living heart, with readable work panels around it.
        </p>
        <div className="home-signature-details">
          <span>Real task state. No invented activity.</span>
          <span>Electrolize headings. Chakra Petch interface. JetBrains Mono for code.</span>
          <span>Reduced motion when you want a calmer workspace.</span>
          <span>A skippable tutorial, with separate listening and speaking checks.</span>
        </div>
        <a className="home-signature-link" href="/personalization/">
          Make NYXR your own
          <Icon size={17} />
        </a>
      </div>
    </section>
  );
}
