import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const DIST = 'dist';
const html = readFileSync(join(DIST, 'index.html'), 'utf8');
const PHRASE = 'chipotle nutrition calculator';
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
    .replace(/&nbsp;/g, ' ').replace(/&rarr;/g, '→').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim();

console.log('--- §1 keyword placement (built HTML) ---');
const title = html.match(/<title>([^<]*)<\/title>/)[1].replace(/&amp;/g, '&');
const desc = html.match(/name="description" content="([^"]*)"/)[1];
const h1 = decode(html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)[1]);

ok('title contains exact phrase', title.toLowerCase().includes(PHRASE), title);
ok('title length <= 65', title.length <= 65, `${title.length} chars`);
ok('H1 contains exact phrase', h1.toLowerCase().includes(PHRASE), h1);
ok('meta desc 140-160 chars', desc.length >= 140 && desc.length <= 160, `${desc.length} chars`);
ok('meta desc has phrase or variation', /nutrition calculator for chipotle|chipotle nutrition calculator/i.test(desc));
ok('meta desc ends in complete sentence', /[.!?]$/.test(desc));

// First 100 words of visible body copy, excluding nav/header/footer and the H1 itself.
const mainBlock = html.slice(html.indexOf('<main'), html.indexOf('</main>'));
const bodyAfterH1 = mainBlock.slice(mainBlock.indexOf('</h1>') + 5);
const words = decode(bodyAfterH1).split(' ');
const first100 = words.slice(0, 100).join(' ');
ok('exact phrase within first 100 words of body copy', first100.toLowerCase().includes(PHRASE),
  `"${first100.slice(0, 120)}..."`);
ok('meta desc is not a verbatim copy of first body sentence',
  !decode(bodyAfterH1).toLowerCase().startsWith(desc.toLowerCase().slice(0, 60)));

