import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';

const pages = [
  {
    file: 'src/pages/menu.astro',
    path: '/menu',
    title: 'Chipotle Menu Nutrition Facts — Every Item, One Page',
    description:
      'Calories, protein, carbs, fat, fiber and sodium for every Chipotle menu item at standard serving size, listed one per row for quick lookup.',
    h1: 'Chipotle menu nutrition facts',
    body: [
      'This is the flat reference list: one row per menu item at its standard serving, without building a meal around it. If you want a running total instead, the meal builder on the home page adds these same figures up as you select them.',
      'Values are estimates transcribed from Chipotle’s published nutrition data. Portions are scooped by hand and vary by location.',
    ],
    table: true,
  },
  {
    file: 'src/pages/methodology.astro',
    path: '/methodology',
    title: 'How We Calculate Chipotle Nutrition Totals',
    description:
      'The portion multipliers, rounding rules and format assumptions behind every total this Chipotle calculator produces, written out in full.',
    h1: 'How we calculate these numbers',
    body: [
      'Each ingredient carries eight values at its standard published serving. A total is the sum of the selected ingredients, each multiplied by its portion setting, plus the base for the chosen format.',
      'Portion multipliers are light 0.5, normal 1.0, extra 1.5 and double 2.0. These approximate what a server actually adds rather than any official measure — "extra" in practice tends to be closer to a half-scoop more than a full second scoop.',
      'Format bases: a bowl adds nothing, a burrito adds the 13-inch flour tortilla, a salad adds the supergreens base, tacos add three crispy corn shells, and a quesadilla adds the tortilla-and-cheese base. Kids meals apply a 0.5 multiplier to every ingredient on top of its portion setting.',
      'Calories and sodium are rounded to whole numbers; grams are rounded to one decimal place. Rounding happens once, on the final total, not per ingredient.',
    ],
  },
  {
    file: 'src/pages/sources.astro',
    path: '/sources',
    title: 'Chipotle Nutrition Data Sources & Update Log',
    description:
      'Where the per-ingredient figures on this site come from, how often they are re-checked against Chipotle’s published data, and what changed at each update.',
    h1: 'Data sources and update log',
    body: [
      'Per-ingredient values are transcribed from Chipotle Mexican Grill’s published nutrition information for United States locations at standard serving sizes.',
      'The full ingredient set is re-checked against the published data every quarter, and sooner when a menu change is announced. Items that leave the menu stay listed for one review cycle, marked as discontinued, before being removed.',
      'Nothing here is sourced from user submissions or third-party aggregators, because both introduce errors that are hard to trace back. Where a value is unpublished — mixed items such as chips and guacamole ordered together — it is stated as a sum of published components rather than a measured figure.',
    ],
  },
  {
    file: 'src/pages/guides/macros.astro',
    path: '/guides/macros',
    title: 'Hitting Your Macros at Chipotle: A Build Guide',
    description:
      'Work backwards from a protein, carb and fat target to a Chipotle order that fits, with the swaps that move each macro without wrecking the others.',
    h1: 'Building a Chipotle order to a macro target',
    body: [
      'Protein is the easy macro at Chipotle and fat is the hard one. Chicken carries 32 g of protein for 180 calories, so the protein target usually solves itself with a single or double scoop; the problem is that guacamole, queso, cheese and sour cream all move fat sharply for very little protein in return.',
      'Carbs live almost entirely in three places: rice at 36 to 40 g a scoop, beans at 21 to 22 g, and the flour tortilla at 50 g. Cutting one of the three is normally enough; cutting all three leaves an order that is mostly protein and vegetables.',
      'Fiber is the macro people forget. Beans supply 7 to 8 g per scoop and guacamole another 6, which together clear most of a daily target.',
    ],
  },
  {
    file: 'src/pages/guides/sodium.astro',
    path: '/guides/sodium',
    title: 'Why Chipotle Sodium Runs High — and How to Cut It',
    description:
      'Sodium at Chipotle accumulates in places most people do not check. Here is where it comes from on the line and which three swaps cut the most.',
    h1: 'Where the sodium in a Chipotle order comes from',
    body: [
      'A typical chicken bowl carries around 1,640 mg of sodium, about 71% of the 2,300 mg daily limit, and the same order as a burrito reaches roughly 2,240 mg.',
      'The surprise is that the salsas, not the meat, are often the biggest contributors. Fresh tomato salsa carries about 550 mg per serving — more than the chicken it sits on. Chipotle-honey vinaigrette is 850 mg in one serving.',
      'The three swaps that cut the most: skip the flour tortilla (−600 mg), choose brown rice over white (−160 mg), and take tomatillo-green chili salsa instead of fresh tomato salsa (−290 mg). Together that is more than a thousand milligrams off the same meal.',
    ],
  },
  {
    file: 'src/pages/diet/keto.astro',
    path: '/diet/keto',
    title: 'Keto at Chipotle: Low-Carb Bowl Builds That Work',
    description:
      'Which Chipotle bases, proteins and toppings keep net carbs low enough for keto, with the carb count for each build and the items to avoid.',
    h1: 'Ordering keto at Chipotle',
    body: [
      'A keto order means no rice, no beans and no tortilla — which leaves supergreens or romaine as the base, any protein, and the fat-heavy toppings that usually need limiting.',
      'Steak on supergreens with fajita vegetables, tomatillo-green chili salsa, cheese and guacamole comes to roughly 12 g of total carbohydrate, of which about 7 g is fiber. Cauliflower rice adds 5 g of carbs for 40 calories if you want the texture of a rice base back.',
      'Watch the corn salsa at 16 g of carbs and the chipotle-honey vinaigrette at 18 g with 12 g of sugar — both undo an otherwise low-carb bowl.',
    ],
  },
  {
    file: 'src/pages/diet/low-sodium.astro',
    path: '/diet/low-sodium',
    title: 'Low-Sodium Chipotle Orders Under 1,000 mg',
    description:
      'Real Chipotle builds that stay under 1,000 mg of sodium, plus the per-ingredient sodium figures that make those orders possible.',
    h1: 'Keeping a Chipotle order under 1,000 mg of sodium',
    body: [
      'Under 1,000 mg is achievable but requires giving up the flour tortilla and the higher-sodium salsas. Sodium is spread across nearly every item on the line, so no single swap gets you there alone.',
      'A worked example: chicken (310 mg) on brown rice (190 mg) with romaine (0 mg), fajita vegetables (150 mg) and sour cream (30 mg) totals about 680 mg. Adding black beans brings it to 890 mg, still inside the target.',
      'Sour cream is the unexpected ally here at 30 mg, the lowest-sodium topping available. Cheese at 190 mg and guacamole at 370 mg cost more than most people expect.',
    ],
  },
  {
    file: 'src/pages/diet/vegan.astro',
    path: '/diet/vegan',
    title: 'Vegan & Vegetarian Chipotle: Builds and Nutrition',
    description:
      'What sofritas and plant-based chorizo actually contain, which toppings are off the list, and the nutrition totals for common vegan Chipotle bowls.',
    h1: 'Vegan and vegetarian ordering at Chipotle',
    body: [
      'Sofritas (150 calories, 8 g protein) and plant-based chorizo (180 calories, 16 g protein) are the two meat-free proteins. Chorizo is the stronger choice on protein; sofritas is lighter and carries less fiber.',
      'Off the list for a vegan order: cheese, queso blanco, sour cream and the chipotle-honey vinaigrette, which contains honey. Everything else on the line — rice, beans, all four salsas, fajita vegetables, guacamole, lettuce and supergreens — is plant-based.',
      'A plant-based chorizo bowl with brown rice, black beans, corn salsa and guacamole comes to roughly 870 calories with 32 g of protein and 21 g of fiber.',
    ],
  },
  {
    file: 'src/pages/diet/gluten-free.astro',
    path: '/diet/gluten-free',
    title: 'Gluten-Free at Chipotle: What to Order and What to Ask',
    description:
      'Which Chipotle items are made without gluten-containing ingredients, and why shared prep surfaces still matter if you have coeliac disease.',
    h1: 'Gluten-free ordering at Chipotle',
    body: [
      'The flour tortilla is the only item on the line made with wheat. Every protein, rice, bean, salsa and topping is prepared without gluten-containing ingredients, which makes a bowl, salad or corn-tortilla taco order straightforward.',
      'The caveat is cross-contact rather than ingredients. Tortillas are handled on the same line, and servers change gloves on request rather than by default. If you have coeliac disease, asking for fresh gloves and for items to be taken from the back of the containers is worth doing.',
      'Crispy and soft corn tortillas are the gluten-free taco bases. Soft flour tortillas for tacos are not.',
    ],
  },
];

