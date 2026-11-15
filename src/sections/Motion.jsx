import { useEffect, useRef, useState } from 'react';
import Icon from '../components/Icon';
import { Button, Eyebrow } from '../components/Primitives';

/* Scroll-driven motion for the NYXR site.
   Every effect reads the same two switches: the visitor's reduced-motion
   setting and the footer's "Pause decorative motion" button
   (html[data-motion='off']). With either off, content renders fully lit. */

const motionAllowed = () =>
  typeof window !== 'undefined' &&
  !matchMedia('(prefers-reduced-motion: reduce)').matches &&
  document.documentElement.dataset.motion !== 'off';

// One rAF-throttled scroll/resize subscription per component.
function useScrollFrame(callback) {
  const saved = useRef(callback);
  saved.current = callback;
  useEffect(() => {
    let frame = 0;
    const run = () => {
      frame = 0;
      saved.current();
    };
    const queue = () => {
      if (!frame) frame = requestAnimationFrame(run);
    };
    run();
    addEventListener('scroll', queue, { passive: true });
    addEventListener('resize', queue);
    const observer = new MutationObserver(queue);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-motion'] });
    return () => {
      cancelAnimationFrame(frame);
      removeEventListener('scroll', queue);
      removeEventListener('resize', queue);
      observer.disconnect();
    };
  }, []);
}

/* 0 when the element's top reaches the bottom of the screen, 1 when its
   bottom passes the given fraction of the screen height. */
function progressThrough(element, end = 0.35) {
  const box = element.getBoundingClientRect();
  const start = innerHeight;
  const finish = innerHeight * end;
  const span = box.height + (start - finish);
  return Math.min(1, Math.max(0, (start - box.top) / span));
}

export function ScrollProgress() {
  const bar = useRef(null);
  useScrollFrame(() => {
    const max = document.documentElement.scrollHeight - innerHeight;
    const value = max > 0 ? scrollY / max : 0;
    if (bar.current) bar.current.style.transform = `scaleX(${value})`;
  });
  return (
    <div className="scroll-progress" aria-hidden="true">
      <span ref={bar} />
    </div>
  );
}

const SPOKEN = [
  { say: 'Build a coin collection game.', done: 'Game Studio is writing it — it plays it to check before you do.' },
  { say: 'Make a mind map of photosynthesis.', done: 'Mind map ready, laid out for your notes.' },
  { say: 'Focus for 25 minutes on physics.', done: 'Focus session started. I’ll nudge you if you drift.' },
  { say: 'Show me how to export this as a PDF.', done: 'Look for the glowing ring — click it when you’re ready.' },
  { say: 'Chrome kholo.', done: 'Chrome is open.' },
  { say: 'Remind me to call Mum at 5 p.m.', done: 'Done — I’ll say it out loud at 5.' },
];

