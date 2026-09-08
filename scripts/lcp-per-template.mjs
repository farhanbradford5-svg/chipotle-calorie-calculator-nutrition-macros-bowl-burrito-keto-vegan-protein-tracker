// Section 5: LCP measured separately per template, so a fast homepage cannot
// hide a slow item, diet or guide page. Median of 5 trials each, same mobile
// throttling as the main perf gate.
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

const TARGETS = [
  ['homepage', '/'],
  ['menu index', '/menu'],
  ['item page', '/menu/chicken-bowl'],
  ['diet page', '/diet/keto'],
  ['guide page', '/guides/sodium'],
  ['guide page (allergens)', '/guides/allergens'],
  ['trust page', '/methodology'],
];
const BUDGET = 1500;
const TRIALS = 5;

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
  window.__lcp = 0; window.__cls = 0; window.__el = '';
  new PerformanceObserver((l) => {
    for (const e of l.getEntries()) {
      window.__lcp = e.startTime;
      window.__el = e.element ? e.element.tagName + '.' + (e.element.className || '').toString().split(' ')[0] : '?';
    }
  }).observe({ type: 'largest-contentful-paint', buffered: true });
  new PerformanceObserver((l) => {
    for (const e of l.getEntries()) if (!e.hadRecentInput) window.__cls += e.value;
  }).observe({ type: 'layout-shift', buffered: true });
});

let fails = 0;
console.log(`LCP per template — mobile, 4x CPU throttle, 1.6 Mbps, median of ${TRIALS}\n`);
console.log('template'.padEnd(24) + 'url'.padEnd(22) + 'LCP'.padStart(8) + '   range'.padEnd(14) + 'CLS'.padStart(8) + '   LCP element');
for (const [label, url] of TARGETS) {
  const lcps = [], clss = [];
  let el = '';
  for (let i = 0; i < TRIALS; i++) {
    await page.goto('about:blank');
    await page.goto(`http://localhost:${PORT}${url}`, { waitUntil: 'networkidle0' });
    await new Promise((r) => setTimeout(r, 900));
    const v = await page.evaluate(() => ({ lcp: window.__lcp, cls: window.__cls, el: window.__el }));
    lcps.push(v.lcp); clss.push(v.cls); el = v.el;
  }
  lcps.sort((a, b) => a - b); clss.sort((a, b) => a - b);
  const med = lcps[Math.floor(TRIALS / 2)];
  const cls = clss[Math.floor(TRIALS / 2)];
  const pass = med <= BUDGET;
  if (!pass) fails++;
  console.log(
    `${pass ? '' : 'FAIL '}${label.padEnd(pass ? 24 : 19)}${url.padEnd(22)}` +
    `${Math.round(med).toString().padStart(6)}ms   ${Math.round(lcps[0])}\u2013${Math.round(lcps[lcps.length - 1])}`.padEnd(14) +
    `${cls.toFixed(4).padStart(8)}   ${el}`
  );
}

await browser.close();
srv.close();
console.log(`\nbudget ${BUDGET}ms per template`);
console.log(fails === 0 ? 'EVERY TEMPLATE INSIDE THE LCP BUDGET' : `${fails} TEMPLATE(S) OVER BUDGET`);
process.exit(fails === 0 ? 0 : 1);
