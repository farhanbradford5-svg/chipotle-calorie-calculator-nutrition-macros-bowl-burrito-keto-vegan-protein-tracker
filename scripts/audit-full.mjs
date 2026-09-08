// Fix-and-verify audit: Parts B, C and D across every built page.
// Prints each finding with its location so it can be fixed at source.
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';
import { ITEMS } from '../src/content/items.js';
import { DIETS } from '../src/content/diets.js';
import { GUIDES } from '../src/content/guides.js';
import { TRUST } from '../src/content/trust.js';

const DIST = 'dist';
let fails = 0;
const ok = (label, pass, detail = '') => {
  if (!pass) fails++;
  console.log(`${pass ? 'PASS' : 'FAIL'}  ${label}${detail ? '\n        ' + detail : ''}`);
};

const decode = (s) =>
  s.replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&').replace(/&rsquo;|&#8217;/g, '’').replace(/&mdash;/g, '—')
    .replace(/&nbsp;/g, ' ').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&middot;/g, '·').replace(/&rarr;/g, '→').replace(/&copy;/g, '(c)')
    .replace(/\s+/g, ' ').trim();

const walk = (d) =>
  readdirSync(d).flatMap((f) => {
    const p = join(d, f);
    return statSync(p).isDirectory() ? walk(p) : p.endsWith('.html') ? [p] : [];
  });

const pages = walk(DIST).map((file) => {
  const html = readFileSync(file, 'utf8');
  const url = '/' + relative(DIST, file).replace(/\\/g, '/').replace(/(^|\/)index\.html$/, '');
  const main = html.slice(html.indexOf('<main'), html.indexOf('</main>'));
  return {
    url: url === '/' ? '/' : url.replace(/\/$/, ''),
    html,
    main,
    text: decode(main),
    title: (html.match(/<title>([^<]*)<\/title>/) || [])[1] || '',
    desc: (html.match(/name="description" content="([^"]*)"/) || [])[1] || '',
    canonical: (html.match(/rel="canonical" href="([^"]*)"/) || [])[1] || '',
    h1: decode((html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1] || ''),
    h2s: [...html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/g)].map((m) => decode(m[1])),
    noindex: /content="noindex/.test(html),
    paras: [...main.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/g)].map((m) => decode(m[1])).filter(Boolean),
    // FAQ pairs: an h3 ending in ? followed by its answer paragraph
    // The h3 body must not swallow a later </h3>: a lazy [\s\S]*? will happily
    // span an intervening <ul> to find a <p> and mis-pair the questions.
    faq: [...main.matchAll(/<h3[^>]*>((?:(?!<\/h3>)[\s\S])*?)<\/h3>\s*<p[^>]*>((?:(?!<\/p>)[\s\S])*?)<\/p>/g)]
      .map((m) => ({ q: decode(m[1]), aHtml: m[2], a: decode(m[2]) }))
      .filter((f) => f.q.endsWith('?')),
    listItems: [...main.matchAll(/<ul[^>]*>([\s\S]*?)<\/ul>/g)].map((m) =>
      [...m[1].matchAll(/<li[^>]*>([\s\S]*?)<\/li>/g)].map((x) => decode(x[1]))
    ),
  };
});

const KEYWORDS = new Map([
  ['/', 'chipotle nutrition calculator'],
  ['/menu', 'chipotle menu nutrition facts'],
  ...ITEMS.map((i) => [`/menu/${i.slug}`, i.keyword]),
  ...DIETS.map((d) => [`/diet/${d.slug}`, d.keyword]),
  ...GUIDES.map((g) => [`/guides/${g.slug}`, g.keyword]),
  ...TRUST.filter((t) => t.keyword).map((t) => [t.path, t.keyword]),
]);

const hit = (label, list) =>
  ok(label, list.length === 0, list.slice(0, 14).join('\n        ') + (list.length > 14 ? `\n        …and ${list.length - 14} more` : ''));

