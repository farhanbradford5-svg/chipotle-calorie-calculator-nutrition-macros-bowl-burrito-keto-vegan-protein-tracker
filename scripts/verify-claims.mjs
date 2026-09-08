import { CATEGORIES, FORMATS } from '../src/data/nutrition.js';

const I = new Map();
for (const c of CATEGORIES) for (const it of c.items) I.set(it.id, it);
const B = new Map(FORMATS.map((f) => [f.id, f.base]));

const sum = (parts) =>
  parts.reduce(
    (a, [id, m = 1]) => {
      const it = I.get(id) || B.get(id);
      if (!it) throw new Error('unknown ' + id);
      for (const k of ['cal', 'p', 'c', 'f', 'fib', 'na', 'sug', 'sat']) a[k] += it[k] * m;
      return a;
    },
    { cal: 0, p: 0, c: 0, f: 0, fib: 0, na: 0, sug: 0, sat: 0 }
  );

const claims = [
  ['chicken bowl (rice/beans/salsa/cheese) = 655 cal',
    sum([['chicken'], ['white-rice'], ['black-beans'], ['mild-salsa'], ['cheese']]).cal, 655],
  ['same as burrito = 975 cal',
    sum([['burrito'], ['chicken'], ['white-rice'], ['black-beans'], ['mild-salsa'], ['cheese']]).cal, 975],
  ['+ guac + sour cream ~ 995 cal',
    sum([['chicken'], ['white-rice'], ['black-beans'], ['mild-salsa'], ['cheese'], ['guac'], ['sour-cream']]).cal, 995],
  ['that + chips past 1500',
    sum([['chicken'], ['white-rice'], ['black-beans'], ['mild-salsa'], ['cheese'], ['guac'], ['sour-cream'], ['chips']]).cal, 1535],
  ['typical order sodium = 1640 mg',
    sum([['chicken'], ['white-rice'], ['black-beans'], ['mild-salsa'], ['cheese'], ['sour-cream']]).na, 1640],
  ['same as burrito sodium = 2240 mg',
    sum([['burrito'], ['chicken'], ['white-rice'], ['black-beans'], ['mild-salsa'], ['cheese'], ['sour-cream']]).na, 2240],
  ['double-chicken bowl = 725 cal',
    sum([['chicken', 2], ['white-rice'], ['black-beans'], ['mild-salsa']]).cal, 725],
  ['double-chicken bowl = 76 g protein',
    sum([['chicken', 2], ['white-rice'], ['black-beans'], ['mild-salsa']]).p, 76],
  ['guac+queso+sour cream = 460 cal',
    sum([['guac'], ['queso'], ['sour-cream']]).cal, 460],
  ['guac+queso+sour cream = 700 mg sodium',
    sum([['guac'], ['queso'], ['sour-cream']]).na, 700],
  ['extra white rice adds 105 cal', I.get('white-rice').cal * 0.5, 105],
  ['tortilla = 320 cal / 600 mg', B.get('burrito').cal + B.get('burrito').na, 320 + 600],
  ['white->brown rice sodium delta = -160', I.get('white-rice').na - I.get('brown-rice').na, 160],
  ['fresh tomato -> green salsa delta = -290', I.get('mild-salsa').na - I.get('green-salsa').na, 290],
  ['steak salad (greens/green salsa/fajita) cal',
    sum([['salad'], ['steak'], ['green-salsa'], ['fajita']]).cal, 195],
  ['steak salad protein',
    sum([['salad'], ['steak'], ['green-salsa'], ['fajita']]).p, 23],
  ['low-sodium example = 680 mg',
    sum([['chicken'], ['brown-rice'], ['lettuce'], ['fajita'], ['sour-cream']]).na, 680],
  ['low-sodium + black beans = 890 mg',
    sum([['chicken'], ['brown-rice'], ['lettuce'], ['fajita'], ['sour-cream'], ['black-beans']]).na, 890],
  ['keto build total carbs',
    sum([['salad'], ['steak'], ['fajita'], ['green-salsa'], ['cheese'], ['guac']]).c, 21],
  ['keto build fiber',
    sum([['salad'], ['steak'], ['fajita'], ['green-salsa'], ['cheese'], ['guac']]).fib, 8],
  ['vegan chorizo bowl cal',
    sum([['chorizo'], ['brown-rice'], ['black-beans'], ['corn-salsa'], ['guac']]).cal, 830],
  ['vegan chorizo bowl protein',
    sum([['chorizo'], ['brown-rice'], ['black-beans'], ['corn-salsa'], ['guac']]).p, 33],
  ['vegan chorizo bowl fiber',
    sum([['chorizo'], ['brown-rice'], ['black-beans'], ['corn-salsa'], ['guac']]).fib, 23],
  ['chicken protein/cal ratio 0.18', +(I.get('chicken').p / I.get('chicken').cal).toFixed(2), 0.18, true],
  ['sodium 1640 = 71% of 2300', Math.round((1640 / 2300) * 100), 71],
];

let bad = 0;
for (const [label, actual, claimed, fine] of claims) {
  const r = fine ? actual : Math.round(actual * 10) / 10;
  const pass = r === claimed;
  if (!pass) bad++;
  console.log(`${pass ? 'OK  ' : 'DIFF'} ${label.padEnd(46)} computed=${r} claimed=${claimed}`);
}
console.log(bad === 0 ? '\nAll numeric claims match the data.' : `\n${bad} claim(s) differ.`);
process.exit(bad === 0 ? 0 : 1);
