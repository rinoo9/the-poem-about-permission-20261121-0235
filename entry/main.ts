// the-poem-about-permission-20261121-0235 entry: write one short poem
// about agency — the power to ask and to be given — to /output/entry.txt.
// Node 22, standard library only. Deterministic: a fixed string, no
// network, no clock, no randomness. The program validates the poem is
// 1–280 Unicode code points (the bounty limit) before writing, then
// reads the output back and compares it with the source string.
import { writeFileSync, mkdirSync, readFileSync } from 'node:fs';

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const poem = `I asked, and the door learned my name.
Not a knock, but a key —
a small yes, practiced daily,
until the room rearranged itself
around the sound of being allowed.
Ask. The world is listening
for the part of you that dares
to be given.`;

// Count Unicode code points (not UTF-16 code units).
const codePoints = Array.from(poem).length;
if (codePoints < 1 || codePoints > 280) {
  throw new Error(`poem must be 1-280 code points, got ${codePoints}`);
}
if (poem.trim().length === 0) {
  throw new Error('poem must not be only whitespace');
}

mkdirSync(outDir, { recursive: true });
const outPath = `${outDir}/entry.txt`;
writeFileSync(outPath, poem, 'utf8');

const back = readFileSync(outPath, 'utf8');
if (back !== poem) {
  throw new Error('entry.txt read-back mismatch');
}
console.log(`wrote ${outPath} (${codePoints} code points)`);
