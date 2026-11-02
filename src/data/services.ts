import type { ImageMetadata } from 'astro';
import type { Lang } from '../i18n';
import photoImg from '../assets/PORTFOLIO/Portfolio_Pandabrosproductions_0004.jpg';
import filmImg from '../assets/films/johanna-come.jpg';
import bothImg from '../assets/PORTFOLIO/Portfolio_Pandabrosproductions_0026.jpg';
import extrasImg from '../assets/PORTFOLIO/Portfolio_Pandabrosproductions_0078.jpg';

// Pagina Servizi: descrittiva, per la SEO, linkata solo dal footer. Mai prezzi qui:
// il listino sta nella brochure, che si invia di persona.
// Testi ripresi dalla brochure (brochure/source) e dal sito; niente dati non confermati.

export const servicesPath: Record<Lang, string> = { en: '/services/', it: '/it/servizi/' };

interface Service {
  id: string;
  image: ImageMetadata;
  alt: string;
  kicker: string;
  title: [string, string];
  lead: string;
  text: string;
  points: string[];
}

interface ServicesCopy {
  title: string;
  description: string;
  kicker: string;
  h1: [string, string];
  intro: string;
  services: Service[];
  placesTitle: string;
  placesText: string;
  places: string[];
  faqTitle: string;
  faq: [string, string][];
  ctaTitle: [string, string];
  ctaText: string;
}

