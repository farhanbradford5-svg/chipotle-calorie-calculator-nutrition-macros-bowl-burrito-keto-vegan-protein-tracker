// Every number quoted anywhere on the site is computed here from the same
// ingredient table the calculator uses. Pages reference these values rather
// than hard-coding figures, so /menu, an item page, a diet page and a guide
// can never quietly disagree about what a chicken bowl contains.
import { CATEGORIES, PORTIONS } from './nutrition.js';

const BY_ID = new Map(CATEGORIES.flatMap((c) => c.items).map((i) => [i.id, i]));
const MULT = new Map(PORTIONS.map((p) => [p.id, p.mult]));
export const KEYS = ['cal', 'p', 'c', 'f', 'fib', 'na', 'sug', 'sat'];

export const item = (id) => {
  const it = BY_ID.get(id);
  if (!it) throw new Error(`unknown ingredient: ${id}`);
  return it;
};

// Accepts 'id' or ['id', multiplier] or ['id', 'portionName'].
export function total(parts) {
  const t = Object.fromEntries(KEYS.map((k) => [k, 0]));
  for (const raw of parts) {
    const [id, m = 1] = Array.isArray(raw) ? raw : [raw];
    const mult = typeof m === 'string' ? MULT.get(m) : m;
    const it = item(id);
    for (const k of KEYS) t[k] += it[k] * mult;
  }
  for (const k of KEYS) t[k] = k === 'cal' || k === 'na' ? Math.round(t[k]) : Math.round(t[k] * 10) / 10;
  return t;
}

// The site-wide reference builds. Named explicitly on every page that quotes
// them, because a "chicken bowl" means nothing without its fillings listed.
export const BUILDS = {
  bowl: {
    label: 'white rice, black beans, fresh tomato salsa and cheese',
    addons: ['white-rice', 'black-beans', 'mild-salsa', 'cheese'],
  },
  burrito: {
    label: 'a flour tortilla with white rice, black beans, fresh tomato salsa and cheese',
    addons: ['flour-tortilla', 'white-rice', 'black-beans', 'mild-salsa', 'cheese'],
  },
  salad: {
    label: 'supergreens, black beans, fresh tomato salsa and cheese',
    addons: ['salad-base', 'black-beans', 'mild-salsa', 'cheese'],
  },
  tacos: {
    label: 'three crispy corn shells with black beans, fresh tomato salsa and cheese',
    addons: ['taco-shells', 'black-beans', 'mild-salsa', 'cheese'],
  },
  quesadilla: {
    label: 'a flour tortilla folded with cheese',
    addons: ['ques-base'],
  },
};

// The format base items live on FORMATS, not CATEGORIES, so register them.
import { FORMATS } from './nutrition.js';
for (const f of FORMATS) if (f.base) BY_ID.set(f.base.id, f.base);

export const build = (format, protein, extra = []) =>
  total([...(protein ? [protein] : []), ...BUILDS[format].addons, ...extra]);

export const buildOf = (format, parts) => total([...BUILDS[format].addons, ...parts]);

// Common cross-page figures, computed once.
export const N = {
  bowl: (id) => build('bowl', id),
  burrito: (id) => build('burrito', id),
  salad: (id) => build('salad', id),
  tacos: (id) => build('tacos', id),
  quesadilla: (id) => build('quesadilla', id),
  doubleBowl: (id) => total([[id, 2], ...BUILDS.bowl.addons]),
};

// Tortilla delta — quoted on the burrito pages and the homepage alike.
export const TORTILLA = item('flour-tortilla');

export const fmt = (n) => n.toLocaleString('en-US');

// Ranking helpers so "highest-sodium topping" style claims are derived, never
// asserted by hand.
export const categoryItems = (catId) =>
  CATEGORIES.find((c) => c.id === catId).items.filter((i) => i.cal > 0 || i.na > 0);

export function rankBy(catId, key, dir = 'desc') {
  const list = [...categoryItems(catId)];
  list.sort((a, b) => (dir === 'desc' ? b[key] - a[key] : a[key] - b[key]));
  return list;
}

export const PROTEINS = ['chicken', 'steak', 'barbacoa', 'carnitas', 'sofritas', 'al-pastor', 'carne-asada', 'chorizo'];
export const proteinRank = (key, dir = 'desc') =>
  PROTEINS.map(item).sort((a, b) => (dir === 'desc' ? b[key] - a[key] : a[key] - b[key]));

// Protein delivered per 100 calories — used wherever a page claims one protein
// is "more efficient" than another.
export const perCal = (id) => {
  const it = item(id);
  return Math.round((it.p / it.cal) * 100 * 10) / 10;
};