/* ---------------- PART C: writing rules ---------------- */
console.log('=== PART C — writing rules ===');

const BANNED = ['dive into', 'unleash your potential', 'game-changing', 'comprehensive solution',
  'tapestry', 'meticulous', 'bustling', 'vibrant', 'ever-evolving', 'daunting', 'cutting-edge',
  'robust', 'elevate', 'unlock', 'embark', 'delve', 'harness', 'mastering', 'imagine',
  'revolutionize', 'foster', 'seamless', 'effortless', 'crucial', 'essential', 'vital', 'realm',
  'landscape', 'navigating', 'navigate', 'tailored', "it's important to note", 'it is important to note',
  "it's worth noting", 'it is worth noting', 'in summary', 'furthermore', 'additionally', 'moreover',
  'ultimately', 'notably', 'arguably', 'on the other hand', 'as previously mentioned', 'consequently',
  'importantly', 'indeed', 'essentially', 'alternatively', 'given that', 'due to', 'although',
  'in contrast', 'despite'];
const bannedHits = [];
for (const p of pages) {
  const low = ' ' + p.text.toLowerCase() + ' ';
  for (const w of BANNED) {
    const re = new RegExp(`(^|[^a-z])${w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}([^a-z]|$)`, 'g');
    const n = (low.match(re) || []).length;
    if (n) bannedHits.push(`${p.url}: "${w}" ×${n}`);
  }
}
hit('C24 no banned words site-wide', bannedHits);

const backward = [];
for (const p of pages) {
  for (const phrase of ['as stated above', 'as previously mentioned', 'as mentioned earlier',
    'as noted above', 'as we saw', 'as discussed above', 'see above', 'mentioned earlier']) {
    if (p.text.toLowerCase().includes(phrase)) backward.push(`${p.url}: "${phrase}"`);
  }
}
hit('C7 never sends the reader backward', backward);

const VAGUE = ['several', 'some of', 'a few', 'numerous', 'various', 'a number of', 'a handful of', 'plenty of'];
const vagueHits = [];
for (const p of pages) {
  const low = p.text.toLowerCase().replace(/how many/g, 'howmany');
  for (const w of VAGUE) {
    const n = (low.match(new RegExp(`(^|[^a-z])${w}([^a-z]|$)`, 'g')) || []).length;
    if (n) vagueHits.push(`${p.url}: "${w}" ×${n}`);
  }
}
hit('C15 no vague-quantity words where a count exists', vagueHits);

const analogy = [];
for (const p of pages) {
  for (const phrase of ['think of it as', 'is like a', 'are like a', 'much like', 'akin to', 'as if it were']) {
    if (p.text.toLowerCase().includes(phrase)) analogy.push(`${p.url}: "${phrase}"`);
  }
}
hit('C4 no analogies', analogy);

const hype = [];
for (const p of pages) {
  for (const phrase of ['best-in-class', 'world-class', 'ultimate guide', 'amazing', 'incredible',
    'game changer', 'must-have', 'trusted by thousands', 'loved by']) {
    if (p.text.toLowerCase().includes(phrase)) hype.push(`${p.url}: "${phrase}"`);
  }
}
hit('C26 no marketing hype', hype);

const fabricated = [];
for (const p of pages) {
  if (/aggregateRating|reviewCount|ratingValue|userRating/i.test(p.html)) fabricated.push(`${p.url}: rating markup`);
  if (/\b\d[\d,]*\+? (users|people|visitors|reviews|ratings)\b/i.test(p.text)) fabricated.push(`${p.url}: user count in copy`);
}
hit('C28 no invented ratings, testimonials or user counts', fabricated);

// C27 em dash / stray hyphen census
let emTotal = 0, dblHyphen = [];
const emByPage = [];
for (const p of pages) {
  const n = (p.text.match(/—/g) || []).length;
  emTotal += n;
  if (n) emByPage.push(`${p.url}: ${n}`);
  if (/--/.test(p.text)) dblHyphen.push(p.url);
}
console.log(`INFO  C27 em dashes in body copy: ${emTotal} across ${emByPage.length} pages`);
hit('C27 no stray double-hyphens', dblHyphen);

