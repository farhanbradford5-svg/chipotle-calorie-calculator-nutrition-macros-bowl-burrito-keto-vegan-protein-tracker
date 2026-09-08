// Nutrition values are estimates compiled from Chipotle's published nutrition
// data for standard serving sizes. Fields: [calories, protein, carbs, fat,
// fiber, sodium, sugar, satFat]. Portions are scooped by hand, so real orders
// vary by location and server.
const F = (id, name, serving, cal, p, c, f, fib, na, sug, sat) => ({
  id, name, serving, cal, p, c, f, fib, na, sug, sat,
});

export const CATEGORIES = [
  {
    id: 'protein',
    layout: 'cards',
    label: 'Protein',
    mode: 'single',
    note: 'Standard serving is about 4 oz. Double protein is the cheapest way to raise the protein-per-calorie ratio of a bowl.',
    items: [
      F('chicken', 'Chicken', '4 oz', 180, 32, 0, 7, 0, 310, 0, 3),
      F('steak', 'Steak', '4 oz', 150, 21, 1, 6, 0, 330, 0, 2),
      F('barbacoa', 'Barbacoa', '4 oz', 170, 24, 2, 7, 1, 530, 0, 2.5),
      F('carnitas', 'Carnitas', '4 oz', 210, 23, 0, 12, 0, 450, 0, 3.5),
      F('sofritas', 'Sofritas', '4 oz', 150, 8, 9, 10, 3, 555, 5, 1.5),
      F('al-pastor', 'Chicken Al Pastor', '4 oz', 180, 31, 2, 6, 0, 540, 1, 2),
      F('carne-asada', 'Carne Asada', '4 oz', 150, 21, 1, 6, 0, 440, 0, 2),
      F('chorizo', 'Plant-Based Chorizo', '4 oz', 180, 16, 8, 9, 5, 550, 1, 1),
      F('no-protein', 'No Protein', '—', 0, 0, 0, 0, 0, 0, 0, 0),
    ],
  },
  {
    id: 'rice',
    layout: 'rows',
    label: 'Rice',
    mode: 'single',
    note: 'A standard scoop runs about 4 oz. Asking for light rice takes off roughly 105 calories and 20 g of carbs.',
    items: [
      F('white-rice', 'Cilantro-Lime White Rice', '4 oz', 210, 4, 40, 4, 1, 350, 0, 0),
      F('brown-rice', 'Cilantro-Lime Brown Rice', '4 oz', 210, 4, 36, 6, 2, 190, 1, 0.5),
      F('cauli-rice', 'Cilantro-Lime Cauliflower Rice', '4 oz', 40, 2, 5, 2.5, 2, 260, 2, 0),
      F('no-rice', 'No Rice', '—', 0, 0, 0, 0, 0, 0, 0, 0),
    ],
  },
  {
    id: 'beans',
    layout: 'chips',
    label: 'Beans',
    mode: 'single',
    note: 'Beans are the highest-fiber item on the line — 7 to 8 g per scoop for 130 calories.',
    items: [
      F('black-beans', 'Black Beans', '4 oz', 130, 8, 22, 1.5, 7, 210, 1, 0),
      F('pinto-beans', 'Pinto Beans', '4 oz', 130, 8, 21, 1.5, 8, 210, 1, 0),
      F('no-beans', 'No Beans', '—', 0, 0, 0, 0, 0, 0, 0, 0),
    ],
  },
  {
    id: 'salsa',
    layout: 'cards',
    label: 'Salsa',
    mode: 'multi',
    note: 'Salsas are cheap on calories and expensive on sodium. Fresh tomato salsa carries about 550 mg per serving.',
    items: [
      { ...F('mild-salsa', 'Fresh Tomato Salsa', '3.5 oz', 25, 0, 4, 0, 1, 550, 3, 0), heat: 1 },
      { ...F('corn-salsa', 'Roasted Chili-Corn Salsa', '3.5 oz', 80, 3, 16, 1.5, 3, 330, 4, 0), heat: 2 },
      { ...F('green-salsa', 'Tomatillo-Green Chili Salsa', '2 oz', 15, 0, 4, 0, 0, 260, 2, 0), heat: 2 },
      { ...F('red-salsa', 'Tomatillo-Red Chili Salsa', '2 oz', 30, 0, 4, 0, 1, 500, 2, 0), heat: 3 },
    ],
  },
  {
    id: 'toppings',
    layout: 'rows',
    label: 'Toppings',
    mode: 'multi',
    note: 'Guacamole, queso blanco, cheese and sour cream are where a 600-calorie bowl becomes a 1,000-calorie one.',
    items: [
      F('guac', 'Guacamole', '4 oz', 230, 2, 8, 22, 6, 370, 1, 3.5),
      F('queso', 'Queso Blanco', '2 oz', 120, 6, 4, 9, 0, 300, 1, 6),
      F('cheese', 'Cheese', '1 oz', 110, 6, 1, 8, 0, 190, 0, 5),
      F('sour-cream', 'Sour Cream', '2 oz', 110, 2, 2, 9, 0, 30, 2, 7),
      F('lettuce', 'Romaine Lettuce', '1 oz', 5, 0, 1, 0, 1, 0, 0, 0),
      F('supergreens', 'Supergreens Mix', '2 oz', 10, 1, 2, 0, 1, 15, 0, 0),
      F('vinaigrette', 'Chipotle-Honey Vinaigrette', '2 oz', 220, 1, 18, 16, 1, 850, 12, 2.5),
      F('fajita', 'Fajita Vegetables', '2.5 oz', 20, 1, 5, 0, 1, 150, 2, 0),
    ],
  },
  {
    id: 'sides',
    layout: 'chips',
    label: 'Sides & Extras',
    mode: 'multi',
    note: 'A side of chips is the biggest single add-on on the menu — more calories than the protein and rice in most bowls put together.',
    items: [
      F('chips', 'Chips', '4 oz', 540, 7, 73, 25, 5, 390, 1, 3.5),
      F('chips-guac', 'Chips & Guacamole', '4 oz + 8 oz', 1000, 11, 89, 69, 17, 1130, 3, 10.5),
      F('tortilla-side', 'Flour Tortilla (on the side)', '13 in', 320, 8, 50, 9, 3, 600, 0, 3),
      F('taco-shells-side', 'Crispy Corn Tortillas (3)', '3 shells', 210, 3, 33, 6, 3, 15, 0, 1),
    ],
  },
];

