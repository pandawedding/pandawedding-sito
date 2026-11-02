import type { ImageMetadata } from 'astro';
import { ui, type Lang } from '../i18n';
import imaniJohn from '../assets/films/imani-john.jpg';
import johannaCome from '../assets/films/johanna-come.jpg';
import danielJosiane from '../assets/films/daniel-josiane.jpg';
import jasmineDaniel from '../assets/films/jasmine-daniel.jpg';

interface FilmSource {
  slug: string;
  /** Nomi degli sposi: uniti con "&" in inglese e "e" in italiano */
  names: [string, string];
  location: Record<Lang, string>;
  text?: Record<Lang, string>;
  /** Trailer su Vimeo (caricato solo al click, con avviso cookie) */
  vimeo?: { id: string; hash: string };
  /** Oppure trailer ospitato sul sito, in public/videos (nessun cookie) */
  video?: string;
  poster: ImageMetadata;
  /** Clip muta in public/videos per l'anteprima al passaggio del mouse */
  preview: string;
}

export interface Film extends Omit<FilmSource, 'names' | 'location' | 'text'> {
  couple: string;
  location: string;
  text?: string;
}

// Testi italiani dal sito Framer (pagina Wedding Films), riscritti in inglese per il sito principale
const sources: FilmSource[] = [
  {
    slug: 'johanna-come',
    names: ['Johanna', 'Côme'],
    location: { en: 'Castello di Mugnana · Florence', it: 'Castello di Mugnana · Firenze' },
    text: {
      en: 'A story told through glances, smiles and real emotion. A memory to relive, every time with the same intensity.',
      it: 'Un racconto di sguardi, sorrisi ed emozioni autentiche. Un ricordo da rivivere, ogni volta con la stessa intensità.',
    },
    vimeo: { id: '1207460157', hash: '88bc475236' },
    poster: johannaCome,
    preview: '/videos/preview-johanna-come.mp4',
  },
  {
    slug: 'imani-john',
    names: ['Imani', 'John'],
    location: { en: 'Villa Arvedi · Verona', it: 'Villa Arvedi · Verona' },
    text: {
      en: 'The magic of a special day, held in every gesture. Images and sound woven into a timeless memory.',
      it: 'La magia di un giorno speciale, custodita in ogni gesto. Immagini e suoni si intrecciano in un ricordo senza tempo.',
    },
    vimeo: { id: '1208434310', hash: 'df0186a96f' },
    poster: imaniJohn,
    preview: '/videos/preview-imani-john.mp4',
  },
  {
    slug: 'daniel-josiane',
    names: ['Daniel', 'Josiane'],
    location: { en: 'Relais Fra Lorenzo · Verona', it: 'Relais Fra Lorenzo · Verona' },
    text: {
      en: 'Small moments and big emotions, woven together. A film that holds on to the beauty of being there, together.',
      it: 'Un intreccio di piccoli istanti e grandi emozioni. Un film che conserva la bellezza di esserci, insieme.',
    },
    vimeo: { id: '1206117484', hash: '69530501a7' },
    poster: danielJosiane,
    preview: '/videos/preview-daniel-josiane.mp4',
  },
  {
    // TODO: descrizione da scrivere; link Vimeo se disponibile
    slug: 'jasmine-daniel',
    names: ['Jasmine', 'Daniel'],
    location: { en: 'Villa Arvedi · Verona', it: 'Villa Arvedi · Verona' },
    video: '/videos/trailer-jasmine-daniel.mp4',
    poster: jasmineDaniel,
    preview: '/videos/preview-jasmine-daniel.mp4',
  },
];

/** I film nella lingua della pagina */
export const getFilms = (lang: Lang): Film[] =>
  sources.map(({ names, location, text, ...film }) => ({
    ...film,
    couple: names.join(` ${ui[lang].and} `),
    location: location[lang],
    text: text?.[lang],
  }));

export const vimeoEmbedUrl = ({ id, hash }: { id: string; hash: string }) =>
  `https://player.vimeo.com/video/${id}?h=${hash}&dnt=1&autoplay=1&title=0&byline=0&portrait=0`;
