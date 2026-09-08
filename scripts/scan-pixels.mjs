// Decodes every captured screenshot in the browser and looks for solid
// near-black blocks larger than a text glyph — the "black rectangle" report.
import puppeteer from 'puppeteer-core';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const browser = await puppeteer.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: 'new',
  args: ['--no-sandbox'],
});
const page = await browser.newPage();
await page.goto('about:blank');

const dir = 'screens/full';
const files = readdirSync(dir).filter((f) => f.endsWith('.png')).sort();
let total = 0;

for (const f of files) {
  const b64 = readFileSync(join(dir, f)).toString('base64');
  const blocks = await page.evaluate(async (b64) => {
    const img = new Image();
    img.src = 'data:image/png;base64,' + b64;
    await img.decode();
    const c = document.createElement('canvas');
    c.width = img.width; c.height = img.height;
    const ctx = c.getContext('2d');
    ctx.drawImage(img, 0, 0);
    const { data, width, height } = ctx.getImageData(0, 0, img.width, img.height);
    const dark = (i) => data[i] < 60 && data[i + 1] < 60 && data[i + 2] < 60;

    // Find horizontal runs of dark pixels at least 40px wide, then check the
    // run persists for at least 18 rows -> a filled block, not glyph strokes.
    const runs = [];
    for (let y = 0; y < height; y += 2) {
      let start = -1;
      for (let x = 0; x < width; x++) {
        const i = (y * width + x) * 4;
        if (dark(i)) { if (start < 0) start = x; }
        else {
          if (start >= 0 && x - start >= 40) runs.push({ y, x0: start, x1: x });
          start = -1;
        }
      }
      if (start >= 0 && width - start >= 40) runs.push({ y, x0: start, x1: width });
    }
    // group vertically contiguous runs that overlap horizontally
    const blocks = [];
    for (const r of runs) {
      const hit = blocks.find(
        (b) => r.y - b.y1 <= 4 && Math.min(b.x1, r.x1) - Math.max(b.x0, r.x0) > 20
      );
      if (hit) { hit.y1 = r.y; hit.x0 = Math.min(hit.x0, r.x0); hit.x1 = Math.max(hit.x1, r.x1); }
      else blocks.push({ x0: r.x0, x1: r.x1, y0: r.y, y1: r.y });
    }
    return blocks
      .filter((b) => b.y1 - b.y0 >= 18 && b.x1 - b.x0 >= 40)
      .map((b) => ({ x: b.x0, y: b.y0, w: b.x1 - b.x0, h: b.y1 - b.y0 }));
  }, b64);

  if (blocks.length) {
    total += blocks.length;
    console.log(`${f}: ${blocks.length} solid dark block(s)`);
    for (const b of blocks) console.log(`    ${b.w}x${b.h} at (${b.x}, ${b.y})`);
  }
}

console.log(total === 0 ? '\nNo solid black rectangles found in any slice.' : `\n${total} dark block(s) found — inspect above.`);
await browser.close();
