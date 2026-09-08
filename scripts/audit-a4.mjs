// Section 4: contrast measured on the A4 row and chip layouts specifically,
// and ARIA parity between all three layout variants.
import puppeteer from 'puppeteer-core';
import { createServer } from 'node:http';
import { readFileSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';

const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml' };
const srv = createServer((q, r) => {
  let p = join('dist', decodeURIComponent(q.url.split('?')[0]));
  try { if (statSync(p).isDirectory()) p = join(p, 'index.html'); } catch { p = join('dist', 'index.html'); }
  let body;
  try { body = readFileSync(p); } catch { r.writeHead(404); return r.end('not found'); }
  r.writeHead(200, { 'Content-Type': TYPES[extname(p)] || 'application/octet-stream' });
  r.end(body);
});
await new Promise((r) => srv.listen(0, r));
const PORT = srv.address().port;

let fails = 0;
const ok = (l, pass, d = '') => { if (!pass) fails++; console.log(`${pass ? 'PASS' : 'FAIL'}  ${l}${d ? '  — ' + d : ''}`); };

const browser = await puppeteer.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: 'new', args: ['--no-sandbox'],
});

for (const [label, width] of [['desktop 1440px', 1440], ['mobile 390px', 390]]) {
  const page = await browser.newPage();
  await page.setViewport({ width, height: 1000 });
  await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle0' });
  // Select one item in each layout so the selected states are measured too.
  await page.evaluate(() => {
    for (const id of ['chicken', 'white-rice', 'black-beans', 'mild-salsa', 'guac', 'chips']) {
      const el = document.querySelector(`.pick[data-id="${id}"]`);
      if (el) el.click();
    }
  });
  await new Promise((r) => setTimeout(r, 300));

  const measured = await page.evaluate(() => {
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
    const rows = [];
    for (const layout of ['cards', 'rows', 'chips']) {
      for (const state of ['false', 'true']) {
        const scope = document.querySelector(`.cat[data-layout="${layout}"]`);
        if (!scope) continue;
        const pick = scope.querySelector(`.pick[aria-checked="${state}"]`);
        if (!pick) continue;
        const targets = [
          ['ingredient name', pick.querySelector('.pick-name')],
          ['stat text', pick.querySelector('.stat')],
          ['serving text', pick.querySelector('.stat-serving')],
          ['high-sodium stat', scope.querySelector('.stat-high')],
          ['stat icon', pick.querySelector('.stat .icon')],
          ['category legend', scope.querySelector('legend')],
          ['category note', scope.querySelector('.cat-note')],
          ['heat label', scope.querySelector('.heat-label')],
        ];
        for (const [what, el] of targets) {
          if (!el) continue;
          const cs = getComputedStyle(el);
          const fg = parse(cs.color).slice(0, 3);
          const bg = bgOf(el);
          const size = parseFloat(cs.fontSize);
          const large = size >= 24 || (size >= 18.66 && parseInt(cs.fontWeight, 10) >= 700);
          rows.push({
            layout, state: state === 'true' ? 'selected' : 'unselected', what,
            ratio: +ratio(fg, bg).toFixed(2), need: large ? 3 : 4.5,
            fg: cs.color, bg: `rgb(${bg.join(', ')})`,
          });
        }
      }
    }
    return rows;
  });

  console.log(`\n--- ${label}: measured contrast on every A4 layout variant ---`);
  const seen = new Set();
  const under = [];
  for (const r of measured) {
    const key = `${r.layout}|${r.state}|${r.what}`;
    if (seen.has(key)) continue;
    seen.add(key);
    const pass = r.ratio >= r.need;
    if (!pass) under.push(`${r.layout}/${r.state}/${r.what} ${r.ratio}:1`);
    console.log(`  ${pass ? 'ok  ' : 'FAIL'} ${r.layout.padEnd(6)} ${r.state.padEnd(10)} ${r.what.padEnd(18)} ${String(r.ratio).padStart(6)}:1  (needs ${r.need})  ${r.fg} on ${r.bg}`);
  }
  ok(`${label}: every A4 variant clears WCAG AA`, under.length === 0, under.join(', '));
  await page.close();
}

// ARIA parity across the three layouts.
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 1000 });
await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle0' });
const aria = await page.evaluate(() =>
  [...document.querySelectorAll('.cat')].map((c) => {
    const items = c.querySelector('.items');
    const picks = [...c.querySelectorAll('.pick')];
    const portions = [...c.querySelectorAll('.portions')];
    return {
      cat: c.dataset.cat,
      layout: c.dataset.layout,
      groupRole: items.getAttribute('role'),
      groupLabel: items.getAttribute('aria-label'),
      legend: !!c.querySelector('legend'),
      picks: picks.length,
      pickRoles: [...new Set(picks.map((p) => p.getAttribute('role')))].join(','),
      pickChecked: picks.filter((p) => p.hasAttribute('aria-checked')).length,
      portionGroups: portions.length,
      portionRoles: [...new Set(portions.map((p) => p.getAttribute('role')))].join(',') || 'n/a',
      portionLabels: portions.filter((p) => p.getAttribute('aria-label')).length,
      portionPressed: [...c.querySelectorAll('.portion')].filter((b) => b.hasAttribute('aria-pressed')).length,
    };
  })
);
console.log('\n--- ARIA parity across layout variants ---');
console.log('cat        layout  items[role]  label?  pick role   checked  portion[role]   labels  pressed');
for (const a of aria) {
  console.log(
    `${a.cat.padEnd(10)} ${a.layout.padEnd(7)} ${String(a.groupRole).padEnd(12)} ${(a.groupLabel ? 'yes' : 'NO').padEnd(7)} ` +
    `${a.pickRoles.padEnd(11)} ${String(a.pickChecked + '/' + a.picks).padEnd(8)} ${a.portionRoles.padEnd(15)} ` +
    `${String(a.portionLabels + '/' + a.portionGroups).padEnd(7)} ${a.portionPressed}`
  );
}
ok('every category exposes a group role and label regardless of layout',
  aria.every((a) => a.groupRole && a.groupLabel));
ok('every pick carries a role and aria-checked in every layout',
  aria.every((a) => a.pickRoles && a.pickChecked === a.picks));
ok('single-choice categories use radio, multi use checkbox, independent of layout',
  aria.filter((a) => ['protein', 'rice', 'beans'].includes(a.cat)).every((a) => a.pickRoles === 'radio') &&
  aria.filter((a) => ['salsa', 'toppings', 'sides'].includes(a.cat)).every((a) => a.pickRoles === 'checkbox'));
ok('every portion control keeps radiogroup + aria-label in every layout',
  aria.every((a) => a.portionGroups === 0 || (a.portionRoles === 'radiogroup' && a.portionLabels === a.portionGroups)));
ok('every portion button keeps aria-pressed in every layout',
  aria.every((a) => a.portionPressed === a.portionGroups * 4));
ok('all three layouts are actually in use', new Set(aria.map((a) => a.layout)).size === 3,
  aria.map((a) => `${a.cat}=${a.layout}`).join(' '));

await browser.close();
srv.close();
console.log(`\n${fails === 0 ? 'A4 LAYOUTS: CONTRAST AND ARIA VERIFIED' : fails + ' CHECK(S) FAILED'}`);
process.exit(fails === 0 ? 0 : 1);
