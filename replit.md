# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

## ChipotleCalc (artifacts/chipotle-calc)

A production-ready Chipotle nutrition calculator web app at route `/`.

### Architecture
- **Stack**: React + Vite + TypeScript + Tailwind + shadcn/ui + zustand + framer-motion + recharts + wouter
- **State**: 100% client-side using zustand store with localStorage persistence
- **Routing**: Wouter, single-page app (just `/`)

### Key Files
- `src/data/menuItems.ts` — Complete nutrition database (60+ items, all categories, lifestyle bowls)
- `src/store/calculatorStore.ts` — Zustand store (meal builds, comparison mode, macro goals, saved meals, share URL)
- `src/pages/home.tsx` — Main page (hero + calculator + all sections)
- `src/components/calculator/Calculator.tsx` — Main calculator wrapper
- `src/components/calculator/NutritionOutput.tsx` — Desktop panel + mobile sticky bottom bar
- `src/components/sections/` — PopularBowls, QuickStats, HowItWorks, FaqSection

### Features
- Meal type selector (Bowl, Burrito, Salad, Tacos, Quesadilla, Kids Meal, etc.)
- Ingredient builder with collapsible sections (Base, Rice, Beans, Protein, Salsas, Toppings, Premium, Sides, Drinks)
- Quantity selector: None / Light / Regular / Extra / Double
- Live nutrition output: calories, protein, carbs, fat, fiber, sodium, cost
- Macro donut chart (recharts PieChart) + calorie density bar chart
- Dietary filter badges (Keto, Vegan, Vegetarian, Gluten-free, etc.)
- Save meal, share URL (encodes build in URL params), export (MyFitnessPal, CSV, PDF)
- Macro goals panel (set daily targets, see % in output)
- Sodium-aware mode (highlights high-sodium items)
- What-if mode (shows calorie preview for unselected items)
- Popular lifestyle bowl presets
- Quick stats tables (lowest calorie, highest protein, keto-friendly)
- Full FAQ section and SEO content

### Colors
- Primary/terracotta: `hsl(var(--primary))` = #C2410C
- Calorie green: #16A34A | amber: #D97706 | rose: #E11D48
- Macro protein: #2563EB | carbs: #7C3AED | fat: #D97706 | fiber: #16A34A
