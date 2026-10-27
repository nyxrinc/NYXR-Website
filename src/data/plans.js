import catalog from './plan-catalog.json' with { type: 'json' };
import { phoneLimits } from './phone-plans.js';

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
  'Write for me · included in beta 3',
  'Macros & local workflows',
  'Local PDF tutoring & slides',
  `Phone companion · ${phoneLimits('core').actions}, when released`,
];

const personalCloudFeatures = (id) => {
  const limits = catalogById[id].limits;
  return [
    'Everything in free Core',
    'Phone companion · unlimited with verified entitlement, when released',
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
    description:
      'Shared workspaces and reusable workflows, with beta foundations implemented in source.',
    features: [
      'Everything in free Core',
      'Phone companion · unlimited with verified entitlement, when released',
      'Shared workspaces',
      'Explicit text-file sharing',
      'Macro libraries · JSON export/import',
      'Workspace permissions',
      'Activity & audit history',
    ],
    available: false,
    status: 'PLANNED / BETA FOUNDATIONS',
    cta: 'Hosted access pending',
    note: 'Beta foundations implemented. Hosted availability awaits account service configuration. Payments are inactive.',
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
  { label: 'Phone actions / private beta', value: phoneLimits(plan.id).actions },
  { label: 'Paired phones / private beta', value: phoneLimits(plan.id).phones },
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
    label: 'Phone actions / private beta',
    values: plans.map((plan) => phoneLimits(plan.id).actions),
  },
  {
    label: 'Paired phones / private beta',
    values: plans.map((plan) => phoneLimits(plan.id).phones),
  },
  {
    label: 'Chat, coding, voice, Chrome & Macros',
    values: ['Included', 'Included', 'Included', 'Included'],
  },
  {
    label: 'Local PDF tutoring & slides',
    values: ['Included', 'Included', 'Included', 'Included'],
  },
  {
    label: 'Write for me · free Core feature',
    values: Array(4).fill('Included · beta 3'),
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
    label: 'Explicitly selected text-file collaboration',
    values: ['Not included', 'Not included', 'Not included', 'Beta foundations · hosted pending'],
  },
  {
    label: 'Shared workspaces & Macro libraries',
    values: ['Not included', 'Not included', 'Not included', 'Beta foundations · hosted pending'],
  },
  {
    label: 'Team permissions & activity / audit history',
    values: ['Not included', 'Not included', 'Not included', 'Beta foundations · hosted pending'],
  },
  {
    label: 'Student eligibility verification',
    values: ['Not required', 'Not required', 'Required at launch', 'Not required'],
  },
];

export const planFAQs = [
  {
    question: 'What are the phone companion limits?',
    answer: `For the planned Android private beta, free Core includes ${phoneLimits('core').actions.replace(' planned', '')} phone actions and ${phoneLimits('core').phones.replace(' planned', '')}. Verified Plus, Student Plus and Teams entitlements, and verified owners, have unlimited phone actions and paired phones. Phone actions are separate from AI tokens and cloud sync devices. Your mobile carrier’s call/SMS and data charges still apply. The free Core allowance covers NYXR actions only. For native SMS, a verified SENT status confirms sending; it does not confirm recipient delivery. Selecting a paid plan or declaring student or owner status does not grant access. Payments are inactive; companion availability requires a verified signed APK, matching updated desktop and hardware acceptance.`,
  },
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
    question: 'Can my team use the collaboration features today?',
    answer:
      'Workspace collaboration has implemented beta foundations for explicitly selected text files, shared Macro libraries through JSON export/import, permissions and activity / audit history. It does not automatically sync whole folders or share binary files. Hosted availability is pending production account service configuration. Public Teams workspaces have not launched, and payments are inactive. The Teams price is planned per seat per month in INR.',
  },
  {
    question: 'Is Write for me included in the current download?',
    answer:
      'Write for me is a free Core feature included in beta 3. It adds the F11 mode dropdown, textbox selection, F8 dictation, optional grammar correction and verified insertion without submitting the text. Speech and AI services use your own configured providers.',
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
