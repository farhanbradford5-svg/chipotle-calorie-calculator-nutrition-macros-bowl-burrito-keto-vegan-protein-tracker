// Spot-check that rewritten FAQ answers still state facts the data supports.
// Every assertion below is checked against src/data/builds.js, not against the
// prose that makes the claim.
import { item, total, N, fmt, PROTEINS } from '../src/data/builds.js';
import { readFileSync } from 'node:fs';

let fails = 0;
const ok = (label, pass, detail = '') => {
  if (!pass) fails++;
  console.log(`${pass ? 'PASS' : 'FAIL'}  ${label}${detail ? '  — ' + detail : ''}`);
};
const page = (u) => readFileSync(`dist${u}/index.html`, 'utf8')
  .replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/&rsquo;|&#8217;/g, '’')
  .replace(/&#39;/g, "'").replace(/&mdash;/g, '—').replace(/\s+/g, ' ');

console.log('--- /diet/low-sodium: "Which protein has the least sodium?" ---');
const bySodium = [...PROTEINS].map(item).sort((a, b) => a.na - b.na);
ok('chicken really is the lowest-sodium protein',
  bySodium[0].id === 'chicken', `lowest: ${bySodium[0].name} ${bySodium[0].na} mg`);
ok('steak really is second', bySodium[1].id === 'steak', `second: ${bySodium[1].name} ${bySodium[1].na} mg`);
ok('sofritas really is the highest',
  bySodium[bySodium.length - 1].id === 'sofritas',
  `highest: ${bySodium[bySodium.length - 1].name} ${bySodium[bySodium.length - 1].na} mg`);
const proteinSpread = bySodium[bySodium.length - 1].na - bySodium[0].na;
const salsas = ['mild-salsa', 'corn-salsa', 'green-salsa', 'red-salsa'].map(item).sort((a, b) => a.na - b.na);
const salsaSpread = salsas[3].na - salsas[0].na;
ok('claim: protein sodium spread is narrower than the salsa spread',
  proteinSpread < salsaSpread, `proteins ${proteinSpread} mg vs salsas ${salsaSpread} mg`);
const ls = page('/diet/low-sodium');
ok('rendered page states 310 mg and 330 mg', ls.includes('310 mg') && ls.includes('330 mg'));

console.log('\n--- /diet/high-protein: "What is the highest-protein order at Chipotle?" ---');
const dbl = N.doubleBowl('chicken');
const dblPlusBeans = total([['chicken', 2], 'white-rice', ['black-beans', 2], 'green-salsa', 'cheese']);
ok('double-chicken bowl really is 82 g protein', dbl.p === 82, `${dbl.p} g`);
const hp = page('/diet/high-protein');
ok('rendered page shows the double-chicken figure', hp.includes(`${dbl.p} g`), `${dbl.p} g`);
ok('rendered page shows the second-bean-scoop figure', hp.includes(`${dblPlusBeans.p} g`), `${dblPlusBeans.p} g`);
const best = [...PROTEINS].map(item).sort((a, b) => b.p / b.cal - a.p / a.cal)[0];
ok('claim: chicken has the best protein-per-calorie ratio on the line',
  best.id === 'chicken', `best: ${best.name} at ${Math.round((best.p / best.cal) * 1000) / 10} g/100 cal`);

console.log('\n--- /menu/queso: "Is queso or guacamole lower in calories?" ---');
const q = item('queso'), gu = item('guac');
ok('queso really is lower in calories', q.cal < gu.cal, `${q.cal} vs ${gu.cal}`);
ok('the stated gap of 110 is right', gu.cal - q.cal === 110, `${gu.cal - q.cal}`);
ok('queso really is higher in saturated fat', q.sat > gu.sat, `${q.sat} g vs ${gu.sat} g`);
ok('queso really returns more protein', q.p > gu.p, `${q.p} g vs ${gu.p} g`);
ok('guacamole really brings more fiber', gu.fib > q.fib, `${gu.fib} g vs ${q.fib} g`);
const qp = page('/menu/queso');
ok('rendered page carries all four figures',
  [q.cal, gu.cal, q.sat, gu.sat].every((n) => qp.includes(String(n))));

console.log('\n--- /menu/guacamole: "How many calories is chips and guac together?" ---');
const cg = item('chips-guac');
ok('chips & guac total matches the data', cg.cal === 1000, `${cg.cal} cal`);
ok('chips alone matches the stated component', item('chips').cal === 540, `${item('chips').cal} cal`);
const gp = page('/menu/guacamole');
ok('rendered page states both', gp.includes(fmt(cg.cal)) && gp.includes('540'));

console.log('\n--- /diet/gluten-free: rewritten answers ---');
const gf = page('/diet/gluten-free');
ok('crispy corn shell figures match the data',
  gf.includes(String(item('taco-shells').cal)) && gf.includes(`${item('taco-shells').na} mg`),
  `${item('taco-shells').cal} cal / ${item('taco-shells').na} mg`);
ok('claim: crispy corn is the lowest-sodium base',
  ['taco-shells', 'flour-tortilla', 'salad-base', 'ques-base'].map(item)
    .sort((a, b) => a.na - b.na)[0].id === 'taco-shells');
ok('chips figures match the data',
  gf.includes(String(item('chips').cal)) && gf.includes(item('chips').serving));

console.log(`\n${fails === 0 ? 'ALL SPOT-CHECKED FAQ FACTS HOLD' : fails + ' CLAIM(S) NOT SUPPORTED BY THE DATA'}`);
process.exit(fails === 0 ? 0 : 1);