// C30 FAQ answer length 40-80 words
const faqLen = [];
for (const p of pages) {
  for (const f of p.faq) {
    const w = f.a.split(' ').filter(Boolean).length;
    if (w < 40 || w > 80) faqLen.push(`${p.url} [${w}w] ${f.q.slice(0, 58)}`);
  }
}
hit('C30 every FAQ answer is 40-80 words', faqLen);

// B5 / C17 boolean questions open with a verdict
const BOOL = /^(is|are|does|do|can|will|should|has|have|did|was|were)\b/i;
const VERDICT = /^(yes|no|it depends|not really|not quite|neither|both|almost|rarely|sometimes|only|nothing|none|technically|marginally|comfortably|barely|partly)\b/i;
const boolFails = [];
for (const p of pages) {
  for (const f of p.faq) {
    if (!BOOL.test(f.q)) continue;
    // An either/or question is answered directly by naming the winner;
    // "Yes" would be the wrong form of answer for it.
    const namesAlternative =
      / or /.test(f.q) &&
      f.q.toLowerCase().replace(/[^a-z ]/g, '').split(/\s+/)
        .some((w) => w.length > 3 &&
          f.a.toLowerCase().split(/(?<=[.!?])\s/)[0].split(/\s+/).slice(0, 5).includes(w));
    if (!VERDICT.test(f.a) && !namesAlternative) {
      boolFails.push(`${p.url}: "${f.q.slice(0, 52)}" → "${f.a.slice(0, 48)}…"`);
    }
  }
}
hit('B5/C17 boolean FAQs open with a verdict word', boolFails);

// B6 / C9 bold the fact, not the keyword
const boldFails = [];
for (const p of pages) {
  for (const f of p.faq) {
    const bolds = [...f.aHtml.matchAll(/<(?:strong|b)[^>]*>([\s\S]*?)<\/(?:strong|b)>/g)].map((m) => decode(m[1]));
    for (const b of bolds) {
      if (/chipotle/i.test(b) && !/\d/.test(b)) boldFails.push(`${p.url}: bolded keyword "${b}"`);
    }
  }
}
hit('B6/C9 bold marks the fact, never the keyword', boldFails);

// C29 YMYL: neutral explanation, not imperative recommendation
const directive = [];
const YMYL_SET = [...DIETS.map((d) => `/diet/${d.slug}`), '/guides/allergens', '/guides/weight-loss', '/guides/sodium'];
for (const p of pages.filter((x) => YMYL_SET.includes(x.url))) {
  for (const phrase of ['you should', 'you must', 'we recommend', 'you need to', "you'll want to", 'you ought to', 'make sure you']) {
    const n = (p.text.toLowerCase().match(new RegExp(phrase, 'g')) || []).length;
    if (n) directive.push(`${p.url}: "${phrase}" ×${n}`);
  }
}
hit('C29 YMYL pages avoid imperative recommendations', directive);

// C10 "if" clauses second
const ifFirst = [];
for (const p of pages) {
  for (const s of p.text.split(/(?<=[.!?])\s+/)) {
    if (/^If\b/.test(s.trim()) && /,\s*(order|choose|pick|skip|drop|ask|take|swap|add|go|use|get)\b/i.test(s)) {
      ifFirst.push(`${p.url}: "${s.slice(0, 74)}…"`);
    }
  }
}
hit('C10 conditional guidance puts the "if" clause second', ifFirst);

// C20 consistent part of speech at the start of list items
const VERBS = /^(add|ask|skip|drop|order|choose|pick|take|swap|use|get|build|keep|check|work|cut|leave|read|start|confirm|prefer|treat|split|reheat|watch|rank|stack|hold|note)\b/i;
const posMixed = [];
for (const p of pages) {
  for (const list of p.listItems) {
    if (list.length < 3) continue;
    const verbs = list.filter((li) => VERBS.test(li)).length;
    if (verbs > 0 && verbs < list.length) {
      posMixed.push(`${p.url}: ${verbs}/${list.length} verb-first — e.g. "${list[0].slice(0, 40)}"`);
    }
  }
}
hit('C20 list items keep a consistent opening part of speech', posMixed);

