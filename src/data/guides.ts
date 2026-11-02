import { getCollection, type CollectionEntry } from 'astro:content';
import { langs, type Lang } from '../i18n';

// Guide alle zone: src/content/guides/<lingua>/<zona>.md, stesso nome file nelle due lingue.
// Il percorso cambia con la lingua: /guides/lake-garda/ e /it/guide/lago-di-garda/.
export const guidesPath: Record<Lang, string> = { en: '/guides/', it: '/it/guide/' };

export interface Guide {
  entry: CollectionEntry<'guides'>;
  /** Nome del file, uguale nelle due lingue */
  key: string;
  lang: Lang;
  path: string;
  /** Percorsi della stessa guida nelle lingue in cui esiste (hreflang e selettore lingua) */
  alternates: Partial<Record<Lang, string>>;
}

export async function getGuides(lang: Lang): Promise<Guide[]> {
  const all = await getCollection('guides');
  const split = (id: string) => id.split('/') as [Lang, string];
  const pathOf = (e: CollectionEntry<'guides'>) => `${guidesPath[split(e.id)[0]]}${e.data.urlSlug}/`;

  return all
    .filter((entry) => split(entry.id)[0] === lang)
    .sort((a, b) => a.data.order - b.data.order)
    .map((entry) => {
      const key = split(entry.id)[1];
      const alternates = Object.fromEntries(
        langs.flatMap((l) => {
          const other = all.find((e) => e.id === `${l}/${key}`);
          return other ? [[l, pathOf(other)]] : [];
        }),
      ) as Partial<Record<Lang, string>>;
      return { entry, key, lang, path: pathOf(entry), alternates };
    });
}

/** Percorso dell'indice delle guide, per il selettore lingua */
export const guidesAlternates = Object.fromEntries(langs.map((l) => [l, guidesPath[l]])) as Record<Lang, string>;
