import { localePath, ui, type Lang } from '../i18n';

export const site = {
  name: 'PandA Wedding',
  // Versione di prova: i motori di ricerca non devono indicizzarla.
  // Mettere true al lancio sul dominio definitivo.
  indexable: false,
  email: 'hello@pandafotovideo.it',
  whatsapp: 'https://wa.me/393489538074',
  phone: '+393489538074',
  // Profili social (Instagram, Facebook, Vimeo...) per i dati strutturati: da avere dal proprietario
  sameAs: [] as string[],
  company: {
    name: 'Panda Bros. Productions di Molinaroli Alberto',
    street: 'Via Pontesello 9',
    city: '37030 Colognola ai Colli (VR)',
    postalCode: '37030',
    locality: 'Colognola ai Colli',
    region: 'VR',
    // P.IVA confermata dal proprietario il 03/11/2026
    vat: '04207220239' as string | null,
  },
};

// Landing unica: il menu punta alle sezioni (ordine della pagina), nella lingua della pagina
export const navFor = (lang: Lang) => {
  const labels = ui[lang].nav;
  return [
    { label: labels.films, href: localePath(lang, '/#films') },
    { label: labels.portfolio, href: localePath(lang, '/#portfolio') },
    { label: labels.diaries, href: localePath(lang, '/#real-weddings') },
    { label: labels.about, href: localePath(lang, '/#about') },
    { label: labels.contact, href: localePath(lang, '/#contatti') },
  ];
};
