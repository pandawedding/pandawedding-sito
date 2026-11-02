import type { APIRoute } from 'astro';
import type { ImageMetadata } from 'astro';
import { getImage } from 'astro:assets';
import { portfolio } from '../data/portfolio';
import { getFilms } from '../data/films';
import { getDiaries } from '../data/diaries';
import { langs, localePath, type Lang } from '../i18n';

// Sitemap con le due lingue collegate (hreflang) e le foto di ogni pagina (sitemap immagini di Google):
// aiuta Google Immagini a trovare anche le foto aperte solo con "Vedi altre foto" o nel visore.
const escape = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const GET: APIRoute = async ({ site }) => {
  const abs = (path: string) => new URL(path, site).href;
  const imageUrl = async (src: ImageMetadata) => abs((await getImage({ src, width: 1600, format: 'webp' })).src);

  const pages: { loc: string; alternates: Partial<Record<Lang, string>>; images: string[] }[] = [];

  const homeImages = await Promise.all(
    [...portfolio.map((p) => p.src), ...getFilms('en').map((f) => f.poster)].map(imageUrl),
  );
  const homeAlternates = Object.fromEntries(langs.map((l) => [l, abs(localePath(l, '/'))]));
  for (const lang of langs) pages.push({ loc: abs(localePath(lang, '/')), alternates: homeAlternates, images: homeImages });

  for (const lang of langs) {
    for (const diary of await getDiaries(lang)) {
      if (!diary.hasStory) continue;
      const photos = diary.photos.length ? diary.photos : diary.cover ? [diary.cover] : [];
      const alternates = Object.fromEntries(
        diary.storyLangs.map((l) => [l, abs(localePath(l, `/real-weddings/${diary.slug}/`))]),
      );
      pages.push({
        loc: abs(localePath(lang, `/real-weddings/${diary.slug}/`)),
        alternates,
        images: await Promise.all(photos.map(imageUrl)),
      });
    }
  }

  const link = (lang: string, href: string) =>
    `    <xhtml:link rel="alternate" hreflang="${lang}" href="${escape(href)}"/>`;

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${pages
  .map((p) => {
    const alts = Object.entries(p.alternates);
    const links =
      alts.length > 1
        ? [...alts.map(([l, href]) => link(l, href!)), ...(p.alternates.en ? [link('x-default', p.alternates.en)] : [])]
        : [];
    return `  <url>
    <loc>${escape(p.loc)}</loc>
${[...links, ...[...new Set(p.images)].map((img) => `    <image:image><image:loc>${escape(img)}</image:loc></image:image>`)].join('\n')}
  </url>`;
  })
  .join('\n')}
</urlset>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