/* "Listening…" strip: a live waveform and real things you can say to NYXR. */
export function SpeakStrip() {
  const [index, setIndex] = useState(0);
  const [typed, setTyped] = useState(SPOKEN[0].say.length);
  const [answered, setAnswered] = useState(true);
  useEffect(() => {
    if (!motionAllowed()) return undefined;
    let cancelled = false;
    let timer;
    const wait = (ms) => new Promise((resolve) => (timer = setTimeout(resolve, ms)));
    (async () => {
      let current = 0;
      await wait(2600);
      while (!cancelled) {
        current = (current + 1) % SPOKEN.length;
        setIndex(current);
        setAnswered(false);
        const phrase = SPOKEN[current].say;
        for (let i = 0; i <= phrase.length && !cancelled; i++) {
          setTyped(i);
          await wait(38);
        }
        await wait(500);
        if (cancelled) break;
        setAnswered(true);
        await wait(2600);
      }
    })();
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, []);
  const item = SPOKEN[index];
  return (
    <section className="speak-strip container" aria-labelledby="speak-strip-title">
      <h2 id="speak-strip-title" className="sr-only">
        Things you can say to NYXR
      </h2>
      <div className="speak-card" data-reveal>
        <div className="speak-hud">
          <span className="speak-live">
            <i /> LISTENING
          </span>
          <span>HOLD F8 · OR TYPE</span>
        </div>
        <div className="speak-wave" aria-hidden="true">
          {Array.from({ length: 48 }, (_, i) => (
            <span key={i} style={{ '--i': i }} />
          ))}
        </div>
        <p className="speak-said" aria-live="polite">
          “{item.say.slice(0, typed)}
          <span className="speak-caret" aria-hidden="true" />”
        </p>
        <p className={answered ? 'speak-done on' : 'speak-done'}>
          <span>NYXR</span> {item.done}
        </p>
      </div>
    </section>
  );
}

const STATEMENTS = [
  ['Say', ' it.'],
  ['Build', ' it.'],
  ['Automate', ' it.'],
  ['Learn', ' from it.'],
];

/* Big statement lines that light up one by one as they cross the screen. */
export function StatementReveal() {
  const host = useRef(null);
  const [lit, setLit] = useState(STATEMENTS.length + 1);
  useScrollFrame(() => {
    if (!host.current) return;
    if (!motionAllowed()) return setLit(STATEMENTS.length + 1);
    const value = progressThrough(host.current, 0.55);
    setLit(Math.floor(value * (STATEMENTS.length + 1.4)));
  });
  return (
    <section className="statement-reveal container" ref={host} aria-label="What NYXR is for">
      {STATEMENTS.map(([lead, rest], i) => (
        <p key={lead} className={i < lit ? 'statement-line on' : 'statement-line'}>
          <span className="statement-lead">{lead}</span>
          {rest}
        </p>
      ))}
      <p className={STATEMENTS.length < lit ? 'statement-line quiet on' : 'statement-line quiet'}>
        In your own words.
      </p>
    </section>
  );
}

const STORY =
  'NYXR joins your voice, your apps and the AI you already use into one living core on your Windows desktop. ' +
  'Speak in English, Hindi or Hinglish. It answers, opens what you need, builds games and slides, points at the ' +
  'button you are looking for, keeps you focused, and shows every step it takes.';
const HIGHLIGHT = new Set(['voice,', 'apps', 'AI', 'Hinglish.', 'builds', 'points', 'focused,', 'every', 'step']);

/* A paragraph whose words brighten as you scroll through it. */
export function WordReveal() {
  const host = useRef(null);
  const words = STORY.split(' ');
  const [count, setCount] = useState(words.length);
  useScrollFrame(() => {
    if (!host.current) return;
    if (!motionAllowed()) return setCount(words.length);
    setCount(Math.round(progressThrough(host.current, 0.45) * words.length * 1.15));
  });
  return (
    <section className="word-reveal container" aria-labelledby="word-reveal-title">
      <p className="word-reveal-eyebrow" id="word-reveal-title">
        BUILT TO FEEL LIKE YOURS
      </p>
      <p className="word-reveal-text" ref={host}>
        {words.map((word, i) => (
          <span
            key={i}
            className={
              (i < count ? 'word on' : 'word') + (HIGHLIGHT.has(word) ? ' accent' : '')
            }
          >
            {word}{' '}
          </span>
        ))}
      </p>
    </section>
  );
}

const STATS = [
  { value: 3, suffix: '', label: 'Signed-in AI plans: Claude, Codex and Antigravity' },
  { value: 15, suffix: '+', label: 'AI providers to choose from — or bring your own key' },
  { value: 1, suffix: '', label: 'Prompt to an original, playable game' },
  { value: 0, suffix: '', label: 'AI calls needed for instant commands' },
];

function Counter({ value, suffix }) {
  const node = useRef(null);
  const [shown, setShown] = useState(value);
  useEffect(() => {
    const element = node.current;
    if (!element || !motionAllowed() || typeof IntersectionObserver !== 'function') return undefined;
    setShown(0);
    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const started = performance.now();
        const step = (now) => {
          const t = Math.min(1, (now - started) / 1300);
          setShown(Math.round(value * (1 - Math.pow(1 - t, 3))));
          if (t < 1) frame = requestAnimationFrame(step);
        };
        frame = requestAnimationFrame(step);
      },
      { threshold: 0.6 },
    );
    observer.observe(element);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);
  return (
    <strong ref={node}>
      {shown}
      {suffix}
    </strong>
  );
}

