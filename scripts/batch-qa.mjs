// Site-wide QA for the 53-page batch (brief §7) plus the per-page keyword
// placement audit (§1) applied to every generated URL.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { ITEMS, titleCase } from '../src/content/items.js';
import { DIETS } from '../src/content/diets.js';
import { GUIDES } from '../src/content/guides.js';
import { TRUST } from '../src/content/trust.js';

const DIST = 'dist';
let fails = 0;
const ok = (label, pass, detail = '') => {
  if (!pass) fails++;
  console.log(`${pass ? 'PASS' : 'FAIL'}  ${label}${detail ? '  — ' + detail : ''}`);
};

const decode = (s) =>
  s
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&').replace(/&rsquo;|&#8217;/g, '’').replace(/&mdash;/g, '—')
    .replace(/&nbsp;/g, ' ').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();

const walk = (d) =>
  readdirSync(d).flatMap((f) => {
    const p = join(d, f);
    return statSync(p).isDirectory() ? walk(p) : p.endsWith('.html') ? [p] : [];
  });

// Astro's static build emits a meta-refresh stub for every configured
// redirect. Those are not content pages — the host serves a 301 in their
// place — so they are excluded from the page-quality checks below.
const allFiles = walk(DIST);
const redirectStubs = allFiles.filter((f) => /http-equiv="refresh"/.test(readFileSync(f, 'utf8')));

const pages = allFiles.filter((f) => !redirectStubs.includes(f)).map((file) => {
  const html = readFileSync(file, 'utf8');
  const url = '/' + relative(DIST, file).replace(/\\/g, '/').replace(/(^|\/)index\.html$/, '');
  return {
    file,
    url: url === '/' ? '/' : url.replace(/\/$/, ''),
    html,
    title: (html.match(/<title>([^<]*)<\/title>/) || [])[1],
    desc: (html.match(/name="description" content="([^"]*)"/) || [])[1],
    canonical: (html.match(/rel="canonical" href="([^"]*)"/) || [])[1],
    h1: (html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1],
  };
});

console.log(`--- ${pages.length} generated pages ---\n`);

// Keyword registry: every page in the batch declares its own primary keyword.
const KEYWORDS = new Map([
  ['/', 'chipotle nutrition calculator'],
  ['/menu', 'chipotle menu nutrition facts'],
  ...ITEMS.map((i) => [`/menu/${i.slug}`, i.keyword]),
  ...DIETS.map((d) => [`/diet/${d.slug}`, d.keyword]),
  ...GUIDES.map((g) => [`/guides/${g.slug}`, g.keyword]),
  ...TRUST.filter((t) => t.keyword).map((t) => [t.path, t.keyword]),
]);

console.log('--- §1 per-page keyword placement ---');
let kwFails = [];
for (const p of pages) {
  const kw = KEYWORDS.get(p.url);
  if (!kw) continue;
  const title = (p.title || '').toLowerCase().replace(/&amp;/g, '&');
  const h1 = decode(p.h1 || '').toLowerCase();
  const main = p.html.slice(p.html.indexOf('<main'), p.html.indexOf('</main>'));
  const afterH1 = main.slice(main.indexOf('</h1>') + 5);
  const first100 = decode(afterH1).split(' ').slice(0, 100).join(' ').toLowerCase();
  const desc = (p.desc || '').toLowerCase();
  const kwWords = kw.split(' ');
  const descHas = desc.includes(kw) || kwWords.filter((w) => desc.includes(w)).length >= kwWords.length - 1;
  const issues = [];
  if (!title.includes(kw)) issues.push('title');
  if (!h1.includes(kw)) issues.push('H1');
  if (!first100.includes(kw)) issues.push('first-100-words');
  if (!descHas) issues.push('meta description');
  if (issues.length) kwFails.push(`${p.url} (${kw}) → ${issues.join(', ')}`);
}
ok(`all ${KEYWORDS.size} keyworded pages PASS on title / H1 / first 100 words / description`,
  kwFails.length === 0, kwFails.slice(0, 12).join('\n        ') || 'no misses');

