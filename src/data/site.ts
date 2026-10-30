export const site = {
  name: 'PandA Wedding',
  tagline: 'Italian Wedding Photographers and Videographers based in Verona',
  // Meta description del sito Framer
  description: 'Fotografia e videografia di matrimonio dal linguaggio editoriale.',
  // Versione di prova: i motori di ricerca non devono indicizzarla.
  // Mettere true al lancio sul dominio definitivo.
  indexable: false,
  email: 'hello@pandafotovideo.it',
  whatsapp: 'https://wa.me/393489538074',
  company: {
    name: 'Panda Bros. Productions di Molinaroli Alberto',
    street: 'Via Nazario Sauro 13',
    city: '37030 Colognola ai Colli (VR)',
    // P.IVA da verificare con il proprietario: non pubblicare finché non è confermata
    vat: null as string | null,
  },
};

// Landing unica: il menu punta alle sezioni (ordine della pagina)
export const nav = [
  { label: 'Wedding Films', href: '/#films' },
  { label: 'Portfolio', href: '/#portfolio' },
  { label: 'Real Weddings', href: '/#real-weddings' },
  { label: 'About Us', href: '/#about' },
  { label: 'Contatti', href: '/#contatti' },
];
