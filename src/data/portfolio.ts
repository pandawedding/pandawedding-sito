import type { ImageMetadata } from 'astro';

const files = import.meta.glob<{ default: ImageMetadata }>('../assets/PORTFOLIO/*.jpg', { eager: true });

// Testi alternativi, per numero di file
const alts: Record<string, string> = {
  '0001': 'Dettagli degli sposi: scarpe da sposa, scarpe nere dello sposo e partecipazioni',
  '0002': 'Sposa bionda che si volta, con l’abito ricamato aperto sulla schiena',
  '0003': 'Sposa di spalle che prende l’abito appeso alla porta di una stanza con travi a vista',
  '0004': 'Ritratto in bianco e nero della sposa che indossa gli orecchini',
  '0005': 'Sposa che indossa le scarpe su un tappeto antico',
  '0006': 'Sposo riflesso in uno specchio con cornice barocca, in bianco e nero',
  '0007': 'Scarpe da sposa bianche appese tra le foglie di un albero di limoni',
  '0008': 'Sposa con il bouquet sulla soglia di una stanza bianca',
  '0009': 'Sposa e damigelle che lanciano i cuscini su un divano in un salone affrescato',
  '0009_1': 'Abito da sposa appeso sotto una cornice dorata',
  '0010': 'Sposa seduta che allaccia le scarpe',
  '0011': 'Sposa con un calice di spumante, dettaglio delle maniche ricamate',
  '0012': 'Sposo in smoking a braccia aperte in una biblioteca, in bianco e nero',
  '0013': 'Scarpe, calici, anelli e partecipazioni su un tavolo',
  '0014': 'Sposo e testimoni che camminano sul prato di una villa',
  '0015': 'Sposi che si guardano in un viale alberato',
  '0016': 'Sposi mano nella mano davanti a una villa con le persiane verdi',
  '0016_1': 'Sposi abbracciati in un parco, in bianco e nero',
  '0017': 'Sposi che scendono da una scalinata in un giardino storico',
  '0018': 'Sposi in un giardino visti dall’alto, in bianco e nero',
  '0019': 'Sposi davanti a una porta-finestra incorniciata dall’edera',
  '0020': 'Sposo che versa lo spumante sulla piramide di calici mentre la sposa ride',
  '0021': 'Sposa di spalle in un viale tra le siepi, in bianco e nero',
  '0022': 'Sposo sollevato dagli amici sul prato davanti alla villa',
  '0023': 'Giardino all’italiana con siepi a disegno, visto dall’alto',
  '0024': 'Sposi che camminano verso la luce sotto un portico, in bianco e nero',
  '0025': 'Bouquet di rose bianche appoggiato su un’auto d’epoca blu',
  '0026': 'Sposa con velo lungo sulla scalinata di una villa, lo sposo in cima che la guarda',
  '0027': 'Foto di gruppo degli invitati davanti all’ingresso della villa',
  '0028': 'Sposi nel labirinto di siepi di un giardino, in bianco e nero',
  '0029': 'Bouquet di rose bianche tenuto dalla sposa',
  '0030': 'Sposi accanto a un’auto d’epoca rossa decappottabile',
  '0031': 'Sposi seduti in una serra tra le piante',
  '0032': 'Navata di una chiesa con il rosone, in bianco e nero',
  '0033': 'Cerimonia in una chiesa affrescata',
  '0034': 'Sposi che si baciano in un viale di siepi davanti alla villa',
  '0035': 'Sposi accanto a un’auto d’epoca nera, in bianco e nero',
  '0036': 'Coriandoli colorati sul selciato',
  '0037': 'Sposa che fa ruotare l’abito in un viale di ghiaia',
  '0038': 'Mani dello sposo sull’abito della sposa, in bianco e nero',
  '0039': 'Sposi che camminano in un borgo, in bianco e nero',
  '0040': 'Sposi in un giardino di cipressi',
  '0041': 'Sposa con l’abito in movimento in un giardino, in bianco e nero',
  '0042': 'Sposi davanti a un portale classico, in bianco e nero',
  '0043': 'Sposi che camminano mano nella mano su un prato al tramonto',
  '0044': 'Sposa che scende uno scalone barocco con il velo sui gradini',
  '0045': 'Sposa seduta con il bouquet, in bianco e nero',
  '0046': 'Sposi che si baciano sotto il lancio di petali, in bianco e nero',
  '0047': 'Cerimonia all’aperto con nastri colorati sospesi tra due cipressi',
  '0048': 'Vista aerea di una villa tra i vigneti',
  '0049': 'Sposa con il velo nel vento in un campo, in bianco e nero',
  '0050': 'Sposi che corrono mano nella mano su un prato al tramonto, davanti a un castello',
  '0050_1': 'Sposa seduta a una tavola apparecchiata davanti a una villa in mattoni',
  '0051': 'Scarpe da sposa bianche e nere riflesse su un tavolo',
  '0052': 'Sposi che ballano sul prato al tramonto',
  '0053': 'Sposi abbracciati controluce in un interno con travi',
  '0054': 'Sposo seduto sui gradini di una villa, in bianco e nero',
  '0055': 'Sposi abbracciati in un bosco di bambù',
  '0056': 'Sposa che fa ruotare la gonna al tramonto vicino allo sposo',
  '0057': 'Sposi visti attraverso una cornice architettonica, in bianco e nero',
  '0058': 'Sposi che camminano sorridendo in un viale di ghiaia',
  '0059': 'Coppia nel viale di una villa storica, con il lungo velo nel vento',
  '0060': 'Tavola imperiale con fiori fucsia in una sala affrescata',
  '0061': 'Sposa e sposo in giacca rossa in una sala con dipinti',
  '0062': 'Sposi tra le vetrate di una serra',
  '0063': 'Soffitto affrescato di una villa',
  '0064': 'Sposi sotto il porticato di un chiostro',
  '0065': 'Sposo seduto e sposa in piedi in una sala allestita con sedie bianche',
  '0066': 'Brindisi con la piramide di calici e lo spumante',
  '0067': 'Sposi che si baciano controluce avvolti dal velo',
  '0068': 'Sposa con lungo strascico su un pavimento a intarsi in una cappella',
  '0069': 'Sposi abbracciati sotto un albero in fiore, in bianco e nero',
  '0070': 'Sposi abbracciati accanto a un muro di pietra fiorito, con le colline sullo sfondo',
  '0071': 'Sposi che si baciano dietro un velo, in bianco e nero',
  '0072': 'Sposi sotto l’arco d’ingresso di una tenuta',
  '0073': 'Sposi mano nella mano, in bianco e nero',
  '0074': 'Torta nuziale bianca tra i fiori davanti a una fontana',
  '0075': 'Composizione di rose bianche e rosa con candele',
  '0076': 'Torta ai frutti rossi con un nastro bianco',
  '0077': 'Sposi che si baciano tra le luci della festa, in bianco e nero',
  '0078': 'Taglio della torta tra le fontane di scintille',
  '0079': 'Primo ballo degli sposi sotto le luci a festone',
  '0080': 'Sposi abbracciati in giardino all’ora blu',
  '0081': 'Sposa che balla tra gli invitati, con effetto mosso',
  '0082': 'Sposi di spalle che guardano i fuochi d’artificio sopra la festa',
  '0083': 'Sposa che indica i fuochi d’artificio, abbracciata allo sposo',
};

// Selezione mostrata subito; le altre si aprono con "Vedi altre foto"
const featured = ['0016', '0024', '0011', '0062', '0045', '0058', '0063', '0068', '0075'];

const all = Object.entries(files)
  .map(([path, mod]) => {
    const id = path.match(/_(\d{4}(?:_\d)?)\.jpg$/)![1];
    return { id, src: mod.default, alt: alts[id] ?? 'Fotografia di matrimonio di PandA Wedding' };
  })
  .sort((a, b) => a.id.localeCompare(b.id));

export const portfolio = [
  ...featured.map((id) => all.find((p) => p.id === id)!),
  ...all.filter((p) => !featured.includes(p.id)),
];

export const PORTFOLIO_FIRST = featured.length;
