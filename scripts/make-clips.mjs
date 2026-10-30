// Crea le clip leggere per il sito dai trailer originali (src/assets/trailers, non in git).
// Uso: node scripts/make-clips.mjs
// Clip mute, in loop con dissolvenza, H.264 con faststart, in public/videos/.
import { createRequire } from 'node:module';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const require = createRequire(import.meta.url);
const ffmpeg = require('@ffmpeg-installer/ffmpeg').path;

const SRC = 'src/assets/trailers';
const OUT = 'public/videos';
const find = (prefix) => {
  const file = fs.readdirSync(SRC).find((f) => f.startsWith(prefix));
  if (!file) throw new Error(`Trailer non trovato: ${prefix}*`);
  return path.join(SRC, file);
};

// start/durata in secondi, scelti dai provini dei trailer
const clips = [
  // Hero: orizzontale per desktop, verticale (ritaglio centrale 9:16) per mobile
  { out: 'hero-imani-john-1080.mp4', src: 'imani_e_john', start: 28, dur: 12, scale: '1920:1080', crf: 29 },
  { out: 'hero-imani-john-vertical.mp4', src: 'imani_e_john', start: 28, dur: 12, crop: 'ih*9/16:ih', scale: '720:1280', crf: 28 },
  // Anteprime delle card film (desktop, al passaggio del mouse)
  { out: 'preview-imani-john.mp4', src: 'imani_e_john', start: 34, dur: 10, scale: '960:540', crf: 28 },
  { out: 'preview-johanna-come.mp4', src: 'johanna_e_c', start: 24, dur: 10, scale: '960:540', crf: 28 },
  { out: 'preview-daniel-josiane.mp4', src: 'daniel_e_josiane', start: 56, dur: 10, scale: '960:540', crf: 28 },
];

fs.mkdirSync(OUT, { recursive: true });
for (const clip of clips) {
  const fade = 0.6;
  const filters = [
    clip.crop && `crop=${clip.crop}`,
    `scale=${clip.scale}:flags=lanczos`,
    `fade=t=in:st=0:d=${fade}`,
    `fade=t=out:st=${clip.dur - fade}:d=${fade}`,
  ].filter(Boolean);
  const dest = path.join(OUT, clip.out);
  execFileSync(ffmpeg, [
    '-hide_banner', '-loglevel', 'error', '-y',
    '-ss', String(clip.start), '-t', String(clip.dur), '-i', find(clip.src),
    '-an',
    '-vf', filters.join(','),
    '-c:v', 'libx264', '-preset', 'slow', '-crf', String(clip.crf),
    '-profile:v', 'high', '-pix_fmt', 'yuv420p', '-movflags', '+faststart',
    dest,
  ]);
  console.log(clip.out, (fs.statSync(dest).size / 1024 / 1024).toFixed(2) + ' MB');
}
