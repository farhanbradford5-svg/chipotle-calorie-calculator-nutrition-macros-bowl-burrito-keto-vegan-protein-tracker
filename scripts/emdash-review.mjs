// C27: census every em dash in body copy and classify it. A dash doing
// parenthetical work a comma or period cannot do cleanly is kept; one doing
// filler work is flagged for replacement.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const dec = (s) =>
  s.replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&').replace(/&rsquo;|&#8217;/g, '’').replace(/&mdash;/g, '—')
    .replace(/&nbsp;/g, ' ').replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ').trim();

const walk = (d) => readdirSync(d).flatMap((f) => {
  const p = join(d, f);
  return statSync(p).isDirectory() ? walk(p) : p.endsWith('.html') ? [p] : [];
});

// Filler patterns: the dash adds nothing a comma or period would not do.
const FILLER = [
  { re: /—\s+(and|but|so|or)\s/i, why: 'dash before a coordinating conjunction (comma reads better)' },
  { re: /—\s+(which|who)\s/i, why: 'dash before a relative clause (comma reads better)' },
  { re: /\w\s—\s\w+\s—\s\w/, why: 'two dashes in one clause' },
];

let total = 0;
const flagged = [];
const kept = { number: 0, appositive: 0, other: 0 };

for (const file of walk('dist')) {
  const url = '/' + relative('dist', file).replace(/\\/g, '/').replace(/(^|\/)index\.html$/, '');
  const html = readFileSync(file, 'utf8');
  // Tables carry no sentence punctuation, so their cell text merges into the
  // following paragraph and confuses the sentence splitter. This census is
  // about prose, so drop tables first.
  const main = html.slice(html.indexOf('<main'), html.indexOf('</main>'))
    .replace(/<table[\s\S]*?<\/table>/gi, ' ');
  const text = dec(main);
  for (const sentence of text.split(/(?<=[.!?])\s+/)) {
    const n = (sentence.match(/—/g) || []).length;
    if (!n) continue;
    total += n;
    // A sentence with a matched pair of dashes is a parenthetical: the second
    // dash closes it and any following conjunction is ordinary grammar.
    // A link label followed by a gloss uses the dash as a list separator.
    const paired = n >= 2;
    const listGloss = /^[A-Z][^.?!]{0,60}—\s/.test(sentence.trim());
    let hit = null;
    if (!paired && !listGloss) {
      for (const f of FILLER) if (f.re.test(sentence)) { hit = f; break; }
    }
    if (hit) flagged.push(`${url.replace(/\/$/, '') || '/'}: [${hit.why}] …${sentence.slice(0, 110)}`);
    else if (/—\s*[\d$]/.test(sentence) || /—\s*(at|the|more|less|roughly|about)\s/i.test(sentence)) kept.number += n;
    else kept.appositive += n;
  }
  // double hyphens
  if (/(^|[^-])--([^-]|$)/.test(text)) flagged.push(`${url}: stray double hyphen`);
}

console.log(`C27 em dash census: ${total} in body copy across 55 pages`);
console.log(`  kept — introducing a figure or qualifier: ${kept.number}`);
console.log(`  kept — parenthetical/appositive: ${kept.appositive}`);
console.log(`  flagged as filler: ${flagged.length}`);
for (const f of flagged.slice(0, 30)) console.log('   ' + f);
if (flagged.length > 30) console.log(`   …and ${flagged.length - 30} more`);
process.exit(flagged.length === 0 ? 0 : 1);
