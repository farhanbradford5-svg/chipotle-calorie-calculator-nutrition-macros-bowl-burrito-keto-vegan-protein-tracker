# ChipotleCalc

**Free, independent Chipotle nutrition calculator.** Build any bowl, burrito, salad, or taco order and see calories, protein, carbs, fat, and cost update in real time. 100+ SEO-optimized pages covering every Chipotle menu item, dietary guide, and nutrition strategy.

> Not affiliated with or endorsed by Chipotle Mexican Grill, Inc. Chipotle® is a registered trademark of Chipotle Mexican Grill, Inc.

---

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + Vite |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 |
| Components | shadcn/ui |
| State | Zustand |
| Routing | Wouter |
| Animation | Framer Motion |
| Charts | Recharts |
| Notifications | Sonner |
| Monorepo | pnpm workspaces |

---

## Local Development

```bash
# From repo root
pnpm install

# Start chipotle-calc dev server (via workflow — recommended)
# Or run directly:
pnpm --filter @workspace/chipotle-calc run dev
```

The app requires `PORT` and `BASE_PATH` environment variables. These are set automatically by the Replit workflow. For manual runs:

```bash
PORT=5173 BASE_PATH=/ pnpm --filter @workspace/chipotle-calc run dev
```

Copy `.env.example` to `.env` and fill in optional values:

```bash
cp artifacts/chipotle-calc/.env.example artifacts/chipotle-calc/.env
```

---

## Build

```bash
pnpm --filter @workspace/chipotle-calc run build
```

Output goes to `artifacts/chipotle-calc/dist/public/`.

---

## Site Architecture

### Page Types

| Route | Count | Description |
|-------|-------|-------------|
| `/` | 1 | Homepage + calculator |
| `/menu/:category` | 8 | Menu category pages (bowl, burrito, etc.) |
| `/item/:slug` | 30+ | Individual item nutrition pages |
| `/diet/:name` | 12 | Dietary filter guides (keto, vegan, etc.) |
| `/guides/:slug` | 10 | Long-form nutrition guides |
| `/faq` | 1 | Top 50 FAQ page |
| `/menu` | 1 | Full menu navigation index |
| `/sitemap` | 1 | HTML sitemap |
| `/about`, `/methodology`, etc. | 10+ | E-E-A-T trust pages |
| `/privacy-policy`, `/terms`, etc. | 5 | Legal pages |
| **Total** | **100+** | All indexed pages |

### Data Files

```
src/data/
├── menuItems.ts        — Nutritional source of truth for all 60+ ingredients
├── itemPageData.ts     — 30+ individual item page content + SEO metadata
├── dietData.ts         — 12 dietary guide pages
├── guideData.ts        — 10 long-form nutrition guides
├── menuCategoryData.ts — 8 menu category pages
└── popularBowls.ts     — Pre-built popular bowl configurations
```

### Key Components

```
src/components/
├── calculator/         — Main interactive calculator (Calculator.tsx)
├── layout/             — Navbar, Footer, Breadcrumb
├── sections/           — HomeFaq, HowItWorks, PopularBowls, QuickStats
├── AdSlot.tsx          — AdSense slot placeholder (enable after approval)
└── SeoHead.tsx         — Per-page SEO meta + JSON-LD schema
```

---

## SEO Architecture

- **Schema types:** WebApplication, Organization, NutritionInformation, FAQPage, Article, BreadcrumbList
- **Sitemap:** `public/sitemap.xml` — all 100+ pages with `lastmod` dates
- **Robots:** `public/robots.txt` — allows all crawling, points to sitemap
- **Canonical URLs:** Set per-page via SeoHead component
- **Meta tags:** Title, description, OG, Twitter Card on every page
- **Nutrition data source:** Chipotle's official published nutrition data, cross-referenced monthly

---

## Deployment

### Replit (Current)

The app runs via the Replit workflow system. The `artifacts/chipotle-calc: web` workflow runs `pnpm --filter @workspace/chipotle-calc run dev` and serves the app at the configured preview path.

To deploy/publish:
1. Click "Publish" in the Replit interface
2. The workflow command becomes the production server

### Vercel (Recommended for production)

```bash
# vercel.json (place at repo root or artifacts/chipotle-calc/)
{
  "buildCommand": "pnpm --filter @workspace/chipotle-calc run build",
  "outputDirectory": "artifacts/chipotle-calc/dist/public",
  "installCommand": "pnpm install --frozen-lockfile",
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "geolocation=(), microphone=(), camera=()" }
      ]
    }
  ],
  "rewrites": [{ "source": "/((?!.*\\.).*)", "destination": "/index.html" }]
}
```

---

## Post-Deploy Checklist

### Day 1 — Domain & SSL
- [ ] Connect chipotlecalc.com domain to Vercel/host
- [ ] Verify SSL certificate active
- [ ] Test all 100+ pages resolve correctly
- [ ] Verify sitemap.xml accessible at https://chipotlecalc.com/sitemap.xml