const esc = (s) => s.replace(/`/g, '\\`').replace(/\$\{/g, '\\${');

for (const p of pages) {
  const imports = p.table
    ? "\nimport { CATEGORIES } from '../data/nutrition.js';\nconst rows = CATEGORIES.flatMap((c) => c.items.filter((i) => i.cal > 0).map((i) => ({ ...i, group: c.label })));"
    : '';
  const table = p.table
    ? `
      <div class="scroller">
        <table class="data">
          <thead><tr><th scope="col">Item</th><th scope="col">Category</th><th scope="col">Serving</th><th scope="col">Cal</th><th scope="col">Protein</th><th scope="col">Carbs</th><th scope="col">Fat</th><th scope="col">Fiber</th><th scope="col">Sodium</th><th scope="col">Sugar</th><th scope="col">Sat fat</th></tr></thead>
          <tbody>
            {rows.map((r) => (
              <tr>
                <th scope="row">{r.name}</th>
                <td>{r.group}</td>
                <td>{r.serving}</td>
                <td class="num">{r.cal}</td>
                <td class="num">{r.p} g</td>
                <td class="num">{r.c} g</td>
                <td class="num">{r.f} g</td>
                <td class="num">{r.fib} g</td>
                <td class="num">{r.na} mg</td>
                <td class="num">{r.sug} g</td>
                <td class="num">{r.sat} g</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>`
    : '';

  const depth = p.file.split('/').length - 3;
  const up = '../'.repeat(depth + 1);
  const src = `---
import Base from '${up}layouts/Base.astro';${imports.replace("'../data", `'${up}data`)}
---

<Base
  title="${esc(p.title)}"
  description="${esc(p.description)}"
  path="${p.path}"
>
  <div class="wrap page">
    <nav class="crumb" aria-label="Breadcrumb"><a href="/">Chipotle nutrition calculator</a> <span aria-hidden="true">›</span> <span>${p.h1}</span></nav>
    <h1>${p.h1}</h1>
${p.body.map((b) => `    <p>${b}</p>`).join('\n')}
${table}
    <p class="back">Back to the <a href="/">meal builder</a> to total up a full order.</p>
  </div>
</Base>

<style>
  .page { padding: 2rem 0 1rem; }
  .page h1 { font-size: clamp(1.5rem, 1.2rem + 1.4vw, 2.1rem); margin-bottom: 0.8rem; }
  .page p { max-width: 74ch; color: var(--ink-2); }
  .crumb { font-size: 0.83rem; color: var(--ink-3); margin-bottom: 0.7rem; }
  .back { margin-top: 1.5rem; font-size: 0.9rem; }
  table.data { font-size: 0.85rem; background: var(--panel); border: 1px solid var(--line); border-radius: 12px; margin: 1.25rem 0; }
  table.data th, table.data td { padding: 0.4rem 0.65rem; border-bottom: 1px solid var(--line); text-align: left; white-space: nowrap; }
  table.data thead th { background: #f4f0ea; font-size: 0.71rem; text-transform: uppercase; letter-spacing: 0.06em; color: var(--ink-3); }
  table.data td.num { font-variant-numeric: tabular-nums; }
</style>
`;
  mkdirSync(dirname(p.file), { recursive: true });
  writeFileSync(p.file, src);
  console.log('wrote', p.file);
}
