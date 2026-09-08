// Phase 6: measured performance numbers, not estimates.
// A throttled headless browser on a shared machine swings by ~1s run to run,
// so every runtime figure is the median of five trials with the spread shown.
import puppeteer from 'puppeteer-core';
import { createServer } from 'node:http';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, extname, relative } from 'node:path';
import { gzipSync } from 'node:zlib';

const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.xml': 'application/xml', '.txt': 'text/plain' };
const server = createServer((req, res) => {
  let p = join('dist', decodeURIComponent(req.url.split('?')[0]));
  try { if (statSync(p).isDirectory()) p = join(p, 'index.html'); } catch { p = join('dist', 'index.html'); }
  try { res.writeHead(200, { 'Content-Type': TYPES[extname(p)] || 'application/octet-stream' }); res.end(readFileSync(p)); }
  catch { res.writeHead(404); res.end('nope'); }
});
await new Promise((r) => server.listen(0, r));
const PORT = server.address().port;

let fails = 0;
const budget = (label, value, limit, unit, fmt = (v) => v) => {
  const pass = value <= limit;
  if (!pass) fails++;
  console.log(`${pass ? 'PASS' : 'FAIL'}  ${label.padEnd(42)} ${String(fmt(value)).padStart(9)}${unit}   (budget ${fmt(limit)}${unit})`);
};

const walk = (d) => readdirSync(d).flatMap((f) => {
  const p = join(d, f);
  return statSync(p).isDirectory() ? walk(p) : [p];
});
const files = walk('dist');
const kb = (b) => Math.round(b / 1024);

const jsFiles = files.filter((f) => f.endsWith('.js'));
const jsGz = jsFiles.reduce((n, f) => n + gzipSync(readFileSync(f)).length, 0);
const htmlFiles = files.filter((f) => f.endsWith('.html'));
const biggestHtml = htmlFiles.map((f) => ({ f, size: statSync(f).size })).sort((a, b) => b.size - a.size)[0];

console.log('--- static weights ---');
budget('total JS, gzipped', jsGz, 150 * 1024, ' KB', kb);
budget(`largest HTML page (${relative('dist', biggestHtml.f)})`, biggestHtml.size, 500 * 1024, ' KB', kb);
console.log(`INFO  ${jsFiles.length} JS bundle(s), ${htmlFiles.length} HTML pages, dist total ${kb(files.reduce((n, f) => n + statSync(f).size, 0))} KB`);

const browser = await puppeteer.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: 'new', args: ['--no-sandbox'],
});
const page = await browser.newPage();
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
const cdp = await page.createCDPSession();
await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
await cdp.send('Network.enable');
await cdp.send('Network.emulateNetworkConditions', {
  offline: false, latency: 150, downloadThroughput: (1.6 * 1024 * 1024) / 8, uploadThroughput: (750 * 1024) / 8,
});
await page.evaluateOnNewDocument(() => {
  window.__lcp = 0; window.__cls = 0;
  new PerformanceObserver((l) => { for (const e of l.getEntries()) window.__lcp = e.startTime; })
    .observe({ type: 'largest-contentful-paint', buffered: true });
  new PerformanceObserver((l) => {
    for (const e of l.getEntries()) if (!e.hadRecentInput) window.__cls += e.value;
  }).observe({ type: 'layout-shift', buffered: true });
});

const TRIALS = 5;
const runs = [];
for (let i = 0; i < TRIALS; i++) {
  await page.goto('about:blank');
  await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 1200));
  const v = await page.evaluate(() => {
    const nav = performance.getEntriesByType('navigation')[0];
    const weight = performance.getEntriesByType('resource')
      .reduce((n, r) => n + (r.transferSize || r.encodedBodySize || 0), 0);
    return {
      lcp: window.__lcp, cls: window.__cls,
      ttfb: nav.responseStart, domInteractive: nav.domInteractive,
      pageWeight: weight + (nav.transferSize || 0),
    };
  });
  const inp = await page.evaluate(async () => {
    const worst = [];
    for (const id of ['chicken', 'white-rice', 'black-beans', 'guac']) {
      const el = document.querySelector(`.pick[data-id="${id}"]`);
      const t0 = performance.now();
      el.click();
      await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
      worst.push(performance.now() - t0);
    }
    const fmt = document.querySelector('.fmt[data-format="burrito"]');
    const t1 = performance.now();
    fmt.click();
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
    worst.push(performance.now() - t1);
    return Math.max(...worst);
  });
  runs.push({ ...v, inp });
}
const sorted = (k) => runs.map((r) => r[k]).sort((a, b) => a - b);
const median = (k) => sorted(k)[Math.floor(TRIALS / 2)];
const spread = (k) => { const x = sorted(k); return `${Math.round(x[0])}\u2013${Math.round(x[x.length - 1])}`; };

console.log(`\n--- runtime, mobile emulation (4x CPU throttle, 1.6 Mbps), median of ${TRIALS} ---`);
budget('LCP', median('lcp'), 1500, ' ms', (v) => Math.round(v));
budget('CLS', median('cls'), 0.05, '', (v) => v.toFixed(4));
budget('interaction latency (INP proxy)', median('inp'), 200, ' ms', (v) => Math.round(v));
budget('page weight, transferred', median('pageWeight'), 800 * 1024, ' KB', kb);
console.log(`INFO  LCP range ${spread('lcp')} ms | INP range ${spread('inp')} ms`);
console.log(`INFO  TTFB ${Math.round(median('ttfb'))} ms, DOM interactive ${Math.round(median('domInteractive'))} ms`);

let imgs = 0, extImgs = 0;
for (const f of htmlFiles) {
  const h = readFileSync(f, 'utf8');
  imgs += (h.match(/<img\b/g) || []).length;
  extImgs += (h.match(/url\((?!['"]?#)[^)]*\.(?:jpe?g|png|webp|gif|avif)/gi) || []).length;
}
const clean = imgs === 0 && extImgs === 0;
if (!clean) fails++;
console.log(`\n${clean ? 'PASS' : 'FAIL'}  no photography or raster imagery site-wide   ${imgs} <img>, ${extImgs} raster CSS refs`);

await browser.close();
server.close();
console.log(`\n${fails === 0 ? 'ALL BUDGETS MET' : fails + ' BUDGET(S) EXCEEDED'}`);
process.exit(fails === 0 ? 0 : 1);
