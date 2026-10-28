// Checks cross-references.json against the interface documented in README.md.
//
//   node scripts/check.mjs
import { readFileSync } from 'node:fs';

const data = JSON.parse(readFileSync(new URL('../cross-references.json', import.meta.url), 'utf8'));
const LOCALES = ['pt-br', 'en', 'es'];
const errors = [];
const fail = (msg) => errors.push(msg);

const isI18n = (v) => v && LOCALES.every((l) => typeof v[l] === 'string' && v[l].length > 0);
const key = (r) => `${r.bookId}:${r.chapter}:${r.verse}`;

function checkRef(where, r) {
  if (!Number.isInteger(r.bookId) || r.bookId < 1 || r.bookId > 66) fail(`${where}: bookId ${r.bookId}`);
  if (!Number.isInteger(r.chapter) || r.chapter < 1) fail(`${where}: chapter ${r.chapter}`);
  if (!Number.isInteger(r.verse) || r.verse < 1) fail(`${where}: verse ${r.verse}`);
  if ('verseEnd' in r && !(Number.isInteger(r.verseEnd) && r.verseEnd > r.verse)) fail(`${where}: verseEnd ${r.verseEnd}`);
  if (!isI18n(r.names) || !isI18n(r.reference)) fail(`${where}: names/reference must have ${LOCALES.join(', ')}`);
}

const byId = new Map();
const bySource = {};
const byTarget = {};
for (const ref of data.references) {
  const where = `reference ${ref.id}`;
  if (byId.has(ref.id)) fail(`${where}: duplicate id`);
  byId.set(ref.id, ref);
  if (!isI18n(ref.slug) || !isI18n(ref.description)) fail(`${where}: slug/description must have ${LOCALES.join(', ')}`);
  checkRef(`${where} source`, ref.source);
  if (!Array.isArray(ref.targets) || ref.targets.length === 0) fail(`${where}: no targets`);
  ref.targets.forEach((t, i) => checkRef(`${where} target ${i}`, t));
  (bySource[key(ref.source)] ??= new Set()).add(ref.id);
  for (const t of ref.targets) (byTarget[key(t)] ??= new Set()).add(ref.id);
}

// indexed must be exactly what the references imply.
const { indexed } = data;
const same = (a, b) => [...a].sort((x, y) => x - y).join() === [...b].sort((x, y) => x - y).join();
for (const [name, expected] of [['bySource', bySource], ['byTarget', byTarget]]) {
  const actual = indexed?.[name] ?? {};
  for (const k of new Set([...Object.keys(actual), ...Object.keys(expected)])) {
    if (!/^\d+:\d+:\d+$/.test(k)) fail(`indexed.${name}: bad key "${k}"`);
    if (!same(actual[k] ?? [], expected[k] ?? [])) fail(`indexed.${name}["${k}"] out of sync`);
  }
}
for (const l of LOCALES) {
  const slugs = indexed?.bySlug?.[l] ?? {};
  for (const ref of data.references) {
    if (slugs[ref.slug[l]] !== ref.id) fail(`indexed.bySlug.${l}: "${ref.slug[l]}" should map to ${ref.id}`);
  }
  if (Object.keys(slugs).length !== data.references.length) fail(`indexed.bySlug.${l}: ${Object.keys(slugs).length} slugs for ${data.references.length} references`);
}

if (errors.length) {
  console.error(`✗ ${errors.length} problem(s):\n` + errors.slice(0, 50).map((e) => `  - ${e}`).join('\n'));
  process.exit(1);
}
console.log(`✓ ${data.references.length} references, indexes in sync`);
