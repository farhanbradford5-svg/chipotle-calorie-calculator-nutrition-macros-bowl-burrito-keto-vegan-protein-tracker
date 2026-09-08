// Does declaring color-scheme:light actually stop Chrome's dark-mode
// inversion? Renders two identical pages, one with the opt-out, one without.
import puppeteer from 'puppeteer-core';
import { writeFileSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const dir = resolve('screens/ab');
mkdirSync(dir, { recursive: true });
const css = 'body{background:#fbf9f6;color:#1d1a17}.card{background:#fff;border:1px solid #e6e0d8;padding:20px}';
writeFileSync(`${dir}/with.html`,
  `<!doctype html><meta charset="utf-8"><meta name="color-scheme" content="light"><style>:root{color-scheme:light}${css}</style><div class="card">card content</div>`);
writeFileSync(`${dir}/without.html`,
  `<!doctype html><meta charset="utf-8"><style>${css}</style><div class="card">card content</div>`);

for (const feat of ['WebContentsForceDark', 'WebContentsForceDark:inversion_method/cielab_based']) {
  const b = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--enable-features=' + feat],
  });
  for (const f of ['with', 'without']) {
    const p = await b.newPage();
    await p.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: 'dark' }]);
    await p.goto('file:///' + `${dir}/${f}.html`.replace(/\\/g, '/'));
    // force-dark is applied at paint time, so sample the rendered pixels
    await p.setViewport({ width: 300, height: 120 });
    const shot = await p.screenshot({ encoding: 'base64' });
    const px = await p.evaluate(async (b64) => {
      const img = new Image();
      img.src = 'data:image/png;base64,' + b64;
      await img.decode();
      const c = document.createElement('canvas');
      c.width = img.width; c.height = img.height;
      const ctx = c.getContext('2d');
      ctx.drawImage(img, 0, 0);
      const at = (x, y) => Array.from(ctx.getImageData(x, y, 1, 1).data).slice(0, 3).join(',');
      return { corner: at(2, 2), card: at(60, 40) };
    }, shot);
    console.log(`${feat.padEnd(50)} opt-out=${f.padEnd(8)} painted page=${px.corner.padEnd(14)} card=${px.card}`);
    await p.close();
  }
  await b.close();
}
