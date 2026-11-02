import type { APIRoute } from 'astro';
import type { ImageMetadata } from 'astro';
import { getImage } from 'astro:assets';
import { portfolio } from '../data/portfolio';
import { films } from '../data/films';
import { getDiaries } from '../data/diaries';

// Sitemap con le foto di ogni pagina (sitemap immagini di Google): aiuta Google Immagini
// a trovare anche le foto aperte solo con "Vedi altre foto" o nel visore.
const escape = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const GET: APIRoute = async ({ site }) => {
  const abs = (path: string) => new URL(path, site).href;
  const imageUrl = async (src: ImageMetadata) => abs((await getImage({ src, width: 1600, format: 'webp' })).src);

  const pages: { loc: string; images: string[] }[] = [];

  const home = [...portfolio.map((p) => p.src), ...films.map((f) => f.poster)];
  pages.push({ loc: abs('/'), images: await Promise.all(home.map(imageUrl)) });

  for (const diary of await getDiaries()) {
    if (!diary.hasStory) continue;
    const photos = diary.photos.length ? diary.photos : diary.cover ? [diary.cover] : [];
    pages.push({ loc: abs(`/real-weddings/${diary.slug}/`), images: await Promise.all(photos.map(imageUrl)) });
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${pages
  .map(
    (p) => `  <url>
    <loc>${escape(p.loc)}</loc>
${[...new Set(p.images)].map((img) => `    <image:image><image:loc>${escape(img)}</image:loc></image:image>`).join('\n')}
  </url>`,
  )
  .join('\n')}
</urlset>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