console.log('\n--- §7 batch checks ---');
const titles = new Map();
const canons = new Map();
const descs = new Map();
for (const p of pages) {
  if (!p.title || !p.desc || !p.canonical) { ok(`${p.url} has title/description/canonical`, false); continue; }
  titles.set(p.title, (titles.get(p.title) || 0) + 1);
  descs.set(p.desc, (descs.get(p.desc) || 0) + 1);
  canons.set(p.canonical, (canons.get(p.canonical) || 0) + 1);
}
const dupTitles = [...titles].filter(([, n]) => n > 1);
ok('no two pages share a <title>', dupTitles.length === 0, dupTitles.map(([t]) => t).join(' | '));
const dupDescs = [...descs].filter(([, n]) => n > 1);
ok('no two pages share a meta description', dupDescs.length === 0, dupDescs.map(([t]) => t.slice(0, 50)).join(' | '));

const badCanon = pages.filter((p) => {
  // Cloudflare serves the trailing-slash form, so the canonical must match it.
  const expect = 'https://chipotlemacros.com' + (p.url === '/' ? '/' : p.url.replace(/\/$/, '') + '/');
  return p.canonical !== expect;
});
ok('every canonical is self-referencing', badCanon.length === 0,
  badCanon.map((p) => `${p.url} → ${p.canonical}`).slice(0, 8).join(', '));

// /menu must link to every item and diet page.
const menu = pages.find((p) => p.url === '/menu');
// Hrefs carry a trailing slash (trailingSlash: 'always'); compare without one.
const menuLinks = new Set(
  [...menu.html.matchAll(/href="(\/(?:menu|diet)\/[^"#]+)"/g)].map((m) => m[1].replace(/\/$/, ''))
);
const missingItems = ITEMS.filter((i) => !menuLinks.has(`/menu/${i.slug}`));
const missingDiets = DIETS.filter((d) => !menuLinks.has(`/diet/${d.slug}`));
ok(`/menu links to all ${ITEMS.length} item pages`, missingItems.length === 0, missingItems.map((i) => i.slug).join(', '));
ok(`/menu links to all ${DIETS.length} diet pages`, missingDiets.length === 0, missingDiets.map((d) => d.slug).join(', '));

// In-content anchor text reuse. Site chrome (header nav, footer) repeats by
// design on every page and is excluded — the rule is about editorial links.
const anchorCounts = new Map();
for (const p of pages) {
  const main = p.html.slice(p.html.indexOf('<main'), p.html.indexOf('</main>'));
  for (const m of main.matchAll(/<a\s[^>]*href="(\/[^"]*)"[^>]*>([\s\S]*?)<\/a>/g)) {
    const text = decode(m[2]).toLowerCase();
    if (!text) continue;
    anchorCounts.set(text, (anchorCounts.get(text) || 0) + 1);
  }
}
// Breadcrumb links are navigational chrome too.
const CHROME = new Set(['calculator', 'menu nutrition']);
const overused = [...anchorCounts].filter(([t, n]) => n > 3 && !CHROME.has(t));
ok('no in-content anchor text used more than 3 times site-wide', overused.length === 0,
  overused.map(([t, n]) => `"${t}" ×${n}`).slice(0, 10).join(', '));

console.log('\n--- §0 uniqueness contract ---');
// Opening sentences must not be structurally identical across a page type.
const openingShape = (p) => {
  const main = p.html.slice(p.html.indexOf('<main'), p.html.indexOf('</main>'));
  const lede = (main.match(/class="lede"[^>]*>([\s\S]*?)<\/p>/) || [])[1];
  if (!lede) return null;
  const first = decode(lede).split(/(?<=[.!?])\s/)[0];
  // strip numbers and proper nouns to expose the sentence skeleton
  return first.replace(/[\d,.]+/g, '#').replace(/\b[A-Z][a-z]+/g, 'X').toLowerCase();
};
for (const [label, set] of [['item', ITEMS.map((i) => `/menu/${i.slug}`)], ['diet', DIETS.map((d) => `/diet/${d.slug}`)]]) {
  const shapes = new Map();
  for (const url of set) {
    const p = pages.find((x) => x.url === url);
    const s = openingShape(p);
    if (!s) continue;
    shapes.set(s, [...(shapes.get(s) || []), url]);
  }
  const clashes = [...shapes.values()].filter((v) => v.length > 1);
  ok(`${label} pages: no two share an opening-sentence skeleton`, clashes.length === 0,
    clashes.map((c) => c.join(' ≡ ')).slice(0, 5).join(' | '));
}

// FAQ question overlap: at least 2 questions per page unique to that page.
const faqOwners = new Map();
const faqByPage = new Map();
for (const p of pages) {
  const qs = [...p.html.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>/g)]
    .map((m) => decode(m[1]).toLowerCase())
    .filter((q) => q.endsWith('?'));
  faqByPage.set(p.url, qs);
  for (const q of qs) faqOwners.set(q, (faqOwners.get(q) || 0) + 1);
}
const thin = [];
for (const [url, qs] of faqByPage) {
  if (!qs.length) continue;
  const unique = qs.filter((q) => faqOwners.get(q) === 1).length;
  if (unique < 2) thin.push(`${url} (${unique} unique of ${qs.length})`);
}
ok('every page with FAQs has at least 2 questions asked nowhere else', thin.length === 0,
  thin.slice(0, 10).join(', '));

