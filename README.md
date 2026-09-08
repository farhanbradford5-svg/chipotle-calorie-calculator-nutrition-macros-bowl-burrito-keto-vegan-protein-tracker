# ChipotleMacros

Independent Chipotle nutrition calculator and menu reference. Static Astro build,
55 pages, no framework runtime on the client.

Not affiliated with, endorsed by, or sponsored by Chipotle Mexican Grill, Inc.

## Commands

| Command | What it does |
| --- | --- |
| `npm install` | Install dependencies |
| `npm run dev` | Dev server on :4321 |
| `npm run build` | Generate `_redirects`, `robots.txt`, `llms.txt`, then build to `dist/` |
| `npm run preview` | Serve the built output |
| `npm run verify` | Full gate: 12 stages (see below) |

## Deployment — Cloudflare Pages

- Build command: `npm run build`
- Output directory: `dist`
- `NODE_VERSION=20` (or newer)

`astro.config.mjs` deliberately omits Astro's `redirects` option. In a static build it
emits a meta-refresh stub at each old path, and Cloudflare Pages serves a matching
static asset *before* consulting `_redirects` — those stubs would shadow all 63 rules
and answer `200` instead of `301`. The redirects live only in `public/_redirects`,
generated from `src/data/redirects.js`.

## Where the numbers live

Every figure on the site is computed from `src/data/nutrition.js` via
`src/data/builds.js`. No page hard-codes a nutrition number, so `/`, `/menu`, an item
page and a diet page cannot disagree. Change the data, and every page follows.

## Verify pipeline

`npm run verify` runs, in order: build, calculator unit tests, numeric-claim checks,
SEO/HTML audit, batch QA (55-page uniqueness, redirects, crawl files), full
writing/structural audit (Parts B/C/D), FAQ gate, em-dash census, interaction checks,
all-55-page visual scan at 390px and 1440px, WCAG AA contrast, and performance budgets.

## Analytics

Google Analytics 4 (`G-0L2EFKL6PD`) and the Search Console verification token live in
`src/layouts/Base.astro`. Both are disclosed on `/privacy-policy`.