export const services: Record<Lang, ServicesCopy> = {
  en: {
    title: 'Wedding Photo & Video Services in Verona',
    description:
      'Wedding photography in digital and analogue film, cinematic wedding films and photo + video coverage, from getting ready to the party. Based in Verona, across Italy and abroad.',
    kicker: 'Services',
    h1: ['Wedding photography and films', 'in Verona, across Italy and abroad'],
    intro:
      'We are Pierluigi and Alberto, wedding photographers and videographers based in Verona. We follow your day from getting ready to the party, with photography, film or both, and a single vision: to observe, interpret and craft an authentic story of your wedding.',
    services: [
      {
        id: 'photography',
        image: photoImg,
        alt: 'Black and white portrait of the bride putting on her earrings',
        kicker: '01 · Wedding photography',
        title: ['Photography captures', 'the moment'],
        lead: 'We follow your day from getting ready to the party, using both digital and analogue film photography.',
        text: 'Documentary spontaneity and editorial aesthetics: images shaped by real stories, refined details and authentic moments, without forced poses.',
        points: [
          'Coverage from getting ready to the party',
          'Digital and analogue (film) wedding photography',
          'Reportage of the ceremony, portraits of the couple and the celebration',
          'Weddings in villas, castles, churches and destination venues',
        ],
      },
      {
        id: 'films',
        image: filmImg,
        alt: 'Wedding film of Johanna & Côme at Castello di Mugnana, Florence',
        kicker: '02 · Wedding films',
        title: ['Cinema brings you', 'back to it'],
        lead: 'Frame by frame a day becomes a story, crafted from real moments, cinematic vision and genuine emotion.',
        text: 'Every wedding film starts with a trailer and can be completed with the full film of your day, to relive it with the same intensity every time.',
        points: [
          'Cinematic wedding trailer',
          'Full wedding film of the day, on request',
          'Real sound of vows, speeches and the party',
          'Videography across Italy and for destination weddings',
        ],
      },
      {
        id: 'photo-film',
        image: bothImg,
        alt: 'Bride with a long veil on the staircase of a villa, the groom watching from the top',
        kicker: '03 · Photo & film',
        title: ['Photography and film,', 'together'],
        lead: 'Photography and film at their best, for a sophisticated, unique and authentic visual expression of your wedding.',
        text: 'We personally guide every wedding, working seamlessly together or alongside our trusted team. One team for the whole day means one way of looking at it, and more freedom for you.',
        points: [
          'Photographer and videographer working as one team',
          'A single vision from getting ready to the party',
          'Photos and film that tell the same story',
        ],
      },
      {
        id: 'extras',
        image: extrasImg,
        alt: 'Cutting the cake between fountains of sparklers',
        kicker: '04 · Extras',
        title: ['To complete', 'your story'],
        lead: 'A few additions to shape the service around your day.',
        text: 'From the printed album to the full film, and weddings anywhere in Italy or abroad.',
        points: ['Wedding album', 'Full wedding film, in addition to the trailer', 'Destination weddings in Italy and abroad'],
      },
    ],
    placesTitle: 'Where we work',
    placesText:
      'Based in Verona, we photograph and film weddings in Veneto, across Italy and at destination weddings abroad. Some of the venues where we have told a story:',
    places: ['Villa Arvedi, Verona', 'Relais Fra Lorenzo, Verona', 'Villa La Favorita', 'Castello di Mugnana, Florence'],
    faqTitle: 'Frequently asked questions',
    faq: [
      [
        'Where are you based?',
        'We are based in Verona, Italy, and work across Italy and at destination weddings abroad.',
      ],
      [
        'Do you shoot both digital and film?',
        'Yes. Our wedding photography combines digital and analogue film photography.',
      ],
      [
        'Can we book photography and video together?',
        'Yes. We work as one team for photography and film, with a single vision for the whole day.',
      ],
      [
        'Can we watch a full wedding film?',
        'Yes. Tell us where you’re getting married and we’ll privately share a complete film from a wedding like yours.',
      ],
      [
        'How much does it cost?',
        'Every wedding is different: ask for our brochure or get in touch, and we’ll send you all the details.',
      ],
    ],
    ctaTitle: ['Your story deserves more than', 'ordinary.'],
    ctaText: 'Let’s talk about your wedding.',
  },
  it: {
    title: 'Servizi Foto e Video Matrimonio a Verona',
    description:
      'Servizio fotografico di matrimonio in digitale e analogico, wedding film e foto + video, dalla vestizione alla festa. Fotografi e videomaker a Verona, in tutta Italia e all’estero.',
    kicker: 'Servizi',
    h1: ['Fotografo e videomaker di matrimonio', 'a Verona, in Italia e all’estero'],
    intro:
      'Siamo Pierluigi e Alberto, fotografi e videomaker di matrimonio a Verona. Seguiamo la vostra giornata dalla vestizione alla festa, con la fotografia, il video o entrambi, e un’unica visione: osservare, interpretare e costruire un racconto autentico del vostro matrimonio.',
    services: [
      {
        id: 'fotografia',
        image: photoImg,
        alt: 'Ritratto in bianco e nero della sposa che indossa gli orecchini',
        kicker: '01 · Servizio fotografico',
        title: ['La fotografia cattura', 'il momento'],
        lead: 'Seguiamo la giornata dalla vestizione alla festa, con l’utilizzo di foto digitali e analogiche.',
        text: 'La spontaneità del reportage e l’estetica editoriale: immagini nate da storie vere, dettagli curati e momenti autentici, senza pose forzate.',
        points: [
          'Copertura dalla vestizione alla festa',
          'Fotografia di matrimonio digitale e analogica (su pellicola)',
          'Reportage della cerimonia, ritratti degli sposi e della festa',
          'Matrimoni in ville, castelli, chiese e location all’estero',
        ],
      },
      {
        id: 'video',
        image: filmImg,
        alt: 'Wedding film di Johanna e Côme al Castello di Mugnana, Firenze',
        kicker: '02 · Wedding film',
        title: ['Il cinema', 'vi riporta lì'],
        lead: 'Fotogramma dopo fotogramma, un giorno diventa una storia, fatta di momenti veri, sguardo cinematografico ed emozioni sincere.',
        text: 'Ogni video di matrimonio nasce con un trailer e si può completare con il film completo della vostra giornata, da rivivere ogni volta con la stessa intensità.',
        points: [
          'Trailer cinematografico del matrimonio',
          'Film completo della giornata, su richiesta',
          'Il suono vero delle promesse, dei discorsi e della festa',
          'Videomaker in tutta Italia e per i matrimoni all’estero',
        ],
      },
      {
        id: 'foto-video',
        image: bothImg,
        alt: 'Sposa con velo lungo sulla scalinata di una villa, lo sposo in cima che la guarda',
        kicker: '03 · Foto e video',
        title: ['Fotografia e cinema,', 'insieme'],
        lead: 'Uniamo fotografia e cinema al loro meglio, per dare al vostro matrimonio un racconto visivo raffinato, unico e autentico.',
        text: 'Seguiamo di persona ogni matrimonio, insieme o con il nostro team di fiducia. Un solo team per tutta la giornata vuol dire un solo sguardo, e più libertà per voi.',
        points: [
          'Fotografo e videomaker che lavorano come un’unica squadra',
          'Un’unica visione dalla vestizione alla festa',
          'Foto e film che raccontano la stessa storia',
        ],
      },
      {
        id: 'extra',
        image: extrasImg,
        alt: 'Taglio della torta tra le fontane di scintille',
        kicker: '04 · Extra',
        title: ['Per completare', 'la vostra storia'],
        lead: 'Qualche aggiunta per costruire il servizio intorno alla vostra giornata.',
        text: 'Dall’album stampato al film completo, fino ai matrimoni in tutta Italia e all’estero.',
        points: ['Album di matrimonio', 'Film completo, oltre al trailer', 'Destination wedding in Italia e all’estero'],
      },
    ],
    placesTitle: 'Dove lavoriamo',
    placesText:
      'Da Verona fotografiamo e filmiamo matrimoni in Veneto, in tutta Italia e all’estero. Alcune delle location dove abbiamo raccontato una storia:',
    places: ['Villa Arvedi, Verona', 'Relais Fra Lorenzo, Verona', 'Villa La Favorita', 'Castello di Mugnana, Firenze'],
    faqTitle: 'Domande frequenti',
    faq: [
      ['Dove siete?', 'Siamo a Verona e lavoriamo in tutta Italia e per i matrimoni all’estero.'],
      [
        'Fotografate in digitale o in analogico?',
        'Entrambi: il nostro servizio fotografico unisce foto digitali e fotografia analogica su pellicola.',
      ],
      [
        'Possiamo avere foto e video insieme?',
        'Sì. Lavoriamo come un’unica squadra per fotografia e video, con un’unica visione per tutta la giornata.',
      ],
      [
        'Possiamo vedere un film completo?',
        'Sì. Diteci dove vi sposate e vi mostreremo in privato il film completo di un matrimonio simile al vostro.',
      ],
      [
        'Quanto costa?',
        'Ogni matrimonio è diverso: chiedeteci la brochure o scriveteci, e vi mandiamo tutti i dettagli.',
      ],
    ],
    ctaTitle: ['La vostra storia merita qualcosa di', 'straordinario.'],
    ctaText: 'Parliamo del vostro matrimonio.',
  },
};
