// Product facts from the current desktop source. Not a release-manifest override.
export const sourceUpdate = {
  date: '30 October 2026',
  label: 'LATEST SOURCE UPDATE',
  href: '/updates/#october-reliability',
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
