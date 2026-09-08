import { CATEGORIES } from '../src/data/nutrition.js';
import { state, totals, applyPreset, encode, decode, selectedIds } from '../src/scripts/calc.js';
import { PRESETS } from '../src/data/nutrition.js';

let fails = 0;
const eq = (label, got, want) => {
  const pass = JSON.stringify(got) === JSON.stringify(want);
  if (!pass) fails++;
  console.log(`${pass ? 'OK  ' : 'FAIL'} ${label.padEnd(52)} ${JSON.stringify(got)}${pass ? '' : ' != ' + JSON.stringify(want)}`);
};
const reset = () => {
  state.format = 'bowl';
  state.single = { protein: null, rice: null, beans: null };
  state.multi = { salsa: new Set(), toppings: new Set(), sides: new Set() };
  state.portions = new Map();
};

console.log('--- default state ---');
reset();
eq('empty bowl totals to zero', totals().t.cal, 0);
eq('empty bowl has no build lines', totals().lines.length, 0);

console.log('\n--- core builds match the page copy ---');
reset();
state.single = { protein: 'chicken', rice: 'white-rice', beans: 'black-beans' };
state.multi.salsa = new Set(['mild-salsa']);
state.multi.toppings = new Set(['cheese']);
eq('chicken bowl calories', totals().t.cal, 655);
eq('chicken bowl protein', totals().t.p, 50);

state.format = 'burrito';
eq('same build as burrito', totals().t.cal, 975);
eq('burrito adds tortilla line', totals().lines[0].name, 'Flour Tortilla');
eq('burrito sodium (build incl. cheese)', totals().t.na, 2210);

console.log('\n--- portion multipliers ---');
reset();
state.single.rice = 'white-rice';
eq('normal rice', totals().t.cal, 210);
state.portions.set('white-rice', 'light');
eq('light rice (x0.5)', totals().t.cal, 105);
state.portions.set('white-rice', 'extra');
eq('extra rice (x1.5)', totals().t.cal, 315);
state.portions.set('white-rice', 'double');
eq('double rice (x2)', totals().t.cal, 420);
eq('portion label appears in build line', totals().lines[0].portion, 'Double');

console.log('\n--- double protein claim ---');
reset();
state.single = { protein: 'chicken', rice: 'white-rice', beans: 'black-beans' };
state.multi.salsa = new Set(['mild-salsa']);
state.portions.set('chicken', 'double');
eq('double-chicken bowl calories', totals().t.cal, 725);
eq('double-chicken bowl protein', totals().t.p, 76);

console.log('\n--- format bases ---');
reset();
state.single.protein = 'steak';
state.format = 'salad';
eq('salad adds supergreens base', totals().t.cal, 160);
state.format = 'tacos';
eq('tacos add 3 corn shells', totals().t.cal, 360);
state.format = 'quesadilla';
eq('quesadilla base included', totals().t.cal, 580);
state.format = 'kids';
eq('kids meal halves ingredients', totals().t.cal, 75);
state.format = 'bowl';
eq('bowl adds no base', totals().t.cal, 150);

console.log('\n--- presets ---');
for (const p of PRESETS) {
  applyPreset(p);
  const t = totals().t;
  const sane = t.cal > 150 && t.cal < 1300 && totals().lines.length >= 4;
  if (!sane) fails++;
  console.log(`${sane ? 'OK  ' : 'FAIL'} ${p.name.padEnd(24)} ${t.cal} cal · ${t.p} g protein · ${t.na} mg sodium`);
}
applyPreset(PRESETS.find((p) => p.id === 'go-half'));
eq('Go Half applies light portions', totals().lines.find((l) => l.name.includes('White Rice')).cal, 105);
applyPreset(PRESETS.find((p) => p.id === 'high-protein'));
eq('High Protein preset uses double chicken', totals().t.p, 82);

console.log('\n--- share link round-trip ---');
applyPreset(PRESETS.find((p) => p.id === 'grain-freedom'));
const before = totals().t;
const code = encode();
reset();
eq('decode() accepts the encoded string', decode(code), true);
eq('totals survive the round trip', totals().t, before);
eq('encoded string is URL-safe', /^[a-z0-9_!-]+$/i.test(code), true);
reset();
eq('garbage input is rejected', decode('not-a-format_nonsense'), false);


console.log('\n--- A8 edge cases ---');
const ALL_KEYS = ['cal', 'p', 'c', 'f', 'fib', 'na', 'sug', 'sat'];
const finite = (t) => ALL_KEYS.every((k) => Number.isFinite(t[k]) && t[k] >= 0);

// 1. nothing selected
reset();
eq('zero ingredients: every metric is 0', ALL_KEYS.every((k) => totals().t[k] === 0), true);

// 2. every scoreable ingredient at "double"
reset();
for (const cat of CATEGORIES) {
  const scoreable = cat.items.filter((i) => i.cal > 0);
  if (cat.mode === 'single') state.single[cat.id] = scoreable[0].id;
  else state.multi[cat.id] = new Set(scoreable.map((i) => i.id));
  for (const i of scoreable) state.portions.set(i.id, 'double');
}
const maxed = totals().t;
eq('everything on double: all metrics finite and non-negative', finite(maxed), true);
console.log(`     maxed build: ${maxed.cal} cal, ${maxed.p} g protein, ${maxed.na} mg sodium`);
eq('everything on double: no metric is NaN', ALL_KEYS.some((k) => Number.isNaN(maxed[k])), false);

// 3. switching format mid-build keeps selections and re-totals
reset();
state.single = { protein: 'chicken', rice: 'white-rice', beans: 'black-beans' };
state.multi.salsa = new Set(['mild-salsa']);
const asBowl = totals().t.cal;
state.format = 'burrito';
const asBurrito = totals().t.cal;
state.format = 'salad';
const asSalad = totals().t.cal;
eq('format switch preserves ingredient selections', selectedIds().length, 4);
eq('bowl → burrito adds only the tortilla', asBurrito - asBowl, 320);
eq('bowl → salad swaps the base, not the fillings', asSalad - asBowl, 10);
eq('every format total stays finite', [asBowl, asBurrito, asSalad].every(Number.isFinite), true);

// 4. kids-meal 0.5 scale stacked with a "double" portion
reset();
state.format = 'kids';
state.single.protein = 'chicken';
state.portions.set('chicken', 'double');
const kidsDouble = totals().t;
eq('kids 0.5 × double 2.0 = one normal scoop', kidsDouble.cal, 180);
eq('the stacked multiplier scales protein too', kidsDouble.p, 32);
eq('kids build stays finite', finite(kidsDouble), true);

// 5. deselecting everything returns to zero rather than a stale total
state.single.protein = null;
state.portions.clear();
state.format = 'bowl';
eq('deselecting returns to zero', totals().t.cal, 0);
eq('build list empties out', totals().lines.length, 0);

console.log(`\n${fails === 0 ? 'ALL CALCULATOR TESTS PASSED' : fails + ' TEST(S) FAILED'}`);
process.exit(fails === 0 ? 0 : 1);
