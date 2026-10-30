# PandA Wedding: sito web

Sito vetrina per **PandA Wedding** (Panda Bros. Productions di Alberto Molinaroli), fotografi e videomaker di matrimonio con base a Verona, attivi in Italia e destinazioni estere. I titolari sono Pierluigi e Alberto.

Il sito esiste già su Framer: questo progetto lo **ricostruisce da zero in codice** con un nuovo stile visivo, mantenendo **testi e font originali**.

## Regole di lavoro

- Rispondi e commenta in italiano. Codice, nomi di file e variabili in inglese.
- **Mobile-first**: progetta prima per 390 px, poi tablet e desktop.
- Non cambiare i testi originali senza chiedere. Le uniche correzioni consentite sono quelle elencate in "Correzioni ai testi".
- Prima di grandi modifiche di struttura, proponi un piano breve e aspetta conferma.
- Dopo ogni blocco di lavoro finito: `git add`, commit con messaggio chiaro in inglese, poi chiedi se fare push.
- Mai committare chiavi o segreti. Usa `.env` (già nel `.gitignore`) e un `.env.example` senza valori.
- Performance: immagini in AVIF/WebP con `srcset`, lazy loading sotto la piega, niente librerie JS pesanti se bastano CSS e poche righe di JS.

## Stack

- **Astro** + **Tailwind CSS**, sito statico, JavaScript solo dove serve (carosello, menu, animazioni, form).
- Contenuti dei Real Weddings come **content collection** (Markdown/MDX), una pagina per ogni "diario".
- Hosting: Vercel o Cloudflare Pages, deploy automatico da GitHub.
- Form contatti: endpoint serverless che invia email a `hello@pandafotovideo.it` (es. Resend), con protezione antispam (honeypot, o Cloudflare Turnstile).
- Analytics: **PostHog Cloud EU** (`https://eu.i.posthog.com`), chiave in variabile d'ambiente `PUBLIC_POSTHOG_KEY`.

## Identità visiva

### Colori

| Ruolo | Valore | Note |
|---|---|---|
| Accento | `#FF4040` | Il rosso del sito originale (misurato dagli screenshot). Resta l'unico colore di accento. |
| Sfondo base | `#0B0B0C` | Nuovo, per lo stile cinematografico. |
| Sfondo rialzato | `#151517` | Card, form, sezioni alternate. |
| Testo principale | `#F5F5F7` | |
| Testo secondario | `#A1A1A6` | |
| Sfondo chiaro | `#FFFFFF` | Solo pagina Portfolio (vedi "Tema"). |
| Testo scuro originale | `#171513` | Testo sulle sezioni chiare. |

Definisci tutto come variabili CSS / token Tailwind. Verifica il contrasto del testo (almeno 4.5:1) e usa il rosso su sfondo scuro per titoli grandi e CTA, non per testi piccoli.

### Font

- **Josefin Sans** (variabile, licenza OFL): titoli, testi, menu, bottoni. I titoli sono spesso in **maiuscolo** con spaziatura tra le lettere (letter-spacing) generosa nelle etichette piccole.
- **Amalfi Coast Chic Calligraphy** (calligrafico): solo per il logo/wordmark "PandA Wedding" e per piccoli accenti decorativi (es. i nomi "Pierluigi" e "Alberto" in verticale). Mai per paragrafi.
- File in `public/fonts/`. Converti Josefin Sans variabile in `.woff2`. Amalfi Coast ha già i `.woff2`. Caricamento **locale** con `@font-face` e `font-display: swap`, niente Google Fonts. Precarica solo i font usati sopra la piega.
- Font `BOOWIE`: presente nel pacchetto ma non è chiaro se usato. **Non usarlo finché non viene confermato.**
- Nel sito originale i testi in italiano delle card (Frames, Pages) compaiono in serif di sistema (Times) per un font mancante: nel nuovo sito usa Josefin Sans.

### Firma grafica da mantenere

