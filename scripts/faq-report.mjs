// Lists every FAQ answer that misses the 40-80 word band, opens a boolean
// question without a verdict, or fails to echo the question's own terms.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const dec = (s) =>
  s.replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&').replace(/&rsquo;|&#8217;/g, '’').replace(/&#39;/g, "'")
    .replace(/&mdash;/g, '—').replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ').trim();

const walk = (d) =>
  readdirSync(d).flatMap((f) => {
    const p = join(d, f);
    return statSync(p).isDirectory() ? walk(p) : p.endsWith('.html') ? [p] : [];
  });

const BOOL = /^(is|are|does|do|can|will|should|has|have|did|was|were)\b/i;
const VERDICT = /^(yes|no|it depends|not really|not quite|neither|both|almost|rarely|sometimes|only|nothing|none|technically|marginally|comfortably|barely|partly)\b/i;
const STOP = new Set(['how', 'many', 'much', 'what', 'is', 'are', 'does', 'do', 'can', 'the', 'a', 'an',
  'in', 'of', 'at', 'to', 'for', 'and', 'or', 'it', 'this', 'that', 'there', 'i', 'my', 'you', 'your', 'with', 'be']);

const by = {};
let total = 0, flagged = 0;
for (const file of walk('dist')) {
  const html = readFileSync(file, 'utf8');
  let url = '/' + relative('dist', file).replace(/\\/g, '/').replace(/(^|\/)index\.html$/, '');
  url = url === '/' ? '/' : url.replace(/\/$/, '');
  const main = html.slice(html.indexOf('<main'), html.indexOf('</main>'));
  for (const m of main.matchAll(/<h3[^>]*>((?:(?!<\/h3>)[\s\S])*?)<\/h3>\s*<p[^>]*>((?:(?!<\/p>)[\s\S])*?)<\/p>/g)) {
    const q = dec(m[1]);
    if (!q.endsWith('?')) continue;
    total++;
    const a = dec(m[2]);
    const w = a.split(' ').filter(Boolean).length;
    const issues = [];
    if (w < 40) issues.push(`SHORT ${w}w`);
    if (w > 80) issues.push(`LONG ${w}w`);
    // An either/or question is answered directly by naming the winner;
    // "Yes" would be the wrong form of answer for it.
    const eitherOr = / or /.test(q);
    const namesAlternative =
      eitherOr &&
      q.toLowerCase().replace(/[^a-z ]/g, '').split(/\s+/)
        .some((w) => w.length > 3 &&
          a.toLowerCase().split(/(?<=[.!?])\s/)[0].split(/\s+/).slice(0, 5).includes(w));
    if (BOOL.test(q) && !VERDICT.test(a) && !namesAlternative) issues.push('NO-VERDICT');
    const terms = q.toLowerCase().replace(/[^a-z0-9\s-]/g, '').split(/\s+/).filter((t) => t && !STOP.has(t));
    const first = a.split(/(?<=[.!?])\s/)[0].toLowerCase();
    if (!terms.some((t) => first.includes(t.replace(/s$/, '')))) issues.push('NO-ECHO');
    if (!issues.length) continue;
    flagged++;
    (by[url] = by[url] || []).push(`[${issues.join(' ')}] ${q}\n        → ${a.slice(0, 110)}`);
  }
}
console.log(`${flagged} of ${total} FAQ answers need work\n`);
for (const u of Object.keys(by).sort()) {
  console.log(`${u}  (${by[u].length})`);
  for (const r of by[u]) console.log('   ' + r);
  console.log();
}

process.exit(flagged === 0 ? 0 : 1);