console.log('\n--- §7 cross-page number consistency ---');
// Facts asserted in more than one place must agree everywhere they appear.
// Rendered nutrition-table rows are the load-bearing figures. Wherever the
// same build is tabulated on more than one page, the calorie cell must match.
const tableFigures = new Map();
for (const p of pages) {
  for (const m of p.html.matchAll(/<th scope="row"[^>]*>([\s\S]*?)<\/th>\s*<td[^>]*>([\s\S]*?)<\/td>/g)) {
    const label = decode(m[1]).toLowerCase();
    const cal = decode(m[2]).replace(/,/g, '');
    if (!/^\d+$/.test(cal)) continue;
    if (!tableFigures.has(label)) tableFigures.set(label, new Map());
    const seen = tableFigures.get(label);
    seen.set(cal, [...(seen.get(cal) || []), p.url]);
  }
}
const contradictions = [...tableFigures]
  .filter(([, vals]) => vals.size > 1)
  .map(([label, vals]) => `${label}: ${[...vals].map(([v, urls]) => `${v} on ${urls[0]}`).join(' vs ')}`);
ok('tabulated builds show the same calories on every page that lists them',
  contradictions.length === 0, contradictions.slice(0, 6).join(' | '));

// Spot-check the figures the brief calls out as cross-page.
const SHARED = [
  ['655', ['/', '/menu/chicken-bowl', '/menu/chicken-burrito', '/menu/chicken-salad'], 'chicken bowl = 655 cal'],
  ['975', ['/', '/menu/chicken-burrito'], 'chicken burrito = 975 cal'],
  ['320', ['/', '/menu/chicken-burrito', '/methodology'], 'flour tortilla = 320 cal'],
];
for (const [value, urls, label] of SHARED) {
  const missing = urls.filter((u) => {
    const p = pages.find((x) => x.url === u);
    return !p || !decode(p.html).includes(value);
  });
  ok(`${label} appears on every page that references it`, missing.length === 0, missing.join(', '));
}

console.log('\n--- pre-launch: YMYL, crawl files, redirects ---');
const { REDIRECTS, REDIRECT_COUNT } = await import('../src/data/redirects.js');
const { NOINDEX } = await import('../astro.config.mjs');

