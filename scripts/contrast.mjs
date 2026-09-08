// WCAG AA contrast for every new coloured text/icon pairing introduced by the
// design pass. Measures the real rendered colours out of the built page.
import puppeteer from 'puppeteer-core';
import { createServer } from 'node:http';
import { readFileSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';

const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml' };
const server = createServer((req, res) => {
  let p = join('dist', decodeURIComponent(req.url.split('?')[0]));
  try { if (statSync(p).isDirectory()) p = join(p, 'index.html'); } catch { p = join('dist', 'index.html'); }
  try { res.writeHead(200, { 'Content-Type': TYPES[extname(p)] || 'application/octet-stream' }); res.end(readFileSync(p)); }
  catch { res.writeHead(404); res.end('nope'); }
});
await new Promise((r) => server.listen(0, r));
const PORT = server.address().port;

const browser = await puppeteer.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: 'new', args: ['--no-sandbox'],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 1000 });
await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle0' });
// select a salsa so the heat chip and selected-card colours are exercised
await page.evaluate(() => document.querySelector('.pick[data-id="mild-salsa"]').click());

const results = await page.evaluate(() => {
  const parse = (c) => (c.match(/[\d.]+/g) || []).map(Number);
  const lin = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
  const L = ([r, g, b]) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
  const ratio = (fg, bg) => {
    const a = L(fg), b = L(bg);
    return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
  };
  const bgOf = (el) => {
    let n = el;
    while (n && n !== document.documentElement) {
      const c = parse(getComputedStyle(n).backgroundColor);
      if (c.length === 3 || (c[3] ?? 1) > 0.95) return c.slice(0, 3);
      n = n.parentElement;
    }
    return [255, 255, 255];
  };
  const targets = [
    ['category legend — protein', '.cat[data-cat="protein"] > legend'],
    ['category legend — rice', '.cat[data-cat="rice"] > legend'],
    ['category legend — beans', '.cat[data-cat="beans"] > legend'],
    ['category legend — salsa', '.cat[data-cat="salsa"] > legend'],
    ['category legend — toppings', '.cat[data-cat="toppings"] > legend'],
    ['category legend — sides', '.cat[data-cat="sides"] > legend'],
    ['high-sodium stat on card', '.stat-high'],
    ['heat label', '.heat-label'],
    ['preset totals', '.preset-nums'],
    ['badge — most protein', '.badge-protein'],
    ['badge — fewest calories', '.badge-light'],
    ['badge — most fiber', '.badge-fiber'],
    ['badge — least sodium', '.badge-sodium'],
    ['swap delta (increase)', '.compare-grid li[data-dir="up"] .cmp-delta'],
    ['swap delta (neutral)', '.compare-grid li[data-dir="flat"] .cmp-delta'],
    ['macro key — protein', '.key-p'],
    ['macro key — carbs', '.key-c'],
    ['macro key — fat', '.key-f'],
    ['calorie total', '.cal-num'],
    ['header chip', '.head-chip'],
    ['table high value', 'td.num-high'],
    ['metric legend icon row', '.metric-legend li'],
    ['protein column heading', '.col-protein h3'],
    ['low-calorie column heading', '.col-light h3'],
    ['trust icon heading', '.h2-icon'],
    ['nav link', '.topbar nav a'],
    ['footer brand', '.foot-brand'],
  ];
  return targets.map(([label, sel]) => {
    const el = document.querySelector(sel);
    if (!el) return { label, missing: true };
    const cs = getComputedStyle(el);
    const fg = parse(cs.color).slice(0, 3);
    const bg = bgOf(el);
    const size = parseFloat(cs.fontSize);
    const bold = parseInt(cs.fontWeight, 10) >= 700;
    const large = size >= 24 || (size >= 18.66 && bold);
    return {
      label, ratio: +ratio(fg, bg).toFixed(2), large,
      need: large ? 3 : 4.5,
      fg: cs.color, bg: `rgb(${bg.join(', ')})`,
    };
  });
});

let fails = 0;
for (const r of results) {
  if (r.missing) { fails++; console.log(`MISSING  ${r.label}`); continue; }
  const pass = r.ratio >= r.need;
  if (!pass) fails++;
  console.log(
    `${pass ? 'PASS' : 'FAIL'}  ${r.label.padEnd(30)} ${String(r.ratio).padStart(5)}:1  (needs ${r.need}${r.large ? ', large text' : ''})`
  );
}
console.log(fails === 0 ? '\nAll new colour pairings meet WCAG AA.' : `\n${fails} pairing(s) below AA.`);

await browser.close();
server.close();
process.exit(fails === 0 ? 0 : 1);
