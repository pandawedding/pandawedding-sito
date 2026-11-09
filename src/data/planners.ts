import type { ImageMetadata } from 'astro';
import type { Lang } from '../i18n';
import heroImg from '../assets/PORTFOLIO/0047-outdoor-ceremony-ribbons-cypress-trees.jpg';
import teamImg from '../assets/PORTFOLIO/0060-banquet-table-fuchsia-flowers-frescoed-hall.jpg';
import deliveryImg from '../assets/PORTFOLIO/0027-wedding-guests-group-photo-villa.jpg';

// Pagina per i wedding planner (una per lingua): come lavoriamo con loro, per la SEO e per chi
// valuta un fornitore per le coppie dall'estero. Linkata dal footer e dalla pagina Servizi. Mai prezzi.
// Solo cose confermate: niente tempi di consegna, sopralluoghi o attrezzatura di riserva finché
// il proprietario non li conferma.

export const plannersPath: Record<Lang, string> = { en: '/wedding-planners/', it: '/it/wedding-planner/' };

interface Block {
  id: string;
  image: ImageMetadata;
  alt: string;
  kicker: string;
  title: [string, string];
  text: string;
  points: string[];
}

interface PlannersCopy {
  title: string;
  description: string;
  kicker: string;
  h1: [string, string];
  intro: string;
  hero: { image: ImageMetadata; alt: string };
  blocks: Block[];
  venuesTitle: string;
  venuesText: string;
  venues: string[];
  guidesLink: string;
  faqTitle: string;
  faq: [string, string][];
  ctaTitle: [string, string];
  ctaText: string;
  footerLink: string;
}