export function StatCounters() {
  return (
    <section className="stat-counters container" aria-label="NYXR in numbers">
      {STATS.map((stat) => (
        <div className="stat-card" key={stat.label} data-reveal>
          <Counter value={stat.value} suffix={stat.suffix} />
          <span>{stat.label}</span>
        </div>
      ))}
    </section>
  );
}

const SAYINGS = [
  'Build a coin collection game',
  'Explain this graph',
  'Make slides on the water cycle',
  'Where is the share button?',
  'Brief me',
  'Write a song about monsoon',
  'Chrome kholo',
  'Focus for 25 minutes',
  'Draw a turtle',
  'Find jersey stores near me',
  'Kal subah 7 baje gym yaad dilana',
  'Take a screenshot',
];
const ROUTES = [
  'Claude',
  'Codex',
  'Antigravity · Gemini',
  'OpenRouter',
  'Gemini',
  'Groq',
  'Mistral',
  'NVIDIA NIM',
  'Kimi',
  'Z.AI',
  'Puter',
  'FreeLLMAPI',
];

function Row({ items, reverse }) {
  return (
    <div className={reverse ? 'marquee-row reverse' : 'marquee-row'}>
      <div className="marquee-track">
        {[0, 1].map((copy) => (
          <div className="marquee-group" key={copy} aria-hidden={copy === 1 ? 'true' : undefined}>
            {items.map((item) => (
              <span className="marquee-chip" key={item}>
                {item}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* Two endless rows: things to say, and the AI routes NYXR can use. */
export function SayMarquee() {
  return (
    <section className="say-marquee" aria-labelledby="say-marquee-title">
      <div className="container">
        <Eyebrow>JUST SAY IT</Eyebrow>
        <h2 id="say-marquee-title">
          One sentence. <span>NYXR takes it from there.</span>
        </h2>
      </div>
      <Row items={SAYINGS} />
      <Row items={ROUTES} reverse />
      <p className="container say-marquee-note">
        Some phrases here arrive with the next Windows beta; see “What works today” below for exact
        availability.
      </p>
    </section>
  );
}

const STEPS = [
  ['01', 'Install.', 'Download the Windows beta. Connect the AI plan you already have — or bring a key.'],
  ['02', 'Hold F8 and speak.', 'Or type. English, Hindi or Hinglish. Press F11 for hands-free.'],
  ['03', 'Consider it done.', 'Answers, apps, games, slides and reminders — with every step shown.'],
];

export function HowItWorks() {
  return (
    <section className="how-it-works container" aria-labelledby="how-title">
      <header data-reveal>
        <Eyebrow>HOW IT WORKS</Eyebrow>
        <h2 id="how-title">Three steps to your own command center.</h2>
      </header>
      <ol>
        {STEPS.map(([number, title, text]) => (
          <li key={number} data-reveal>
            <span className="how-number">{number}</span>
            <h3>{title}</h3>
            <p>{text}</p>
          </li>
        ))}
      </ol>
      <div className="button-row" data-reveal>
        <Button href="/download/">Get NYXR</Button>
        <a className="text-link" href="/features/">
          Explore every feature <Icon size={16} />
        </a>
      </div>
    </section>
  );
}

/* Discreet full form, shown small in the footer. */
export function FullForm() {
  return (
    <span className="nyxr-full-form" title="What NYXR stands for">
      <b>N</b>atural-language e<b>X</b>ecution &amp; <b>R</b>easoning
    </span>
  );
}
