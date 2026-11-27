import type { ImageMetadata } from 'astro';
import { altsEn } from './portfolio-alts-en';

const files = import.meta.glob<{ default: ImageMetadata }>('../assets/PORTFOLIO/*.jpg', { eager: true });

// Testi alternativi, per numero di file
const alts: Record<string, string> = {
  '0001': 'Sposi su una scalinata illuminata dalle candele, tra quadri e fiori',
  '0002': 'Sposa con un calice di spumante, dettaglio delle maniche ricamate',
  '0003': 'Vista aerea di una villa storica e del suo cortile al tramonto, tra le colline',
  '0004': 'Sposa con il lungo strascico in un salone affrescato con un lampadario di cristallo',
  '0005': 'Tavola apparecchiata con dalie rosse, tovaglioli bordeaux e posate dorate',
  '0006': 'Sposi che si baciano sotto il velo, con un bouquet bianco, in bianco e nero',
  '0007': 'Sposi abbracciati su una terrazza che guardano i fuochi d’artificio rossi',
  '0008': 'Tavoli del ricevimento in un salone dorato con statue e balconata',
  '0009': 'Sposi con un’auto d’epoca bianca davanti a una villa',
  '0010': 'Sposi che alzano le braccia nel viale di Villa Arvedi',
  '0011': 'Composizione di rose bianche e rosa con candele',
  '0012': 'Sposa bionda che si volta, con l’abito ricamato aperto sulla schiena',
  '0013': 'Vista aerea di una villa con il giardino all’italiana e la piscina durante il ricevimento',
  '0014': 'Sposo in smoking seduto su un divano rosa nel salotto di una villa',
  '0015': 'Scarpe da sposa su un tessuto toile de Jouy rosa',
  '0016': 'Sposa che apre il lungo velo su un prato tra gli alberi',
  '0017': 'Tavoli del ricevimento in un salone affrescato e dorato con i lampadari',
  '0018': 'Sposi davanti a un portale classico, in bianco e nero',
  '0019': 'Cheesecake nuziali con frutti di bosco',
  '0020': 'Sposi abbracciati in un bosco di bambù',
  '0021': 'Soffitto affrescato di una villa',
  '0022': 'Sposi che ballano tra gli ospiti, in movimento, in bianco e nero',
  '0023': 'Sposa con il lungo strascico sul prato di una villa, verso lo sposo',
  '0024': 'Sposa con lungo strascico su un pavimento a intarsi in una cappella',
  '0025': 'Giardino all’italiana con siepi a disegno, visto dall’alto',
  '0026': 'Sposa durante il trucco, in bianco e nero',
  '0027': 'Dettagli degli sposi: scarpe da sposa, scarpe nere dello sposo e partecipazioni',
  '0028': 'Taglio della torta tra le fontane di scintille',
  '0029': 'Ponte Pietra sull’Adige a Verona',
  '0030': 'Ritratto della sposa con il velo bordato di pizzo, in bianco e nero',
  '0031': 'Scarpe da sposa, profumo e orecchini su un tessuto bianco',
  '0032': 'Sposi nel labirinto di siepi di un giardino, in bianco e nero',
  '0033': 'Sposi nel viale di Villa Arvedi, tra le siepi e le colline',
  '0034': 'Lo sposo e i testimoni in tight che camminano in un parco, in bianco e nero',
  '0035': 'Sposa e damigelle che lanciano i cuscini su un divano in un salone affrescato',
  '0036': 'Sposi in un giardino visti dall’alto, in bianco e nero',
  '0037': 'Sposa seduta con il bouquet, in bianco e nero',
  '0038': 'Sposi seduti in una serra tra le piante',
  '0039': 'Sposo seduto e sposa in piedi in una sala allestita con sedie bianche',
  '0040': 'Sposa e damigelle che alzano i bouquet su una terrazza affacciata sulle colline',
  '0041': 'Sposi abbracciati accanto a un muro di pietra fiorito, con le colline sullo sfondo',
  '0042': 'Sposa che indica i fuochi d’artificio, abbracciata allo sposo',
  '0043': 'Sposa con il bouquet sulla soglia di una stanza bianca',
  '0044': 'Sposi con amici e parenti davanti alla facciata di una villa',
  '0045': 'Sposa che balla tra gli invitati, con effetto mosso',
  '0046': 'Abito da sposa appeso sotto una cornice dorata',
  '0047': 'Sposo riflesso in uno specchio con cornice barocca, in bianco e nero',
  '0048': 'Vista aerea di una cerimonia all’aperto a Villa Arvedi, tra cipressi, ulivi e vigneti',
  '0049': 'Sposi abbracciati nel viale di una villa',
  '0050': 'Fiori e candele della cerimonia su una scalinata in pietra',
  '0051': 'Sposi mano nella mano, in bianco e nero',
  '0052': 'Navata di una chiesa con il rosone, in bianco e nero',
  '0053': 'Sposa che fa ruotare l’abito in un viale di ghiaia',
  '0054': 'Sposa con un bouquet di rose bianche e color pesca',
  '0055': 'Sposo in smoking a braccia aperte in una biblioteca, in bianco e nero',
  '0056': 'Soffitto affrescato con un cielo dipinto in un ovale',
  '0057': 'Sposa e sposo in giacca rossa in una sala con dipinti',
  '0058': 'Scarpe da sposa bianche appese tra le foglie di un albero di limoni',
  '0059': 'Sposi che camminano sorridendo in un viale di ghiaia',
  '0060': 'Tavoli del ricevimento nel cortile di una villa, davanti a una piccola chiesa',
  '0061': 'Sposo che versa lo spumante sulla piramide di calici mentre la sposa ride',
  '0062': 'Affreschi antichi su una parete in pietra',
  '0063': 'Sposi con il parasole nel viale di Villa Arvedi',
  '0064': 'Sposi che camminano in un borgo, in bianco e nero',
  '0065': 'Sposi che camminano mano nella mano nel giardino di una villa',
  '0066': 'Sposi che ballano sotto le luci della festa, in bianco e nero',
  '0067': 'Sposa e damigelle con i parasoli bianchi davanti a un muro d’edera',
  '0068': 'Sposi visti attraverso una cornice architettonica, in bianco e nero',
  '0069': 'Sposo alla guida di un’auto d’epoca decappottabile, con la sposa accanto',
  '0070': 'Sposi che si baciano sotto il lancio di petali, in bianco e nero',
};

// Selezione mostrata subito; le altre si aprono con "Vedi altre foto"
const featured = ['0001', '0002', '0003', '0004', '0005', '0006', '0007', '0008', '0009'];

const all = Object.entries(files)
  .map(([path, mod]) => {
    // Nome file "0009-1-wedding-dress-….jpg": il numero davanti è l'id dei testi alternativi ("0009_1")
    const id = path.match(/\/(\d{4}(?:-\d)?)-[a-z][^/]*\.jpg$/)![1].replace('-', '_');
    return {
      id,
      src: mod.default,
      alt: {
        en: altsEn[id] ?? 'Wedding photography by PandA Wedding',
        it: alts[id] ?? 'Fotografia di matrimonio di PandA Wedding',
      },
    };
  })
  .sort((a, b) => a.id.localeCompare(b.id));

export const portfolio = [
  ...featured.map((id) => all.find((p) => p.id === id)!),
  ...all.filter((p) => !featured.includes(p.id)),
];

export const PORTFOLIO_FIRST = featured.length;
