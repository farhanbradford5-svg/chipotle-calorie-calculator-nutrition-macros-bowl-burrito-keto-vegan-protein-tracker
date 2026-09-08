// D5: bring every meta description into the 150-160 character band.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';

const FILES = [
  'src/content/items-formats.js',
  'src/content/items-bases.js',
  'src/content/items-toppings.js',
  'src/content/diets.js',
  'src/content/guides.js',
  'src/content/trust.js',
];

const NEW = {
  'chicken-bowl': 'A Chipotle chicken bowl with white rice, black beans, fresh tomato salsa and cheese is 655 calories and 50 g of protein. Full macros and the swaps that matter.',
  'barbacoa-bowl': 'A barbacoa bowl runs 645 calories, and sodium is the figure to watch: barbacoa carries 530 mg per serving, the most of the four classic meats at Chipotle.',
  'sofritas-bowl': 'A sofritas bowl is 625 calories. What separates sofritas from every meat option is carbohydrate — 9 g in a scoop, where chicken and steak bring almost none.',
  'double-chicken-bowl': 'Double chicken adds exactly 180 calories and 32 g of protein to a bowl, taking the standard build to 835 calories and 82 g. The arithmetic, written out.',
  'chicken-burrito': 'A Chipotle chicken burrito is 975 calories, and exactly 320 of those are the flour tortilla. The identical fillings served in a bowl come to 655 calories.',
  'steak-burrito': 'Steak burrito calories total 945, thirty below the chicken build. Sodium is where this format lands hardest though, at roughly 2,230 mg in one order.',
  'chicken-salad': 'A Chipotle chicken salad is 455 calories, 200 below the same bowl. What it does not change is fiber: both land at 9 g. Volume is the real difference here.',
  'chicken-tacos': 'Three chicken tacos come to 655 calories, roughly 218 each. That per-taco figure is what trips people up when comparing a taco order against a bowl.',
  'white-rice': 'Chipotle white rice is 210 calories and 40 g of carbohydrate in a 4 oz scoop, plus 350 mg of sodium — more sodium than a serving of chicken carries.',
  'brown-rice': 'Brown rice at Chipotle is 210 calories, identical to white. The honest reasons to choose it are 160 mg less sodium and one extra gram of fiber a scoop.',
  'black-beans': 'Chipotle black beans are 130 calories with 7 g of fiber and 8 g of protein a scoop. Pinto edges them on fiber; the two are otherwise near-identical.',
  'pinto-beans': 'Chipotle pinto beans are 130 calories with 8 g of fiber, one gram more than black beans carry. Beyond that single gram the two are interchangeable.',
  guacamole: 'Chipotle guacamole is 230 calories and 22 g of fat, the heaviest topping on the line — and the one whose calories buy the most fiber and unsaturated fat.',
  queso: 'Chipotle queso blanco is 120 calories, roughly half of guacamole. On saturated fat the comparison flips: queso carries 6 g against guacamole’s 3.5 g.',
  chips: 'A side of Chipotle chips is 540 calories — more than any protein scoop on the menu, and more than the rice and beans in a standard bowl put together.',
  'sour-cream': 'Chipotle sour cream is 110 calories for 2 oz: the same total as cheese but spread over twice the volume, and with only 30 mg of sodium against cheese’s 190.',
  cheese: 'Chipotle cheese calories run 110 an ounce, with 6 g of protein and 5 g of saturated fat, which makes it the densest dairy topping on the line by weight.',
  lettuce: 'Chipotle romaine lettuce is 5 calories with no sodium at all, which is why a salad reads low-calorie even when the container arrives completely full.',
  'fajita-veggies': 'Chipotle fajita veggies calories total just 20 for a full scoop of grilled peppers and onions, which makes them the cheapest way to add volume to a bowl.',
  'salsa-verde': 'Chipotle salsa verde is 15 calories a serving with 260 mg of sodium, the lightest of the four salsas on both counts. Full four-way sodium comparison.',
  'fresh-tomato-salsa': 'Chipotle fresh tomato salsa is 25 calories and the mildest on the menu, yet it carries 550 mg of sodium — more than any other salsa, and more than chicken.',
  'roasted-chili-corn-salsa': 'Chipotle roasted chili-corn salsa calories come to 80, with 16 g of carbohydrate — the only salsa with a carb count worth tracking, four times the rest.',
  'hot-salsa': 'Chipotle’s hot tomatillo-red chili salsa is 30 calories. Heat level says nothing about nutrition here — the 500 mg of sodium is the figure that matters.',

  keto: 'A keto Chipotle order is straightforward once rice and beans are gone: a steak build with cauliflower rice lands near 13 g net carbs. Full arithmetic.',
  vegan: 'A vegan Chipotle order means sofritas or beans, no dairy, and knowing which extras qualify. Guacamole is vegan; the chipotle-honey vinaigrette is not.',
  vegetarian: 'A vegetarian Chipotle order has two routes: sofritas, or double beans plus dairy. They land 8 g of protein apart, and here is the full comparison of both.',
  'high-protein': 'A high protein Chipotle order tops out near 82 g in a single bowl. Double chicken plus beans and cheese is how you get there, and here is the cost.',
  'low-calorie': 'A low calorie Chipotle order can land near 195 calories with 23 g of protein. The floor is lower than most people assume — here is the exact build.',
  'low-carb': 'A low carb Chipotle order is not a keto order. With 40 to 60 g to work with, beans are worth keeping and rice is not. The arithmetic, laid out in full.',
  'low-sodium': 'A standard chicken bowl carries 1,610 mg of sodium. A low sodium Chipotle order can land near 890 mg — here is the swap ladder that gets you there.',
  whole30: 'A Whole30 Chipotle order rules out rice, beans, dairy and soy. That leaves the meats, greens, fajita veggies, guacamole and the two tomatillo salsas.',
  'gluten-free': 'Only the flour tortilla contains gluten at Chipotle. Whether that makes a gluten free order safe depends on cross-contact, which is a separate question.',
  'dairy-free': 'Only cheese, sour cream and queso blanco contain dairy at Chipotle. Guacamole and all four salsas are dairy-free by default, so a dairy free order is easy.',
  paleo: 'Most people assume Chipotle is easy paleo. Strict paleo excludes legumes, which puts beans out, and that single rule changes a paleo order considerably.',

  sodium: 'A complete Chipotle sodium guide with all 29 ingredients ranked by milligrams, plus the cumulative math showing how a standard bowl reaches 1,610 mg.',
  'vs-fast-food': 'Chipotle vs fast food nutrition compared on calories, protein and sodium against McDonald’s, Taco Bell and Subway — including where Chipotle loses.',
  'meal-prep': 'A practical Chipotle meal prep guide: which ingredients survive two days in the fridge, what to order on the side, and how to reheat a bowl properly.',

  sources: 'Where every nutrition figure on ChipotleMacros comes from, how often it is verified against published data, and the editorial rules behind what we publish.',
  contact: 'How to report a wrong nutrition figure, suggest a menu item we have missed, or ask a question about how this site calculates the numbers it publishes.',
  'privacy-policy': 'What ChipotleMacros collects, what it does not, and how the calculator handles the meal you build in your browser. Includes the full cookie policy.',
  'terms-of-service': 'Terms governing use of ChipotleMacros, including accuracy limitations, our trademark position, content reuse, and how to file a copyright complaint.',
};

let done = 0;
const bad = [];
for (const [slug, text] of Object.entries(NEW)) {
  if (text.length < 150 || text.length > 160) {
    bad.push(`${slug}: ${text.length} chars`);
    continue;
  }
  let applied = false;
  for (const file of FILES) {
    if (!existsSync(file)) continue;
    let s = readFileSync(file, 'utf8');
    const key = `slug: '${slug}',`;
    const at = s.indexOf(key);
    if (at < 0) continue;
    const dAt = s.indexOf('description:', at);
    if (dAt < 0) continue;
    const open = s.indexOf("'", dAt);
    // closing quote is the one followed by a comma
    let close = open + 1;
    while (close < s.length) {
      if (s[close] === "'" && /^\s*,/.test(s.slice(close + 1))) break;
      close++;
    }
    s = s.slice(0, open + 1) + text + s.slice(close);
    writeFileSync(file, s);
    applied = true;
    done++;
    break;
  }
  if (!applied) bad.push(`${slug}: slug not found in any content file`);
}
console.log(`rewrote ${done} descriptions`);
if (bad.length) {
  console.log('NOT APPLIED:');
  for (const b of bad) console.log('  ' + b);
}
