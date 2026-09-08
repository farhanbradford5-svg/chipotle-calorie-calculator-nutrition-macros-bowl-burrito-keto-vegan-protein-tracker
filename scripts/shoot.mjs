import puppeteer from 'puppeteer-core';
import { createServer } from 'node:http';
import { readFileSync, statSync, mkdirSync } from 'node:fs';
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
mkdirSync('screens/pages', { recursive: true });

const browser = await puppeteer.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: 'new', args: ['--no-sandbox'],
});

for (const url of process.argv.slice(2)) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 1500 });
  await page.goto(`http://localhost:${PORT}${url}`, { waitUntil: 'networkidle0' });
  const name = url.replace(/\//g, '_') || '_home';
  await page.screenshot({ path: `screens/pages/${name}.png` });
  console.log('shot', url);
  await page.close();
}
await browser.close();
server.close();
