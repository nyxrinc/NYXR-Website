import { Eyebrow } from '../components/Primitives';

/* One honest, consistent availability board for every NYXR capability.
   AVAILABLE: in the current Windows beta download.
   BETA: in the download, still being tested (expect rough edges).
   NEXT BETA: built and tested in the NYXR source; ships with the next Windows beta.
   PLANNED: not built yet. */
export const STATUS = {
  available: { label: 'Available', note: 'In the current Windows beta' },
  beta: { label: 'Beta', note: 'In the download, still being tested' },
  next: { label: 'Next beta', note: 'Built and tested; ships next' },
  preview: { label: 'NYXR 5', note: 'Built and tested in NYXR 5; not a download yet' },
  planned: { label: 'Planned', note: 'Not built yet' },
};

const FEATURES = [
  ['Chat with memory and research sources', 'available'],
  ['Projects & coding workspace', 'available'],
  ['Voice: hold F8, hands-free F11', 'available'],
  ['Computer use with verification', 'beta'],
  ['Game Studio: one prompt to a played-and-checked game', 'available'],
  ['Macros you record and replay', 'available'],
  ['Student: PDF tutoring, quizzes, slideshows', 'available'],
  ['Claude, Codex and Antigravity through your signed-in plans', 'available'],
  ['Android phone companion', 'beta'],
  ['Instant commands and Exhibition mode', 'available'],
  ['Music: describe a song and hear it', 'available'],
  ['Drawings, realistic pictures and mind maps', 'available'],
  ['Show me how: rings the real button, step by step', 'available'],
  ['Ask about a screen area (Ctrl+Alt+A)', 'available'],
  ['Focus sessions with nudges and a daily briefing', 'available'],
  ['Hinglish commands and replies in your language', 'available'],
  ['Your AI first, then Claude → Codex → Antigravity fallback', 'available'],
  ['Stop everything (Ctrl+Alt+Backspace) and Permissions', 'available'],
  ['Notes, memory manager and custom instructions', 'available'],
  ['Schedules and second opinions from another AI', 'available'],
  ['Game Studio as an IDE: project folder, chat beside your game', 'preview'],
  ['Hands-free bar: hold F8 in any app, type in it, Write for me', 'preview'],
  ['Home with a living core; Nemesis and cursor-reactive themes', 'preview'],
  ['Type “/” for every command; suggestions that type themselves', 'preview'],
  ['Auto stays on base models; bigger models need your pick or a yes', 'preview'],
  ['Signed installer and automatic updates', 'planned'],
  ['Extension marketplace and visual workflow builder', 'planned'],
  ['Paid plans and cloud storage', 'planned'],
];

export function StatusBadge({ status }) {
  const item = STATUS[status];
  return (
    <span className={`status-badge status-${status}`} title={item.note}>
      {item.label}
    </span>
  );
}

export function FeatureStatus() {
  return (
    <section className="feature-status container" aria-labelledby="feature-status-title">
      <header data-reveal>
        <Eyebrow>WHAT WORKS TODAY</Eyebrow>
        <h2 id="feature-status-title">Every feature, honestly labelled.</h2>
        <ul className="status-legend" aria-label="What the labels mean">
          {Object.entries(STATUS).map(([key, item]) => (
            <li key={key}>
              <StatusBadge status={key} /> {item.note}
            </li>
          ))}
        </ul>
      </header>
      <ul className="status-list">
        {FEATURES.map(([name, status]) => (
          <li key={name} data-reveal>
            <span>{name}</span>
            <StatusBadge status={status} />
          </li>
        ))}
      </ul>
    </section>
  );
}

const FIRST = [
  ['“Hello NYXR”', 'Say hi with F8 or type it, to check your AI and voice.'],
  ['“Build a coin collection game”', 'Game Studio writes it, plays it to check, then opens it full screen. NYXR 5 adds a project folder and a chat beside the game.'],
  ['Drop in a PDF', 'Open Student and ask for a quiz or slides from your own notes.'],
  ['“Open Notepad”', 'A desktop action, done and verified, with every step shown.'],
  ['Settings → AI Providers', 'Pick the AI you already use. NYXR keeps it, and falls back only if it fails.'],
];

export function FirstSteps() {
  return (
    <section className="first-steps container" aria-labelledby="first-steps-title">
      <header data-reveal>
        <Eyebrow>START HERE</Eyebrow>
        <h2 id="first-steps-title">Your first five minutes with NYXR.</h2>
      </header>
      <ol>
        {FIRST.map(([title, text], index) => (
          <li key={title} data-reveal>
            <span className="first-number">{String(index + 1).padStart(2, '0')}</span>
            <div>
              <strong>{title}</strong>
              <p>{text}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
