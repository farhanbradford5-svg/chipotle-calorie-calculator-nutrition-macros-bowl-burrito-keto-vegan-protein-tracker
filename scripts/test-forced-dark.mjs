// Hypothesis: the page never declares a color-scheme, so a browser with
// auto-dark-mode ("Auto Dark Mode for Web Contents") algorithmically inverts
// parts of it — producing scattered black blocks over unrelated components.
import puppeteer from 'puppeteer-core';
import { createServer } from 'node:http';
import { readFileSync, statSync, mkdirSync } from 'node:fs';
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

mkdirSync('screens/forced-dark', { recursive: true });

const browser = await puppeteer.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: 'new',
  args: ['--no-sandbox', '--enable-features=WebContentsForceDark:inversion_method/cielab_based'],
});

const page = await browser.newPage();
await page.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: 'dark' }]);
await page.setViewport({ width: 1440, height: 1400 });
await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle0' });

const declared = await page.evaluate(() => ({
  metaColorScheme: document.querySelector('meta[name="color-scheme"]')?.content || null,
  rootColorScheme: getComputedStyle(document.documentElement).colorScheme,
  bodyBg: getComputedStyle(document.body).backgroundColor,
  cardBg: getComputedStyle(document.querySelector('.pick')).backgroundColor,
  cardFg: getComputedStyle(document.querySelector('.pick')).color,
}));
console.log('under forced dark:', JSON.stringify(declared, null, 2));

const h = await page.evaluate(() => document.documentElement.scrollHeight);
for (let i = 0; i < Math.min(3, Math.ceil(h / 1400)); i++) {
  await page.evaluate((y) => scrollTo(0, y), i * 1400);
  await new Promise((r) => setTimeout(r, 150));
  await page.screenshot({ path: `screens/forced-dark/slice-${i + 1}.png` });
}

await browser.close();
server.close();
