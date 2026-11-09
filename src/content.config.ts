import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Diari dei Real Weddings: un file Markdown per matrimonio e lingua, in en/ e it/ (stesso nome file).
// Le foto vanno in src/assets/real-weddings/<slug>/ e vengono inserite in automatico.
const diaries = defineCollection({
  loader: glob({ pattern: '*/*.md', base: './src/content/diaries' }),
  schema: z.object({
    couple: z.string(),
    title: z.string(),
    /** Etichetta location · stagione */
    label: z.string(),
    excerpt: z.string(),
    /** Film collegato (slug in src/data/films.ts), usato come copertina se mancano le foto */
    film: z.string().optional(),
    /** Testo alternativo della copertina (foto 01), senza i nomi degli sposi */
    coverAlt: z.string().optional(),
    order: z.number().default(0),
  }),
});

// Guide alle zone (Lago di Garda, Valpolicella...): stesso stile dei diari, per la SEO.
// Un file per zona e lingua, in en/ e it/ (stesso nome file); `urlSlug` è il percorso nella lingua.
const guides = defineCollection({
  loader: glob({ pattern: '*/*.md', base: './src/content/guides' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      urlSlug: z.string(),
      /** Titolo breve per card e breadcrumb, es. "Lago di Garda" */
      area: z.string(),
      label: z.string(),
      excerpt: z.string(),
      cover: image(),
      coverAlt: z.string(),
      order: z.number().default(0),
    }),
});

export const collections = { diaries, guides };
