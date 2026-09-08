import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Pages held back from indexing. Kept in one place so the sitemap filter, the
// llms.txt generator and the page's own robots meta tag cannot disagree.
export const NOINDEX = ['/guides/vs-fast-food'];

export default defineConfig({
  site: 'https://chipotlemacros.com',
  output: 'static',

  // D6: set explicitly, never left to default. Every internal href, every
  // canonical tag and every sitemap entry uses the no-trailing-slash form.
  trailingSlash: 'never',

  // 'auto' left two stylesheets external, costing two blocking round-trips
  // before first paint. Inlining removes them; total page weight stays well
  // inside budget because there is no imagery to compete with.
  build: { inlineStylesheets: 'always' },

  // D7 — deployment target is Cloudflare Pages.
  //
  // Astro's `redirects` option is deliberately NOT used here. In a static build
  // it emits a meta-refresh HTML stub at each old path, and Cloudflare Pages
  // serves a matching static asset before it consults _redirects. Those stubs
  // would therefore shadow every rule, answering 200 with a meta refresh
  // instead of a 301. Cloudflare also ignores Netlify's `!` force flag, so
  // forcing is not an escape hatch.
  //
  // The 63 redirects live solely in public/_redirects, generated from
  // src/data/redirects.js by scripts/gen-crawl-files.mjs. With no stub files
  // present, Cloudflare finds no asset at those paths and applies the rule.

  integrations: [
    sitemap({
      filter: (page) =>
        !NOINDEX.some(
          (p) => page.replace('https://chipotlemacros.com', '').replace(/\/$/, '') === p
        ),
    }),
  ],
});