const YMYL = ['/guides/allergens', '/diet/gluten-free', '/diet/low-sodium', '/guides/weight-loss'];
for (const url of YMYL) {
  const p = pages.find((x) => x.url === url);
  const text = p ? decode(p.html) : '';
  ok(`${url} carries a page-specific disclaimer`, /Before you rely on this/.test(p?.html || ''));
  ok(`${url} carries a dated verification byline`, /last verified \d+ \w+ \d{4}/i.test(text));
}
const allergens = pages.find((x) => x.url === '/guides/allergens');
ok('/guides/allergens cites Chipotle\'s official allergen page', /chipotle\.com\/allergens/.test(allergens.html));
const method = pages.find((x) => x.url === '/methodology');
ok('/methodology carries the allergen cadence carve-out',
  /Allergen information specifically is re-checked/.test(decode(method.html)));

const read = (f) => { try { return readFileSync(join(DIST, f), 'utf8'); } catch { return null; } };
const robots = read('robots.txt');
const llms = read('llms.txt');
const redirectsFile = read('_redirects');
const sitemap = read('sitemap.xml');
ok('robots.txt, llms.txt, _redirects and sitemap all generated',
  !!robots && !!llms && !!redirectsFile && !!sitemap);
const sitemapUrl = (robots.match(/Sitemap:\s*(\S+)/) || [])[1] || '';
ok('robots.txt points at a sitemap file that exists',
  !!read(sitemapUrl.replace('https://chipotlemacros.com/', '')), sitemapUrl);

const sitemapLocs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace('https://chipotlemacros.com', '').replace(/\/$/, '') || '/');
const indexable = pages.filter((p) => !/content="noindex/.test(p.html) && !/http-equiv="refresh"/.test(p.html));
ok(`sitemap lists exactly the indexable pages (${sitemapLocs.length})`,
  sitemapLocs.length === indexable.length,
  `${sitemapLocs.length} in sitemap vs ${indexable.length} indexable`);
for (const held of NOINDEX) {
  ok(`${held} is noindex, and absent from sitemap and llms.txt`,
    !sitemapLocs.includes(held) && !llms.includes(held) &&
    /content="noindex/.test(pages.find((p) => p.url === held)?.html || ''));
}
const stubsInSitemap = sitemapLocs.filter((u) => Object.keys(REDIRECTS).some((k) => k.replace(/\/$/, '') === u));
ok('no redirected (old) URL appears in the sitemap', stubsInSitemap.length === 0, stubsInSitemap.join(', '));

const ruleLines = redirectsFile.split('\n').filter((l) => l.trim() && !l.startsWith('#'));
ok(`_redirects contains all ${REDIRECT_COUNT} rules`, ruleLines.length === REDIRECT_COUNT, `${ruleLines.length} lines`);
// Target host is Cloudflare Pages: plain 301, no Netlify force flag (it is
// unsupported there), and no static file may exist at a source path or it
// would be served ahead of the rule.
ok('every _redirects rule is a plain 301 with no force flag',
  ruleLines.every((l) => /\s301$/.test(l.trim())));
const shadowed = Object.keys(REDIRECTS).filter((from) => {
  try { return !!readFileSync(join(DIST, from.replace(/^\//, ''), 'index.html')); } catch { return false; }
});
ok('no built file shadows a redirect source path', shadowed.length === 0, shadowed.slice(0, 8).join(', '));
const liveUrls = new Set(pages.map((p) => p.url));
const norm = (u) => (u === '/' ? '/' : u.replace(/\/$/, ''));
const clashes = Object.entries(REDIRECTS).filter(([from, to]) => norm(from) === norm(to) || !liveUrls.has(norm(to)));
ok('no rule is self-referencing and every destination is a real page',
  clashes.length === 0, clashes.map(([a, b]) => `${a} -> ${b}`).join(', '));

console.log(`\n${fails === 0 ? 'BATCH QA PASSED' : fails + ' CHECK(S) FAILED'}`);
process.exit(fails === 0 ? 0 : 1);