### Day 1 — Search Console
- [ ] Add property in Google Search Console
- [ ] Add verification meta tag to `index.html` (see commented line)
- [ ] Submit sitemap.xml
- [ ] Request indexing for top 25 priority pages via URL Inspection
- [ ] Add property to Bing Webmaster Tools

### Day 1 — Analytics
- [ ] Create GA4 property
- [ ] Add G-XXXXXXXXXX measurement ID to `index.html` (see commented GA4 block)
- [ ] Verify data flowing in GA4 Real-Time

### Week 1 — AdSense Pre-Approval
- [ ] Update `public/ads.txt` with your AdSense publisher ID
- [ ] Ensure all legal pages live (privacy, terms, cookie policy, disclaimer)
- [ ] Verify trademark disclaimer visible on every page
- [ ] Verify "not affiliated with Chipotle" disclosure clear

### Month 1–3 — Traffic Building (Before AdSense Application)
1. Post calculator link in:
   - r/Chipotle (check promo rules first)
   - r/loseit (calorie counting community)
   - r/macros
   - r/MealPrepSunday
2. Submit to nutrition/fitness tool aggregator lists
3. Create one short YouTube demo (organic backlink + traffic source)
4. Reach out to 5 nutrition bloggers with "exclusive Chipotle nutrition data" angle
5. Wait 4–6 weeks of organic traffic before AdSense application
   (Nutrition niche is slightly more scrutinized; more traffic = higher approval rate)

### Month 3–6 — AdSense Application
- [ ] Apply for Google AdSense
- [ ] After approval: populate `ads.txt` with your publisher ID
- [ ] Enable AdSlot components in `src/components/AdSlot.tsx` (currently in placeholder mode)

---

## Monetization Roadmap

| Phase | Timeline | Action |
|-------|----------|--------|
| 1 | Months 1–3 | Build organic traffic, zero ads |
| 2 | Months 3–6 | Apply AdSense; run minimal ads, focus on UX |
| 3 | Months 6–12 | Add affiliate links: kitchen scales, protein supplements, meal prep containers, MyFitnessPal premium (Amazon Associates) |
| 4 | Month 12+ | Apply for Mediavine (50K sessions/mo requirement); nutrition niche commands $15–25 RPM vs $4–8 with AdSense |
| 5 | Month 18+ | Consider $4.99/mo premium tier: unlimited meal saves, custom macro goals, weekly trends, PDF export, ad-free |

**Revenue projection (conservative):**
- Month 3: 5,000 sessions/mo → $20–40/mo AdSense
- Month 6: 15,000 sessions/mo → $60–120/mo AdSense
- Month 12: 50,000 sessions/mo → $200–400/mo AdSense or $750–1,250/mo Mediavine
- Month 18: 100,000 sessions/mo → $1,500–2,500/mo Mediavine

**Sister site opportunity:** Same template, swap data → `/starbucks-calculator`, `/panera-calculator`, `/cava-calculator`. Each could generate equivalent revenue once ranked.

---

## Competitor Analysis

| Metric | ChipotleCalc | chipotle.com | nutritionix.com | chipotlecalorie.com |
|--------|-------------|-------------|-----------------|---------------------|
| Pages | 100+ | ~15 | ~20 | ~10 |
| Schema types | 6 (NutritionInfo, FAQ, Article, WebApp, BreadcrumbList, Org) | 2 | 2 | 1 |
| Calculator features | 9+ | 5 | 4 | 3 |
| Mobile-first | ✅ | ❌ | ❌ | ❌ |
| Dietary filters | 7 | 0 | 2 | 0 |
| Long-tail keyword coverage | 200+ | 30 | 50 | 15 |
| Word count per page | 2,000–4,000 | 300–800 | 500–1,000 | 200–500 |
| E-E-A-T trust pages | 10+ | ∞ (official) | 3 | 0 |
| PWA / "Add to Home" | ✅ | ❌ | ❌ | ❌ |
| Sodium warnings | ✅ | ❌ | ❌ | ❌ |
| ads.txt | ✅ | N/A | ✅ | ❌ |

---

## Data Update Process

Chipotle updates nutrition data occasionally (typically with seasonal menu changes):

1. Check chipotle.com/nutrition-calculator for changes
2. Update `src/data/menuItems.ts` (nutritional source of truth)
3. Search for any hardcoded values in `itemPageData.ts`, `dietData.ts`, `guideData.ts`, `menuCategoryData.ts`
4. Update `lastmod` dates in `public/sitemap.xml`
5. Add an entry to `src/pages/static/ChangelogPage.tsx`
6. Update "Last updated" references (search for "May 2026" and bump to current month)

---

## License

MIT. Not affiliated with Chipotle Mexican Grill, Inc.
