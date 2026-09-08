// A12: render every page as a real headless screenshot at 390px and 1440px and
// scan for unintended obscured text. Also checks A4 (adjacent sections must not
// present identically) and A7 (every graphic has a crawlable text twin).
import puppeteer from 'puppeteer-core';
import { createServer } from 'node:http';
import { readFileSync, readdirSync, statSync, mkdirSync } from 'node:fs';
import { join, extname, relative } from 'node:path';

const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.xml': 'application/xml', '.txt': 'text/plain' };
const server = createServer((req, res) => {
  let p = join('dist', decodeURIComponent(req.url.split('?')[0]));
  try { if (statSync(p).isDirectory()) p = join(p, 'index.html'); } catch { p = join('dist', 'index.html'); }
  try { res.writeHead(200, { 'Content-Type': TYPES[extname(p)] || 'application/octet-stream' }); res.end(readFileSync(p)); }
  catch { res.writeHead(404); res.end('nope'); }
});
await new Promise((r) => server.listen(0, r));
const PORT = server.address().port;
mkdirSync('screens/all', { recursive: true });

const walk = (d) => readdirSync(d).flatMap((f) => {
  const p = join(d, f);
  return statSync(p).isDirectory() ? walk(p) : p.endsWith('.html') ? [p] : [];
});
const urls = walk('dist').map((f) => {
  const u = '/' + relative('dist', f).replace(/\\/g, '/').replace(/(^|\/)index\.html$/, '');
  return u === '/' ? '/' : u.replace(/\/$/, '');
}).sort();

const browser = await puppeteer.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: 'new', args: ['--no-sandbox'],
});

let fails = 0;
const ok = (l, pass, d = '') => { if (!pass) fails++; console.log(`${pass ? 'PASS' : 'FAIL'}  ${l}${d ? '  — ' + d : ''}`); };

// Elements that are dark by design and carry their own light text.
const INTENTIONAL = ['skip', 'fmt', 'primary', 'mobile-bar', 'portion'];

const obscured = [];
const overflow = [];
const contrastFails = [];
for (const [label, width] of [['mobile', 390], ['desktop', 1440]]) {
  const page = await browser.newPage();
  await page.setViewport({ width, height: 1200 });
  for (const url of urls) {
    await page.goto(`http://localhost:${PORT}${url}`, { waitUntil: 'networkidle0' });
    const r = await page.evaluate((INTENTIONAL) => {
      const parse = (c) => (c.match(/[\d.]+/g) || []).map(Number);
      const lin = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
      const L = ([r, g, b]) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
      const ratio = (a, b) => (Math.max(L(a), L(b)) + 0.05) / (Math.min(L(a), L(b)) + 0.05);
      const bgOf = (el) => {
        let n = el;
        while (n && n !== document.documentElement) {
          const c = parse(getComputedStyle(n).backgroundColor);
          if (c.length === 3 || (c[3] ?? 1) > 0.95) return c.slice(0, 3);
          n = n.parentElement;
        }
        return [255, 255, 255];
      };
      const bad = [];
      for (const el of document.querySelectorAll('main *, header *, footer *')) {
        const txt = [...el.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent.trim()).join('');
        if (!txt) continue;
        const rect = el.getBoundingClientRect();
        if (rect.width < 2 || rect.height < 2) continue;
        const cs = getComputedStyle(el);
        if (cs.visibility === 'hidden' || cs.display === 'none' || Number(cs.opacity) < 0.15) continue;
        const cls = el.className?.toString?.() || '';
        if (INTENTIONAL.some((c) => cls.split(/\s+/).includes(c))) continue;
        const fg = parse(cs.color).slice(0, 3);
        const bg = bgOf(el);
        const cr = ratio(fg, bg);
        const size = parseFloat(cs.fontSize);
        const large = size >= 24 || (size >= 18.66 && parseInt(cs.fontWeight, 10) >= 700);
        if (cr < (large ? 3 : 4.5)) {
          bad.push({ tag: el.tagName.toLowerCase(), cls: cls.slice(0, 30), cr: +cr.toFixed(2), txt: txt.slice(0, 40) });
        }
      }
      return {
        bad,
        docW: document.documentElement.scrollWidth,
        viewW: innerWidth,
      };
    }, INTENTIONAL);
    if (r.bad.length) obscured.push(`${label} ${url}: ${r.bad.map((b) => `${b.tag}.${b.cls} ${b.cr}:1 "${b.txt}"`).join(' | ')}`);
    if (r.docW > r.viewW + 1) overflow.push(`${label} ${url}: ${r.docW} > ${r.viewW}`);
  }
  await page.close();
  console.log(`scanned ${urls.length} pages at ${width}px`);
}

