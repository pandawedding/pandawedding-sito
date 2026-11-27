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

// Hero: montaggio dai trailer pubblicati, una scena diversa per inquadratura (drone, dettagli, ritratti, festa).
// [trailer, inizio, battiti, ritaglio]: l'inquadratura parte da "inizio" (in secondi, dentro un'unica ripresa
// del trailer) e dura 1 o 2 battiti della musica, così i tagli cadono a tempo;
// ritaglio = posizione orizzontale del taglio 9:16 su mobile (0 sinistra, 1 destra, di base al centro),
// scelta sui soggetti; [da, a] fa un pan morbido durante l'inquadratura.
// Apre e chiude con Villa Arvedi dal drone, così il loop si richiude e l'alt della hero resta vero.
// Giulia e Luca: solo dettagli e inquadrature larghe o dal drone, niente primi piani (proprietario, 27/11/2026).
const heroShots = [
  // Arrivo: bellezza e dolce vita
  ['imani_e_john', 11.4, 2, 0.49], // drone: Villa Arvedi tra i vigneti
  ['giulia_e_luca', 6.3, 1, 0.5], // flower wall di rose
  ['eugenia_e_andrea', 130.5, 1, 0.87], // sposi sulla spider d'epoca, lo sposo esulta
  ['johanna_e_c', 23.48, 1, 0.65], // l'amico che salta addosso allo sposo
  ['giulia_e_luca', 15.0, 1, 0.72], // Rolls-Royce bianca: la calandra con il logo
  ['imani_e_john', 25.44, 1, 0.5], // salone affrescato con il lampadario
  ['jasmine', 42.68, 1, 0.46], // sposi nel viale di siepi
  ['eugenia_e_andrea', 104.0, 1, 0.5], // drone dall'alto sulla cerimonia
  // Cerimonia e gioia (le tre uscite dalla chiesa distanziate)
  ['tatiana_e_marco', 37.3, 1, 0.58], // uscita dal Duomo tra i cappelli
  ['daniel_e_josiane', 59.66, 1, 0.29], // bacio al tramonto
  ['jasmine', 34.52, 1, 0.49], // sposo e testimoni che corrono
  ['imani_e_john', 33.2, 1, 0.5], // drone: cerimonia nel giardino della villa
  ['tatiana_e_marco', 71.3, 1, 0.5], // la sposa e il cavallo bianco
  ['giulia_e_luca', 66.5, 1, 0.5], // lancio del riso davanti alla chiesa
  ['eugenia_e_andrea', 155.0, 1, 0.72], // sposi sdraiati sull'auto, il bacio
  ['johanna_e_c', 50.1, 1, 0.43], // ballo sulla terrazza
  ['tatiana_e_marco', 109.6, 1, 0.57], // sposi che scendono la scalinata
  ['eugenia_e_andrea', 150.3, 1, 0.57], // brindisi accanto all'auto
  ['johanna_e_c', 34.56, 1, 0.46], // uscita tra i petali
  // Festa: dolce vita
  ['tatiana_e_marco', 85.2, 1, 0.52], // sposi con le braccia al cielo tra le tende
  ['giulia_e_luca', 44.1, 1, 0.25], // festa in pista, luci magenta
  ['johanna_e_c', 44.0, 1, 0.57], // lo sposo con le braccia al cielo
  ['Francesca', 15.12, 1, 0.4], // bacio tra le fontane di scintille
  ['jasmine', 53.64, 1, 0.5], // sposa e damigelle che corrono
  ['giulia_e_luca', 46.36, 1, 0.5], // drone: sposi e scintille sulla scalinata
  ['imani_e_john', 40.9, 1, 0.43], // festa in pista
  ['Francesca', 33.6, 1, 0.43], // sposi controluce, fronte contro fronte
  ['daniel_e_josiane', 66.04, 2, 0.46], // giravolta, l'abito che vola
  ['giulia_e_luca', 86.7, 1, 0.5], // drone: giardino all'italiana di Villa Arvedi
  ['imani_e_john', 56.0, 1, 0.5], // drone: Villa Arvedi e il labirinto
];
// Musica: trailer di Selma e Michiel (solo musica, nessuna voce), ~74 bpm; parte su un battito
// e finisce con il finale del brano. Il loro video non va sul sito, la musica sì (proprietario, 26/11/2026).
const heroAudio = { src: 'Selma e Michiel', start: 36.03, beat: 0.81 };

