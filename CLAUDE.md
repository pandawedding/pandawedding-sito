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
| Sfondo chiaro | `#FFFFFF` | Solo sezione Portfolio (vedi "Tema"). |
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

Il sito è **prevalentemente scuro/nero**.
**Eccezione voluta:** la sezione **Portfolio** (foto) ha **sfondo bianco**, per dare respiro alle fotografie e variare il ritmo. Header e menu si adattano quando passano sopra la sezione bianca.

Conseguenze da gestire:
- Il logo "PandA Wedding" ha le lettere scure nell'originale: su sfondo nero deve diventare **chiaro** (P e A restano `#FF4040`), su sfondo bianco resta scuro. Essendo testo in font, basta cambiare il colore via CSS.
- Header, menu mobile e testi si adattano al tema della sezione su cui si trovano (variabili CSS e `data-theme="light"` solo sulla sezione Portfolio).
- Le foto del Portfolio con sfondi chiari non devono "sparire" sul bianco: usa angoli arrotondati e, se serve, una sottile ombra o bordo.
- Il passaggio dallo scuro alla sezione bianca deve essere morbido (sfumatura tra le sezioni), mai un lampo.

Regole:
- Rispetta `prefers-reduced-motion`: se attivo, niente parallax né autoplay.
- Foto e video sono i protagonisti: poco testo sopra le immagini, gradienti scuri solo dove serve per leggere.
- Menu mobile a schermo intero con voci grandi.

## Struttura: landing page unica

Il sito è **una sola landing page** a sezioni (decisione del 30/10/2026), formato ispirato ad Apple con un accenno di Netflix per i video. Riferimento di formato (non di contenuti): https://primafilm-production.up.railway.app/

**Esplorabile senza interrompere il flusso:** ogni sezione mostra una selezione; chi vuole approfondisce sul posto (`Vedi altre foto`, `Scopri di più`) o in un pannello sopra la pagina (player video, diario, foto ingrandita). Chiudendo si torna esattamente dove si era.

Menu ad ancore (con evidenza della sezione corrente): Wedding Films · Portfolio · Real Weddings · About Us · Contatti. Il logo riporta in cima.

1. **Hero** (`#top`): foto a tutto schermo, tagline *Italian Wedding Photographers and Videographers based in Verona*, titolo *STORIES MADE TO BE FELT, NOT SIMPLY REMEMBERED*, chip ▶ con il nome della coppia che apre un trailer.
2. **Presentazione**: *WE ARE PIERLUIGI AND ALBERTO* (in verticale), testo *For those looking for more than beautiful images...*, foto dei due, `OUR APPROACH →`.
3. **Frames / Wedding Films** (`#films`): riga Netflix di card film (poster, location, coppia, descrizione). Il trailer si apre in un player a schermo intero; Vimeo (`dnt=1`) si carica solo al click. Le anteprime partono in autoplay muto quando la card è visibile, anche su mobile.
4. **Inspirations / Portfolio** (`#portfolio`): **sezione bianca** (`data-theme="light"`), selezione di foto + `Vedi altre foto` a blocchi + visore a schermo intero. Chiude con *Next chapter, your story*.
5. **Pages / Real Weddings** (`#real-weddings`): card dei matrimoni; `LEGGI IL DIARIO →` apre il diario in un pannello (link condivisibile `#diario/<slug>`). Ogni diario ha anche una pagina statica `/real-weddings/<slug>` per la SEO. I diari sono una content collection in `src/content/diaries/`; le foto di un diario vanno in `src/assets/real-weddings/<slug>/`.
6. **About** (`#about`): impaginazione editoriale, le due foto piccole, vicine e leggermente inclinate accanto al testo (su mobile sopra): *The right team makes the difference*, *Photography captures the moment / Cinema brings you back to it*, *Research & Approach* con i tre paragrafi in inglese. Nessuna CTA: subito dopo vengono i contatti.
7. **Contatti** (`#contatti`): *Your story deserves more than ordinary.* / *Let's talk about your wedding.*, email, WhatsApp, form con etichette e placeholder di Framer: Full names*, Email*, Wedding date, Location / Venue*, Phone number, Wedding planner, Message & your vision* (* obbligatori). Subito dopo: interludio *Tailoring your story, together*.
8. **Footer**: nome, *Stories made to be felt*, WhatsApp (`https://wa.me/393489538074`), dati societari.

**Testi:** quelli attuali nel codice sono la base approvata (allineati a Framer il 30/10/2026). Framer non è più la fonte vincolante: si possono aggiungere CTA e brevi testi d'interfaccia in stile Apple (bottone principale + link testuale rosso con `›`, classe `.cta-link`), ma non riscrivere i testi esistenti senza chiedere.

**CTA:** ogni sezione chiude con un'azione chiara (bottone principale) e, dove serve, un link secondario. Etichette in inglese come il resto delle CTA (`Get in touch`, `Our approach`, `Watch the trailer`, `See the portfolio`, `Message us on WhatsApp`); `Leggi il diario` resta in italiano. **WhatsApp sempre accanto a ogni `Get in touch`**: componente `WhatsAppLink` (logo WhatsApp + `Message us`).

Pagine separate: solo `/privacy`, `/cookie-policy` e le pagine statiche dei diari.

**Video:** i trailer originali stanno in `src/assets/trailers/` (esclusi da git, troppo pesanti). Le clip per il sito si generano con `node scripts/make-clips.mjs` (ffmpeg da `@ffmpeg-installer/ffmpeg`) in `public/videos/`: hero in loop (orizzontale 1080p e verticale per mobile) e anteprime delle card film al passaggio del mouse su desktop. Autoplay solo se non c'è "riduci movimento", risparmio dati o connessione lenta; il trailer completo con audio resta su Vimeo, al click.

I testi di partenza vengono dal sito Framer: `https://delightful-plans-781348--build-luxury-portfolio-xdyarmjqp.framer.app/`. I diari di Imani & John e Daniel & Josiane vanno ancora scritti dal proprietario.

## Correzioni ai testi (autorizzate)

- `our approch` → `our approach`
- `toghether` → `together`
- `revelead` → `revealed`
- `FRASE PER CALL TO ACTION` (segnaposto in About Us): **non pubblicare**. Chiedi il testo vero.

## SEO

- **Versione di prova non indicizzata:** finché `site.indexable` in `src/data/site.ts` è `false`, ogni pagina ha `<meta name="robots" content="noindex, nofollow">`. Metterlo a `true` solo al lancio sul dominio definitivo.
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