console.log('\n--- §8 static rendering (no client-side injection) ---');
const scriptSrcs = [...html.matchAll(/<script[^>]*src="([^"]+)"/g)].map((m) => m[1]);
let jsBad = [];
for (const src of scriptSrcs) {
  const p = join(DIST, src.replace(/^\//, ''));
  try {
    const js = readFileSync(p, 'utf8');
    if (/document\.title\s*=|rel=["']canonical|name=["']description/i.test(js)) jsBad.push(src);
  } catch {}
}
ok('no bundled JS writes title/description/canonical', jsBad.length === 0, jsBad.join(', '));
ok('JSON-LD blocks present in static HTML', (html.match(/application\/ld\+json/g) || []).length === 4,
  `${(html.match(/application\/ld\+json/g) || []).length} blocks`);
for (const t of ['WebApplication', 'Organization', 'BreadcrumbList', 'FAQPage']) {
  ok(`  schema ${t}`, html.includes(`"@type":"${t}"`));
}

console.log('\n--- §6 structured data validity ---');
const ldBlocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => m[1]);
let parsed = [];
try { parsed = ldBlocks.map((b) => JSON.parse(b)); ok('all JSON-LD blocks parse', true, `${parsed.length} blocks`); }
catch (e) { ok('all JSON-LD blocks parse', false, e.message); }
const byType = Object.fromEntries(parsed.map((b) => [b['@type'], b]));
ok('WebApplication has name, offer and featureList',
  !!byType.WebApplication?.name && byType.WebApplication?.offers?.price === '0' &&
  byType.WebApplication?.featureList?.length >= 4);
ok('no invented ratings or review counts',
  !/aggregateRating|reviewCount|ratingValue/i.test(html));
const visibleQs = [...html.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>/g)].map((m) => decode(m[1]));
const schemaQs = (byType.FAQPage?.mainEntity || []).map((q) => q.name);
ok('FAQ schema has 10 questions', schemaQs.length === 10, `${schemaQs.length}`);
const unmatched = schemaQs.filter((q) => !visibleQs.includes(q));
ok('every schema question is visible on the page', unmatched.length === 0, unmatched.join(' | '));
const answersVisible = (byType.FAQPage?.mainEntity || []).every((q) =>
  decode(mainBlock).includes(q.acceptedAnswer.text.slice(0, 60)));
ok('every schema answer text appears in the page body', answersVisible);
ok('breadcrumb points at the canonical home URL',
  byType.BreadcrumbList?.itemListElement?.[0]?.item === 'https://chipotlemacros.com/');

console.log('\n--- §8 calculator default state in HTML ---');
ok('no empty mount div', !/<div id="(app|root)"[^>]*>\s*<\/div>/.test(html));
const names = ['Chicken', 'Barbacoa', 'Sofritas', 'Cilantro-Lime White Rice', 'Black Beans',
  'Tomatillo-Green Chili Salsa', 'Guacamole', 'Queso Blanco', 'Chips &amp; Guacamole'];
ok('real ingredient names rendered server-side', names.every((n) => html.includes(n)),
  names.filter((n) => !html.includes(n)).join(', ') || 'all present');
ok('portion controls in static markup',
  ['Light', 'Normal', 'Extra', 'Double'].every((p) => html.includes(`>${p}</button>`)));
const portionGroups = (html.match(/class="portions"/g) || []).length;
ok('portion control per scoreable ingredient', portionGroups >= 25, `${portionGroups} groups`);
ok('zero starting state visible', /id="t-cal"[^>]*>0</.test(html) && html.includes('Nothing selected yet.'));
ok('all 8 metrics rendered', ['t-cal','t-p','t-c','t-f','t-fib','t-na','t-sug','t-sat']
  .every((id) => html.includes(`id="${id}"`)));
ok('live region on totals', /aria-live="polite"/.test(html));
ok('6 meal formats as in-page toggles, not URLs',
  (html.match(/class="fmt"/g) || []).length === 6 && !/href="\/(bowl|burrito|salad|tacos)"/.test(html));
ok('7 lifestyle presets present', (html.match(/class="preset"/g) || []).length === 7);
for (const p of ['Balanced Macros Bowl','Go Half Bowl','Plant Powered Bowl','Grain Freedom Bowl',
  'High Protein Bowl','Wholesome Bowl','Veggie Full Bowl']) ok(`  preset "${p}"`, html.includes(p));
ok('share + copy affordances', html.includes('id="share-meal"') && html.includes('id="copy-results"'));
ok('sticky mobile results bar', html.includes('id="mobile-bar"'));
ok('fieldset/legend semantics used', (html.match(/<fieldset/g) || []).length >= 8);

console.log('\n--- §4.3 ingredient reference table ---');
const tableMatch = html.match(/<table class="data"[\s\S]*?<\/table>/);
ok('real <table> markup outside calculator state', !!tableMatch);
if (tableMatch) {
  const rows = (tableMatch[0].match(/<tr[\s>]/g) || []).length - 1;
  ok('table row per ingredient', rows >= 28, `${rows} data rows`);
  ok('table has caption + th scope', /<caption[\s>]/.test(tableMatch[0]) && /scope="row"/.test(tableMatch[0]));
  ok('table sits outside the calculator section',
    html.indexOf('<table class="data"') > html.indexOf('</section>'));
}

console.log('\n--- §8 headings, links, images ---');
ok('exactly one H1', (html.match(/<h1[\s>]/g) || []).length === 1);
const hOrder = [...html.matchAll(/<h([1-4])[\s>]/g)].map((m) => +m[1]);
let jump = null;
for (let i = 1; i < hOrder.length; i++) if (hOrder[i] - hOrder[i - 1] > 1) jump = `${hOrder[i-1]}→${hOrder[i]}`;
ok('no skipped heading levels', !jump, jump || 'h1→h2→h3 clean');

const anchors = [...html.matchAll(/<a\s[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)]
  .map((m) => ({ href: m[1], text: decode(m[2]) }));
ok('every link is a real href', anchors.every((a) => a.href && a.href !== '#'));
ok('no click-handler-only navigation', !/onclick="[^"]*location/.test(html));
const counts = {};
for (const a of anchors) counts[a.text] = (counts[a.text] || 0) + 1;
const over = Object.entries(counts).filter(([, n]) => n > 3);
ok('no anchor text repeated more than 3 times', over.length === 0,
  over.map(([t, n]) => `"${t}" ×${n}`).join(', ') || `${anchors.length} links, max reuse ${Math.max(...Object.values(counts))}`);
const internal = [...new Set(anchors.map((a) => a.href).filter((h) => h.startsWith('/')))];
const missing = internal.filter((h) => {
  const p = join(DIST, h.replace(/^\//, ''));
  try { return !(statSync(p).isDirectory() ? statSync(join(p, 'index.html')) : true); }
  catch { try { statSync(p); return false; } catch { return true; } }
});
ok('all internal links resolve to built pages', missing.length === 0, missing.join(', ') || internal.join(' '));
const imgs = [...html.matchAll(/<img[^>]*>/g)].map((m) => m[0]);
ok('every <img> has alt text', imgs.every((i) => /alt="/.test(i)), `${imgs.length} images`);

console.log('\n--- §7B AI writing tells ---');
const prose = decode(mainBlock).toLowerCase();
const tells = ['delve','landscape','unlock','elevate','seamless','robust','in the realm of',
  'in summary','as we’ve seen','as we have seen','game-changing','incredibly','amazing',
  'in today’s fast-paced','has you covered','look no further','when it comes to'];
const found = tells.filter((t) => prose.includes(t));
ok('no AI tell words', found.length === 0, found.join(', ') || 'clean');
ok('phrase not over-stuffed in headings',
  [...html.matchAll(/<h[23][^>]*>([\s\S]*?)<\/h[23]>/g)]
    .filter((m) => decode(m[1]).toLowerCase().includes(PHRASE)).length <= 1);

console.log('\n--- sitewide uniqueness (the bug that killed the last build) ---');
const walk = (d) => readdirSync(d).flatMap((f) => {
  const p = join(d, f);
  return statSync(p).isDirectory() ? walk(p) : p.endsWith('.html') ? [p] : [];
});
// Exclude the meta-refresh stubs Astro emits for configured redirects — the
// host answers those paths with a 301, so they are not content pages.
const pages = walk(DIST).filter((f) => !/http-equiv="refresh"/.test(readFileSync(f, 'utf8')));
const seen = { title: new Map(), desc: new Map(), canon: new Map() };
for (const p of pages) {
  const h = readFileSync(p, 'utf8');
  const t = (h.match(/<title>([^<]*)<\/title>/) || [])[1];
  const d = (h.match(/name="description" content="([^"]*)"/) || [])[1];
  const c = (h.match(/rel="canonical" href="([^"]*)"/) || [])[1];
  if (!t || !d || !c) { ok(`${p} has all three tags`, false); continue; }
  seen.title.set(t, (seen.title.get(t) || 0) + 1);
  seen.desc.set(d, (seen.desc.get(d) || 0) + 1);
  seen.canon.set(c, (seen.canon.get(c) || 0) + 1);
}
ok(`${pages.length} pages: all titles unique`, seen.title.size === pages.length);
ok(`${pages.length} pages: all descriptions unique`, seen.desc.size === pages.length);
ok(`${pages.length} pages: all canonicals unique`, seen.canon.size === pages.length);

console.log(`\n${fails === 0 ? 'ALL CHECKS PASSED' : fails + ' CHECK(S) FAILED'}`);
process.exit(fails === 0 ? 0 : 1);
