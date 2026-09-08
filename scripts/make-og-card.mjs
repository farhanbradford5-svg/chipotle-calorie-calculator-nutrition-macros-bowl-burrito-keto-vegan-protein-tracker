// Generates public/og-card.png once, locally. Committed to the repo so the
// Cloudflare build needs no browser. It is a typographic brand card, not
// photography, which keeps the site's imagery rule intact.
import puppeteer from 'puppeteer-core';
import { writeFileSync } from 'node:fs';

const html = `<!doctype html><meta charset="utf-8">
<style>
  * { box-sizing: border-box; margin: 0; }
  body {
    width: 1200px; height: 630px; display: flex; flex-direction: column;
    justify-content: space-between; padding: 74px 78px;
    background: linear-gradient(140deg, #fbf9f6 0%, #f2ece2 100%);
    font: 16px/1.4 -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    color: #1d1a17;
  }
  .brand { display: flex; align-items: center; gap: 14px; font-size: 30px; font-weight: 700; letter-spacing: -0.02em; }
  .mark { width: 40px; height: 40px; }
  h1 { font-size: 82px; line-height: 1.02; letter-spacing: -0.04em; font-weight: 800; max-width: 21ch; }
  .metrics { display: flex; gap: 12px; flex-wrap: wrap; }
  .m {
    font-size: 21px; font-weight: 650; padding: 10px 20px; border-radius: 999px;
    background: #fff; border: 1px solid #d5cec4; color: #55504a;
  }
  .rule { height: 7px; border-radius: 999px; display: flex; overflow: hidden; }
  .rule i { display: block; height: 100%; }
  footer { display: flex; justify-content: space-between; align-items: flex-end; font-size: 21px; color: #6c655c; }
</style>
<div class="brand">
  <svg class="mark" viewBox="0 0 24 24" fill="none">
    <path d="M3 10h18a9 9 0 0 1-18 0z" fill="#a81612"/>
    <path d="M7.5 6.5 12 2.5l4.5 4" stroke="#a81612" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  ChipotleMacros
</div>
<h1>Chipotle Nutrition Calculator</h1>
<div class="metrics">
  <span class="m">Calories</span><span class="m">Protein</span><span class="m">Carbs</span>
  <span class="m">Fat</span><span class="m">Fiber</span><span class="m">Sodium</span>
</div>
<div class="rule">
  <i style="background:#c2571f;width:22%"></i><i style="background:#cf951b;width:16%"></i>
  <i style="background:#6b8034;width:14%"></i><i style="background:#d6551f;width:18%"></i>
  <i style="background:#4a9b5e;width:18%"></i><i style="background:#a87b52;width:12%"></i>
</div>
<footer><span>Every bowl, burrito, salad and taco &mdash; free</span><span>chipotlemacros.com</span></footer>`;

const browser = await puppeteer.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: 'new', args: ['--no-sandbox'],
});
const page = await browser.newPage();
await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
await page.setContent(html, { waitUntil: 'load' });
const buf = await page.screenshot({ type: 'png' });
writeFileSync('public/og-card.png', buf);
console.log(`wrote public/og-card.png (${Math.round(buf.length / 1024)} KB, 1200x630)`);
await browser.close();