// Qualità dell'hero: un montaggio con un taglio ogni battito è il materiale più difficile da comprimere.
// Leggera riduzione della grana (hqdn3d) prima di scalare: il rumore dei trailer 1080p consumava i bit;
// aq-mode=3 protegge cieli e zone scure dalle bande; CRF più basso di prima (era 28 / 30, sgranato)
const heroQuality = { denoise: '2:1.5:3:3', x264: 'aq-mode=3:aq-strength=0.9' };

// start/durata in secondi, scelti dai provini dei trailer
const clips = [
  // Hero: orizzontale per desktop, verticale (ritaglio centrale 9:16) per mobile.
  // Meno compresse (siepi e vigneti si impastano oltre CRF 26-28): ~6,5 MB desktop; mobile a piena risoluzione per gli schermi densi
  { out: 'hero-reel-1080.mp4', shots: heroShots, audio: heroAudio, scale: '1920:1080', crf: 25, preset: 'veryslow', abr: '64k', ...heroQuality },
  { out: 'hero-reel-vertical.mp4', shots: heroShots, audio: heroAudio, crop: 'ih*9/16:ih:(iw-ow)*{x}', scale: '1080:1920', crf: 26, preset: 'veryslow', abr: '64k', ...heroQuality },
  // Anteprime delle card film (desktop, al passaggio del mouse)
  { out: 'preview-imani-john.mp4', src: 'imani_e_john', start: 34, dur: 10, scale: '960:540', crf: 28 },
  { out: 'preview-johanna-come.mp4', src: 'johanna_e_c', start: 24, dur: 10, scale: '960:540', crf: 28 },
  { out: 'preview-daniel-josiane.mp4', src: 'daniel_e_josiane', start: 56, dur: 10, scale: '960:540', crf: 28 },
  { out: 'preview-jasmine-daniel.mp4', src: 'jasmine', start: 16, dur: 10, scale: '960:540', crf: 28 },
  { out: 'preview-alessandra-denis.mp4', src: 'alessandra_e_denis', start: 13.32, dur: 10, scale: '960:540', crf: 28 },
  { out: 'preview-tatiana-marco.mp4', src: 'tatiana_e_marco', start: 92.92, dur: 10, scale: '960:540', crf: 28 },
  // Un trailer senza link Vimeo può avere qui la sua versione web completa (ora sono tutti su Vimeo):
  // { out: 'trailer-<slug>.mp4', src: '<file>', full: true, scale: '1280:720', crf: 28, audio: true },
];

// Poster delle card film (fotogramma a "at" secondi)
const posters = [
  { out: 'src/assets/films/jasmine-daniel.jpg', src: 'jasmine', at: 30 },
  { out: 'src/assets/films/alessandra-denis.jpg', src: 'alessandra_e_denis', at: 3.3, vf: 'scale=1920:1080:flags=lanczos' },
  { out: 'src/assets/films/tatiana-marco.jpg', src: 'tatiana_e_marco', at: 93.9 },
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
  if (clip.shots) {
    // [trailer, inizio, battiti, x] -> [trailer, inizio, fine, x], tagli sul fotogramma più vicino al battito
    let beats = 0;
    clip.shots = clip.shots.map(([src, a, n, x]) => {
      const from = Math.round(beats * clip.audio.beat * 25) / 25;
      beats += n;
      const to = Math.round(beats * clip.audio.beat * 25) / 25;
      return [src, a, +(a + to - from).toFixed(2), x];
    });
    clip.dur = clip.shots.reduce((sum, [, a, b]) => sum + b - a, 0);
  }
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
        ([, a, b, x], i) => `[${i}:v]setpts=PTS-STARTPTS,${clip.crop ? `crop=${clip.crop.replace('{x}', cropX(x, b - a))},` : ''}${clip.denoise ? `hqdn3d=${clip.denoise},` : ''}scale=${clip.scale}:flags=lanczos,setsar=1,fps=25[v${i}]`,
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
      ...(clip.x264 ? ['-x264-params', clip.x264] : []),
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
