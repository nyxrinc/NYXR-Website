export const themes = [
  {
    id: 'nexus',
    name: 'NEXUS',
    color: '#32dfff',
    description: 'NYXR’s living heart. Cursor-responsive orbital depth, neon cyan-blue text and onyx glass.',
  },
  {
    id: 'core',
    name: 'NYXR Core',
    color: '#76edff',
    description: 'The original. Deep navy, cool light, a little space to think.',
  },
  {
    id: 'hacker',
    name: 'Hacker',
    color: '#72ed9a',
    description: 'Terminal green, quiet contrast, and a little Matrix rain.',
  },
  {
    id: 'violet',
    name: 'Cyber Violet',
    color: '#bc9fff',
    description: 'A softer spectrum. Violet instruments against midnight.',
  },
  {
    id: 'arctic',
    name: 'Arctic',
    color: '#9ce7ff',
    description: 'Cool blue clarity. A crisp, lighter perspective.',
  },
  {
    id: 'ember',
    name: 'Ember',
    color: '#ffad7c',
    description: 'Warm amber accents. Focus with a different temperature.',
  },
  {
    id: 'light',
    name: 'Minimal Light',
    color: '#d9e8ec',
    description: 'A quieter canvas. Airy surfaces and clear, dark type.',
  },
];

export const providers = [
  ['OpenRouter', 'OR', 'Model ecosystem'],
  ['Ashna AI', 'A', 'Multi-model API'],
  ['NVIDIA NIM', 'N', 'Hosted inference'],
  ['Gemini Direct', '✧', 'Google models'],
  ['Puter', 'P', 'Browser sign-in'],
  ['FreeLLMAPI', 'F', 'Gateway routing'],
  ['Z.AI', 'Z', 'GLM models'],
  ['Moonshot', 'M', 'Kimi models'],
  ['Groq', 'G', 'Hosted inference'],
  ['Cerebras', 'C', 'Hosted inference'],
  ['Mistral', '/', 'Mistral models'],
  ['OpenAI', '◎', 'Configured API'],
  ['Ollama', 'O', 'Installed models · LOCAL mode'],
];

export const gallery = [
  {
    id: 'theme-nexus', title: 'The NEXUS core', category: 'Personalization',
    description: 'Actual NEXUS Command Center. The shared core remains central in every theme.',
  },
  {
    id: 'dashboard',
    title: 'Command Center',
    category: 'Workspace',
    description: 'The N Core, system overview and project snapshot in one place.',
  },
  {
    id: 'projects',
    title: 'Room to build',
    category: 'Workspace',
    description: 'Real file explorer, editor tabs and the coding assistant.',
  },
  {
    id: 'chat',
    title: 'A conversation with context',
    category: 'Workspace',
    description: 'An authored showcase conversation in the actual Chat interface.',
  },
  {
    id: 'voice-dock',
    title: 'A smaller way to ask',
    category: 'Modes',
    description:
      'The actual F11 quick-text and voice surface. Capture is idle; no microphone is active.',
  },
  {
    id: 'hud',
    title: 'Always beside you',
    category: 'Modes',
    description: 'NYXR’s compact side-docked HUD, captured from the real app.',
  },
  {
    id: 'personalization',
    title: 'Make it feel like you',
    category: 'Personalization',
    description: 'The theme library in the real NEXUS Theme Studio.',
  },
  {
    id: 'skills',
    title: 'A different approach',
    category: 'Workspace',
    description: 'Built-in skill profiles and their task instructions.',
  },
  {
    id: 'theme-hacker',
    title: 'The Hacker profile',
    category: 'Personalization',
    description: 'Actual Hacker theme applied to the NYXR Command Center.',
  },
  {
    id: 'macros',
    title: 'Record. Understand. Run.',
    category: 'Workspace',
    description: 'The actual Macros workspace, ready to record or open a saved routine.',
  },
  {
    id: 'fullscreen',
    title: 'Take the whole canvas',
    category: 'Modes',
    description: 'The real Chat interface at 1920×1080, distinct from the compact HUD.',
  },
  {
    id: 'providers',
    title: 'Connections, clearly',
    category: 'Workspace',
    description: 'Actual connection status. External services were disabled for these captures.',
  },
  {
    id: 'student', title: 'A place to learn', category: 'Workspace',
    description: 'The actual Student workspace, ready for local PDF study material.',
  },
  {
    id: 'core-editor', title: 'Tune your AI heart', category: 'Personalization',
    description: 'The live core editor: orbital depth, size, glow, rings and cursor response.',
  },
  {
    id: 'theme-light',
    title: 'A lighter perspective',
    category: 'Personalization',
    description: 'The actual Minimal Light profile, with the same NYXR identity.',
  },
];