export const FORMATS = [
  {
    id: 'bowl',
    label: 'Bowl',
    baseLabel: 'No tortilla',
    base: null,
    range: '500–1,100 calories',
    lever: 'the rice scoop and the guac / queso / sour cream stack',
    blurb:
      'A bowl is the same fillings as a burrito served without the tortilla, so it starts about 320 calories lower. Chicken, white rice, black beans, fresh tomato salsa and a little cheese lands near 700.',
  },
  {
    id: 'burrito',
    label: 'Burrito',
    baseLabel: 'Flour tortilla',
    base: F('flour-tortilla', 'Flour Tortilla', '13 in', 320, 8, 50, 9, 3, 600, 0, 3),
    range: '800–1,400 calories',
    lever: 'the 13-inch flour tortilla itself, at 320 calories and 600 mg of sodium',
    blurb:
      'The tortilla is the whole difference between the two formats. Order identical fillings in a bowl instead and you drop 320 calories, 50 g of carbs and 600 mg of sodium before changing anything else.',
  },
  {
    id: 'salad',
    label: 'Salad',
    baseLabel: 'Supergreens base',
    base: F('salad-base', 'Supergreens Mix (base)', '2 oz', 10, 1, 2, 0, 1, 15, 0, 0),
    range: '250–900 calories',
    lever: 'the chipotle-honey vinaigrette, at 220 calories and 850 mg of sodium',
    blurb:
      'The greens are effectively free at 10 calories. The dressing is not: one serving of chipotle-honey vinaigrette carries more sodium than a flour tortilla and more sugar than anything else on the line.',
  },
  {
    id: 'tacos',
    label: 'Tacos',
    baseLabel: '3 crispy corn shells',
    base: F('taco-shells', 'Crispy Corn Tortillas (3)', '3 shells', 210, 3, 33, 6, 3, 15, 0, 1),
    range: '450–900 calories',
    lever: 'shell choice — crispy corn carries almost no sodium, soft flour adds roughly 450 mg',
    blurb:
      'Three tacos hold less filling than a bowl, which is most of why they come in lower. Crispy corn shells are the lowest-sodium base on the menu at roughly 15 mg for all three.',
  },
  {
    id: 'quesadilla',
    label: 'Quesadilla',
    baseLabel: 'Flour tortilla + cheese',
    base: F('ques-base', 'Flour Tortilla + Cheese', '13 in + 1 oz', 430, 14, 51, 17, 3, 790, 0, 8),
    range: '850–1,300 calories',
    lever: 'the tortilla-and-cheese base, which is 430 calories before any filling goes in',
    blurb:
      'The quesadilla starts higher than every other format because cheese is built into the base rather than optional. Salsas and sour cream come in separate cups, so count them only if you actually use them.',
  },
  {
    id: 'kids',
    label: 'Kids Meal',
    baseLabel: 'Half portions',
    base: null,
    scale: 0.5,
    range: '300–600 calories',
    lever: 'whether it comes with chips or fruit',
    blurb:
      'Kids meals use roughly half-size scoops, which this calculator applies automatically to every ingredient you pick in this format.',
  },
];

