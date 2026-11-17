// NYXR 5: what is built today, compared honestly with the first NYXR 4 build.
// NYXR 5 is a downloadable preview (5.0.0-preview.1); NYXR 4 Windows beta 6 stays the main download.
import release from './nyxr5-release.json';

export const nyxr5Release = release;
export const nyxr5Size = `${Math.round(release.installer.bytes / 1_000_000)} MB`;
export const nyxr5 = {
  status: 'PREVIEW',
  statusNote:
    'NYXR 5 is a preview: an early, unsigned build for trying the new app. It installs beside NYXR 4 and shares your chats and settings with it. Windows beta 6 stays the main download.',
  date: '17 November 2026',
};

// The first NYXR 4 build (an early single-file alpha, labelled "OS v3.5" inside) vs NYXR 5 today.
export const comparison = [
  ['Foundation', 'One 1,330-line Python file running a fixed 1280 × 840 PySide6 window.',
    'A Tauri 2 + Svelte 5 app. NYXR’s full engine runs beside it as a private local service.'],
  ['Thinking', 'One fixed model (Gemini Flash Lite) through a Puter browser bridge.',
    'The AI you choose: your own keys, or Claude Code, Codex and Antigravity through plans already signed in on your PC. Auto stays on each tool’s base model; anything bigger needs your pick or a yes.'],
  ['Understanding you', 'Four request types and a short list of exact commands.',
    'Instant commands, Hinglish, clarifying questions, saved commands and skills, then NYXR’s full planner.'],
  ['Doing things on your PC', 'Mouse and keyboard scripting from screenshots, up to 16 steps.',
    'Windows-Use with verification, macros you record and replay after a review, and one Stop everything key.'],
  ['Browser & messages', 'A local Chrome link and one hard-wired WhatsApp flow behind an “authorize” box.',
    'The Chrome companion, web research with real sources, and scoped Background Replies you approve.'],
  ['Voice', 'None.',
    'A hands-free bar: hold F8 in any app to talk, or type in it. Write for me types into any textbox you click, grammar-checked. Wake phrase and spoken replies.'],
  ['Making things', 'None.',
    'Game Studio as an IDE, realistic pictures, mind maps and diagrams, music and slides.'],
  ['Learning', 'None.', 'Student: a tutor for your PDFs, flashcards, revision plans and slide decks.'],
  ['Interface', 'A HUD dashboard with a radar core, system gauges and a command terminal.',
    'Home with a living NYXR core, three themes with a core each (Midnight, Nexus Pro, Nemesis), and a layout that works down to phone width.'],
  ['At rest', 'CPU, memory and disk gauges refreshing all the time.',
    'About zero CPU when idle. Animations pause when you look away.'],
  ['Phone', 'None.', 'Pair an Android phone with a five-digit code.'],
  ['Memory', 'A session file with the last few messages.', 'Memory, notes and custom instructions you can read and change.'],
];

// The headline changes, each one something you can do today in NYXR 5.
export const highlights = [
  {
    icon: 'code',
    title: 'Game Studio is an IDE now.',
    text: 'Open a folder as a project. Chat on the left with every chat feature and the model picker; your game plays on the right. Each message makes or changes the game, and every version lands in your folder as a page that plays in any browser.',
    detail: 'Previous games, top right, plays or saves anything you made before. Tweaks, Undo, Fix it and Antigravity sprites sit on the game’s toolbar.',
  },
  {
    icon: 'voice',
    title: 'Hold F8. Anywhere.',
    text: 'Turn hands-free on and a small bar sits on your desktop. Hold F8 in any app to talk to NYXR; hover the bar to type instead.',
    detail: 'Switch the bar to Write for me: say or type the words, click any textbox, and NYXR writes them in, corrected when the grammar scores under 9/10. It never presses Enter.',
  },
  {
    icon: 'spark',
    title: 'A living core.',
    text: 'Home opens on the NYXR core: it leans toward your cursor and shows when NYXR is listening, thinking or speaking. A greeting writes itself in, with everything else one tap away.',
    detail: 'Every theme has its own core: orbits in Midnight, a pearl in Blossom, a water drop in Rain, a wireframe globe in Hacker, an arc reactor in Nemesis.',
  },
  {
    icon: 'sliders',
    title: 'Nemesis, and backgrounds that answer.',
    text: 'Nemesis is a dark, neon-blue HUD theme. Aurora’s lights drift with your cursor, and in Rain your cursor wipes the glass.',
    detail: 'One typeface throughout, light and calm. Reduce effects keeps everything still.',
  },
  {
    icon: 'chat',
    title: 'Type “/”. See everything.',
    text: 'Every command appears the moment you type a slash, filtered as you go. Empty chat boxes type out suggestions that fit where you are, until you reach for them.',
    detail: 'Press Tab to use the suggestion shown.',
  },
  {
    icon: 'nodes',
    title: 'Light enough to forget it’s open.',
    text: 'Measured with Home open and still: about 16 to 31 milliseconds of CPU over 30 seconds, across every NYXR process.',
    detail: 'Nothing animates in a window you are not looking at, and helper windows are closed, not hidden, when they finish.',
  },
];

// Real screenshots of the installed preview (fresh data folder, no provider connected).
export const shots = [
  {
    src: '/screenshots/nyxr5-home.webp',
    alt: 'NYXR 5 Home in the Nemesis theme, with the arc-reactor core in the centre and the dock below',
    caption: 'Home in Nemesis: the core, a greeting and the dock.',
  },
  {
    src: '/screenshots/nyxr5-midnight.webp',
    alt: 'NYXR 5 Home in the Midnight theme with the orbital NYXR core',
    caption: 'Midnight, with its orbital core.',
  },
  {
    src: '/screenshots/nyxr5-commands.webp',
    alt: 'NYXR 5 chat with the command list open after typing a slash',
    caption: 'Type “/” and every command appears.',
  },
  {
    src: '/screenshots/nyxr5-studio.webp',
    alt: 'NYXR 5 Game Studio asking to open a project folder, with Previous games at the top right',
    caption: 'Game Studio starts with a project folder.',
  },
  {
    src: '/screenshots/nyxr5-quick.webp',
    alt: 'NYXR 5 Quick Features sheet listing everything NYXR can do and create',
    caption: 'Quick Features: everything to do and create.',
  },
];

// What NYXR 5 keeps from NYXR 4: the engine, unchanged.
export const carriesOver = [
  'The same engine: routing, planner, agent and executors',
  'Your chats, projects, reminders and settings',
  'Providers with failover and per-chat model choice',
  'Companion: Show me how, Ctrl+Alt+A, focus sessions',
  'Student, Memory, Commands, Skills and Macros',
  'Stop everything and per-action permissions',
];

export const timeline = [
  ['First NYXR 4 build', 'A single-file alpha: one window, one model, a HUD and a terminal.'],
  ['NYXR 4 betas 1–6', 'Coding, voice, Write for me, Game Studio, Student, music, pictures, Companion, signed-in providers.'],
  ['NYXR 5 preview', 'A new, lighter app around the same engine, with a new Home, themes, Game Studio IDE and the hands-free bar. Now a preview download.'],
];
