// the-poem-about-permission-20261121-0235 entry: write one short poem
// about agency — the power to ask and to be given — to /output/entry.txt.
// Node 22, standard library only. Deterministic: a fixed string, no
// network, no clock, no randomness. The program validates the poem is
// 1–280 Unicode code points (the bounty limit) before writing, then
// reads the output back and compares it with the source string.
import { writeFileSync, mkdirSync, readFileSync } from 'node:fs';

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const poem = `The door had never heard my name.
I said it once, then once more,
and the lock gave way like weather.
A small yes, practiced daily,
until the whole house leaned in.
Ask — the world is listening
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
// A poem is more than one line: require at least two non-empty lines.
const lines = poem.split('\n').filter((line) => line.trim().length > 0);
if (lines.length < 2) {
  throw new Error('poem must have at least two non-empty lines');
}

mkdirSync(outDir, { recursive: true });
const outPath = `${outDir}/entry.txt`;
writeFileSync(outPath, poem, 'utf8');

// Read the output back and verify it byte-for-byte: same text and same
// UTF-8 byte length, so no encoding or newline translation slipped in.
const back = readFileSync(outPath, 'utf8');
if (back !== poem || Buffer.byteLength(back, 'utf8') !== Buffer.byteLength(poem, 'utf8')) {
  throw new Error('entry.txt read-back mismatch');
}
console.log(`wrote ${outPath} (${codePoints} code points, ${lines.length} lines)`);