export const planners: Record<Lang, PlannersCopy> = {
  en: {
    title: 'For Wedding Planners: Photo & Video Team in Italy',
    description:
      'Wedding photographers and videographers based in Verona, working alongside wedding planners across Italy and abroad: one team for photo and film, a shared timeline and discreet coordination on the day.',
    kicker: 'For wedding planners',
    h1: ['One team for photo and film,', 'in tune with yours'],
    intro:
      'We are Pierluigi and Alberto, wedding photographers and videographers based in Verona. We work alongside wedding planners across Italy and abroad, often for couples who plan their wedding from another country. Our job is to tell the story of the day you designed, without ever getting in its way.',
    hero: { image: heroImg, alt: 'Outdoor wedding ceremony set up with colourful ribbons above the guests' },
    blocks: [
      {
        id: 'how-we-work',
        image: teamImg,
        alt: 'Wedding table set with burgundy flowers and candles',
        kicker: '01 · How we work with you',
        title: ['Your timeline,', 'our rhythm'],
        text: 'Before the wedding we go through the timeline with you: timings, light, transfers and the moments that matter most to the couple. On the day we follow your schedule and your venue’s rules, quietly.',
        points: [
          'A shared timeline before the wedding, built around the light',
          'One point of contact for you on the day',
          'Discreet coordination with the venue and the other suppliers',
          'We follow your brief, your style and the couple’s wishes',
        ],
      },
      {
        id: 'one-team',
        image: deliveryImg,
        alt: 'Group photo of the guests in front of a historic villa',
        kicker: '02 · One supplier, two crafts',
        title: ['Photo and film,', 'together'],
        text: 'Photography and film come from the same team, with a single vision. For you it means one supplier less to coordinate; for the couple, photos and a film that tell the same story.',
        points: [
          'Photographer and videographer working as one team',
          'Digital and analogue (film) wedding photography',
          'Cinematic trailer, and the full film of the day on request',
          'Second photographer or videographer for larger weddings',
        ],
      },
    ],
    venuesTitle: 'Where we have worked',
    venuesText:
      'Based in Verona, we follow weddings in Veneto, across Italy and at destination weddings abroad. Some of the venues where we have told a story:',
    venues: ['Villa Arvedi, Verona', 'Relais Fra Lorenzo, Verona', 'Villa La Favorita', 'Castello di Mugnana, Florence'],
    guidesLink: 'Read our guides to Verona, Lake Garda, Tuscany and more',
    faqTitle: 'Questions planners ask us',
    faq: [
      [
        'Do you travel for weddings?',
        'Yes. We are based in Verona and work across Italy and at destination weddings abroad. Travel terms are in our brochure.',
      ],
      [
        'Can you cover both photo and video?',
        'Yes, that is what we do: photography and film from one team, with a single vision for the whole day.',
      ],
      [
        'Can the couple see a full film before booking?',
        'Yes. Tell us where the wedding will be and we’ll privately share a complete film from a similar wedding.',
      ],
      [
        'Do you work with large weddings?',
        'Yes. For larger weddings or two locations at the same time we add a second photographer or videographer from our trusted team.',
      ],
      [
        'How do we check availability?',
        'Write to us with the date and the venue, by email or WhatsApp: we reply personally.',
      ],
    ],
    ctaTitle: ['Planning a wedding in', 'Italy?'],
    ctaText: 'Send us the date and the venue: let’s talk about it.',
    footerLink: 'For wedding planners',
  },
  it: {
    title: 'Per i Wedding Planner: Fotografo e Videomaker in Italia',
    description:
      'Fotografi e videomaker di matrimonio a Verona, al fianco dei wedding planner in tutta Italia e all’estero: un’unica squadra per foto e video, una timeline condivisa e un coordinamento discreto durante la giornata.',
    kicker: 'Per i wedding planner',
    h1: ['Un’unica squadra per foto e video,', 'in sintonia con la vostra'],
    intro:
      'Siamo Pierluigi e Alberto, fotografi e videomaker di matrimonio a Verona. Lavoriamo al fianco dei wedding planner in tutta Italia e all’estero, spesso per coppie che organizzano il matrimonio da un altro Paese. Il nostro compito è raccontare la giornata che avete costruito, senza mai intralciarla.',
    hero: { image: heroImg, alt: 'Cerimonia all’aperto allestita con nastri colorati sopra gli ospiti' },
    blocks: [
      {
        id: 'come-lavoriamo',
        image: teamImg,
        alt: 'Tavolo di nozze apparecchiato con fiori bordeaux e candele',
        kicker: '01 · Come lavoriamo con voi',
        title: ['La vostra timeline,', 'il nostro ritmo'],
        text: 'Prima del matrimonio ripercorriamo con voi la timeline: orari, luce, spostamenti e i momenti che contano di più per la coppia. Durante la giornata seguiamo il vostro programma e le regole della location, con discrezione.',
        points: [
          'Una timeline condivisa prima del matrimonio, costruita intorno alla luce',
          'Un solo riferimento per voi durante la giornata',
          'Un coordinamento discreto con la location e gli altri fornitori',
          'Seguiamo il vostro brief, il vostro stile e i desideri della coppia',
        ],
      },
      {
        id: 'una-squadra',
        image: deliveryImg,
        alt: 'Foto di gruppo degli ospiti davanti a una villa storica',
        kicker: '02 · Un fornitore, due mestieri',
        title: ['Foto e video,', 'insieme'],
        text: 'Fotografia e cinema arrivano dalla stessa squadra, con un’unica visione. Per voi vuol dire un fornitore in meno da coordinare; per la coppia, foto e film che raccontano la stessa storia.',
        points: [
          'Fotografo e videomaker che lavorano come un’unica squadra',
          'Fotografia di matrimonio digitale e analogica (su pellicola)',
          'Trailer cinematografico e, su richiesta, il film completo della giornata',
          'Secondo fotografo o videomaker per i matrimoni più grandi',
        ],
      },
    ],
    venuesTitle: 'Dove abbiamo lavorato',
    venuesText:
      'Da Verona seguiamo matrimoni in Veneto, in tutta Italia e all’estero. Alcune delle location dove abbiamo raccontato una storia:',
    venues: ['Villa Arvedi, Verona', 'Relais Fra Lorenzo, Verona', 'Villa La Favorita', 'Castello di Mugnana, Firenze'],
    guidesLink: 'Leggete le nostre guide a Verona, Lago di Garda, Toscana e non solo',
    faqTitle: 'Le domande dei planner',
    faq: [
      [
        'Vi spostate per i matrimoni?',
        'Sì. Siamo a Verona e lavoriamo in tutta Italia e per i matrimoni all’estero. Le condizioni di trasferta sono nella brochure.',
      ],
      [
        'Seguite sia le foto sia il video?',
        'Sì, è il nostro lavoro: fotografia e cinema da un’unica squadra, con un’unica visione per tutta la giornata.',
      ],
      [
        'La coppia può vedere un film completo prima di scegliere?',
        'Sì. Diteci dove sarà il matrimonio e vi mostreremo in privato il film completo di un matrimonio simile.',
      ],
      [
        'Lavorate anche con matrimoni grandi?',
        'Sì. Per i matrimoni più grandi o con due luoghi in contemporanea aggiungiamo un secondo fotografo o videomaker del nostro team di fiducia.',
      ],
      [
        'Come verifichiamo la disponibilità?',
        'Scriveteci data e location, per email o su WhatsApp: vi rispondiamo di persona.',
      ],
    ],
    ctaTitle: ['Organizzate un matrimonio in', 'Italia?'],
    ctaText: 'Mandateci data e location: parliamone.',
    footerLink: 'Per i wedding planner',
  },
};
