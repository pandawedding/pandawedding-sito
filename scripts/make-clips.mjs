// Crea le clip leggere per il sito dai trailer originali (src/assets/trailers, non in git).
// Uso: node scripts/make-clips.mjs [filtro]   es. "node scripts/make-clips.mjs jasmine" rifà solo quelle
// Clip in loop con dissolvenza (audio solo per l'hero, attivabile con Sound on), H.264 con faststart, in public/videos/.
// Una clip può essere un tratto continuo (start/dur) o un montaggio di inquadrature (shots), con la musica continua da audioStart.
// I trailer senza link Vimeo hanno anche una versione web completa (720p con audio) per il player.
import { createRequire } from 'node:module';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const require = createRequire(import.meta.url);
const ffmpeg = require('@ffmpeg-installer/ffmpeg').path;

const SRC = 'src/assets/trailers';
const OUT = 'public/videos';
const only = process.argv[2];
const find = (prefix) => {
  const file = fs.readdirSync(SRC).find((f) => f.startsWith(prefix));
  if (!file) throw new Error(`Trailer non trovato: ${prefix}*`);
  return path.join(SRC, file);
};

// Hero: le inquadrature più belle del trailer di Selma e Michiel (sposi, shooting, drone sulla villa).
// [inizio, fine, ritaglio] in secondi dai tagli del trailer, con un fotogramma di margine per lato;
// ritaglio = posizione orizzontale del taglio 9:16 su mobile (0 sinistra, 1 destra, di base al centro);
// [da, a] fa un pan morbido durante l'inquadratura, per le coppie troppo larghe per il verticale
// (centrato sulle persone o sulla villa; le coppie larghe non entrano intere, si centra tra i due)
const heroShots = [
  [40.04, 41.28, 0.35], // drone: villa tra vigne e colline
  [1.8, 3.12], // drone: villa e giardino dall'alto
  [4.24, 5.16], // sala affrescata con la tavolata
  [3.12, 4.24, 0.47], // sposa seduta sulla balaustra
  [25.92, 27.76, 0.68], // sposa che gira nel giardino
  [27.76, 29.0, 0.7], // sposo nel giardino
  [32.08, 33.56, [0.38, 0.72]], // sposi tra le siepi: pan da lui (sinistra) a lei
  [44.2, 44.88, 0.53], // bacio tra le statue affrescate
  [50.64, 51.44, 0.38], // drone: labirinto con la sposa
  [48.0, 49.36, 0.58], // sposa nel giardino
  [44.88, 45.6, [0.76, 0.28]], // sposi che ridono: pan da lui (destra) a lei
  [51.44, 52.64], // bacio nella sala in penombra
  [9.8, 10.72, 0.4], // sposi al sole con l'auto d'epoca
  [52.64, 53.84, 0.4], // sposi al tramonto nel viale
  [53.84, 54.8, 0.47], // sposi alla fontana
  [56.12, 57.4, 0.47], // drone: valle e vigneti
].map(([a, b, x = 0.5]) => [a + 0.04, b - 0.04, x]);

// start/durata in secondi, scelti dai provini dei trailer
const clips = [
  // Hero: orizzontale per desktop, verticale (ritaglio centrale 9:16) per mobile.
  // Meno compresse (siepi e vigneti si impastano oltre CRF 26-28): ~6,5 MB desktop; mobile a piena risoluzione per gli schermi densi
  { out: 'hero-villa-arvedi-1080.mp4', src: 'selma_e_michiel', shots: heroShots, audioStart: 40, scale: '1920:1080', crf: 26, preset: 'veryslow', abr: '64k', audio: true },
  { out: 'hero-villa-arvedi-vertical.mp4', src: 'selma_e_michiel', shots: heroShots, audioStart: 40, crop: 'ih*9/16:ih:(iw-ow)*{x}', scale: '1080:1920', crf: 28, preset: 'veryslow', abr: '64k', audio: true },
  // Anteprime delle card film (desktop, al passaggio del mouse)
  { out: 'preview-imani-john.mp4', src: 'imani_e_john', start: 34, dur: 10, scale: '960:540', crf: 28 },
  { out: 'preview-johanna-come.mp4', src: 'johanna_e_c', start: 24, dur: 10, scale: '960:540', crf: 28 },
  { out: 'preview-daniel-josiane.mp4', src: 'daniel_e_josiane', start: 56, dur: 10, scale: '960:540', crf: 28 },
  { out: 'preview-jasmine-daniel.mp4', src: 'jasmine', start: 16, dur: 10, scale: '960:540', crf: 28 },
  { out: 'preview-selma-michiel.mp4', src: 'selma_e_michiel', start: 24.6, dur: 10, scale: '960:540', crf: 28 },
  // Trailer completi ospitati sul sito (nessun link Vimeo)
  { out: 'trailer-jasmine-daniel.mp4', src: 'jasmine', full: true, scale: '1280:720', crf: 28, audio: true },
  { out: 'trailer-selma-michiel.mp4', src: 'selma_e_michiel', full: true, scale: '1280:720', crf: 28, audio: true },
];

