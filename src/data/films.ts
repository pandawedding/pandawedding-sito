import type { ImageMetadata } from 'astro';
import imaniJohn from '../assets/films/imani-john.jpg';
import johannaCome from '../assets/films/johanna-come.jpg';
import danielJosiane from '../assets/films/daniel-josiane.jpg';

export interface Film {
  slug: string;
  couple: string;
  location: string;
  text: string;
  vimeoId: string;
  /** Hash dei video non in elenco */
  vimeoHash: string;
  poster: ImageMetadata;
}

// Testi dal sito Framer (pagina Wedding Films)
export const films: Film[] = [
  {
    slug: 'johanna-come',
    couple: 'Johanna e Côme',
    location: 'Castello di Mugnana · Firenze',
    text: 'Un racconto di sguardi, sorrisi ed emozioni autentiche. Un ricordo da rivivere, ogni volta con la stessa intensità.',
    vimeoId: '1207460157',
    vimeoHash: '88bc475236',
    poster: johannaCome,
  },
  {
    slug: 'imani-john',
    couple: 'Imani e John',
    location: 'Villa Arvedi',
    text: 'La magia di un giorno speciale, custodita in ogni gesto. Immagini e suoni si intrecciano in un ricordo senza tempo.',
    vimeoId: '1208434310',
    vimeoHash: 'df0186a96f',
    poster: imaniJohn,
  },
  {
    slug: 'daniel-josiane',
    couple: 'Daniel e Josiane',
    location: 'Relais Fra Lorenzo',
    text: 'Un intreccio di piccoli istanti e grandi emozioni. Un film che conserva la bellezza di esserci, insieme.',
    vimeoId: '1206117484',
    vimeoHash: '69530501a7',
    poster: danielJosiane,
  },
];

export const vimeoEmbedUrl = (film: Film) =>
  `https://player.vimeo.com/video/${film.vimeoId}?h=${film.vimeoHash}&dnt=1&autoplay=1&title=0&byline=0&portrait=0`;
