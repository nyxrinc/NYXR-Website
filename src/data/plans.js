import catalog from './plan-catalog.json' with { type: 'json' };

// NYXR product plans. Provider allowances remain a separate sourced snapshot.
// Planned prices are INR offers, never conversions of a display preference.
// Generated from commerce/plans.json; never maintain a second price/limit table.
export const planCurrency = catalog.currency;
export const planInterval = catalog.interval;
const catalogById = Object.fromEntries(catalog.plans.map((plan) => [plan.id, plan]));
export const plusBenefits = {
  backupGB: catalogById.plus.limits.storage_bytes / 1_000_000_000,
  devices: catalogById.plus.limits.device_limit,
  historyDays: catalogById.plus.limits.history_days,
};

export const coreFeatures = [
  'BYOK & local model chat',
  'Coding workspace',
  'Voice & Chrome tools',
  'Macros & local workflows',
  'Local PDF tutoring & slides',
];

const personalCloudFeatures = (id) => {
  const limits = catalogById[id].limits;
  return [
    'Everything in free Core',
    `${limits.storage_bytes / 1_000_000_000} GB opt-in encrypted cloud backup`,
    `Sync across ${limits.device_limit} devices`,
    `${limits.history_days}-day version history`,
  ];
};

const planPresentation = [
  {
    id: 'core',
    label: 'Your everyday workspace',
    period: 'No NYXR subscription',
    description: 'Your AI tools, on your computer. Keep using the full local workspace for free.',
    features: coreFeatures,
    available: true,
    cta: 'Download Core',
    href: '/download/',
    note: 'See the Windows beta download for release availability and known limitations.',
  },
  {
    id: 'plus',
    label: 'Your work, carried forward',
    period: 'per month',
    description:
      'Keep an optional cloud copy and pick up your personal workspace on another device.',
    features: personalCloudFeatures('plus'),
    available: false,
    cta: 'Coming soon',
    note: 'Planned service. Backup and sync are not live yet.',
  },
  {
    id: 'student_plus',
    label: 'A little more room to learn',
    period: 'per month',
    description: 'The same planned Plus benefits, at a lower price for verified eligible students.',
    features: personalCloudFeatures('student_plus'),
    available: false,
    requiresVerification: true,
    cta: 'Coming soon',
    note: 'Verified student eligibility required at launch. Selecting this plan does not unlock it.',
  },
  {
    id: 'teams',
    label: 'A shared place to make progress',
    period: 'per seat / month',
    description: 'Bring people and repeatable work together, with a workspace your team can share.',
    features: [
      'Everything in free Core',
      'Shared workspaces',
      'Shared Macro libraries',
      'Workspace permissions',
      'Activity history',
    ],
    available: false,
    cta: 'Coming soon',
    note: 'Planned service. Cloud and collaboration features are not live yet.',
  },
];

export const plans = planPresentation.map((presentation) => ({
  ...presentation,
  name: catalogById[presentation.id].name,
  price: catalogById[presentation.id].amount_minor / 100,
  amountMinor: catalogById[presentation.id].amount_minor,
  limits: catalogById[presentation.id].limits,
}));

export const previewLimits = (plan) => [
  {
    label: 'Cloud backup',
    value: plan.available
      ? 'Not included'
      : `${plan.limits.storage_bytes / 1_000_000_000} GB planned`,
  },
  {
    label: 'Cloud device sync',
    value: plan.available ? 'Not included' : `${plan.limits.device_limit} devices planned`,
  },
  {
    label: 'Cloud version history',
    value: plan.available ? 'Not included' : `${plan.limits.history_days} days planned`,
  },
  { label: 'NYXR local token quota', value: 'None' },
];

const cloudValues = (key, format) =>
  plans.map((plan) => (plan.id === 'core' ? 'Not included' : format(plan.limits[key])));

export const featureMatrix = [
  {
    label: 'Chat, coding, voice, Chrome & Macros',
    values: ['Included', 'Included', 'Included', 'Included'],
  },
  {
    label: 'Local PDF tutoring & slides',
    values: ['Included', 'Included', 'Included', 'Included'],
  },
  { label: 'NYXR-imposed local token quota', values: ['None', 'None', 'None', 'None'] },
  {
    label: 'Opt-in encrypted cloud backup',
    values: cloudValues('storage_bytes', (value) => `${value / 1_000_000_000} GB planned`),
  },
  {
    label: 'Device sync',
    values: cloudValues('device_limit', (value) => `${value} devices planned`),
  },
  {
    label: 'Cloud version history',
    values: cloudValues('history_days', (value) => `${value} days planned`),
  },
  {
    label: 'Shared workspaces & Macro libraries',
    values: ['Not included', 'Not included', 'Not included', 'Planned'],
  },
  {
    label: 'Team permissions & activity history',
    values: ['Not included', 'Not included', 'Not included', 'Planned'],
  },
  {
    label: 'Student eligibility verification',
    values: ['Not required', 'Not required', 'Required at launch', 'Not required'],
  },
];

export const planFAQs = [
  {
    question: 'What does Preview plan do?',
    answer:
      'It lets you compare a planned tier and its included limits on this page. Preview only — no subscription or charge. The selection is temporary browser UI, resets on reload and does not create an account, verify student eligibility, enable cloud storage or grant an entitlement.',
  },
  {
    question: 'Do I need Plus to keep using NYXR?',
    answer:
      'No. Core stays free, including BYOK or local chat, coding, voice, Chrome tools, Macros, and local PDF tutoring and slides. The future paid plans add optional cloud services or team collaboration.',
  },
  {
    question: 'Are AI provider charges included?',
    answer:
      'No. Bring your own provider account or use an installed local model. Provider charges, account quotas and model terms apply separately. NYXR imposes no local token quota; local use depends on your hardware, electricity and model license.',
  },
  {
    question: 'Can I subscribe or activate a student discount now?',
    answer:
      'Not yet. Paid accounts, payments and cloud storage are not configured for production. There is no checkout, waitlist form or charge today. Student Plus will require verified eligibility; a self-declared student status will not unlock paid benefits.',
  },
  {
    question: 'Will my work or provider keys be uploaded?',
    answer:
      'Planned backups will be encrypted and opt-in. You will choose what to back up before enabling the service. Provider keys remain local and are excluded from planned NYXR cloud backups. Connected AI providers may receive the content needed for your requests under their own policies.',
  },
  {
    question: 'Why do the prices stay in INR when I change currency?',
    answer:
      'Future billing is INR-only. These are planned INR prices, with no currency conversion or international price implied. Your country and currency selectors are display preferences. A future checkout must verify billing country and confirm the authoritative server price in INR, applicable taxes and final total before any purchase.',
  },
];

export const formatPlanPrice = (amount) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: planCurrency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
