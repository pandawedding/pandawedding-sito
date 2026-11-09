import type { ImageMetadata } from 'astro';
import type { Lang } from '../i18n';
import photoImg from '../assets/PORTFOLIO/0004-bride-putting-on-earrings-black-white.jpg';
import filmImg from '../assets/films/johanna-come.jpg';
import bothImg from '../assets/PORTFOLIO/0026-bride-long-veil-villa-staircase.jpg';
import extrasImg from '../assets/PORTFOLIO/0078-cake-cutting-sparklers.jpg';
import planningImg from '../assets/PORTFOLIO/0013-wedding-details-shoes-rings-invitations.jpg';

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
      'Wedding photo and video reportage from the preparations to the end of the day: couple shoot, private online gallery, drone footage and a wedding film edited to music. Based in Verona, across Italy and abroad.',
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
        lead: 'A wedding reportage that follows your day from the couple’s preparations to the very end of the celebration, in both digital and analogue film.',
        text: 'Documentary spontaneity and editorial aesthetics, plus a shoot dedicated just to the two of you. Every selected image is carefully edited and gathered in your own private online gallery.',
        points: [
          'Wedding reportage from the couple’s preparations to the end of the day',
          'A dedicated photo shoot for the couple',
          'Editing and delivery of all selected photographs',
          'Private online gallery: quick sharing and high-resolution downloads, optimised for print',
          'Digital and analogue (film) wedding photography',
        ],
      },
      {
        id: 'films',
        image: filmImg,
        alt: 'Wedding film at Castello di Mugnana, Florence',
        kicker: '02 · Wedding films',
        title: ['Cinema brings you', 'back to it'],
        lead: 'A video reportage from the couple’s preparations to the end of the day: frame by frame, your wedding becomes a story of real moments and genuine emotion.',
        text: 'Aerial footage, professional stabilisers and carefully recorded sound come together in a film of about 15 minutes, edited to music, to relive with the same intensity every time.',
        points: [
          'Video reportage from the couple’s preparations to the end of the day',
          'Aerial drone footage (weather permitting)',
          'Professional electronic stabilisers for smooth, dynamic movement',
          'Professional audio recording of vows, speeches and the party',
          'Final edit of about 15 minutes, set to music',
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
          'Photo and video reportage from the preparations to the end of the day',
          'An online gallery and a wedding film that tell the same story',
        ],
      },
      {
        id: 'extras',
        image: extrasImg,
        alt: 'Cutting the cake between fountains of sparklers',
        kicker: '04 · Extras',
        title: ['To complete', 'your story'],
        lead: 'A few additions to shape the service around your day.',
        text: 'From the printed album to a second photographer or videographer, analogue film footage and a photobooth for your guests.',
        points: [
          'Wedding album or photobook',
          'Second photographer, for a second point of view on the day',
          'Second videographer, for more angles during the ceremony and speeches',
          'Analogue film footage, with a warm, timeless grain, edited into your film',
          'Photobooth for group shots and your guests’ spontaneous portraits',
          'Destination weddings in Italy and abroad',
        ],
      },
      {
        id: 'planning',
        image: planningImg,
        alt: 'Wedding invitations, ring boxes, shoes and a glass of champagne on a table',
        kicker: '05 · Planning',
        title: ['One team,', 'one direction'],
        lead: 'Behind a day that flows effortlessly there is precise teamwork.',
        text: 'We work closely with your wedding planner, venue and suppliers, before and during the wedding, so that every moment is ready when it arrives.',
        points: [
          'A shared timeline with your wedding planner',
          'Timings, light and transfers planned together, so no moment is missed',
          'One point of contact for your planner on the day',
          'Discreet coordination with whoever runs the ceremony and reception',
        ],
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
        'How do we receive our photos?',
        'In a private online gallery dedicated to your wedding, with quick sharing and high-resolution downloads optimised for print.',
      ],
      [
        'Do you film with a drone?',
        'Yes, our wedding films include aerial drone footage, weather permitting.',
      ],
      [
        'Can we book photography and video together?',
        'Yes. We work as one team for photography and film, with a single vision for the whole day.',
      ],
      [
        'Do you work with wedding planners?',
        'Yes. We work closely with your planner, venue and suppliers, sharing the timeline of the day before the wedding and coordinating with them on the day.',
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
      'Reportage foto e video di matrimonio dalla preparazione al termine della giornata: shooting di coppia, gallery online, riprese con drone e film montato sulla musica. Fotografi e videomaker a Verona, in tutta Italia e all’estero.',
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
        lead: 'Un reportage che segue la vostra giornata dalla preparazione degli sposi fino al termine della festa, con foto digitali e analogiche.',
        text: 'La spontaneità del reportage e l’estetica editoriale, più uno shooting dedicato solo a voi due. Ogni scatto selezionato viene post-prodotto e raccolto nella vostra gallery online privata.',
        points: [
          'Reportage del matrimonio dalla preparazione degli sposi fino al termine della giornata',
          'Shooting fotografico dedicato agli sposi',
          'Post-produzione e consegna di tutti gli scatti selezionati',
          'Gallery online dedicata: condivisione veloce e download in alta risoluzione, ottimizzato per la stampa',
          'Fotografia di matrimonio digitale e analogica (su pellicola)',
        ],
      },
      {
        id: 'video',
        image: filmImg,
        alt: 'Wedding film al Castello di Mugnana, Firenze',
        kicker: '02 · Wedding film',
        title: ['Il cinema', 'vi riporta lì'],
        lead: 'Un video reportage dalla preparazione degli sposi al termine della giornata: fotogramma dopo fotogramma, il vostro matrimonio diventa una storia fatta di momenti veri ed emozioni sincere.',
        text: 'Riprese aeree, stabilizzatori professionali e un audio registrato con cura, per un film di circa 15 minuti montato sulla musica, da rivivere ogni volta con la stessa intensità.',
        points: [
          'Video reportage dalla preparazione degli sposi al termine della giornata',
          'Riprese aeree con drone (meteo permettendo)',
          'Stabilizzatori elettronici professionali per scene in movimento dinamiche',
          'Registrazione audio professionale di promesse, discorsi e festa',
          'Montaggio finale di circa 15 minuti con sottofondo musicale',
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
          'Reportage foto e video dalla preparazione al termine della giornata',
          'Una gallery online e un film che raccontano la stessa storia',
        ],
      },
      {
        id: 'extra',
        image: extrasImg,
        alt: 'Taglio della torta tra le fontane di scintille',
        kicker: '04 · Extra',
        title: ['Per completare', 'la vostra storia'],
        lead: 'Qualche aggiunta per costruire il servizio intorno alla vostra giornata.',
        text: 'Dall’album stampato al secondo fotografo o videomaker, dalle riprese in analogico al photobooth per i vostri ospiti.',
        points: [
          'Album di matrimonio o fotolibro',
          'Secondo fotografo, per un secondo punto di vista sulla giornata',
          'Secondo videomaker, per più angolazioni durante cerimonia e discorsi',
          'Riprese in analogico su pellicola, dalla grana calda e senza tempo, montate nel vostro film',
          'Photobooth per le foto di gruppo e i ritratti spontanei degli ospiti',
          'Destination wedding in Italia e all’estero',
        ],
      },
      {
        id: 'organizzazione',
        image: planningImg,
        alt: 'Partecipazioni, scatole delle fedi, scarpe e un calice di champagne su un tavolo',
        kicker: '05 · Organizzazione',
        title: ['Una squadra,', 'un’unica regia'],
        lead: 'Dietro un giorno che scorre leggero c’è un lavoro di squadra preciso.',
        text: 'Lavoriamo in contatto diretto con il vostro wedding planner, la location e i fornitori, prima e durante il matrimonio, perché ogni momento sia pronto quando arriva.',
        points: [
          'Una timeline condivisa con il wedding planner',
          'Orari, luce e spostamenti pianificati insieme, per non perdere nessun momento',
          'Un solo riferimento per il planner durante la giornata',
          'Un coordinamento discreto con chi segue cerimonia e ricevimento',
        ],
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
        'Come riceviamo le foto?',
        'In una gallery online dedicata al vostro matrimonio, con condivisione veloce e download in alta risoluzione ottimizzato per la stampa.',
      ],
      [
        'Usate il drone?',
        'Sì, nei nostri film di matrimonio sono incluse le riprese aeree con drone, meteo permettendo.',
      ],
      [
        'Possiamo avere foto e video insieme?',
        'Sì. Lavoriamo come un’unica squadra per fotografia e video, con un’unica visione per tutta la giornata.',
      ],
      [
        'Lavorate con i wedding planner?',
        'Sì. Lavoriamo in contatto diretto con il planner, la location e i fornitori: condividiamo la timeline della giornata prima del matrimonio e ci coordiniamo con loro durante.',
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
