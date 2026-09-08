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

const browser = await puppeteer.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: 'new',
  args: ['--no-sandbox'],
});

mkdirSync('screens/full', { recursive: true });

for (const [name, width] of [['desktop', 1440], ['mobile', 390]]) {
  const page = await browser.newPage();
  await page.setViewport({ width, height: 1000 });
  await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle0' });

  // 1. DOM scan: elements that paint dark, or whose text colour matches its own background.
  const suspects = await page.evaluate(() => {
    const parse = (c) => (c.match(/[\d.]+/g) || []).map(Number);
    const lum = ([r, g, b]) => 0.2126 * r + 0.7152 * g + 0.0722 * b;
    const out = [];
    for (const el of document.querySelectorAll('body *')) {
      const cs = getComputedStyle(el);
      const bg = parse(cs.backgroundColor);
      const fg = parse(cs.color);
      const r = el.getBoundingClientRect();
      if (r.width < 4 || r.height < 4) continue;
      const opaque = bg.length === 3 || (bg[3] ?? 1) > 0.85;
      const dark = opaque && lum(bg) < 60;
      const invisibleText =
        el.textContent.trim() &&
        opaque &&
        Math.abs(lum(bg) - lum(fg)) < 25;
      if (dark || invisibleText) {
        out.push({
          tag: el.tagName.toLowerCase(),
          cls: el.className?.toString?.().slice(0, 60) || '',
          text: el.textContent.trim().slice(0, 45),
          bg: cs.backgroundColor,
          fg: cs.color,
          w: Math.round(r.width),
          h: Math.round(r.height),
          y: Math.round(r.top + scrollY),
          reason: dark ? 'dark-background' : 'text-matches-background',
        });
      }
    }
    return out;
  });

  console.log(`\n=== ${name} (${width}px): ${suspects.length} dark / low-contrast elements ===`);
  for (const s of suspects) {
    console.log(`  ${s.reason.padEnd(24)} <${s.tag} class="${s.cls}"> ${s.w}x${s.h} @y${s.y}`);
    console.log(`      bg=${s.bg} fg=${s.fg} text="${s.text}"`);
  }

  // 2. Full-page screenshot, sliced so each image stays readable.
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  const SLICE = 1400;
  const slices = Math.ceil(height / SLICE);
  await page.setViewport({ width, height: SLICE });
  for (let i = 0; i < slices; i++) {
    await page.evaluate((y) => window.scrollTo(0, y), i * SLICE);
    await new Promise((r) => setTimeout(r, 120));
    await page.screenshot({ path: `screens/full/${name}-${String(i + 1).padStart(2, '0')}.png` });
  }
  console.log(`  captured ${slices} slices (page height ${height}px)`);
  await page.close();
}

await browser.close();
server.close();
