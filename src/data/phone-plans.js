import catalog from './plan-catalog.json' with { type: 'json' };

// Generated catalog values describe limits, never grant a live entitlement.
const limitKeys = ['phone_actions_per_day', 'phone_limit'];
export const phoneCatalogReady = catalog.plans.every((plan) =>
  limitKeys.every(
    (key) =>
      Object.hasOwn(plan.limits, key) &&
      (plan.limits[key] === null ||
        (Number.isSafeInteger(plan.limits[key]) && plan.limits[key] > 0)),
  ),
);
const byId = Object.fromEntries(catalog.plans.map((plan) => [plan.id, plan]));
export function phoneLimits(id) {
  if (!phoneCatalogReady)
    return { actions: 'Catalog update pending', phones: 'Catalog update pending' };
  const limits = byId[id].limits;
  return {
    actions:
      limits.phone_actions_per_day === null
        ? 'Unlimited with verified entitlement'
        : `${limits.phone_actions_per_day}/day planned`,
    phones:
      limits.phone_limit === null
        ? 'Unlimited with verified entitlement'
        : `${limits.phone_limit} paired phone${limits.phone_limit === 1 ? '' : 's'} planned`,
  };
}
