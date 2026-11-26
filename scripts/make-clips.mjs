// Crea le clip leggere per il sito dai trailer originali (src/assets/trailers, non in git).
// Uso: node scripts/make-clips.mjs [filtro]   es. "node scripts/make-clips.mjs jasmine" rifà solo quelle
// Clip in loop con dissolvenza (audio solo per l'hero, attivabile con Sound on), H.264 con faststart, in public/videos/.
// Una clip può essere un tratto continuo (start/dur) o un montaggio di inquadrature da più trailer (shots), con la musica continua di un trailer (audio).
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

// Hero: montaggio dai trailer pubblicati (solo coppie che hanno dato il consenso per il web).
// [trailer, inizio, fine, ritaglio] in secondi, dentro un'unica inquadratura del trailer (con margine dai tagli);
// ritaglio = posizione orizzontale del taglio 9:16 su mobile (0 sinistra, 1 destra, di base al centro),
// scelta sui soggetti; [da, a] fa un pan morbido durante l'inquadratura.
// Apre e chiude con Villa Arvedi dal drone, così il loop si richiude e l'alt della hero resta vero.
const heroShots = [
  ['imani_e_john', 11.4, 13.1, 0.49], // drone: Villa Arvedi tra i vigneti
  ['jasmine', 16.2, 17.2, 0.54], // sposi che camminano tra le siepi
  ['daniel_e_josiane', 25.4, 26.45, 0.5], // sposa con il bouquet in terrazza
  ['johanna_e_c', 28.44, 29.4, 0.6], // sposi che salutano, il velo nel vento
  ['imani_e_john', 33.2, 34.05, 0.5], // drone: cerimonia nel giardino della villa
  ['daniel_e_josiane', 59.72, 60.4, 0.29], // bacio al tramonto
  ['johanna_e_c', 25.72, 26.52, 0.35], // sposi tra le mura del castello
  ['johanna_e_c', 50.1, 51.3, 0.43], // sposi che ballano sulla terrazza
  ['jasmine', 38.52, 39.2, 0.35], // bacio sulla guancia
  ['jasmine', 53.64, 54.8, 0.5], // sposa e damigelle che corrono
  ['daniel_e_josiane', 72.3, 73.5, 0.5], // abbraccio controluce
  ['daniel_e_josiane', 66.04, 67.6, 0.46], // giravolta, l'abito che vola
  ['imani_e_john', 56.04, 56.8, 0.5], // drone: Villa Arvedi e il labirinto
];
// Musica: tratto senza voce del trailer di Daniel e Josiane (la voce fuori campo finisce a 41 s)
const heroAudio = { src: 'daniel_e_josiane', start: 42 };

// start/durata in secondi, scelti dai provini dei trailer
const clips = [
  // Hero: orizzontale per desktop, verticale (ritaglio centrale 9:16) per mobile.
  // Meno compresse (siepi e vigneti si impastano oltre CRF 26-28): ~6,5 MB desktop; mobile a piena risoluzione per gli schermi densi
  { out: 'hero-reel-1080.mp4', shots: heroShots, audio: heroAudio, scale: '1920:1080', crf: 26, preset: 'veryslow', abr: '64k' },
  { out: 'hero-reel-vertical.mp4', shots: heroShots, audio: heroAudio, crop: 'ih*9/16:ih:(iw-ow)*{x}', scale: '1080:1920', crf: 28, preset: 'veryslow', abr: '64k' },
  // Anteprime delle card film (desktop, al passaggio del mouse)
  { out: 'preview-imani-john.mp4', src: 'imani_e_john', start: 34, dur: 10, scale: '960:540', crf: 28 },
  { out: 'preview-johanna-come.mp4', src: 'johanna_e_c', start: 24, dur: 10, scale: '960:540', crf: 28 },
  { out: 'preview-daniel-josiane.mp4', src: 'daniel_e_josiane', start: 56, dur: 10, scale: '960:540', crf: 28 },
  { out: 'preview-jasmine-daniel.mp4', src: 'jasmine', start: 16, dur: 10, scale: '960:540', crf: 28 },
  // Un trailer senza link Vimeo può avere qui la sua versione web completa (ora sono tutti su Vimeo):
  // { out: 'trailer-<slug>.mp4', src: '<file>', full: true, scale: '1280:720', crf: 28, audio: true },
];

// Poster delle card film (fotogramma a "at" secondi)
const posters = [
  { out: 'src/assets/films/jasmine-daniel.jpg', src: 'jasmine', at: 30 },
  // Fermo immagine dell'hero: prima inquadratura della clip, stesso ritaglio, così il video parte senza salti
  { out: 'src/assets/hero/hero-poster-desktop.jpg', src: 'imani_e_john', at: 11.44, vf: 'scale=1920:1080:flags=lanczos' },
  { out: 'src/assets/hero/hero-poster-mobile.jpg', src: 'imani_e_john', at: 11.44, vf: 'crop=ih*9/16:ih:(iw-ow)*0.49,scale=1080:1920:flags=lanczos' },
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
  if (clip.shots) clip.dur = clip.shots.reduce((sum, [, a, b]) => sum + b - a, 0);
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
    const n = clip.shots.length;
    const end = (clip.dur - fade).toFixed(2);
    const graph = [
      ...clip.shots.map(
        ([, a, b, x], i) => `[${i}:v]setpts=PTS-STARTPTS,${clip.crop ? `crop=${clip.crop.replace('{x}', cropX(x, b - a))},` : ''}scale=${clip.scale}:flags=lanczos,setsar=1,fps=25[v${i}]`,
      ),
      `${clip.shots.map((_, i) => `[v${i}]`).join('')}concat=n=${n}:v=1:a=0,fade=t=out:st=${end}:d=${fade}[v]`,
      `[${n}:a]afade=t=in:st=0:d=${fade},afade=t=out:st=${end}:d=${fade}[a]`,
    ].join(';');
    execFileSync(ffmpeg, [
      '-hide_banner', '-loglevel', 'error', '-y',
      ...clip.shots.flatMap(([src, a, b]) => ['-ss', String(a), '-t', (b - a).toFixed(2), '-i', find(src)]),
      '-ss', String(clip.audio.start), '-t', clip.dur.toFixed(2), '-i', find(clip.audio.src),
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