// Poster delle card film (fotogramma a "at" secondi)
const posters = [
  { out: 'src/assets/films/jasmine-daniel.jpg', src: 'jasmine', at: 30 },
  { out: 'src/assets/films/selma-michiel.jpg', src: 'selma_e_michiel', at: 33 },
  // Fermo immagine dell'hero: prima inquadratura della clip, stesso ritaglio, così il video parte senza salti
  { out: 'src/assets/hero/hero-poster-desktop.jpg', src: 'selma_e_michiel', at: 40.1, vf: 'scale=1920:1080:flags=lanczos' },
  { out: 'src/assets/hero/hero-poster-mobile.jpg', src: 'selma_e_michiel', at: 40.1, vf: 'crop=ih*9/16:ih:(iw-ow)*0.35,scale=1080:1920:flags=lanczos' },
];

// Posizione del ritaglio: fissa, oppure [da, a] con partenza e arrivo morbidi (smoothstep sul tempo dell'inquadratura)
const cropX = (x, dur) => {
  if (!Array.isArray(x)) return x;
  const [from, to] = x;
  return `(${from}+(${(to - from).toFixed(3)})*(st(0\\,clip(t/${dur.toFixed(2)}\\,0\\,1))*0+ld(0)*ld(0)*(3-2*ld(0))))`;
};

fs.mkdirSync(OUT, { recursive: true });
for (const clip of clips.filter((c) => !only || c.out.includes(only))) {
  const fade = 0.6;
  if (clip.shots) clip.dur = clip.shots.reduce((sum, [a, b]) => sum + b - a, 0);
  const filters = [
    clip.crop && `crop=${clip.crop}`,
    `scale=${clip.scale}:flags=lanczos`,
    !clip.full && `fade=t=in:st=0:d=${fade}`,
    !clip.full && `fade=t=out:st=${clip.dur - fade}:d=${fade}`,
  ].filter(Boolean);
  const audio = clip.full
    ? ['-c:a', 'aac', '-b:a', '128k']
    : ['-af', `afade=t=in:st=0:d=${fade},afade=t=out:st=${clip.dur - fade}:d=${fade}`, '-c:a', 'aac', '-b:a', clip.abr ?? '96k'];
  const dest = path.join(OUT, clip.out);
  if (clip.shots) {
    // Montaggio: ogni inquadratura è un ingresso a sé, poi concat; la musica è un tratto continuo del trailer
    // Niente dissolvenza dal nero all'inizio: il primo fotogramma è il fermo immagine dell'hero, il video subentra senza scurirsi
    const src = find(clip.src);
    const n = clip.shots.length;
    const end = (clip.dur - fade).toFixed(2);
    const graph = [
      ...clip.shots.map(
        ([a, b, x], i) => `[${i}:v]setpts=PTS-STARTPTS,${clip.crop ? `crop=${clip.crop.replace('{x}', cropX(x, b - a))},` : ''}scale=${clip.scale}:flags=lanczos,setsar=1,fps=25[v${i}]`,
      ),
      `${clip.shots.map((_, i) => `[v${i}]`).join('')}concat=n=${n}:v=1:a=0,fade=t=out:st=${end}:d=${fade}[v]`,
      `[${n}:a]afade=t=in:st=0:d=${fade},afade=t=out:st=${end}:d=${fade}[a]`,
    ].join(';');
    execFileSync(ffmpeg, [
      '-hide_banner', '-loglevel', 'error', '-y',
      ...clip.shots.flatMap(([a, b]) => ['-ss', String(a), '-t', (b - a).toFixed(2), '-i', src]),
      '-ss', String(clip.audioStart), '-t', clip.dur.toFixed(2), '-i', src,
      '-filter_complex', graph, '-map', '[v]', '-map', '[a]',
      '-c:a', 'aac', '-b:a', clip.abr ?? '96k',
      '-c:v', 'libx264', '-preset', clip.preset ?? 'slow', '-crf', String(clip.crf),
      '-profile:v', 'high', '-pix_fmt', 'yuv420p', '-movflags', '+faststart',
      dest,
    ]);
    console.log(clip.out, (fs.statSync(dest).size / 1024 / 1024).toFixed(2) + ' MB');
    continue;
  }
  execFileSync(ffmpeg, [
    '-hide_banner', '-loglevel', 'error', '-y',
    ...(clip.full ? [] : ['-ss', String(clip.start), '-t', String(clip.dur)]),
    '-i', find(clip.src),
    ...(clip.audio ? audio : ['-an']),
    '-vf', filters.join(','),
    '-c:v', 'libx264', '-preset', clip.preset ?? 'slow', '-crf', String(clip.crf),
    '-profile:v', 'high', '-pix_fmt', 'yuv420p', '-movflags', '+faststart',
    dest,
  ]);
  console.log(clip.out, (fs.statSync(dest).size / 1024 / 1024).toFixed(2) + ' MB');
}

for (const poster of posters.filter((p) => !only || p.out.includes(only))) {
  fs.mkdirSync(path.dirname(poster.out), { recursive: true });
  execFileSync(ffmpeg, [
    '-hide_banner', '-loglevel', 'error', '-y',
    '-ss', String(poster.at), '-i', find(poster.src), ...(poster.vf ? ['-vf', poster.vf] : []), '-frames:v', '1', '-q:v', '2', poster.out,
  ]);
  console.log(poster.out);
}
