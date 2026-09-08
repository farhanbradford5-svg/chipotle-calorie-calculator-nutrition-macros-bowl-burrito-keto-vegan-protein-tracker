// Verifies the analytics consent gate: nothing reaches Google before consent,
// the choice persists, declining never loads the tag, and the banner does not
// cover the sticky results bar on mobile.
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
await new Promise((r) => server.listen(0, r));
const PORT = server.address().port;
const URL = `http://localhost:${PORT}/`;

let fails = 0;
const ok = (l, pass, d = '') => { if (!pass) fails++; console.log(`${pass ? 'PASS' : 'FAIL'}  ${l}${d ? '  — ' + d : ''}`); };

const browser = await puppeteer.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: 'new', args: ['--no-sandbox'],
});

// Track every request that leaves for Google.
const watch = async (page) => {
  const hits = [];
  page.on('request', (r) => {
    const u = r.url();
    if (/googletagmanager\.com|google-analytics\.com|analytics\.google\.com/.test(u)) hits.push(u);
  });
  return hits;
};

// 1. First visit: banner shown, nothing sent, no analytics cookie.
let page = await browser.newPage();
let hits = await watch(page);
await page.goto(URL, { waitUntil: 'networkidle0' });
await new Promise((r) => setTimeout(r, 800));
ok('first visit shows the consent banner', await page.$eval('#consent', (e) => !e.hidden));
ok('nothing requested from Google before consent', hits.length === 0, hits.join(', '));
const preCookies = await page.cookies();
ok('no _ga cookie before consent', !preCookies.some((c) => c.name.startsWith('_ga')),
  preCookies.map((c) => c.name).join(', ') || 'no cookies at all');
const consentState = await page.evaluate(() =>
  (window.dataLayer || []).filter((a) => a[0] === 'consent').map((a) => [a[1], a[2] && a[2].analytics_storage])
);
ok('Consent Mode default is denied', JSON.stringify(consentState).includes('denied'), JSON.stringify(consentState));

// 2. Decline: tag never loads, choice persists across a reload.
await page.click('#consent-decline');
await new Promise((r) => setTimeout(r, 600));
ok('banner closes on decline', await page.$eval('#consent', (e) => e.hidden));
ok('declining requests nothing from Google', hits.length === 0, hits.join(', '));
await page.reload({ waitUntil: 'networkidle0' });
await new Promise((r) => setTimeout(r, 600));
ok('decline persists across a reload', await page.$eval('#consent', (e) => e.hidden));
ok('still nothing sent to Google after reload', hits.length === 0, hits.join(', '));
await page.close();

// 3. Accept: tag loads, and only then.
// localStorage is per-origin and shared across pages in one browser, so the
// decline from scenario 2 would still be stored. Clear it first.
page = await browser.newPage();
hits = await watch(page);
await page.goto(URL, { waitUntil: 'domcontentloaded' });
await page.evaluate(() => localStorage.clear());
await page.reload({ waitUntil: 'networkidle0' });
await new Promise((r) => setTimeout(r, 800));
ok('banner returns once the stored choice is cleared', await page.$eval('#consent', (e) => !e.hidden));
const before = hits.length;
await page.click('#consent-accept');
await new Promise((r) => setTimeout(r, 2500));
ok('nothing was sent before Accept was pressed', before === 0);
ok('accepting loads gtag.js', hits.some((u) => u.includes('gtag/js')), hits.slice(0, 2).join(', '));
const granted = await page.evaluate(() =>
  (window.dataLayer || []).some((a) => a[0] === 'consent' && a[1] === 'update' && a[2] && a[2].analytics_storage === 'granted')
);
ok('consent updated to granted', granted);
await page.reload({ waitUntil: 'networkidle0' });
await new Promise((r) => setTimeout(r, 800));
ok('accept persists across a reload', await page.$eval('#consent', (e) => e.hidden));
await page.close();

// 4. Mobile layout: banner must not cover the sticky results bar.
page = await browser.newPage();
await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
await page.goto(URL, { waitUntil: 'domcontentloaded' });
await page.evaluate(() => localStorage.clear());
await page.reload({ waitUntil: 'networkidle0' });
await new Promise((r) => setTimeout(r, 800));
const geo = await page.evaluate(() => {
  const c = document.querySelector('#consent').getBoundingClientRect();
  const b = document.querySelector('#mobile-bar').getBoundingClientRect();
  const btn = [...document.querySelectorAll('.c-accept, .c-decline')].map((e) => e.getBoundingClientRect().height);
  return { consentBottom: c.bottom, barTop: b.top, barVisible: b.height > 0, minBtn: Math.min(...btn), docW: document.documentElement.scrollWidth, viewW: innerWidth };
});
ok('banner sits above the sticky results bar, not over it',
  geo.consentBottom <= geo.barTop + 1 && geo.barVisible,
  `banner bottom ${Math.round(geo.consentBottom)} vs bar top ${Math.round(geo.barTop)}`);
ok('consent buttons meet the 44px tap target', geo.minBtn >= 44, `${Math.round(geo.minBtn)}px`);
ok('banner introduces no horizontal overflow', geo.docW <= geo.viewW + 1, `${geo.docW} vs ${geo.viewW}`);
await page.close();

await browser.close();
server.close();
console.log(`\n${fails === 0 ? 'CONSENT GATE VERIFIED' : fails + ' CHECK(S) FAILED'}`);
process.exit(fails === 0 ? 0 : 1);
