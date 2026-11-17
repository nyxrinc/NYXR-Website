// One route per product area; also used to emit static hosting entry points.
export const pages = [
  {id:'nyxr5',path:'/nyxr-5/',label:'Introducing NYXR 5',group:'Discover',
   description:'Meet NYXR 5, in development: a lighter app around the same engine, with a living core, Game Studio as an IDE, a hands-free bar for every app and the Nemesis theme. Compared with the first NYXR 4 build.'},
  {id:'games',path:'/games/',label:'Game Studio',group:'Workspace',
   description:'Describe a game and play it. In Windows beta 6, NYXR builds and checks it; in NYXR 5, Game Studio works like an IDE: open a project folder, chat on the left, your game on the right.'},
  {
    id: 'openjarvis',
    path: '/openjarvis/',
    label: 'OpenJarvis',
    group: 'Intelligence',
    description:
      'Use local Ollama or explicit cloud models through NYXR’s manual OpenJarvis bridge, with Windows Credential Manager key storage and NYXR’s own action tools.',
  },
  {
    id: 'phone',
    path: '/phone/',
    label: 'Phone companion',
    group: 'Workspace',
    description:
      'Meet NYXR’s Android companion: same-Wi-Fi pairing, supported phone tasks, exact confirmations and clear beta availability.',
  },
  {
    id: 'updates',
    path: '/updates/',
    label: 'Release notes',
    group: 'Release',
    description:
      'NYXR 5 in development, Windows beta 6 and every earlier release: what changed, exact download versions and honest test results.',
  },
  {
    id: 'students',
    path: '/students/',
    label: 'For students',
    group: 'Workspace',
    description: 'Learn with your PDF study material, a contextual tutor, quizzes and flashcards.',
  },
  {
    id: 'slideshows',
    path: '/slideshows/',
    label: 'Slideshows',
    group: 'Workspace',
    description:
      'Generate, review and export editable PowerPoint presentations with speaker notes.',
  },
  {
    id: 'overview',
    path: '/',
    label: 'Home',
    group: 'Discover',
    description:
      'Meet NYXR, your personal AI assistant for Windows. Think, build, automate and learn in a workspace of your own. NYXR 5 is on its way.',
  },
  {
    id: 'features',
    path: '/features/',
    label: 'Features',
    group: 'Discover',
    description:
      'Explore NYXR coding, voice, Windows tools, Student, Game Studio and NYXR 5’s new abilities, each honestly labelled: in beta 6, next, or in NYXR 5.',
  },
  {
    id: 'chat',
    path: '/chat/',
    label: 'Chat',
    group: 'Workspace',
    description:
      'Persistent conversations, streaming responses and context that stays with your work.',
  },
  {
    id: 'coding',
    path: '/coding/',
    label: 'Projects & coding',
    group: 'Workspace',
    description: 'Inspect, plan, edit and validate projects with the NYXR coding workspace.',
  },
  {
    id: 'computer',
    path: '/computer-use/',
    label: 'Computer use',
    group: 'Workspace',
    description: 'How NYXR plans computer tasks, executes with tools and verifies the outcome.',
  },
  {
    id: 'voice',
    path: '/voice/',
    label: 'Voice & hands-free',
    group: 'Workspace',
    description:
      'Hold F8 to talk, Write for me with a grammar score, voice presets and interface sounds. In NYXR 5, a hands-free bar works from any app.',
  },
  {
    id: 'hud',
    path: '/modes/',
    label: 'HUD & full screen',
    group: 'Workspace',
    description: 'A full desktop workspace, an expanded canvas or a compact side companion.',
  },
  {
    id: 'skills',
    path: '/skills/',
    label: 'Skills',
    group: 'Intelligence',
    description: 'Choose task-scoped skills for coding, research, debugging and computer use.',
  },
  {
    id: 'macros',
    path: '/macros/',
    label: 'Macros',
    group: 'Intelligence',
    description:
      'Record a workflow, understand its plan and replay it through Windows-Use with verification.',
  },
  {
    id: 'providers',
    path: '/providers/',
    label: 'AI providers',
    group: 'Intelligence',
    description:
      'Connect your own AI providers, explicit local Ollama or the OpenJarvis text bridge. Explore task-compatible routing and secure API key storage.',
  },
  {
    id: 'personalization',
    path: '/personalization/',
    label: 'Personalization',
    group: 'Intelligence',
    description: 'Preview NYXR themes, from NEXUS to NYXR 5’s Nemesis, and explore conversation, voice and appearance preferences.',
  },
  {
    id: 'intelligence',
    path: '/core/',
    label: 'N Intelligence Core',
    group: 'Intelligence',
    description:
      'The context, models, tools and verification behind NYXR, with the central core and Write for me in beta 3.',
  },
  {
    id: 'demo',
    path: '/demo/',
    label: 'Interactive demo',
    group: 'Discover',
    description: 'Follow a scripted NYXR workflow in your browser. No live AI or desktop actions.',
  },
  {
    id: 'in-motion',
    path: '/film/',
    label: 'Product film',
    group: 'Discover',
    description: 'See the real NYXR desktop interface in a short, isolated showcase recording.',
  },
  {
    id: 'gallery',
    path: '/gallery/',
    label: 'Gallery',
    group: 'Discover',
    description: 'Explore real NYXR app captures, including Chat, Macros, HUD and personalization.',
  },
  {
    id: 'pricing',
    path: '/pricing/',
    label: 'Pricing & plans',
    group: 'Discover',
    description:
      'Free NYXR Core with your own AI providers or local models. Preview planned Plus, Student Plus and Teams services, with no subscriptions or charges today.',
  },
  {
    id: 'download',
    path: '/download/',
    label: 'Download',
    group: 'Release',
    description:
      'Download NYXR Windows beta 6 or the signed Android Exhibition Basic tester. NYXR 5 is in development and not a download yet. Compare versions, checksums and requirements.',
  },
  {
    id: 'documentation',
    path: '/guide/',
    label: 'Quick guide',
    group: 'Information',
    description:
      'Set up NYXR providers, OpenJarvis cloud keys, Chrome, voice, Background Replies and the same-Wi-Fi Android tester.',
  },
  {
    id: 'privacy',
    path: '/privacy/',
    label: 'Privacy Policy',
    group: 'Information',
    description:
      'NYXR Privacy Policy: local data, optional Firebase accounts, Chrome Native Messaging and provider content sharing.',
  },
  {
    id: 'terms',
    path: '/terms/',
    label: 'Terms and Conditions',
    group: 'Information',
    description:
      'Conditions for using the NYXR website, product information, provider integrations and pricing disclosures.',
  },
  {
    id: 'contact',
    path: '/contact/',
    label: 'Contact',
    group: 'Information',
    description:
      'Contact the NYXR team at nyxrinc@gmail.com for questions, feedback, support or privacy requests.',
  },
  {
    id: 'provenance',
    path: '/captures/',
    label: 'Capture provenance',
    group: 'Information',
    description:
      'How the real NYXR screenshots and product film were made in an isolated showcase.',
  },
  {
    id: 'about',
    path: '/about/',
    label: 'About NYXR',
    group: 'Information',
    description:
      'Meet NYXR, a desktop AI workspace for conversation, coding, voice and automation: NYXR 4 today, NYXR 5 in development.',
  },
];

export const pageByPath = Object.fromEntries(pages.map((page) => [page.path, page]));
export const pageById = Object.fromEntries(pages.map((page) => [page.id, page]));
export const normalizePath = (path) => (path === '/' ? '/' : `${path.replace(/\/+$/, '')}/`);
