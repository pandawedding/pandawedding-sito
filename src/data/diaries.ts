import type { ImageMetadata } from 'astro';
import { getCollection, type CollectionEntry } from 'astro:content';
import { films } from './films';

// Foto dei diari: src/assets/real-weddings/<slug>/*.jpg, in ordine di nome file
const photoFiles = import.meta.glob<{ default: ImageMetadata }>(
  '../assets/real-weddings/*/*.{jpg,jpeg,png,webp,avif}',
  { eager: true },
);

export interface Diary {
  entry: CollectionEntry<'diaries'>;
  slug: string;
  photos: ImageMetadata[];
  cover?: ImageMetadata;
  /** Diario completo (non solo l'anteprima) */
  hasStory: boolean;
}

export async function getDiaries(): Promise<Diary[]> {
  const entries = (await getCollection('diaries')).sort((a, b) => a.data.order - b.data.order);
  return entries.map((entry) => {
    const slug = entry.id;
    const photos = Object.entries(photoFiles)
      .filter(([path]) => path.includes(`/real-weddings/${slug}/`))
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([, mod]) => mod.default);
    const film = films.find((f) => f.slug === entry.data.film);
    return {
      entry,
      slug,
      photos,
      cover: photos[0] ?? film?.poster,
      hasStory: !!entry.body?.trim(),
    };
  });
}
