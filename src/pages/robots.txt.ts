import type { APIRoute } from 'astro';

// Tutto aperto ai crawler: finché il sito è di prova lo esclude il meta robots "noindex"
// (con Disallow Google non leggerebbe il noindex e potrebbe indicizzare gli URL senza contenuto).
export const GET: APIRoute = ({ site }) =>
  new Response(`User-agent: *\nAllow: /\n\nSitemap: ${new URL('/sitemap.xml', site)}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
