import puppeteer from 'puppeteer-core';
import { createServer } from 'node:http';
import { readFileSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';

const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml' };
const server = createServer((req, res) => {
  let p = join('dist', decodeURIComponent(req.url.split('?')[0]));
  try { if (statSync(p).isDirectory()) p = join(p, 'index.html'); } catch { p = join('dist', 'index.html'); }
  let body;
  try { body = readFileSync(p); } catch { res.writeHead(404); return res.end('not found'); }
  res.writeHead(200, { 'Content-Type': TYPES[extname(p)] || 'application/octet-stream' });
  res.end(body);
});
// ephemeral port so a running `npm run dev` can't collide with the test server
await new Promise((r) => server.listen(0, r));
const PORT = server.address().port;

const browser = await puppeteer.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: 'new',
  args: ['--no-sandbox'],
});

let fails = 0;
const ok = (l, pass, d = '') => { if (!pass) fails++; console.log(`${pass ? 'PASS' : 'FAIL'}  ${l}${d ? '  — ' + d : ''}`); };

for (const [name, width, height] of [['desktop', 1440, 900], ['mobile', 390, 844]]) {
  const page = await browser.newPage();
  await page.setViewport({ width, height, deviceScaleFactor: 1 });
  await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle0' });

  console.log(`\n--- ${name} ${width}x${height} ---`);

  const geo = await page.evaluate(() => {
    const r = (el) => (el ? el.getBoundingClientRect() : null);
    const calc = document.querySelector('#calculator');
    const builder = document.querySelector('.builder');
    const h1 = document.querySelector('h1');
    return {
      calcTop: r(calc).top + scrollY,
      calcHeight: r(calc).height,
      builderTop: r(builder).top + scrollY,
      h1Top: r(h1).top + scrollY,
      firstPick: r(document.querySelector('.pick')).top + scrollY,
      firstFormat: r(document.querySelector('.fmt')).top + scrollY,
      headerH: r(document.querySelector('.topbar')).height,
      docWidth: document.documentElement.scrollWidth,
      viewportW: innerWidth,
      resultsTop: r(document.querySelector('.results-inner')).top + scrollY,
      proseTop: r(document.querySelector('.prose')).top + scrollY,
    };
  });

  ok('calculator starts within the first viewport', geo.calcTop < height * 0.15, `top ${Math.round(geo.calcTop)}px`);
  ok('H1 above the calculator controls', geo.h1Top < geo.firstFormat);
  ok('meal-format controls visible without scrolling', geo.firstFormat < height, `${Math.round(geo.firstFormat)}px`);
  ok('ingredient buttons begin in first viewport', geo.firstPick < height, `${Math.round(geo.firstPick)}px`);
  ok('nothing but the nav precedes the calculator', geo.calcTop <= geo.headerH + 1, `header ${geo.headerH}px`);
  ok('supporting copy sits below the calculator', geo.proseTop > height, `prose at ${Math.round(geo.proseTop)}px`);
  ok('no horizontal page scroll', geo.docWidth <= geo.viewportW + 1, `${geo.docWidth} vs ${geo.viewportW}`);

  // Icons must paint as line art. If fill/stroke are declared on <symbol>
  // instead of the <use> host they never reach the shadow tree and every
  // icon renders as a solid black blob.
  const iconPaint = await page.evaluate(() => {
    const els = [...document.querySelectorAll('.icon')];
    const bad = els.filter((e) => {
      const cs = getComputedStyle(e);
      return cs.fill !== 'none' || cs.stroke === 'none';
    });
    return { count: els.length, bad: bad.length };
  });
  ok('icons inherit stroke paint (not filled blobs)',
    iconPaint.bad === 0 && iconPaint.count > 20, `${iconPaint.count} icons, ${iconPaint.bad} mispainted`);

  const iconInk = await page.evaluate(() => {
    const r = document.querySelector('.cat legend .cat-icon').getBoundingClientRect();
    return { x: r.x, y: r.y, w: r.width, h: r.height };
  });
  const clip = await page.screenshot({
    encoding: 'base64',
    clip: { x: Math.round(iconInk.x), y: Math.round(iconInk.y), width: Math.ceil(iconInk.w), height: Math.ceil(iconInk.h) },
  });
  const inkRatio = await page.evaluate(async (b64) => {
    const img = new Image();
    img.src = 'data:image/png;base64,' + b64;
    await img.decode();
    const c = document.createElement('canvas');
    c.width = img.width; c.height = img.height;
    const ctx = c.getContext('2d');
    ctx.drawImage(img, 0, 0);
    const { data } = ctx.getImageData(0, 0, img.width, img.height);
    let ink = 0, n = 0;
    for (let i = 0; i < data.length; i += 4) {
      n++;
      const l = 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2];
      if (l < 110) ink++;
    }
    return ink / n;
  }, clip);
  ok('icon glyph is line art, not a solid block', inkRatio < 0.55, `${Math.round(inkRatio * 100)}% ink coverage`);

  // Interaction: build the documented chicken bowl and read the live totals.
  await page.evaluate(() => {
    const click = (id) => document.querySelector(`.pick[data-id="${id}"]`).click();
    ['chicken', 'white-rice', 'black-beans', 'mild-salsa', 'cheese'].forEach(click);
  });
  const totals = await page.evaluate(() => ({
    cal: document.querySelector('#t-cal').textContent,
    p: document.querySelector('#t-p').textContent,
    na: document.querySelector('#t-na').textContent,
    naDv: document.querySelector('#t-na-dv').textContent,
    lines: document.querySelectorAll('#build-list li').length,
    mobileCal: document.querySelector('#m-cal').textContent,
    portionsShown: document.querySelector('.pick[data-id="chicken"]').closest('.item').querySelector('.portions').hidden,
  }));
  ok('live totals update on click', totals.cal === '655', `${totals.cal} cal, ${totals.p} g protein, ${totals.na} mg sodium`);
  ok('sodium %DV computed', totals.naDv === '70', `${totals.naDv}%`);
  ok('build list lists each pick', totals.lines === 5, `${totals.lines} lines`);
  ok('portion control revealed on selection', totals.portionsShown === false);
  const portionVis = await page.evaluate(() => {
    const shown = [...document.querySelectorAll('.portions')].filter((p) => p.getBoundingClientRect().height > 0);
    const picked = [...document.querySelectorAll('.pick[aria-checked="true"]')].length;
    return { shown: shown.length, picked };
  });
  ok('portion controls hidden for unselected ingredients',
    portionVis.shown === portionVis.picked, `${portionVis.shown} shown / ${portionVis.picked} selected`);
  const row = await page.evaluate(() => {
    const li = document.querySelector('#build-list li');
    const cal = li.querySelector('.bl-cal').getBoundingClientRect();
    return { display: getComputedStyle(li).display, gap: Math.round(cal.left - li.querySelector('span').getBoundingClientRect().right) };
  });
  ok('build-list rows lay out (scoped CSS reaches injected nodes)',
    row.display === 'flex' && row.gap > 0, JSON.stringify(row));
  ok('sticky bar mirrors the total', totals.mobileCal === '655', totals.mobileCal);

  // Header running-total chip: hidden while the results panel is on screen,
  // revealed once it scrolls away, and never shown for an empty meal.
  const shown = (sel) => page.$eval(sel, (e) => e.getBoundingClientRect().height > 0);
  // settle: the clipped screenshot above perturbs viewport metrics, which
  // re-fires the IntersectionObserver driving this chip
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise((r) => setTimeout(r, 250));
  ok('header chip not shown while the results panel is on screen', (await shown('#head-chip')) === false);
  // Scroll until the results panel has genuinely left the viewport rather
  // than to an arbitrary fraction of the page height.
  // The panel is position:sticky, so it follows the scroll until its own
  // container ends. Scroll past the container, not past the panel.
  await page.evaluate(() => {
    const holder = document.querySelector('.calc-grid');
    window.scrollTo(0, holder.getBoundingClientRect().bottom + window.scrollY + 150);
  });
  await new Promise((r) => setTimeout(r, 250));
  // The chip is updated from a rAF-throttled scroll handler, so poll for it
  // rather than racing a fixed delay on a loaded machine.
  const chipScrolled = await page.evaluate(async () => {
    const chip = document.querySelector('#head-chip');
    for (let i = 0; i < 40; i++) {
      if (chip.getBoundingClientRect().height > 0) break;
      await new Promise((r) => setTimeout(r, 50));
    }
    return {
      visible: chip.getBoundingClientRect().height > 0,
      text: document.querySelector('#head-chip-cal').textContent,
    };
  });
  if (name === 'desktop') {
    ok('header chip appears on scroll with the running total',
      chipScrolled.visible === true && chipScrolled.text === '655', JSON.stringify(chipScrolled));
  } else {
    // the sticky bottom bar carries the total here instead
    ok('header chip stays suppressed on mobile (bottom bar owns the total)',
      chipScrolled.visible === false);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise((r) => setTimeout(r, 250));

  // Portion scaling through the real UI.
  await page.evaluate(() => {
    const item = document.querySelector('.pick[data-id="chicken"]').closest('.item');
    item.querySelector('.portion[data-portion="double"]').click();
  });
  ok('double portion recalculates', (await page.$eval('#t-cal', (e) => e.textContent)) === '835');

  // Format switch.
  await page.evaluate(() => document.querySelector('.fmt[data-format="burrito"]').click());
  ok('burrito format adds the tortilla', (await page.$eval('#t-cal', (e) => e.textContent)) === '1,155');

  // Preset.
  await page.evaluate(() => document.querySelector('.preset[data-preset="high-protein"]').click());
  ok('preset loads a full build', (await page.$eval('#t-p', (e) => e.textContent)) === '82');

  if (name === 'mobile') {
    const bar = await page.evaluate(() => {
      const b = document.querySelector('#mobile-bar');
      const r = b.getBoundingClientRect();
      return { fixed: getComputedStyle(b).position, bottom: Math.round(innerHeight - r.bottom), visible: r.height > 0 };
    });
    ok('results bar is fixed to the bottom on mobile', bar.fixed === 'fixed' && bar.bottom <= 1 && bar.visible, JSON.stringify(bar));
    const touch = await page.evaluate(() =>
      Math.min(...[...document.querySelectorAll('.pick, .fmt, .primary, .secondary')].map((e) => e.getBoundingClientRect().height))
    );
    ok('tap targets at least 40px tall', touch >= 40, `smallest ${Math.round(touch)}px`);
    await page.evaluate(() => window.scrollTo(0, 1500));
    const stillThere = await page.$eval('#mobile-bar', (b) => b.getBoundingClientRect().top < innerHeight);
    ok('results bar stays visible while scrolling', stillThere);
  }

  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: `screens/${name}.png` });
  await page.close();
}

await browser.close();
server.close();
console.log(`\n${fails === 0 ? 'ALL VISUAL / INTERACTION CHECKS PASSED' : fails + ' CHECK(S) FAILED'}`);
process.exit(fails === 0 ? 0 : 1);
