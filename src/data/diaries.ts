import type { ImageMetadata } from 'astro';
import { getCollection, type CollectionEntry } from 'astro:content';
import { getFilms } from './films';
import { langs, ui, type Lang } from '../i18n';

// Foto dei diari: src/assets/real-weddings/<slug>/*.jpg, in ordine di nome file
const photoFiles = import.meta.glob<{ default: ImageMetadata }>(
  '../assets/real-weddings/*/*.{jpg,jpeg,png,webp,avif}',
  { eager: true },
);

export interface Diary {
  entry: CollectionEntry<'diaries'>;
  slug: string;
  lang: Lang;
  photos: ImageMetadata[];
  cover?: ImageMetadata;
  /** Testo alternativo della copertina, senza i nomi degli sposi */
  coverAlt: string;
  /** Diario completo (non solo l'anteprima) */
  hasStory: boolean;
  /** Le foto sono già inserite nel testo: niente galleria automatica in fondo */
  inlinePhotos: boolean;
  /** Lingue in cui esiste il diario completo (per hreflang e selettore lingua) */
  storyLangs: Lang[];
}

/** I diari di una lingua; il file in en/ o it/ ha lo stesso nome nelle due lingue */
export async function getDiaries(lang: Lang): Promise<Diary[]> {
  const all = await getCollection('diaries');
  const split = (id: string) => id.split('/') as [Lang, string];
  const films = getFilms(lang);

  return all
    .filter((entry) => split(entry.id)[0] === lang)
    .sort((a, b) => a.data.order - b.data.order)
    .map((entry) => {
      const slug = split(entry.id)[1];
      const photos = Object.entries(photoFiles)
        .filter(([path]) => path.includes(`/real-weddings/${slug}/`))
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([, mod]) => mod.default);
      const film = films.find((f) => f.slug === entry.data.film);
      const storyLangs = langs.filter((l) =>
        all.some((e) => e.id === `${l}/${slug}` && !!e.body?.trim()),
      );
      return {
        entry,
        slug,
        lang,
        photos,
        cover: photos[0] ?? film?.poster,
        coverAlt: entry.data.coverAlt ?? ui[lang].diary.coverAlt(entry.data.label),
        hasStory: !!entry.body?.trim(),
        inlinePhotos: !!entry.body?.includes('!['),
        storyLangs,
      };
    });
}
