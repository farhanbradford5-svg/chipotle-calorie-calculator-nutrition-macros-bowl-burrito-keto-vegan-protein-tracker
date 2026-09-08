import { FORMAT_ITEMS } from './items-formats.js';
import { BASE_ITEMS } from './items-bases.js';
import { TOPPING_ITEMS } from './items-toppings.js';

export const ITEMS = [...FORMAT_ITEMS, ...BASE_ITEMS, ...TOPPING_ITEMS];

const SMALL = new Set(['at', 'a', 'in', 'of', 'and', 'the', 'for', 'to', 'per']);
export const titleCase = (s) =>
  s
    .split(' ')
    .map((w, i) =>
      i > 0 && SMALL.has(w) ? w : w.replace(/^[a-z]/, (c) => c.toUpperCase()).replace(/-([a-z])/g, (_, c) => '-' + c.toUpperCase())
    )
    .join(' ');

// H1 is derived from the page's own keyword so the exact phrase is guaranteed
// present, and the title tag is authored separately so the two never read as
// the same string twice.
export const itemH1 = (it) => titleCase(it.keyword);

export const bySlug = new Map(ITEMS.map((i) => [i.slug, i]));

// Grouping used by /menu to file each item under its section.
export const ITEM_GROUP = {
  'chicken-bowl': 'Bowls & burritos', 'steak-bowl': 'Bowls & burritos',
  'barbacoa-bowl': 'Bowls & burritos', 'carnitas-bowl': 'Bowls & burritos',
  'sofritas-bowl': 'Bowls & burritos', 'double-chicken-bowl': 'Bowls & burritos',
  'chicken-burrito': 'Bowls & burritos', 'steak-burrito': 'Bowls & burritos',
  'chicken-salad': 'Other formats', 'chicken-tacos': 'Other formats',
  'chicken-quesadilla': 'Other formats',
  'white-rice': 'Rice & beans', 'brown-rice': 'Rice & beans',
  'black-beans': 'Rice & beans', 'pinto-beans': 'Rice & beans',
  guacamole: 'Toppings', queso: 'Toppings', 'sour-cream': 'Toppings',
  cheese: 'Toppings', lettuce: 'Toppings', 'fajita-veggies': 'Toppings',
  'salsa-verde': 'Salsas', 'fresh-tomato-salsa': 'Salsas',
  'roasted-chili-corn-salsa': 'Salsas', 'hot-salsa': 'Salsas',
  chips: 'Sides',
};

// Ingredient id -> item page, so /menu table rows can link to the right page.
export const PAGE_FOR_INGREDIENT = Object.fromEntries(
  ITEMS.filter((i) => i.ingredientId).map((i) => [i.ingredientId, i.slug])
);

// D9: each item page links to the next two items in its own category, which
// gives every page two contextual inbound links beyond /menu without reusing
// any anchor text more than twice site-wide.
export function siblingsFor(slug) {
  const group = ITEM_GROUP[slug];
  const members = ITEMS.filter((i) => ITEM_GROUP[i.slug] === group);
  if (members.length < 3) {
    // A category too small to supply siblings borrows from the whole set.
    const others = ITEMS.filter((i) => i.slug !== slug);
    const start = ITEMS.findIndex((i) => i.slug === slug);
    return [others[start % others.length], others[(start + 7) % others.length]];
  }
  const i = members.findIndex((m) => m.slug === slug);
  return [members[(i + 1) % members.length], members[(i + 2) % members.length]];
}