/* ---------------- PART B ---------------- */
console.log('\n=== PART B — query templates & microsemantics ===');

const home = pages.find((p) => p.url === '/');
const CLUSTER = {
  'calorie counter': /calorie counter/i,
  'bowl calories': /bowl calories|calories are in a chipotle bowl/i,
  macros: /macro/i,
  'macro calculator': /macro calculator|macros calculator|macro-targeting/i,
  'nutrition facts': /nutrition facts/i,
  'menu calories': /menu calories|calories by meal type/i,
  'bowl calculator': /bowl|calculator/i,
  'veggie bowl': /veggie|vegetarian|plant/i,
  'sodium content': /sodium/i,
  'protein calculator': /protein/i,
  'is it accurate': /accurate/i,
  'burrito calories': /burrito/i,
  'guacamole calories': /guacamole/i,
  'salad calories': /salad/i,
  'chicken calories': /chicken/i,
};
const clusterMiss = Object.entries(CLUSTER).filter(([, re]) => !re.test(home.text)).map(([k]) => k);
hit('B1 homepage still covers every secondary-cluster variation', clusterMiss);

// B7 primary phrase at most once per paragraph on the homepage
const stuffed = home.paras
  .filter((t) => (t.toLowerCase().match(/chipotle nutrition calculator/g) || []).length > 1)
  .map((t) => t.slice(0, 70));
hit('B7 primary keyword never twice in one homepage paragraph', stuffed);

// B7 per-page heading rotation: exact keyword should not appear in every H2
const overHeaded = [];
for (const p of pages) {
  const kw = KEYWORDS.get(p.url);
  if (!kw || p.h2s.length < 3) continue;
  const n = p.h2s.filter((h) => h.toLowerCase().includes(kw)).length;
  if (n > 1) overHeaded.push(`${p.url}: exact keyword in ${n}/${p.h2s.length} H2s`);
}
hit('B7 pages rotate phrasing rather than repeating the keyword in headings', overHeaded);

// C31/B3 FAQ answer echoes the question's own subject term
const echoFails = [];
const STOP = new Set(['how', 'many', 'much', 'what', 'is', 'are', 'does', 'do', 'can', 'the', 'a', 'an',
  'in', 'of', 'at', 'to', 'for', 'and', 'or', 'it', 'this', 'that', 'there', 'i', 'my', 'you', 'your', 'with', 'be']);
for (const p of pages) {
  for (const f of p.faq) {
    const terms = f.q.toLowerCase().replace(/[^a-z0-9\s-]/g, '').split(/\s+/).filter((w) => w && !STOP.has(w));
    const firstSentence = f.a.split(/(?<=[.!?])\s/)[0].toLowerCase();
    if (!terms.some((t) => firstSentence.includes(t.replace(/s$/, '')))) {
      echoFails.push(`${p.url}: "${f.q.slice(0, 50)}" → "${firstSentence.slice(0, 46)}…"`);
    }
  }
}
hit('B3/C31 FAQ answers open by echoing the question terms', echoFails);

// C33 duplicate FAQ questions site-wide
const qOwners = new Map();
for (const p of pages) for (const f of p.faq) {
  const k = f.q.toLowerCase().replace(/[^a-z0-9 ]/g, '').trim();
  qOwners.set(k, [...(qOwners.get(k) || []), p.url]);
}
const dupQ = [...qOwners.entries()].filter(([, u]) => u.length > 1).map(([q, u]) => `"${q.slice(0, 52)}" on ${u.join(', ')}`);
hit('C33 zero duplicate FAQ questions site-wide', dupQ);

/* ---------------- PART D ---------------- */
console.log('\n=== PART D — structural ===');

