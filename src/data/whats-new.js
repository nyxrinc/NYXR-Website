// Product facts from the current desktop source. Not a release-manifest override.
export const sourceUpdate = {
  date: '11 November 2026',
  label: 'WINDOWS BETA 5',
  href: '/updates/#beta-5',
};
export const openJarvisCloudProviders = [
  'OpenRouter',
  'OpenAI',
  'Anthropic',
  'Google Gemini',
  'DeepSeek',
  'MiniMax',
];

export const recentCapabilities = [
  {id:'nexus-games',icon:'code',title:'Your idea. A world to play.',
   text:'Describe an original game in a sentence. NYXR writes it, tests it by playing it, keeps repairing by itself and opens it full screen, centred, in front of your work.',
   detail:'Add images, files or web research as inspiration. Editing opens separately in Chrome. Uses your selected AI provider; results vary by prompt. Included in Windows beta 5.',
   href:'/games/',link:'Explore Game Studio',pages:['coding','chat','intelligence']},
  {id:'signed-in-providers',icon:'nodes',title:'The AI plans you already have.',
   text:'Claude Code, Codex and Antigravity (Gemini) work through the tools already signed in on your PC. NYXR never reads their logins.',
   detail:'Antigravity prefers Gemini 3.5 Flash and otherwise uses the newest Gemini Flash your account offers. Its MCP servers stay off unless you allow them.',
   href:'/updates/#beta-5',link:'See what changed',pages:['providers','intelligence','coding']},
  {id:'web-research',icon:'route',title:'Research, shown as it happens.',
   text:'Questions that need current sources are researched in the background, with live steps and the pages NYXR read.',
   detail:'Only public pages are read, and only sources NYXR actually found are cited.',
   href:'/updates/#beta-5',link:'See what changed',pages:['chat','intelligence']},
  {id:'plus-menu',icon:'spark',title:'One button. Every way to start.',
   text:'The chat + button attaches files, or sets the next message to Web research, Create a game, Write code, Use the computer, Make slides or Think longer.',
   detail:'A tool applies to one message. A slash command you type always wins.',
   href:'/updates/#beta-5',link:'See what changed',pages:['chat']},
  {id:'performance-levels',icon:'sliders',title:'Lighter on modest PCs.',
   text:'AUTO chooses FULL, BALANCED or PERFORMANCE from your processor, memory and graphics. You can change it in Settings.',
   detail:'On the build PC, idle chat CPU fell from about 45% to 2–5% and the window opened about twice as fast. Your results depend on your hardware.',
   href:'/updates/#beta-5',link:'See what changed',pages:['personalization','intelligence']},
  {
    id: 'openjarvis',
    icon: 'nodes',
    title: 'OpenJarvis, on your terms.',
    text: 'Choose local Ollama or an explicit cloud model for text, coding and planning. NYXR keeps its own tools and approvals.',
    detail:
      'Cloud keys are saved in Windows Credential Manager. OpenJarvis stays out of AUTO fallback.',
    href: '/openjarvis/',
    link: 'Explore OpenJarvis',
    pages: ['providers', 'intelligence', 'chat'],
  },
  {
    id: 'background-replies',
    icon: 'chat',
    title: 'Replies, with a clear scope.',
    text: 'A source beta for one selected WhatsApp Web conversation. Start with drafts, or explicitly enable a limited automatic session.',
    detail:
      'Requires the updated Chrome connector and site access. Pauses for active typing; uncertain sends are not replayed. Session does not restart automatically.',
    href: '/computer-use/#background-replies',
    link: 'See the boundaries',
    pages: ['computer', 'chat'],
  },
  {
    id: 'voice-choice',
    icon: 'voice',
    title: 'Give your assistant a voice.',
    text: 'Use Fish Audio, choose an ElevenLabs British assistant preset, or keep your existing speech setup.',
    detail:
      'Voice previews may use provider credits. A personality change does not silently change your voice provider.',
    href: '/voice/#voice-presets',
    link: 'Explore voice choices',
    pages: ['voice', 'personalization'],
  },
  {
    id: 'jarvis-sounds',
    icon: 'sliders',
    title: 'A command center you can hear.',
    text: 'JARVIS Interface adds bundled control-panel sounds for navigation, progress, completion and attention.',
    detail:
      'Adjust volume, voice ducking and individual sounds in SFX settings. Theme following and manual selection remain separate.',
    href: '/personalization/#interface-sounds',
    link: 'Make it sound like NYXR',
    pages: ['voice', 'personalization'],
  },
  {
    id: 'verified-actions',
    icon: 'cursor',
    title: 'Observe. Act. Check.',
    text: 'Browser plans use the intended profile, tab and document. Invalid verification steps get a bounded repair before input starts.',
    detail:
      'A prepared email, a submitted message and a verified outcome remain different states. Uncertain submissions stop for inspection.',
    href: '/computer-use/#browser-recovery',
    link: 'How verification works',
    pages: ['computer', 'macros'],
  },
  {
    id: 'source-recovery',
    icon: 'code',
    title: 'Keep the work you already did.',
    text: 'Source candidates, last-good files and checkpoints help coding tasks recover at the current file and stage.',
    detail:
      'Purpose-specific generation budgets, Unicode handling and compatible model routing support longer work. A provider response still needs source validation.',
    href: '/coding/#source-recovery',
    link: 'Explore coding recovery',
    pages: ['coding', 'intelligence'],
  },
];