- Nei titoli alcune lettere o parole sono in rosso (es. "STORIES MADE TO BE **FELT**, NOT SIMPLY **REMEMBERED**", "Fr**a**mes", "**Pa**ges", "Photography captures **a single frame**").
- Etichette in maiuscolo rosso con spaziatura larga (es. `CASTELLO DI MUGNANA · FIRENZE`).
- Testo verticale ruotato sulle card ("WEDDING FILMS", "REAL WEDDINGS", "WE ARE PIERLUIGI AND ALBERTO").
- Angoli arrotondati leggeri sulle immagini.
- Bottoni piatti rossi con freccia, testo maiuscolo spaziato (es. `OUR APPROACH →`).

## Direzione di stile: Netflix + Apple

**Apple:** molto spazio, una sola idea per schermata, tipografia grande, immagini a tutta larghezza, animazioni sottili allo scroll (fade e leggero parallax), niente decorazioni inutili.

**Netflix:** base scura, hero a tutto schermo, **righe orizzontali scorrevoli** per i contenuti (swipe su mobile, frecce su desktop), card che si ingrandiscono leggermente all'hover, anteprima video in autoplay muto sulle card dei film (solo desktop, mai su connessioni lente).

### Tema

Il sito è **prevalentemente scuro/nero**: Home, Wedding Films, Real Weddings, About Us, Contatti, menu e footer.
**Eccezione voluta:** la pagina **Portfolio** (foto) ha **sfondo bianco**, per dare respiro alle fotografie e variare il ritmo. Il passaggio da scuro a chiaro avviene con una transizione morbida tra le pagine.

Conseguenze da gestire:
- Il logo "PandA Wedding" ha le lettere scure nell'originale: su sfondo nero deve diventare **chiaro** (P e A restano `#FF4040`), su sfondo bianco resta scuro. Essendo testo in font, basta cambiare il colore via CSS.
- Header, menu mobile e testi si adattano al tema della pagina (usa variabili CSS e una classe/attributo `data-theme="light"` solo sul Portfolio).
- Le foto del Portfolio con sfondi chiari non devono "sparire" sul bianco: usa angoli arrotondati e, se serve, una sottile ombra o bordo.
- Il passaggio dalla Home (scura) al Portfolio (chiaro) non deve causare un lampo bianco: precarica e gestisci la transizione.

Regole:
- Rispetta `prefers-reduced-motion`: se attivo, niente parallax né autoplay.
- Foto e video sono i protagonisti: poco testo sopra le immagini, gradienti scuri solo dove serve per leggere.
- Menu mobile a schermo intero con voci grandi.

## Struttura delle pagine

Menu: Portfolio · Wedding Films · Real Weddings · About Us · Contatti (il logo porta alla Home).

1. **Home**
   - Header con logo e tagline: *Italian Wedding Photographers and Videographers based in Verona*.
   - Carosello orizzontale di foto verticali.
   - Titolo: *STORIES MADE TO BE FELT, NOT SIMPLY REMEMBERED*.
   - Presentazione: *WE ARE PIERLUIGI AND ALBERTO* (in verticale) + testo *For those looking for more than beautiful images...* + foto dei due + bottone verso About Us.
   - Tre card grandi con testo verticale: Portfolio (Photo), Wedding Films, Real Weddings.
   - Blocco *Tailoring your story, together* con CTA (`our approach`, `get in touch`).
   - Footer: nome, *Raccontateci la vostra storia.*, *Stories made to be felt*, link WhatsApp (`https://wa.me/393489538074`), dati societari.