const slugBad = [...KEYWORDS.keys()].filter((u) => /chipotle|macros/i.test(u));
hit('D1 no slug repeats a domain word', slugBad);

const kwDup = [];
const seenKw = new Map();
for (const [u, k] of KEYWORDS) {
  if (seenKw.has(k)) kwDup.push(`"${k}" on ${seenKw.get(k)} and ${u}`);
  seenKw.set(k, u);
}
hit('D2 every page owns a unique primary keyword', kwDup);

const titleLong = pages.filter((p) => decode(p.title).length > 60).map((p) => `${p.url} (${decode(p.title).length}) ${decode(p.title)}`);
hit('D5 every title is 60 characters or fewer', titleLong);
// 140-155, not the brief's 140-160: crawlers (Screaming Frog among them) report
// anything over 155 as truncated, so the tighter ceiling satisfies both.
const descBad = pages.filter((p) => p.desc.length < 140 || p.desc.length > 155).map((p) => `${p.url} (${p.desc.length} chars)`);
hit('D5 every meta description is 140-155 characters', descBad);
const kwFront = pages.filter((p) => {
  const kw = KEYWORDS.get(p.url);
  if (!kw) return false;
  const i = decode(p.title).toLowerCase().indexOf(kw.split(' ')[0]);
  return i > 28;
}).map((p) => `${p.url}: keyword starts at char ${decode(p.title).toLowerCase().indexOf(KEYWORDS.get(p.url).split(' ')[0])}`);
hit('D5 primary keyword sits near the front of the title', kwFront);

const dup = (key) => {
  const m = new Map();
  for (const p of pages) m.set(p[key], [...(m.get(p[key]) || []), p.url]);
  return [...m.entries()].filter(([, u]) => u.length > 1).map(([v, u]) => `"${String(v).slice(0, 44)}" on ${u.join(', ')}`);
};
hit('D5/D10 no duplicate titles', dup('title'));
hit('D5/D10 no duplicate descriptions', dup('desc'));
hit('D5/D10 no duplicate H1s', dup('h1'));
const slashed = (u) => (u === '/' ? '/' : u.replace(/\/$/, '') + '/');
hit('D5 canonical present and self-referencing on all 55',
  pages.filter((p) => p.canonical !== 'https://chipotlemacros.com' + slashed(p.url)).map((p) => `${p.url} → ${p.canonical}`));

// D6 trailing slash. Cloudflare Pages serves directory output canonically WITH
// a trailing slash and 308-redirects the bare form, so every internal href and
// sitemap entry must carry one. Anything bare is a guaranteed redirect hop.
const bareHrefs = [];
for (const p of pages) {
  for (const m of p.html.matchAll(/href="(\/[^"#?]*)"/g)) {
    const h = m[1];
    if (h === '/' || h.endsWith('/')) continue;
    if (h.split('/').pop().includes('.')) continue; // /favicon.svg, /sitemap.xml
    bareHrefs.push(`${p.url}: ${h}`);
  }
}
hit('D6 every internal href carries a trailing slash', [...new Set(bareHrefs)]);
const sm = existsSync(join(DIST, 'sitemap.xml')) ? readFileSync(join(DIST, 'sitemap.xml'), 'utf8') : '';
const smBare = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]).filter((u) => !u.endsWith('/'));
hit('D6 every sitemap entry carries a trailing slash', smBare);
ok('D8 sitemap is a single flat urlset, not an index',
  /<urlset/.test(sm) && !/<sitemapindex/.test(sm) && !existsSync(join(DIST, 'sitemap-index.xml')));

// D3 no web fonts
const fontHits = [];
for (const p of pages) {
  if (/fonts\.googleapis|fonts\.gstatic|@font-face|typekit|@import url/i.test(p.html)) fontHits.push(p.url);
}
hit('D3 system font stack only, no web fonts', fontHits);
const submitHits = pages.filter((p) => /<(button|input)[^>]*type="submit"/i.test(p.html)).map((p) => p.url);
hit('D3 calculator has no submit button', submitHits);

