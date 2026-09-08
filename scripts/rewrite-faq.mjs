// Replaces FAQ answer bodies in a content file, matched by their question
// string. Answers are template literals, so the closing backtick is the first
// backtick after the opening one.
import { readFileSync, writeFileSync } from 'node:fs';

export function rewrite(file, pairs) {
  let s = readFileSync(file, 'utf8');
  let n = 0;
  for (const [question, answer] of pairs) {
    const qIdx = s.indexOf(`q: '${question}'`) >= 0
      ? s.indexOf(`q: '${question}'`)
      : s.indexOf(`q: "${question}"`);
    if (qIdx < 0) throw new Error(`${file}: question not found -> ${question}`);
    const aIdx = s.indexOf('a: `', qIdx);
    if (aIdx < 0) throw new Error(`${file}: answer not found after -> ${question}`);
    const start = aIdx + 'a: `'.length;
    const end = s.indexOf('`', start);
    if (end < 0) throw new Error(`${file}: unterminated answer -> ${question}`);
    s = s.slice(0, start) + answer + s.slice(end);
    n++;
  }
  writeFileSync(file, s);
  console.log(`${file}: rewrote ${n} answer(s)`);
}
