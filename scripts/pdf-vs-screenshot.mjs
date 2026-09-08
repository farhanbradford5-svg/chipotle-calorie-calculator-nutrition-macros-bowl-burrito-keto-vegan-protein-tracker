// Settles whether the reported black rectangles are a rendering bug or an
// artifact of print-to-PDF. Renders the same page twice — a true headless
// screenshot and a Chrome print-to-PDF — and scans both for solid dark blocks.
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
mkdirSync('screens/pdf-test', { recursive: true });

const browser = await puppeteer.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: 'new', args: ['--no-sandbox'],
});

// Which risky CSS properties does the page actually use?
const probe = await browser.newPage();
await probe.setViewport({ width: 1440, height: 900 });
await probe.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle0' });
const risky = await probe.evaluate(() => {
  const hits = { 'backdrop-filter': [], 'mix-blend-mode': [], filter: [], 'radius+overflow': [] };
  for (const el of document.querySelectorAll('body *')) {
    const cs = getComputedStyle(el);
    const id = el.tagName.toLowerCase() + (el.className?.toString?.() ? '.' + el.className.toString().split(' ')[0] : '');
    if (cs.backdropFilter && cs.backdropFilter !== 'none') hits['backdrop-filter'].push(id);
    if (cs.mixBlendMode && cs.mixBlendMode !== 'normal') hits['mix-blend-mode'].push(id);
    if (cs.filter && cs.filter !== 'none') hits.filter.push(id);
    const r = parseFloat(cs.borderTopLeftRadius) || 0;
    if (r > 0 && cs.overflow === 'hidden') hits['radius+overflow'].push(id);
  }
  return Object.fromEntries(Object.entries(hits).map(([k, v]) => [k, [...new Set(v)].slice(0, 8)]));
});
console.log('--- risky CSS actually present on the homepage ---');
for (const [prop, els] of Object.entries(risky)) {
  console.log(`  ${prop.padEnd(18)} ${els.length ? els.join(', ') : 'none'}`);
}

// Scan an image buffer for solid dark blocks (same detector as scan-pixels).
async function darkBlocks(page, b64) {
  return page.evaluate(async (b64) => {
    const img = new Image();
    img.src = 'data:image/png;base64,' + b64;
    await img.decode();
    const c = document.createElement('canvas');
    c.width = img.width; c.height = img.height;
    const ctx = c.getContext('2d');
    ctx.drawImage(img, 0, 0);
    const { data, width, height } = ctx.getImageData(0, 0, img.width, img.height);
    const dark = (i) => data[i] < 60 && data[i + 1] < 60 && data[i + 2] < 60;
    const runs = [];
    for (let y = 0; y < height; y += 2) {
      let start = -1;
      for (let x = 0; x < width; x++) {
        const i = (y * width + x) * 4;
        if (dark(i)) { if (start < 0) start = x; }
        else { if (start >= 0 && x - start >= 40) runs.push({ y, x0: start, x1: x }); start = -1; }
      }
      if (start >= 0 && width - start >= 40) runs.push({ y, x0: start, x1: width });
    }
    const blocks = [];
    for (const r of runs) {
      const hit = blocks.find((b) => r.y - b.y1 <= 4 && Math.min(b.x1, r.x1) - Math.max(b.x0, r.x0) > 20);
      if (hit) { hit.y1 = r.y; hit.x0 = Math.min(hit.x0, r.x0); hit.x1 = Math.max(hit.x1, r.x1); }
      else blocks.push({ x0: r.x0, x1: r.x1, y0: r.y, y1: r.y });
    }
    return blocks.filter((b) => b.y1 - b.y0 >= 18 && b.x1 - b.x0 >= 40)
      .map((b) => ({ w: b.x1 - b.x0, h: b.y1 - b.y0, x: b.x0, y: b.y0 }));
  }, b64);
}

console.log('\n--- A: true headless screenshots ---');
for (const [name, width] of [['desktop', 1440], ['mobile', 390]]) {
  const page = await browser.newPage();
  await page.setViewport({ width, height: 1200 });
  await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle0' });
  const h = await page.evaluate(() => document.documentElement.scrollHeight);
  let total = 0;
  const slices = Math.ceil(h / 1200);
  for (let i = 0; i < slices; i++) {
    await page.evaluate((y) => scrollTo(0, y), i * 1200);
    await new Promise((r) => setTimeout(r, 100));
    const shot = await page.screenshot({ encoding: 'base64' });
    const blocks = await darkBlocks(probe, shot);
    total += blocks.length;
  }
  console.log(`  ${name.padEnd(8)} ${slices} slices scanned → ${total} solid dark block(s)`);
  await page.screenshot({ path: `screens/pdf-test/screenshot-${name}.png` });
  await page.close();
}

console.log('\n--- B: Chrome print-to-PDF, rasterised and scanned ---');
const pdfPage = await browser.newPage();
await pdfPage.setViewport({ width: 1440, height: 1200 });
await pdfPage.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle0' });
await pdfPage.pdf({ path: 'screens/pdf-test/homepage.pdf', format: 'A4', printBackground: true });
console.log('  wrote screens/pdf-test/homepage.pdf');

// Emulate print media in a screenshot — the closest we can get to what the PDF
// pipeline sees, without a PDF rasteriser available offline.
await pdfPage.emulateMediaType('print');
await new Promise((r) => setTimeout(r, 200));
const printShot = await pdfPage.screenshot({ encoding: 'base64' });
const printBlocks = await darkBlocks(probe, printShot);
await pdfPage.screenshot({ path: 'screens/pdf-test/print-media.png' });
console.log(`  print media emulation → ${printBlocks.length} solid dark block(s)`);
for (const b of printBlocks) console.log(`      ${b.w}x${b.h} at (${b.x}, ${b.y})`);

await browser.close();
server.close();
