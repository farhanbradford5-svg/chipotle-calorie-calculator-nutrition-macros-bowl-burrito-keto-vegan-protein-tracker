// Template footers would otherwise repeat one anchor phrase across 26 item
// pages. Each page draws a different phrasing for the same destination,
// deterministically by its position in the site order, so the wording is
// stable between builds and no phrase is reused more than a couple of times.
import { ITEMS } from './items.js';
import { DIETS } from './diets.js';

const POOLS = {
  '/': [
    'build the whole order in the calculator',
    'total up a full order',
    'run your own build through the calculator',
    'add your exact order up',
    'see the totals for a complete meal',
    'price the whole bowl out',
    'work out what your order comes to',
    'put a full order together',
    'check what the finished meal totals',
    'assemble the rest of the order',
    'try the combination in the meal builder',
    'add the rest of the ingredients',
    'get the number for your own build',
    'model the full order',
    'do the arithmetic on a whole meal',
    'build it out ingredient by ingredient',
    'find out what the full order costs you',
    'total the order the way you actually get it',
  ],
  '/menu': [
    'the full menu reference',
    'every item in one table',
    'the complete nutrition index',
    'the menu, one row per item',
    'the whole line at standard serving',
    'nutrition for every menu item',
    'the flat reference table',
    'the full ingredient list',
    'the menu nutrition index',
    'per-item figures for the whole menu',
    'the standard-serving table',
    'what every ingredient contains',
    'the reference index',
    'the per-ingredient figures',
    'nutrition for the whole line',
    'the item-by-item table',
  ],
  '/methodology': [
    'how we calculate these',
    'our calculation method',
    'the way these totals are worked out',
    'the portion-multiplier logic',
    'how the arithmetic is done',
    'the method behind these numbers',
    'how portions are handled',
    'what sits behind every figure',
    'our calculation notes',
    'the methodology in full',
    'the way portions are scaled',
    'how these estimates are produced',
    'the calculation rules',
    'where the arithmetic is set out',
    'our stated method',
  ],
  '/sources': [
    'where these figures come from',
    'the data provenance',
    'our source list',
    'how often the data is rechecked',
    'the sourcing notes',
    'what the numbers are based on',
  ],
};

// Stable ordering across the site.
const ORDER = [...ITEMS.map((i) => `item:${i.slug}`), ...DIETS.map((d) => `diet:${d.slug}`)];

// `offset` lets one page use two different phrasings for the same target
// without repeating itself.
export function anchor(target, pageId, offset = 0) {
  const pool = POOLS[target];
  if (!pool) throw new Error(`no anchor pool for ${target}`);
  const idx = ORDER.indexOf(pageId);
  return pool[((idx < 0 ? 0 : idx) + offset) % pool.length];
}