export const PORTIONS = [
  { id: 'light', label: 'Light', mult: 0.5 },
  { id: 'normal', label: 'Normal', mult: 1 },
  { id: 'extra', label: 'Extra', mult: 1.5 },
  { id: 'double', label: 'Double', mult: 2 },
];

export const PRESETS = [
  {
    id: 'balanced-macros',
    name: 'Balanced Macros Bowl',
    desc: 'Chicken, white rice, black beans, fresh tomato salsa, fajita veggies',
    picks: { protein: 'chicken', rice: 'white-rice', beans: 'black-beans', salsa: ['mild-salsa'], toppings: ['fajita'] },
  },
  {
    id: 'go-half',
    name: 'Go Half Bowl',
    desc: 'Light rice, light beans, chicken, two salsas, romaine',
    picks: { protein: 'chicken', rice: 'white-rice', beans: 'black-beans', salsa: ['mild-salsa', 'green-salsa'], toppings: ['lettuce'] },
    portions: { 'white-rice': 'light', 'black-beans': 'light' },
  },
  {
    id: 'plant-powered',
    name: 'Plant Powered Bowl',
    desc: 'Sofritas, brown rice, black beans, corn salsa, guacamole',
    picks: { protein: 'sofritas', rice: 'brown-rice', beans: 'black-beans', salsa: ['corn-salsa'], toppings: ['guac', 'lettuce'] },
  },
  {
    id: 'grain-freedom',
    name: 'Grain Freedom Bowl',
    desc: 'Steak, cauliflower rice, no beans, green salsa, guacamole',
    picks: { protein: 'steak', rice: 'cauli-rice', beans: 'no-beans', salsa: ['green-salsa'], toppings: ['guac', 'supergreens'] },
  },
  {
    id: 'high-protein',
    name: 'High Protein Bowl',
    desc: 'Double chicken, white rice, black beans, fresh tomato salsa, cheese',
    picks: { protein: 'chicken', rice: 'white-rice', beans: 'black-beans', salsa: ['mild-salsa'], toppings: ['cheese'] },
    portions: { chicken: 'double' },
  },
  {
    id: 'wholesome',
    name: 'Wholesome Bowl',
    desc: 'Chicken, brown rice, fajita veggies, corn salsa, guacamole',
    picks: { protein: 'chicken', rice: 'brown-rice', beans: 'no-beans', salsa: ['corn-salsa'], toppings: ['fajita', 'guac', 'supergreens'] },
  },
  {
    id: 'veggie-full',
    name: 'Veggie Full Bowl',
    desc: 'No meat, brown rice, black beans, both veggie salsas, guacamole',
    picks: { protein: 'no-protein', rice: 'brown-rice', beans: 'black-beans', salsa: ['mild-salsa', 'corn-salsa'], toppings: ['fajita', 'guac', 'lettuce'] },
  },
];

// Chipotle's published heat ratings, shown as filled dots plus a text label.
export const HEAT = { 1: 'Mild', 2: 'Medium', 3: 'Hot' };

export const METRICS = [
  { key: 'cal', label: 'Calories', unit: '' },
  { key: 'p', label: 'Protein', unit: 'g' },
  { key: 'c', label: 'Carbs', unit: 'g' },
  { key: 'f', label: 'Fat', unit: 'g' },
  { key: 'fib', label: 'Fiber', unit: 'g' },
  { key: 'na', label: 'Sodium', unit: 'mg' },
  { key: 'sug', label: 'Sugar', unit: 'g' },
  { key: 'sat', label: 'Sat. Fat', unit: 'g' },
];

// Default selection rendered into static HTML before any JavaScript runs.
export const DEFAULT_STATE = {
  format: 'bowl',
  protein: 'no-protein',
  rice: 'no-rice',
  beans: 'no-beans',
  salsa: [],
  toppings: [],
  sides: [],
  portions: {},
};

// Build-time totals for a preset, so the static HTML can show each one's
// numbers before any JavaScript runs. Presets are always bowl format.
const BY_ID = new Map(CATEGORIES.flatMap((c) => c.items).map((i) => [i.id, i]));
const MULT = new Map(PORTIONS.map((p) => [p.id, p.mult]));

export function presetTotals(preset) {
  const t = { cal: 0, p: 0, c: 0, f: 0, fib: 0, na: 0, sug: 0, sat: 0 };
  const ids = Object.values(preset.picks).flat();
  for (const id of ids) {
    const it = BY_ID.get(id);
    if (!it) continue;
    const m = MULT.get((preset.portions || {})[id] || 'normal');
    for (const k of Object.keys(t)) t[k] += it[k] * m;
  }
  for (const k of Object.keys(t)) t[k] = k === 'cal' || k === 'na' ? Math.round(t[k]) : Math.round(t[k] * 10) / 10;
  return t;
}