// D4 schema
const schemaFails = [];
const homeTypes = [...home.html.matchAll(/"@type":"([A-Za-z]+)"/g)].map((m) => m[1]);
for (const t of ['WebApplication', 'Organization', 'BreadcrumbList', 'FAQPage']) {
  if (!homeTypes.includes(t)) schemaFails.push(`homepage missing ${t}`);
}
for (const p of pages) {
  const blocks = [...p.html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => m[1]);
  for (const b of blocks) { try { JSON.parse(b); } catch { schemaFails.push(`${p.url}: invalid JSON-LD`); } }
  const faqBlock = blocks.map((b) => JSON.parse(b)).find((b) => b['@type'] === 'FAQPage');
  if (faqBlock) {
    const schemaQs = faqBlock.mainEntity.map((q) => q.name);
    const visible = p.faq.map((f) => f.q);
    const missing = schemaQs.filter((q) => !visible.includes(q));
    if (missing.length) schemaFails.push(`${p.url}: ${missing.length} schema question(s) not visible`);
    if (schemaQs.length !== visible.length) schemaFails.push(`${p.url}: schema ${schemaQs.length} vs visible ${visible.length}`);
  }
}
hit('D4 schema intact: types present, JSON valid, FAQ matches visible', schemaFails);

// D9 / D10 internal links, orphans, broken links
const liveUrls = new Set(pages.map((p) => p.url));
const inbound = new Map(pages.map((p) => [p.url, new Set()]));
const anchorCount = new Map();
const broken = [];
const CHROME = new Set(['calculator', 'menu nutrition', 'chipotlemacros', 'skip to the calculator',
  'full menu nutrition index', 'how we calculate', 'data sources', 'cutting sodium at chipotle',
  'macro guide', 'methodology', 'details']);
for (const p of pages) {
  for (const m of p.main.matchAll(/<a\s[^>]*href="(\/[^"]*)"[^>]*>([\s\S]*?)<\/a>/g)) {
    const target = m[1].split('#')[0].replace(/\/$/, '') || '/';
    const text = decode(m[2]).toLowerCase();
    if (!liveUrls.has(target)) broken.push(`${p.url} → ${m[1]}`);
    else if (target !== p.url) inbound.get(target).add(p.url);
    if (text && !CHROME.has(text)) anchorCount.set(text, (anchorCount.get(text) || 0) + 1);
  }
}
hit('D10 zero broken internal links', [...new Set(broken)]);
// A noindex draft is expected to have no inbound links: linking to it would
// leak it into the crawl the noindex is meant to keep it out of.
const orphans = pages.filter((p) => p.url !== '/' && !p.noindex && inbound.get(p.url).size === 0).map((p) => p.url);
hit('D10 zero orphan pages', orphans);
const thinInbound = pages.filter((p) => p.url !== '/' && !p.noindex && inbound.get(p.url).size < 2)
  .map((p) => `${p.url} (${inbound.get(p.url).size} inbound)`);
hit('D9 every page has 2+ contextual inbound links', thinInbound);
const overAnchor = [...anchorCount.entries()].filter(([, n]) => n > 3).map(([t, n]) => `"${t}" ×${n}`);
hit('D9 no in-content anchor text used more than 3 times', overAnchor);

// D11
const vs = pages.find((p) => p.url === '/guides/vs-fast-food');
const llms = existsSync(join(DIST, 'llms.txt')) ? readFileSync(join(DIST, 'llms.txt'), 'utf8') : '';
ok('D11 vs-fast-food noindex, excluded from sitemap and llms.txt, labelled',
  vs.noindex && !sm.includes('vs-fast-food') && !llms.includes('vs-fast-food') &&
  /not citable in their current state/i.test(vs.text));

console.log(`\n${fails === 0 ? 'AUDIT CLEAN' : fails + ' CHECK(S) WITH FINDINGS'}`);
