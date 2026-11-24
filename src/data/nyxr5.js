// NYXR 5: what is built today, compared honestly with the first NYXR 4 build.
// NYXR 5.1 is the NYXR download; NYXR 4 beta 6 remains as the previous version.
import release from './nyxr5-release.json';

export const nyxr5Release = release;
export const nyxr5Size = `${Math.round(release.installer.bytes / 1_000_000)} MB`;
export const nyxr5 = {
  status: 'AVAILABLE NOW',
  statusNote:
    'NYXR 5.1 is the NYXR to download: one click installs it, and a short setup picks your AI and voice. It is not yet code-signed, so Windows may ask you to confirm. It installs over NYXR 5 previews and shares your chats and settings with NYXR 4. From 5.1 on, updates download only what changed.',
  date: '24 November 2026',
};

// The first NYXR 4 build (an early single-file alpha, labelled "OS v3.5" inside) vs NYXR 5 today.
export const comparison = [
  ['Foundation', 'One 1,330-line Python file running a fixed 1280 × 840 PySide6 window.',
    'A Tauri 2 + Svelte 5 app. NYXR’s full engine runs beside it as a private local service.'],
  ['Thinking', 'One fixed model (Gemini Flash Lite) through a Puter browser bridge.',
    'The AI you choose, picked per chat: your own keys, or Claude Code, Codex and Antigravity through plans already signed in on your PC. NYXR checks its own maths and code, so base models scored 93/93 on our test set.'],
  ['Understanding you', 'Four request types and a short list of exact commands.',
    'Instant commands, Hinglish, clarifying questions, saved commands and skills, then NYXR’s full planner.'],
  ['Doing things on your PC', 'Mouse and keyboard scripting from screenshots, up to 16 steps.',
    'Windows-Use with verification, Mission Control for multi-step tasks with approvals, and NYXR’s own cursor plus a Stop button on screen whenever it works.'],
  ['Browser & messages', 'A local Chrome link and one hard-wired WhatsApp flow behind an “authorize” box.',
    'The Chrome companion, web research with real sources, and scoped Background Replies you approve.'],
  ['Voice', 'None.',
    'A hands-free bar: hold F8 in any app to talk, or type in it. Write for me types into any textbox you click, grammar-checked. Wake phrase and spoken replies.'],
  ['Making things', 'None.',
    'Game Studio as an IDE, coding for any project type, realistic pictures, mind maps, songs from real music AIs and a Slides maker.'],
  ['Learning', 'None.', 'Student: homework solved from your actual textbook page, maths shown properly, a tutor for your PDFs, flashcards and a study plan.'],
  ['Interface', 'A HUD dashboard with a radar core, system gauges and a command terminal.',
    'Home with a living NYXR core, three themes with a core each (Midnight, Nexus Pro, Nemesis), and a layout that works down to phone width.'],
  ['At rest', 'CPU, memory and disk gauges refreshing all the time.',
    'About zero CPU when idle. Animations pause when you look away.'],
  ['Phone', 'None.', 'Pair an Android phone with a five-digit code.'],
  ['Memory', 'A session file with the last few messages.', 'Memory, notes and custom instructions you can read and change.'],
];

// New in NYXR 5.1, each one something you can do today.
export const highlights51 = [
  {
    icon: 'nodes',
    title: 'It reads the actual page.',
    text: 'Ask for “Ganita Manjari, page 185, Q1 and Q2” and NYXR finds the official NCERT PDF, works out which chapter holds page 185, opens it and solves the questions step by step.',
    detail: 'Printed page numbers are matched to the PDF’s own. If the publisher’s site is slow, NYXR says so and keeps downloading in the background.',
  },
  {
    icon: 'spark',
    title: 'It checks its own work.',
    text: 'Hard maths is solved two ways and checked with a calculator; code runs before you see it; “exactly ten words” is counted. Base models went from 89–90 to 93 out of 93 on our test set.',
    detail: 'Auto still uses each tool’s base model. NYXR offers a bigger model only on the hardest tasks, and only with your yes.',
  },
  {
    icon: 'chat',
    title: 'Maths you can read.',
    text: 'Fractions, roots, subscripts and aligned working are typeset like a textbook, not shown as code.',
    detail: 'The typesetter loads only when a reply has maths. Prices like “$5 and $10” stay as text.',
  },
  {
    icon: 'code',
    title: 'Build anything.',
    text: 'Websites, browser and pygame games, desktop and command-line apps: 13 project types, each with a starter, a sandboxed run or preview and checks that fit.',
    detail: 'Game Studio uses free-licence web sprites with credits, or your own pictures, when you ask. It never generates art you didn’t want.',
  },
  {
    icon: 'cursor',
    title: 'You see when it drives.',
    text: 'Whenever NYXR uses your computer, its own cursor glides to what it is doing and a banner says “NYXR is using your computer”, with a Stop button.',
    detail: 'The overlay never takes your clicks and stays out of NYXR’s own screenshots.',
  },
  {
    icon: 'route',
    title: 'Mission Control and Slides.',
    text: 'Launch a multi-step task and watch each step; risky ones wait for your OK. Studio now makes slide decks on any topic, with pictures, ready as .pptx.',
    detail: 'Every chat also gets its own model picker, Copy, Regenerate and Edit-and-resend.',
  },
];

// Measured for 5.1 (details and method on the blog).
export const measured51 = [
  ['93/93', 'questions right on base models, up from 89 and 90'],
  ['71 s', 'to solve page 185 from the official NCERT PDF; 29 s when asked again'],
  ['16', 'issues found and fixed in a pre-release pressure test, 3 of them high'],
  ['114 → 12', 'known vulnerabilities in NYXR’s Python packages'],
];

// The headline changes from NYXR 5, still there in 5.1.
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

// Real screenshots of the app (fresh data folder).
export const shots = [
  {
    src: '/screenshots/nyxr51-slides.webp',
    alt: 'NYXR 5.1 Studio Slides tab showing a generated bakery deck in the Warm style, with Download .pptx and style choices',
    caption: 'New in 5.1: Slides in Studio, any topic, any style.',
    width: 1376,
    height: 814,
  },
  {
    src: '/screenshots/nyxr51-mission.webp',
    alt: 'NYXR 5.1 Mission Control with a three-step plan: two reminders done and a message step waiting for approval',
    caption: 'New in 5.1: Mission Control runs multi-step tasks.',
    width: 1296,
    height: 734,
  },
  {
    src: '/screenshots/nyxr51-approvals.webp',
    alt: 'NYXR 5.1 Mission Control approvals tab: a WhatsApp message step waiting with Approve and Reject buttons',
    caption: 'Risky steps wait for your OK.',
    width: 1296,
    height: 734,
  },
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
    src: '/screenshots/nyxr5-setup.webp',
    alt: 'NYXR 5 first-run setup: pick your AI, with signed-in Antigravity, Claude Code and Codex and free-key providers',
    caption: 'Setup finds the AI you already have, or a free one.',
  },
  {
    src: '/screenshots/nyxr5-quest.webp',
    alt: 'NYXR 5 starter quest in the sidebar with three of six first steps ticked off',
    caption: 'A starter quest ticks itself off as you go.',
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
  ['NYXR 5', 'A new, lighter app around the same engine: a living core, Game Studio IDE, the hands-free bar, instant commands and a one-click installer with guided setup.'],
  ['NYXR 5.1', 'Homework from the real textbook page, answers that check themselves, typeset maths, any project type, Mission Control, a visible cursor when NYXR drives, and small signed updates.'],
];