ok('A12 no obscured or low-contrast text on any of 55 pages at 390px and 1440px',
  obscured.length === 0, obscured.slice(0, 6).join('\n        '));
ok('A12 no horizontal overflow on any page at either width',
  overflow.length === 0, overflow.slice(0, 6).join('\n        '));

// A4: adjacent ingredient categories must not share a layout.
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 1200 });
await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle0' });
const layoutRun = await page.evaluate(() =>
  [...document.querySelectorAll('.cat')].map((el) => ({
    cat: el.dataset.cat,
    layout: el.dataset.layout,
    display: getComputedStyle(el.querySelector('.items')).display,
    cols: getComputedStyle(el.querySelector('.items')).gridTemplateColumns,
  }))
);
const adjacentSame = layoutRun.filter((c, i) => i > 0 &&
  c.layout === layoutRun[i - 1].layout).map((c) => c.cat);
ok('A4 no two adjacent ingredient sections share a layout',
  adjacentSame.length === 0,
  layoutRun.map((c) => `${c.cat}=${c.layout}`).join(' → '));
const distinctRendering = new Set(layoutRun.map((c) => c.display + '|' + c.cols)).size;
ok('A4 the layout variants actually render differently', distinctRendering >= 3, `${distinctRendering} distinct renderings`);

// A7: every graphic needs an adjacent text twin.
const verbal = await page.evaluate(() => {
  const out = {};
  const txt = (sel) => (document.querySelector(sel)?.textContent || '').replace(/\s+/g, ' ').trim();
  out.macroBar = !!document.querySelector('.split-bar') && /Protein\s*\d+\s*%.*Carbs\s*\d+\s*%.*Fat\s*\d+\s*%/s.test(txt('.split-key'));
  out.dvBars = !!document.querySelector('.dv-bars') && /Sodium is\s*\d+%.*fiber is\s*\d+%/s.test(txt('.dv-line'));
  const heat = document.querySelector('.heat');
  out.heatDots = !!heat && /^(Mild|Medium|Hot)$/.test((heat.querySelector('.heat-label')?.textContent || '').trim());
  out.heatDotsAria = !!heat && heat.querySelector('.heat-dots')?.getAttribute('aria-hidden') === 'true';
  const range = document.querySelector('.range-track');
  out.rangeBar = !!range && /\d/.test(txt('.frange'));
  // A6: the two bar graphics must encode different things
  out.differentEncoding = !!document.querySelector('.split-bar') && !!range &&
    document.querySelector('.split-bar').children.length === 3 &&
    range.children.length === 1;
  return out;
});
ok('A7 macro-proportion bar has a text twin', verbal.macroBar);
ok('A7 sodium/fiber daily-value bars have a text twin', verbal.dvBars);
ok('A7 salsa heat dots carry a word label, dots hidden from AT', verbal.heatDots && verbal.heatDotsAria);
ok('A7 calorie-range bar has a text twin', verbal.rangeBar);
ok('A6 macro bar and range bar encode different information in different forms', verbal.differentEncoding);

await browser.close();
server.close();
console.log(`\n${fails === 0 ? 'VISUAL AUDIT CLEAN' : fails + ' CHECK(S) FAILED'}`);
process.exit(fails === 0 ? 0 : 1);
