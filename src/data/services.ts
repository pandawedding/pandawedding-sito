import type { ImageMetadata } from 'astro';
import type { Lang } from '../i18n';
import photoImg from '../assets/PORTFOLIO/0004-bride-putting-on-earrings-black-white.jpg';
import filmImg from '../assets/films/johanna-come.jpg';
import bothImg from '../assets/team/pierluigi-alberto.jpg';
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
  // Inquadratura della foto, se il centro non va bene
  imgClass?: string;
  kicker: string;
  title: [string, string];
  lead: string;
  text: string;
  // Titoletto facoltativo sopra l'elenco
  pointsTitle?: string;
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
    h1: ['Wedding photographers and videographers', 'in Verona, across Italy and abroad'],
    intro:
      'We are Pierluigi and Alberto, wedding photographers and videographers based in Verona. Together with our team, we follow your day with complete dedication, with photography, film or both, and a single vision: to observe, interpret and craft a refined, sophisticated and authentic story of your wedding.',
    services: [
      {
        id: 'photography',
        image: photoImg,
        alt: 'Black and white portrait of the bride putting on her earrings',
        kicker: '01 · Wedding Photography',
        title: ['Photography captures', 'the moment…'],
        lead: 'Documentary spontaneity and editorial aesthetics: we believe in elegance without artifice and spontaneity with intention.',
        text: 'Your wedding deserves a careful study of timings and places, and attentive listening to your needs and wishes. Every event is one of a kind, and its uniqueness lies in the nuances.',
        pointsTitle: 'Service features:',
        points: [
          'Wedding reportage from the couple’s preparations to the end of the day',
          'A dedicated photo shoot for the couple (about 30 minutes)',
          'Editing and delivery of all selected photographs',
          'Dedicated online gallery: quick sharing and high-resolution downloads, optimised for print or for social media',
          'Analogue film photography on request',
        ],
      },
      {
        id: 'films',
        image: filmImg,
        alt: 'Wedding film at Castello di Mugnana, Florence',
        kicker: '02 · Wedding Film',
        title: ['… cinema brings you', 'back to it'],
        lead: 'A film that tells your story, frame by frame. Tailored work, with care and attention to detail, and a dedicated edit that takes you back to the mood of the day, made of real moments and genuine emotion.',
        text: 'Drone footage, stabilisers and professional audio: quality technology in support of creativity.',
        points: [
          'Video reportage from the couple’s preparations to the end of the day',
          'Aerial drone footage',
          'Professional electronic stabilisers for smooth, dynamic movement',
          'Professional audio recording',
          'Final edit of about 15 minutes, set to music',
          'Trailer available on request',
        ],
      },
      {
        id: 'photo-film',
        image: bothImg,
        alt: 'Pierluigi and Alberto of PandA Wedding, in black and white in a villa courtyard, holding a camera and a video camera',
        imgClass: 'object-[50%_75%]',
        kicker: '03 · Photo & film',
        title: ['Photography and film,', 'together'],
        lead: 'We bring photography and film together in a single service, to give your wedding a refined, unique and authentic visual story.',
        text: 'We personally guide every wedding, working seamlessly together or alongside our trusted team. One team for the whole day means one way of looking at it, and more freedom for you.',
        points: [
          'Photographer and videographer working as one team',
          'Photo and video reportage from the preparations to the end of the day',
          'An online gallery and a wedding film that tell the same story',
          'Simple coordination, with one point of contact for both services',
        ],
      },
      {
        id: 'extras',
        image: extrasImg,
        alt: 'Cutting the cake between fountains of sparklers',
        kicker: '04 · Extras',
        title: ['To complete', 'your story'],
        lead: 'A few additions to shape the service around your day.',
        text: 'From the printed album to an additional photographer or videographer, analogue film footage and a photobooth for your guests.',
        points: [
          'Wedding album or photobook',
          'Additional photographer, for a second point of view on the day',
          'Additional videographer, for more angles during the ceremony and speeches',
          'Analogue film footage',
          'Analogue film photography',
          'Photobooth with party props to liven up the reception',
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
        text: 'We work closely with your wedding planner, venue and suppliers, before and during the wedding.',
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
        'Our home base is Verona, Italy, but we work across Italy and at destination weddings abroad: we are open to any request, wherever there is a story to tell.',
      ],
      [
        'Do you shoot both digital and film?',
        'Yes. Our wedding photography combines digital and analogue film photography.',
      ],
      [
        'How will we receive our photos?',
        'We’ll create an online gallery dedicated to your wedding, with no expiry date, quick sharing and high-resolution downloads optimised for print.',
      ],
      [
        'Do you film with a drone?',
        'Yes, it’s a must! Our wedding films include aerial drone footage (weather permitting and in line with flight regulations).',
      ],
      [
        'Can we book photography and video together?',
        'Yes, it has always been our most requested combination. We work as one team for photography and film, with a single vision for the whole day.',
      ],
      [
        'Do you work with wedding planners?',
        'Yes, of course! We work closely with your planner, venue and suppliers, sharing the timeline of the day before the wedding and coordinating with them on the day. Having a professional who coordinates the whole event by your side is a plus for everyone, us included!',
      ],
      [
        'How much do your services cost?',
        'Every wedding is different: ask for our brochure or get in touch, and we’ll find the solution that suits you best!',
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
    h1: ['Fotografi e videomaker di matrimonio', 'a Verona, in Italia e all’estero'],
    intro:
      'Siamo Pierluigi e Alberto, fotografi e videomaker di matrimonio a Verona. Insieme al nostro team, seguiamo la vostra giornata con la massima dedizione, con la fotografia, il video o entrambi, e un’unica visione: osservare, interpretare e costruire un racconto curato, sofisticato e autentico del vostro matrimonio.',
    services: [
      {
        id: 'fotografia',
        image: photoImg,
        alt: 'Ritratto in bianco e nero della sposa che indossa gli orecchini',
        kicker: '01 · Wedding Photography',
        title: ['La fotografia cattura', 'il momento…'],
        lead: 'La spontaneità del reportage e l’estetica editoriale: crediamo in un’eleganza senza artifici e in una spontaneità con intenzione.',
        text: 'Il vostro matrimonio merita uno studio accurato di tempi e luoghi, un ascolto attento delle vostre esigenze e dei vostri desideri. Ogni evento è unico e irripetibile, e nelle sfumature sta la sua unicità.',
        pointsTitle: 'Caratteristiche del servizio:',
        points: [
          'Reportage del matrimonio dalla preparazione degli sposi fino al termine della giornata',
          'Shooting fotografico dedicato agli sposi (circa 30 min)',
          'Post-produzione e consegna di tutti gli scatti selezionati',
          'Gallery online dedicata: condivisione veloce e download in alta risoluzione, ottimizzato per la stampa o la pubblicazione sui social',
          'Fotografia analogica su richiesta',
        ],
      },
      {
        id: 'video',
        image: filmImg,
        alt: 'Wedding film al Castello di Mugnana, Firenze',
        kicker: '02 · Wedding Film',
        title: ['… il cinema', 'vi riporta lì'],
        lead: 'Un film che racconta la vostra storia, fotogramma dopo fotogramma. Un lavoro sartoriale di attenzione ai dettagli e di cura, un montaggio dedicato che sappia riportarvi nel mood della giornata, fatta di momenti veri ed emozioni sincere.',
        text: 'Riprese con droni, stabilizzatori e un audio professionale; tecnologie di qualità a supporto della creatività.',
        points: [
          'Video reportage dalla preparazione degli sposi al termine della giornata',
          'Riprese aeree con drone',
          'Stabilizzatori elettronici professionali per scene in movimento dinamiche',
          'Registrazione audio professionale',
          'Montaggio finale di circa 15 minuti con sottofondo musicale',
          'Trailer disponibile su richiesta',
        ],
      },
      {
        id: 'foto-video',
        image: bothImg,
        alt: 'Pierluigi e Alberto di PandA Wedding, in bianco e nero nel cortile di una villa, con macchina fotografica e videocamera',
        imgClass: 'object-[50%_75%]',
        kicker: '03 · Foto e video',
        title: ['Fotografia e cinema,', 'insieme'],
        lead: 'Uniamo fotografia e cinema in un unico servizio, per dare al vostro matrimonio un racconto visivo raffinato, unico e autentico.',
        text: 'Seguiamo di persona ogni matrimonio, insieme o con il nostro team di fiducia. Un solo team per tutta la giornata vuol dire un solo sguardo, e più libertà per voi.',
        points: [
          'Fotografo e videomaker che lavorano come un’unica squadra',
          'Reportage foto e video dalla preparazione al termine della giornata',
          'Una gallery online e un film che raccontano la stessa storia',
          'Coordinamento semplice e con un unico referente per entrambi i servizi',
        ],
      },
      {
        id: 'extra',
        image: extrasImg,
        alt: 'Taglio della torta tra le fontane di scintille',
        kicker: '04 · Extra',
        title: ['Per completare', 'la vostra storia'],
        lead: 'Qualche aggiunta per costruire il servizio intorno alla vostra giornata.',
        text: 'Dall’album stampato al fotografo o videomaker aggiuntivo, dalle riprese in analogico al photobooth per i vostri ospiti.',
        points: [
          'Album di matrimonio o fotolibro',
          'Fotografo aggiuntivo, per un secondo punto di vista sulla giornata',
          'Videomaker aggiuntivo, per più angolazioni durante cerimonia e discorsi',
          'Riprese in analogico su pellicola',
          'Fotografia analogica',
          'Photobooth con gadget party per animare il ricevimento',
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
        text: 'Lavoriamo in contatto diretto con il vostro wedding planner, la location e i fornitori, prima e durante il matrimonio.',
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
      [
        'Dove siete?',
        'La nostra base operativa è a Verona, ma lavoriamo in tutta Italia e per i matrimoni all’estero: siamo aperti a ogni richiesta, ovunque ci sia una storia da raccontare.',
      ],
      [
        'Fotografate in digitale o in analogico?',
        'Entrambi: il nostro servizio fotografico unisce foto digitali e fotografia analogica su pellicola.',
      ],
      [
        'Come riceveremo le foto?',
        'Creeremo per voi una gallery online dedicata al vostro matrimonio, senza scadenza, con condivisione veloce e download in alta risoluzione ottimizzato per la stampa.',
      ],
      [
        'Usate il drone?',
        'Sì, non deve mai mancare! Nei nostri film di matrimonio sono incluse le riprese aeree con drone (meteo permettendo e in accordo con le normative di volo).',
      ],
      [
        'Possiamo avere foto e video insieme?',
        'Sì, è da sempre la nostra accoppiata più richiesta. Lavoriamo come un’unica squadra per fotografia e video, con un’unica visione per tutta la giornata.',
      ],
      [
        'Lavorate con i wedding planner?',
        'Sì, certamente! Lavoriamo in contatto diretto con il planner, la location e i fornitori: condividiamo la timeline della giornata prima del matrimonio e ci coordiniamo con loro durante. Essere affiancati da un professionista che coordina l’intero evento è un plus per tutti, anche per noi!',
      ],
      [
        'Quanto costano i servizi?',
        'Ogni matrimonio è diverso: chiedeteci la brochure o scriveteci, studieremo la soluzione più adatta per voi!',
      ],
    ],
    ctaTitle: ['La vostra storia merita qualcosa di', 'straordinario.'],
    ctaText: 'Parliamo del vostro matrimonio.',
  },
};
