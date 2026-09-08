// Attributes layout shift to the specific elements that moved.
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

const browser = await puppeteer.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: 'new', args: ['--no-sandbox'],
});

for (const url of process.argv.slice(2)) {
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true });
  const cdp = await page.createCDPSession();
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
  await cdp.send('Network.enable');
  await cdp.send('Network.emulateNetworkConditions', { offline: false, latency: 150, downloadThroughput: (1.6*1024*1024)/8, uploadThroughput: (750*1024)/8 });
  await page.evaluateOnNewDocument(() => {
    window.__shifts = [];
    new PerformanceObserver((l) => {
      for (const e of l.getEntries()) {
        if (e.hadRecentInput) continue;
        window.__shifts.push({
          value: e.value,
          t: Math.round(e.startTime),
          sources: (e.sources || []).map((s) => ({
            tag: s.node ? s.node.tagName + '.' + (s.node.className || '').toString().split(' ').slice(0, 2).join('.') : '?',
            from: s.previousRect ? `${Math.round(s.previousRect.y)}` : '?',
            to: s.currentRect ? `${Math.round(s.currentRect.y)}` : '?',
          })),
        });
      }
    }).observe({ type: 'layout-shift', buffered: true });
  });
  await page.goto(`http://localhost:${PORT}${url}`, { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 1500));
  const shifts = await page.evaluate(() => window.__shifts);
  const total = shifts.reduce((n, s) => n + s.value, 0);
  console.log(`\n=== ${url} — CLS ${total.toFixed(4)} across ${shifts.length} shift(s) ===`);
  for (const s of shifts) {
    console.log(`  ${s.value.toFixed(4)} at ${s.t}ms`);
    for (const src of s.sources) console.log(`      ${src.tag}  y ${src.from} -> ${src.to}`);
  }
  await page.close();
}
await browser.close();
srv.close();
