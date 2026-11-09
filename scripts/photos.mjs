// Nomi delle foto del sito: in inglese, descrittivi, per la SEO (regola in CLAUDE.md, "Nomi delle foto").
//
//   npm run photos:check                      segnala i file con nomi generici o non validi
//   npm run photos:suggest -- <cartella>      propone i nomi a partire dai testi alternativi inglesi
//   npm run photos:rename -- <vecchio> <nuovo>        rinomina una foto e aggiorna i riferimenti in src/
//   npm run photos:rename -- --map <file.json>        come sopra, per tante foto: { "vecchio": "nuovo" }
//
// I percorsi sono relativi alla cartella del progetto (es. src/assets/real-weddings/giada-luca/02.jpg).
import { execFileSync } from 'node:child_process';
import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { basename, dirname, extname, join, relative, resolve, sep } from 'node:path';

const ROOT = join(dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')), '..');
const IMAGE = /\.(jpe?g|png|webp|avif|gif|svg)$/i;
// Cartelle con le foto del sito. I trailer originali sono esclusi da git e non sono foto
const PHOTO_DIRS = ['src/assets', 'public'];
const SKIP = ['src/assets/trailers', 'public/fonts', 'public/videos'];
// File in cui cercare i riferimenti da aggiornare
const TEXT = /\.(md|mdx|ts|js|mjs|astro|json|css)$/i;

// numero d'ordine facoltativo (01-, 0042-, 0009-1-), poi parole minuscole separate da trattini
const VALID = /^(\d{2,4}(-\d)?-)?[a-z0-9]+(-[a-z0-9]+)*\.[a-z0-9]+$/;
// nomi da fotocamera, telefono o export generico
const GENERIC = /^(img|dsc[fn]?|pxl|mvimg|photo|image|foto|immagine|untitled|screenshot|portfolio|copy|whatsapp)([-_ ]|\d|$)/i;

const toPosix = (p) => p.split(sep).join('/');

function walk(dir, out = []) {
  if (!existsSync(dir)) return out;
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (SKIP.some((s) => toPosix(relative(ROOT, full)).startsWith(s))) continue;
    if (statSync(full).isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

export function problem(file) {
  const name = basename(file);
  const stem = name.slice(0, -extname(name).length);
  if (GENERIC.test(name)) return 'nome da fotocamera o generico';
  if (!VALID.test(name)) return 'solo minuscole, numeri e trattini (niente spazi, _, &, accenti, maiuscole)';
  const words = stem.replace(/^\d{2,4}(-\d)?-?/, '').split('-').filter(Boolean);
  if (!words.some((w) => /[a-z]{3,}/.test(w))) return 'manca una descrizione (es. 05-bride-getting-ready.jpg)';
  return null;
}

function check() {
  const bad = PHOTO_DIRS.flatMap((d) => walk(join(ROOT, d)))
    .filter((f) => IMAGE.test(f))
    .map((f) => [toPosix(relative(ROOT, f)), problem(f)])
    .filter(([, p]) => p);
  if (!bad.length) {
    console.log('Nomi delle foto: tutto in regola.');
    return;
  }
  console.error(`Nomi delle foto da sistemare (${bad.length}), vedi "Nomi delle foto" in CLAUDE.md:`);
  for (const [f, p] of bad) console.error(`  ${f}  →  ${p}`);
  console.error('Rinomina con: npm run photos:rename -- <vecchio> <nuovo>');
  process.exit(1);
}

// ---- proposte dai testi alternativi ----

const STOP = new Set(
  'a an the and of in on at with her his their its to from by for among amid beneath before after during while into onto between under over against next as is are be being seen still just them they one very all who that this these those up out off together around through'.split(' '),
);

export function slugFromAlt(alt, names = []) {
  let s = alt
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[’']s\b/g, '')
    .toLowerCase()
    .replace(/in black and white/g, 'black-and-white');
  // I nomi degli sposi non vanno nei file: li sostituisce "couple", da correggere a mano in bride / groom
  for (const n of names) s = s.replace(new RegExp(`\\b${n.toLowerCase()}\\b`, 'g'), 'couple');
  const words = s
    .split(/[^a-z0-9-]+/)
    .flatMap((w) => (w === 'black-and-white' ? ['black', 'white'] : [w]))
    .filter((w) => w && !STOP.has(w));
  const dedup = words.filter((w, i) => w !== words[i - 1]);
  return dedup.slice(0, 6).join('-');
}

function suggest(dir) {
  const abs = join(ROOT, dir);
  const slug = basename(abs);
  // Testi alternativi dal diario inglese con lo stesso nome della cartella, se c'è
  const diary = join(ROOT, 'src/content/diaries/en', `${slug}.md`);
  const text = existsSync(diary) ? readFileSync(diary, 'utf8') : '';
  const couple = text.match(/^couple:\s*(.+)$/m)?.[1] ?? '';
  const names = couple.split(/&|and/).map((n) => n.trim()).filter(Boolean);
  const alts = new Map([...text.matchAll(/!\[([^\]]*)\]\([^)]*\/([^/)]+)\)/g)].map((m) => [m[2], m[1]]));
  for (const file of readdirSync(abs).filter((f) => IMAGE.test(f)).sort()) {
    const num = file.match(/^\d{2,4}/)?.[0];
    const alt = alts.get(file);
    const desc = alt ? slugFromAlt(alt, names) : '???';
    console.log(`"${file}": "${num ? `${num}-` : ''}${desc}${extname(file).toLowerCase()}",${alt ? '' : '  // nessun alt: descrivi a mano'}`);
  }
}

// ---- rinomina ----

function textFiles() {
  return walk(join(ROOT, 'src')).filter((f) => TEXT.test(f));
}

function rename(pairs) {
  const files = textFiles();
  const contents = new Map(files.map((f) => [f, readFileSync(f, 'utf8')]));
  for (const [from, to] of pairs) {
    const fromAbs = join(ROOT, from);
    const toAbs = join(dirname(fromAbs), basename(to));
    if (!existsSync(fromAbs)) throw new Error(`Non trovato: ${from}`);
    if (existsSync(toAbs)) throw new Error(`Esiste già: ${toPosix(relative(ROOT, toAbs))}`);
    const p = problem(toAbs);
    if (p) throw new Error(`${basename(to)}: ${p}`);
    execFileSync('git', ['mv', fromAbs, toAbs], { cwd: ROOT });
    // Riferimenti: sempre preceduti dalla cartella ("giada-luca/02.jpg"), così "02.jpg" di un altro diario resta com'è
    const folder = basename(dirname(fromAbs));
    const oldRef = `${folder}/${basename(fromAbs)}`;
    const newRef = `${folder}/${basename(toAbs)}`;
    let count = 0;
    for (const [f, c] of contents) {
      if (!c.includes(oldRef)) continue;
      contents.set(f, c.split(oldRef).join(newRef));
      count++;
    }
    console.log(`${oldRef} → ${basename(toAbs)}  (${count} file aggiornati)`);
  }
  for (const f of files) {
    const c = contents.get(f);
    if (c !== readFileSync(f, 'utf8')) writeFileSync(f, c);
  }
}

const [cmd, ...args] = process.argv.slice(2);
if (cmd === 'check') check();
else if (cmd === 'suggest' && args[0]) suggest(args[0]);
else if (cmd === 'rename' && args[0] === '--map' && args[1]) {
  const map = JSON.parse(readFileSync(resolve(ROOT, args[1]), 'utf8'));
  const base = map.$dir ?? '';
  rename(Object.entries(map).filter(([k]) => k !== '$dir').map(([from, to]) => [join(base, from), to]));
} else if (cmd === 'rename' && args.length === 2) rename([args]);
else {
  console.error('Uso: photos.mjs check | suggest <cartella> | rename <vecchio> <nuovo> | rename --map <file.json>');
  process.exit(1);
}
