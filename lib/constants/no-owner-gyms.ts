/**
 * Gym slugs for listings that have no owner (municipal/free outdoor facilities).
 * Claim ownership feature is hidden on the gym page and the claim route returns 404.
 */
export const NO_OWNER_GYM_SLUGS = new Set([
  'municipality-gym-paphos',
  'municipality-gym',
  'calisthenics-area-nicosia',
  'calisthenics-area',
  'outdoor-calisthenics-workout-spot-larnaca',
  'outdoor-calisthenics-workout-spot',
]);

export function isNoOwnerGym(slug: string): boolean {
  return NO_OWNER_GYM_SLUGS.has(slug);
}
