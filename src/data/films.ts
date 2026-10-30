import type { ImageMetadata } from 'astro';
import imaniJohn from '../assets/films/imani-john.jpg';
import johannaCome from '../assets/films/johanna-come.jpg';
import danielJosiane from '../assets/films/daniel-josiane.jpg';
import jasmineDaniel from '../assets/films/jasmine-daniel.jpg';

export interface Film {
  slug: string;
  couple: string;
  location: string;
  text?: string;
  /** Trailer su Vimeo (caricato solo al click, con avviso cookie) */
  vimeo?: { id: string; hash: string };
  /** Oppure trailer ospitato sul sito, in public/videos (nessun cookie) */
  video?: string;
  poster: ImageMetadata;
  /** Clip muta in public/videos per l'anteprima al passaggio del mouse */
  preview: string;
}

// Testi dal sito Framer (pagina Wedding Films)
export const films: Film[] = [
  {
    slug: 'johanna-come',
    couple: 'Johanna e Côme',
    location: 'Castello di Mugnana · Firenze',
    text: 'Un racconto di sguardi, sorrisi ed emozioni autentiche. Un ricordo da rivivere, ogni volta con la stessa intensità.',
    vimeo: { id: '1207460157', hash: '88bc475236' },
    poster: johannaCome,
    preview: '/videos/preview-johanna-come.mp4',
  },
  {
    slug: 'imani-john',
    couple: 'Imani e John',
    location: 'Villa Arvedi',
    text: 'La magia di un giorno speciale, custodita in ogni gesto. Immagini e suoni si intrecciano in un ricordo senza tempo.',
    vimeo: { id: '1208434310', hash: 'df0186a96f' },
    poster: imaniJohn,
    preview: '/videos/preview-imani-john.mp4',
  },
  {
    slug: 'daniel-josiane',
    couple: 'Daniel e Josiane',
    location: 'Relais Fra Lorenzo',
    text: 'Un intreccio di piccoli istanti e grandi emozioni. Un film che conserva la bellezza di esserci, insieme.',
    vimeo: { id: '1206117484', hash: '69530501a7' },
    poster: danielJosiane,
    preview: '/videos/preview-daniel-josiane.mp4',
  },
  {
    // TODO: descrizione da scrivere; link Vimeo se disponibile
    slug: 'jasmine-daniel',
    couple: 'Jasmine e Daniel',
    location: 'Villa Arvedi',
    video: '/videos/trailer-jasmine-daniel.mp4',
    poster: jasmineDaniel,
    preview: '/videos/preview-jasmine-daniel.mp4',
  },
];

export const vimeoEmbedUrl = ({ id, hash }: { id: string; hash: string }) =>
  `https://player.vimeo.com/video/${id}?h=${hash}&dnt=1&autoplay=1&title=0&byline=0&portrait=0`;
