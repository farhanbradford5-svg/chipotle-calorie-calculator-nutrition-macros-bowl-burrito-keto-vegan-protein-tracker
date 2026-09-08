// Single source for verification dates. The methodology change log, the
// sourcing page and the YMYL bylines all read from here so a byline can never
// claim a different last-verified date than the changelog states.
export const REVIEW = {
  // Full ingredient set re-checked against Chipotle's published data.
  lastVerified: '2026-09-08',
  // Allergen data is re-checked on menu/recipe changes as well as quarterly,
  // so it carries its own date.
  allergensLastVerified: '2026-09-08',
  cadence: 'quarterly',
};

export const OFFICIAL = {
  nutrition: 'https://www.chipotle.com/nutrition-calculator',
  allergens: 'https://www.chipotle.com/allergens',
};

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export function longDate(iso) {
  const [y, m, d] = iso.split('-').map(Number);
  return `${d} ${MONTHS[m - 1]} ${y}`;
}
