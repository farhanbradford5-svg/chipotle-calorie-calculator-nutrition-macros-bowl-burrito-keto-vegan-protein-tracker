import puppeteer from 'puppeteer-core';
import { createServer } from 'node:http';
import { readFileSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';

const T = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml' };
const srv = createServer((q, r) => {
  let p = join('dist', decodeURIComponent(q.url.split('?')[0]));
  try { if (statSync(p).isDirectory()) p = join(p, 'index.html'); } catch { p = join('dist', 'index.html'); }
  try { r.writeHead(200, { 'Content-Type': T[extname(p)] || 'application/octet-stream' }); r.end(readFileSync(p)); }
  catch { r.writeHead(404); r.end(); }
});
await new Promise((r) => srv.listen(0, r));
const PORT = srv.address().port;

const b = await puppeteer.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: 'new', args: ['--no-sandbox'],
});
const pg = await b.newPage();
await pg.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true });
const cdp = await pg.createCDPSession();
await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
await pg.evaluateOnNewDocument(() => {
  window.__e = [];
  new PerformanceObserver((l) => {
    for (const e of l.getEntries()) {
      window.__e.push({
        t: e.startTime,
        size: e.size,
        tag: e.element ? e.element.tagName + '.' + (e.element.className || '').toString().slice(0, 30) : '?',
      });
    }
  }).observe({ type: 'largest-contentful-paint', buffered: true });
});
await pg.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle0' });
await new Promise((r) => setTimeout(r, 1500));
const e = await pg.evaluate(() => window.__e);
console.log('LCP candidates in order:');
for (const x of e) console.log(`   ${Math.round(x.t)}ms  size ${String(x.size).padStart(7)}  ${x.tag}`);
console.log('paints:', (await pg.evaluate(() => performance.getEntriesByType('paint').map((p) => `${p.name} ${Math.round(p.startTime)}ms`))).join(', '));
await b.close();
srv.close();
