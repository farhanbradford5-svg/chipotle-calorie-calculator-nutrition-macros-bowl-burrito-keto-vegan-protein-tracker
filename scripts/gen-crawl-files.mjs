// Generates public/_redirects, public/robots.txt and public/llms.txt from the
// same sources the site itself uses, so none of them can drift from the real
// route list. Runs before `astro build`.
import { writeFileSync, mkdirSync } from 'node:fs';
import { REDIRECTS, REDIRECT_COUNT } from '../src/data/redirects.js';
import { DIETS } from '../src/content/diets.js';
import { GUIDES } from '../src/content/guides.js';
import { NOINDEX } from '../astro.config.mjs';

mkdirSync('public', { recursive: true });
const SITE = 'https://chipotlemacros.com';
const held = new Set(NOINDEX);

// --- _redirects (Netlify-style, honoured by Netlify, Cloudflare Pages et al.)
// Cloudflare Pages syntax: no force flag (it is not supported there) and no
// competing static asset at any of these paths, because astro.config.mjs
// deliberately omits the `redirects` option that would emit meta-refresh stubs.
// Cloudflare serves assets before applying _redirects, so a stub at an old path
// would answer 200 and the rule would never fire.
const rules = Object.entries(REDIRECTS)
  .map(([from, to]) => `${from.padEnd(52)} ${to.padEnd(30)} 301`)
  .join('\n');
writeFileSync(
  'public/_redirects',
  `# ${REDIRECT_COUNT} permanent redirects: previous URL structure -> current.
# Generated from src/data/redirects.js by scripts/gen-crawl-files.mjs.
# Do not edit by hand.
#
# Target host: Cloudflare Pages.
#   - No force flag: Cloudflare Pages does not support Netlify's "!" syntax.
#   - astro.config.mjs intentionally omits its own redirects option, so no
#     static file exists at any source path to shadow these rules.
#   - Cloudflare Pages allows up to 2,100 static redirects; this file uses
#     ${REDIRECT_COUNT}.

${rules}
`
);
console.log(`wrote public/_redirects (${REDIRECT_COUNT} rules)`);

// --- robots.txt
writeFileSync(
  'public/robots.txt',
  `User-agent: *
Allow: /

Sitemap: ${SITE}/sitemap-index.xml
`
);
console.log('wrote public/robots.txt');

// --- llms.txt
const link = (label, path) => `[${label}](${path})`;
const dietLinks = DIETS.map((d) => link(d.slug.replace(/(^|-)(\w)/g, (m, a, b) => (a ? ' ' : '') + b.toUpperCase()).trim(), `/diet/${d.slug}`));
const guideLabels = {
  sodium: 'Sodium', allergens: 'Allergens', 'muscle-gain': 'Muscle gain', fiber: 'Fiber',
  'cheap-meals': 'Cheap meals', 'macro-targeting': 'Macro targeting', 'weight-loss': 'Weight loss',
  'meal-prep': 'Meal prep', 'secret-menu': 'Secret menu', 'vs-fast-food': 'Vs fast food',
};
const guideLinks = GUIDES.filter((g) => !held.has(`/guides/${g.slug}`)).map((g) =>
  link(guideLabels[g.slug] || g.slug, `/guides/${g.slug}`)
);

writeFileSync(
  'public/llms.txt',
  `# ChipotleMacros

> Independent Chipotle nutrition calculator. Not affiliated with, endorsed by, or
> sponsored by Chipotle Mexican Grill, Inc. All figures are estimates based on published
> nutrition data; see /methodology for sourcing and update cadence.

## Primary tool
- [Chipotle Nutrition Calculator](/): interactive calculator covering every bowl, burrito, salad, taco, and quesadilla combination, with calories, protein, carbs, fat, fiber, sodium, sugar, and saturated fat per build.

## Reference
- [Full menu nutrition index](/menu): every ingredient and item in one table.
- [How we calculate](/methodology): data source, portion-multiplier logic, rounding rules, update cadence, and stated limitations.
- [Data sources](/sources): provenance and last-verified dates.

## Dietary guidance
- ${dietLinks.join(', ')}

## Guides
- ${guideLinks.join(', ')}

## About
- [About this site](/about): who maintains it and the independence statement.
- [Contact](/contact): how to report a wrong figure.
`
);
console.log(`wrote public/llms.txt (${dietLinks.length} diet + ${guideLinks.length} guide links; ${held.size} held back)`);
