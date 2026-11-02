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
    order: z.number().default(0),
  }),
});

export const collections = { diaries };
