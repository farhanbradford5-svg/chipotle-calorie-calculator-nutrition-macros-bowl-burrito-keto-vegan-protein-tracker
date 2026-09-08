// Phase 0.3 — route inventory from the built output plus a stray-file check
// against the 55-page plan.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { ITEMS } from '../src/content/items.js';
import { DIETS } from '../src/content/diets.js';
import { GUIDES } from '../src/content/guides.js';
import { TRUST } from '../src/content/trust.js';

const DIST = 'dist';
const walk = (d) =>
  readdirSync(d).flatMap((f) => {
    const p = join(d, f);
    return statSync(p).isDirectory() ? walk(p) : p.endsWith('.html') ? [p] : [];
  });

const decode = (s) =>
  s.replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&').replace(/&rsquo;|&#8217;/g, '’').replace(/&mdash;/g, '—')
    .replace(/&nbsp;/g, ' ').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ').trim();

const files = walk(DIST);
const stubs = files.filter((f) => /http-equiv="refresh"/.test(readFileSync(f, 'utf8')));
const pages = files.filter((f) => !stubs.includes(f)).map((file) => {
  const html = readFileSync(file, 'utf8');
  const url = '/' + relative(DIST, file).replace(/\\/g, '/').replace(/(^|\/)index\.html$/, '');
  const main = html.slice(html.indexOf('<main'), html.indexOf('</main>'));
  return {
    url: url === '/' ? '/' : url.replace(/\/$/, ''),
    title: (html.match(/<title>([^<]*)<\/title>/) || [])[1] || '',
    h1: decode((html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1] || ''),
    words: decode(main).split(' ').filter(Boolean).length,
    h2s: [...html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/g)].map((m) => decode(m[1])),
    noindex: /content="noindex/.test(html),
    html,
    main,
  };
});

// Expected route set from the plan.
const expected = new Set([
  '/', '/menu',
  ...ITEMS.map((i) => `/menu/${i.slug}`),
  ...DIETS.map((d) => `/diet/${d.slug}`),
  ...GUIDES.map((g) => `/guides/${g.slug}`),
  ...TRUST.map((t) => t.path),
]);

console.log(`ROUTES: ${pages.length} content pages, ${stubs.length} redirect stubs\n`);
console.log('url'.padEnd(34) + 'words'.padEnd(7) + 'h2s'.padEnd(5) + 'title');
for (const p of [...pages].sort((a, b) => a.url.localeCompare(b.url))) {
  console.log(
    p.url.padEnd(34) + String(p.words).padEnd(7) + String(p.h2s.length).padEnd(5) +
    p.title.slice(0, 58) + (p.noindex ? '  [noindex]' : '')
  );
}

const unexpected = pages.filter((p) => !expected.has(p.url));
const missing = [...expected].filter((u) => !pages.some((p) => p.url === u));
console.log(`\nplan: ${expected.size} routes expected`);
console.log(`unexpected pages: ${unexpected.length ? unexpected.map((p) => p.url).join(', ') : 'none'}`);
console.log(`missing pages:    ${missing.length ? missing.join(', ') : 'none'}`);

// Stray source files not reachable as a route.
const srcPages = walk('src/pages').concat(
  readdirSync('src/pages', { recursive: true })
    .filter((f) => typeof f === 'string' && /\.astro$/.test(f))
    .map((f) => join('src/pages', f))
);
console.log(`\nsrc/pages files: ${[...new Set(srcPages)].join(', ')}`);
export {};