export const features = [
  [
    'memory',
    'Student tutor',
    'Learn from local PDFs with explanations, quizzes and source-page references.',
  ],
  [
    'panel',
    'Slideshows',
    'Review an outline and export editable PowerPoint slides with speaker notes.',
  ],
  ['chat', 'Conversation', 'Pick up the thread across persistent, independent chats.'],
  ['code', 'Coding', 'Inspect files, propose changes, validate and recover.'],
  ['folder', 'Projects', 'Keep files, conversations and task context together.'],
  ['cursor', 'Computer Use', 'Plan actions, execute through tools, inspect the result.'],
  ['voice', 'Voice', 'Hold F8 to speak while hands-free mode is enabled.'],
  [
    'voice',
    'Write for me',
    'F11 mode dropdown, textbox selection and F8 dictation. Grammar below 9/10 is rewritten; text is inserted without sending. Included in beta 3.',
    'BETA 3 / WRITE FOR ME',
  ],
  ['panel', 'HUD & Full Screen', 'A side companion or the whole desktop canvas.'],
  ['spark', 'Skills', 'Choose the approach that fits the current task.'],
  [
    'route',
    'Macros',
    'Record a workflow. AI plans from evidence; Windows-Use executes and verifies.',
  ],
  ['memory', 'Memory', 'Bring relevant context forward when it helps.'],
  ['nodes', 'Providers', 'Choose cloud routes or explicitly select local mode.'],
  ['sliders', 'Personalization', 'Your name, conversation style, appearance and behavior.'],
  ['timeline', 'Visible progress', 'Follow execution and recovery in the Agent Timeline.'],
  [
    'nodes',
    'Teams',
    'Beta foundations for explicitly selected text files, Macro JSON export/import, workspace permissions and audit history. Hosted access awaits account service configuration.',
    'BETA FOUNDATIONS / HOSTED PENDING',
  ],
];

export const walkthroughs = {
  build: {
    prompt: 'Build a small website for my next idea.',
    title: 'From a blank folder to a clear plan.',
    steps: [
      ['Planning', 'Inspect the workspace and define the file manifest.'],
      ['Generating', 'Create index.html, styles.css and script.js.'],
      ['Validating', 'Check source structure, syntax and expected files.'],
      ['Repairing', 'Apply targeted fixes while retaining last-good source.'],
      ['Final verify', 'Inspect the result and preserve the checkpoint.'],
      ['Complete', 'The scripted walkthrough is complete. No files were written.'],
    ],
  },
  computer: {
    prompt: 'Open Notepad and create Daily tasks.txt.',
    title: 'A plan before a single action.',
    steps: [
      ['Context', 'Inspect the current application and relevant task history.'],
      ['Planning', 'Build a structured plan for the requested goal.'],
      ['Validating', 'Resolve the intended targets and expected state.'],
      ['Executing', 'Windows-Use carries out validated steps.'],
      ['Verifying', 'Check the foreground app and the intended file.'],
      ['Complete', 'Demo complete. This website did not control your computer.'],
    ],
  },
  research: {
    prompt: 'Help me research an idea for a new project.',
    title: 'Find the thread. Keep the context.',
    steps: [
      ['Context', 'Read the request and relevant conversation context.'],
      ['Skills', 'Scope the research profile to this task.'],
      ['Routing', 'Find a compatible route within provider policy.'],
      ['Researching', 'Use the appropriate search and research tools.'],
      ['Synthesizing', 'Bring the findings back into the conversation.'],
      ['Complete', 'Demo complete. No live search or AI request was made.'],
    ],
  },
};
