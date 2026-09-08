import { defineConfig } from 'astro/config';

// Pages held back from indexing. Kept in one place so the sitemap generator,
// the llms.txt generator and the page's own robots meta tag cannot disagree.
export const NOINDEX = ['/guides/vs-fast-food'];

export default defineConfig({
  site: 'https://chipotlemacros.com',
  output: 'static',

  // D6: set explicitly, never left to default. Cloudflare Pages serves
  // directory-style output canonically WITH a trailing slash and 308-redirects
  // the bare form, so every internal href, canonical tag, sitemap entry and
  // redirect destination uses the trailing-slash form to match.
  trailingSlash: 'always',

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

});