2. **Portfolio**: titolo *Inspirations* con sottotitolo *shaped by real stories, refined aesthetics and authentic moments.* Galleria fotografica su **sfondo bianco** (unica pagina chiara del sito).
3. **Wedding Films**: titolo *Frames* con sottotitolo *frame by frame a day becomes a story...* Card per film: video Vimeo, etichetta (location · città), nomi della coppia, breve descrizione (es. Johanna e Côme, Imani e John).
4. **Real Weddings**: titolo *Pages* con sottotitolo *people brought together, places carved in memory, a story revealed.* Card: foto, etichetta (location · stagione), nomi, testo, link `LEGGI IL DIARIO →` verso la pagina del matrimonio.
5. **About Us**: *The right team makes the difference*, foto di Alberto (bianco e nero), sezione *Research & Approach*, i valori (Discrezione ed eleganza, Ricerca estetica, Esperienza tailor-made), CTA *Se sentite affinità, raccontateci chi siete.*
6. **Contatti**: *Your story deserves more than ordinary.* / *Let's talk about your wedding.* Email `hello@pandafotovideo.it`, sottotitolo *ITALIA E DESTINAZIONI*, e form con questi campi: Full names*, Email*, Wedding date, Location / Venue*, Phone number, Wedding planner (if applicable), Message & your vision*. (* obbligatori)

Il codice ricostruisce i testi dal sito Framer pubblicato: `https://delightful-plans-781348--build-luxury-portfolio-xdyarmjqp.framer.app/`. I testi lunghi di Wedding Films, Real Weddings e Portfolio vanno completati dal proprietario.

## Correzioni ai testi (autorizzate)

- `our approch` → `our approach`
- `toghether` → `together`
- `revelead` → `revealed`
- `FRASE PER CALL TO ACTION` (segnaposto in About Us): **non pubblicare**. Chiedi il testo vero.

## SEO

- Una sola `<title>` e meta description per pagina, in coerenza con il brand "PandA Wedding" (il sito Framer usa "Panda Foto Video Molinaroli": da decidere con il proprietario).
- Open Graph e Twitter card con immagine dedicata, `sitemap.xml`, `robots.txt`, dati strutturati `LocalBusiness` / `Photographer`.
- Testi alternativi (`alt`) descrittivi su tutte le immagini.
- Lingua del sito: `lang="it"` per le parti in italiano. Valuta in futuro una versione completa in inglese (`/en`) per le destinazioni estere.

## PostHog

Inizializza con `api_host: "https://eu.i.posthog.com"`. Sul dominio si userà un reverse proxy (`/ingest`) per non perdere dati con gli ad-blocker.

**Consenso:** al caricamento PostHog parte **disattivato** (`opt_out_capturing_by_default: true`). Si attiva solo dopo l'accettazione nel banner cookie. Il banner ha "Accetta" e "Rifiuta" con pari evidenza.

**Eventi personalizzati:**

| Evento | Quando |
|---|---|
| `cta_click` | Click su un bottone CTA (proprietà: `label`, `page`, `position`) |
| `contact_form_start` | Primo campo compilato |
| `contact_form_submit` | Invio riuscito (senza dati personali nelle proprietà) |
| `click_whatsapp` / `click_email` | Click sui contatti diretti |
| `film_play` | Avvio di un video (proprietà: `film`) |
| `diary_open` | Apertura di un Real Wedding (proprietà: `slug`) |
| `row_scroll` | Scorrimento di una riga orizzontale (proprietà: `row`) |

Attiva anche pageview automatica, UTM e scroll depth. Funnel da configurare: visita → pagina film o portfolio → Contatti → `contact_form_submit`.

**Privacy:** non inviare mai a PostHog nome, email o telefono di chi compila il form.

## Privacy e legale

- Pagine `/privacy` e `/cookie-policy`.
- I video Vimeo impostano cookie e tracker: mostra prima un'**anteprima statica** e carica l'iframe (con `dnt=1`) solo al click, previo consenso.
- Dati societari nel footer: *Panda Bros. Productions di Molinaroli Alberto*, Via Nazario Sauro 13, 37030 Colognola ai Colli (VR). **P.IVA: da verificare.** Il numero nel sito Framer ha 12 cifre, una partita IVA italiana ne ha 11. Non pubblicarla finché non è confermata.

## Da definire con il proprietario

- Font usato per l'email in Contatti (sembra un serif) e per i campi del form (sembra un altro sans). Se non indicato, Josefin Sans.
- Testi e foto di Portfolio, Wedding Films e Real Weddings.
- Dominio e registrar.
