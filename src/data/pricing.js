// Public-source snapshot, not a user's balance. Keep caps, credits and requests separate.
export const pricingReviewed = '2026-10-18';
// Publisher-reported README snapshot, not independently measured capacity or a user's quota.
// Catalog counts vary; keep this exact source and never present it as a live balance.
export const gatewayEcosystem = {
  name: 'FreeLLMAPI',
  monthlyTokens: 7_400_000_000,
  upstreamProviders: 34,
  modelEndpoints: 635,
  source: 'https://github.com/tashfeenahmed/freellmapi#readme',
  catalog: 'https://freellmapi.co/models',
  freeSnapshotLagDays: 30,
};
export const groqSource = 'https://console.groq.com/docs/rate-limits';
export const tokenExamples = [
  { model: 'openai/gpt-oss-120b', dailyTokens: 200_000 },
  { model: 'openai/gpt-oss-20b', dailyTokens: 200_000 },
  { model: 'qwen/qwen3.8-27b', dailyTokens: 200_000 },
];
export const dailyCapSum = tokenExamples.reduce((total, model) => total + model.dailyTokens, 0);
export const exampleDays = 30;
export const exampleTokens = dailyCapSum * exampleDays;

// Match the existing integrations in product.js. No gateway is counted as extra upstream quota.
export const providerAllowances = [
  {
    name: 'OpenRouter',
    type: 'Free models',
    category: 'free',
    allowance: 'Selected free models',
    detail:
      'Request limits and availability depend on the account and route. A request limit cannot be converted into a fixed token allowance.',
    source: 'https://openrouter.ai/docs/api_reference/limits',
    contribution: 'Requests, not a fixed token grant',
  },
  {
    name: 'Ashna AI',
    type: 'Account quota',
    category: 'account',
    allowance: 'Your account entitlement',
    detail:
      'An integration is available. No universal recurring free API token allowance was established in the public documentation reviewed.',
    source: 'https://www.ashna.ai/api-docs',
    contribution: 'Not included',
  },
  {
    name: 'NVIDIA NIM',
    type: 'Development access',
    category: 'free',
    allowance: 'Selected free development endpoints',
    detail:
      'Free endpoints are for development and subject to trial terms, traffic and rate limits. This is not an unlimited production allowance.',
    source: 'https://build.nvidia.com/nvidia/nemotron-3.5-content-safety',
    contribution: 'No fixed recurring token grant',
  },
  {
    name: 'Gemini Direct',
    type: 'Free tier',
    category: 'free',
    allowance: 'Eligible models and regions',
    detail:
      'Model and project limits apply. Active quotas are shown in AI Studio; input tokens/minute are throughput, not a daily token gift.',
    source: 'https://ai.google.dev/gemini-api/docs/rate-limits',
    contribution: 'Account/model limits vary',
  },
  {
    name: 'Puter',
    type: 'Monthly allowance',
    category: 'free',
    allowance: 'Account usage credit',
    detail:
      'Puter includes a free monthly allowance. Your Puter account covers usage and may need an upgrade when that allowance runs out.',
    source: 'https://docs.puter.com/user-pays-model/',
    contribution: 'Credit-based; no fixed token conversion',
  },
  {
    name: 'FreeLLMAPI',
    type: 'Gateway',
    category: 'gateway',
    allowance: '7.4B/month · publisher-reported ecosystem estimate',
    detail:
      'The cited FreeLLMAPI README reports 34 upstream providers and 635 model endpoints. Your configured keys, catalog version and compatible routes determine access. Intended for personal experimentation.',
    source: gatewayEcosystem.source,
    contribution: 'Includes overlapping direct providers; not an extra quota to add again',
  },
  {
    name: 'Z.AI',
    type: 'Free models',
    category: 'free',
    allowance: 'Selected Flash models',
    detail:
      'GLM-4.7-Flash and GLM-4.5-Flash are listed at no token charge. Other models can be paid. No fixed recurring token grant is stated here.',
    source: 'https://docs.z.ai/guides/overview/pricing',
    contribution: 'No fixed recurring token grant',
  },
  {
    name: 'Moonshot',
    type: 'Usage billing',
    category: 'account',
    allowance: 'Your API balance',
    detail:
      'Kimi API inference is billed by usage. Memberships and promotional credits are separate; a universal recurring free allowance is not assumed.',
    source: 'https://platform.kimi.ai/docs/pricing/chat',
    contribution: 'Not included',
  },
  {
    name: 'Groq',
    type: 'Free plan',
    category: 'free',
    allowance: '600K/day model-cap sum',
    detail:
      'Three published general text model caps of 200K tokens/day each. These are model limits within your organization, not a pooled NYXR balance. Other limits can bind first.',
    source: groqSource,
    contribution: '600K/day × selected example period',
    included: true,
  },
  {
    name: 'Cerebras',
    type: 'Limited trial',
    category: 'trial',
    allowance: '$5 trial credit · 30 days',
    detail:
      'Requires a verified payment method. Credit expires after 30 days. The current documentation explicitly says there is no permanently renewing free tier.',
    source: 'https://inference-docs.cerebras.ai/support/rate-limits',
    contribution: 'Trial excluded from recurring total',
  },
  {
    name: 'Mistral',
    type: 'Free mode',
    category: 'free',
    allowance: 'Limited evaluation API usage',
    detail:
      'Free mode is available without a card. Organization/model limits apply; the reviewed docs direct users to their own Limits page rather than a universal token number.',
    source:
      'https://docs.mistral.ai/getting-started/quickstarts/studio/activate-and-generate-api-key',
    contribution: 'Account/model limits vary',
  },
  {
    name: 'OpenAI',
    type: 'Usage billing',
    category: 'account',
    allowance: 'Your API balance',
    detail:
      'API usage is separate from ChatGPT/Codex subscriptions. No universal recurring free API grant is counted.',
    source: 'https://developers.openai.com/api/docs/pricing',
    contribution: 'Not included',
  },
  {
    name: 'Ollama',
    type: 'Local',
    category: 'local',
    allowance: 'Run installed models on your own machine',
    detail:
      'NYXR includes an Ollama integration for explicit LOCAL mode and manually chosen installed models. Local inference has no cloud token allowance; hardware, electricity and model licenses still apply. Automatic local fallback remains off unless you enable it.',
    source: 'https://docs.ollama.com/faq',
    contribution: 'Local compute; not a cloud allowance',
  },
];

export const comparisons = [
  {
    name: 'Codex',
    plan: 'ChatGPT Plus',
    usd: 20,
    description:
      'A paid option for focused coding sessions. Codex also has $0 Free access and an $8 Go plan; usage and features differ.',
    source: 'https://learn.chatgpt.com/docs/pricing',
    link: 'Official Codex pricing',
  },
  {
    name: 'Claude Code',
    plan: 'Claude Pro · monthly',
    usd: 20,
    description:
      'Included with Pro at $20 when billed monthly. Max starts at $100/month. Usage limits apply; these plans include other Claude features.',
    source: 'https://claude.com/pricing',
    link: 'Official Claude pricing',
  },
];
