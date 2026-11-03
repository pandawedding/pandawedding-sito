import type { Lang } from '../i18n';
import { site } from './site';

// Privacy policy e cookie policy (una pagina per lingua).
// BOZZA: da far verificare a un consulente privacy prima del lancio. Le durate di conservazione
// sono proposte da confermare con i titolari. Aggiornare `updated` a ogni modifica.

export const legalPath = {
  privacy: { en: '/privacy/', it: '/it/privacy/' },
  cookies: { en: '/cookie-policy/', it: '/it/cookie-policy/' },
} satisfies Record<string, Record<Lang, string>>;

export type LegalPage = keyof typeof legalPath;

interface Section {
  title: string;
  /** Paragrafi; le righe che iniziano con "— " diventano un elenco */
  body: string[];
}

interface LegalCopy {
  title: string;
  description: string;
  updated: string;
  intro: string;
  sections: Section[];
}

const c = site.company;
const controller = `${c.name}, ${c.street}, ${c.city}${c.vat ? ` (P.IVA / VAT no. ${c.vat})` : ''}`;

export const legal: Record<LegalPage, Record<Lang, LegalCopy>> = {
  privacy: {
    it: {
      title: 'Privacy policy',
      description: 'Come PandA Wedding tratta i dati personali di chi visita il sito e ci contatta.',
      updated: 'Ultimo aggiornamento: 3 novembre 2026',
      intro:
        'Questa informativa spiega quali dati personali raccogliamo quando visitate il sito o ci scrivete, perché lo facciamo e quali diritti avete, ai sensi del Regolamento europeo 2016/679 (GDPR).',
      sections: [
        {
          title: 'Chi tratta i vostri dati',
          body: [`Il titolare del trattamento è ${controller}. Per qualsiasi domanda sulla privacy potete scriverci a ${site.email}.`],
        },
        {
          title: 'Quali dati raccogliamo',
          body: [
            '— Dati che ci inviate voi: nome, email, data e luogo del matrimonio, telefono, wedding planner e messaggio, quando compilate il modulo contatti; la sola email, quando chiedete la brochure; quello che ci scrivete per email o WhatsApp.',
            '— Dati tecnici di navigazione: indirizzo IP, tipo di browser e pagine visitate, registrati automaticamente dai server che ospitano il sito per farlo funzionare e proteggerlo.',
            '— Statistiche di visita, solo se le accettate nel banner dei cookie: pagine viste, provenienza della visita, scorrimento della pagina e click sui bottoni principali. Non inviamo mai a questo servizio nome, email o telefono.',
          ],
        },
        {
          title: 'Perché li usiamo',
          body: [
            '— Per rispondere alle vostre richieste e preparare un preventivo: è una misura precontrattuale richiesta da voi (art. 6.1.b GDPR).',
            '— Per inviarvi la brochure che avete chiesto (art. 6.1.b GDPR).',
            '— Per far funzionare il sito e tenerlo sicuro: è un nostro legittimo interesse (art. 6.1.f GDPR).',
            '— Per capire come viene usato il sito e migliorarlo, solo con il vostro consenso, che potete revocare in qualsiasi momento (art. 6.1.a GDPR).',
            '— Se diventate nostri clienti, per gli obblighi fiscali e contabili (art. 6.1.c GDPR).',
          ],
        },
        {
          title: 'Per quanto tempo li conserviamo',
          body: [
            '— Richieste di contatto e di brochure che non diventano un contratto: fino a 24 mesi.',
            '— Dati legati a un contratto: per 10 anni, come previsto dalla normativa fiscale.',
            '— Statistiche di visita: per un massimo di 24 mesi.',
          ],
        },
        {
          title: 'Chi può vederli',
          body: [
            'I dati non vengono venduti né ceduti a terzi per scopi commerciali. Li trattiamo noi e alcuni fornitori che ci aiutano a far funzionare il sito, nominati responsabili del trattamento:',
            '— Vercel Inc. (Stati Uniti), che ospita il sito;',
            '— Resend (Stati Uniti), che ci consegna le email inviate dai moduli;',
            '— PostHog (server nell’Unione Europea), per le statistiche di visita, solo con il vostro consenso;',
            '— Vimeo (Stati Uniti), che ospita i trailer, solo quando premete Play.',
            'Se ci scrivete su WhatsApp, il servizio è gestito da WhatsApp Ireland Limited secondo la sua informativa.',
          ],
        },
        {
          title: 'Trasferimenti fuori dall’Unione Europea',
          body: [
            'Alcuni fornitori hanno sede negli Stati Uniti. In questi casi il trasferimento avviene sulla base dell’EU-US Data Privacy Framework o delle clausole contrattuali standard approvate dalla Commissione Europea.',
          ],
        },
        {
          title: 'I vostri diritti',
          body: [
            'Potete chiederci in qualsiasi momento di accedere ai vostri dati, correggerli, cancellarli, limitarne il trattamento, riceverli in un formato leggibile o opporvi al trattamento. Se avete dato il consenso, potete revocarlo quando volete, senza conseguenze sui trattamenti già fatti.',
            `Basta scrivere a ${site.email}. Se pensate che i vostri dati siano trattati in modo non corretto, potete presentare un reclamo al Garante per la protezione dei dati personali (www.garanteprivacy.it).`,
          ],
        },
        {
          title: 'Dati obbligatori',
          body: [
            'I campi del modulo contrassegnati con * sono necessari per rispondervi; gli altri sono facoltativi. Senza i dati obbligatori non possiamo dare seguito alla richiesta.',
          ],
        },
      ],
    },
    en: {
      title: 'Privacy policy',
      description: 'How PandA Wedding handles the personal data of people who visit the website and contact us.',
      updated: 'Last updated: 3 November 2026',
      intro:
        'This policy explains which personal data we collect when you visit the website or write to us, why we do it and what your rights are, under the EU General Data Protection Regulation 2016/679 (GDPR).',
      sections: [
        {
          title: 'Who handles your data',
          body: [`The data controller is ${controller}, Italy. For any privacy question you can write to us at ${site.email}.`],
        },
        {
          title: 'What data we collect',
          body: [
            '— Data you send us: name, email, wedding date and location, phone, wedding planner and message, when you fill in the contact form; only your email, when you ask for the brochure; whatever you write to us by email or WhatsApp.',
            '— Technical browsing data: IP address, browser type and pages visited, recorded automatically by the servers hosting the website to run and protect it.',
            '— Visit statistics, only if you accept them in the cookie banner: pages viewed, where the visit came from, page scrolling and clicks on the main buttons. We never send your name, email or phone to this service.',
          ],
        },
        {
          title: 'Why we use it',
          body: [
            '— To reply to your requests and prepare a quote: a pre-contractual step you asked for (art. 6.1.b GDPR).',
            '— To send you the brochure you requested (art. 6.1.b GDPR).',
            '— To run the website and keep it secure: our legitimate interest (art. 6.1.f GDPR).',
            '— To understand how the website is used and improve it, only with your consent, which you can withdraw at any time (art. 6.1.a GDPR).',
            '— If you become our clients, for tax and accounting obligations (art. 6.1.c GDPR).',
          ],
        },
        {
          title: 'How long we keep it',
          body: [
            '— Contact and brochure requests that do not lead to a contract: up to 24 months.',
            '— Data related to a contract: 10 years, as required by Italian tax law.',
            '— Visit statistics: up to 24 months.',
          ],
        },
        {
          title: 'Who can see it',
          body: [
            'Your data is never sold or shared with third parties for marketing. It is handled by us and by a few providers who help us run the website, appointed as data processors:',
            '— Vercel Inc. (United States), which hosts the website;',
            '— Resend (United States), which delivers the emails sent from the forms;',
            '— PostHog (servers in the European Union), for visit statistics, only with your consent;',
            '— Vimeo (United States), which hosts the trailers, only when you press Play.',
            'If you write to us on WhatsApp, the service is run by WhatsApp Ireland Limited under its own privacy policy.',
          ],
        },
        {
          title: 'Transfers outside the European Union',
          body: [
            'Some providers are based in the United States. In these cases the transfer relies on the EU-US Data Privacy Framework or on the standard contractual clauses approved by the European Commission.',
          ],
        },
        {
          title: 'Your rights',
          body: [
            'You can ask us at any time to access your data, correct it, delete it, restrict its processing, receive it in a readable format or object to its processing. If you gave consent, you can withdraw it whenever you like, without affecting processing already carried out.',
            `Just write to ${site.email}. If you believe your data is not handled correctly, you can lodge a complaint with the Italian data protection authority, the Garante per la protezione dei dati personali (www.garanteprivacy.it).`,
          ],
        },
        {
          title: 'Required data',
          body: [
            'The form fields marked with * are needed to reply to you; the others are optional. Without the required data we cannot follow up on your request.',
          ],
        },
      ],
    },
  },
  cookies: {
    it: {
      title: 'Cookie policy',
      description: 'Quali cookie e strumenti simili usa il sito di PandA Wedding e come gestirli.',
      updated: 'Ultimo aggiornamento: 3 novembre 2026',
      intro:
        'I cookie sono piccoli file che un sito salva nel browser; strumenti simili, come la memoria locale del browser (localStorage), servono allo stesso scopo. Qui trovate quelli che usiamo e come scegliere.',
      sections: [
        {
          title: 'Tecnici, sempre attivi',
          body: [
            'Servono a far funzionare il sito e non richiedono consenso. Restano nel vostro browser e non ci permettono di identificarvi.',
            '— lang (localStorage): ricorda la lingua scelta con il selettore EN | IT.',
            '— consent (localStorage): ricorda se avete accettato o rifiutato le statistiche.',
          ],
        },
        {
          title: 'Statistiche, solo con il vostro consenso',
          body: [
            'Se accettate nel banner, usiamo PostHog, con server nell’Unione Europea, per capire quali pagine vengono viste, da dove arrivano le visite e quali bottoni vengono usati. Non raccogliamo nome, email o telefono e non usiamo questi dati per pubblicità.',
            '— ph_…_posthog (cookie e localStorage): identificativo casuale della visita, durata fino a 12 mesi.',
            'Se rifiutate, PostHog non viene nemmeno caricato.',
          ],
        },
        {
          title: 'Contenuti di terze parti',
          body: [
            'I trailer sono ospitati su Vimeo. Il player si carica solo quando premete Play: da quel momento Vimeo può impostare i propri cookie, come descritto nella sua cookie policy. Se non premete Play, Vimeo non viene contattato.',
            'Il link WhatsApp apre l’app o il sito di WhatsApp, che seguono la propria informativa.',
          ],
        },
        {
          title: 'Come cambiare idea',
          body: [
            'Potete cambiare la vostra scelta in qualsiasi momento con il link “Preferenze cookie” in fondo a ogni pagina. Potete anche cancellare cookie e dati del sito dalle impostazioni del vostro browser.',
            `Per qualsiasi domanda: ${site.email}. Per sapere come trattiamo i dati personali, leggete la privacy policy.`,
          ],
        },
      ],
    },
    en: {
      title: 'Cookie policy',
      description: 'Which cookies and similar tools the PandA Wedding website uses, and how to manage them.',
      updated: 'Last updated: 3 November 2026',
      intro:
        'Cookies are small files a website saves in your browser; similar tools, such as the browser’s local storage, serve the same purpose. Here you can find the ones we use and how to choose.',
      sections: [
        {
          title: 'Essential, always on',
          body: [
            'They make the website work and do not need consent. They stay in your browser and do not let us identify you.',
            '— lang (localStorage): remembers the language you chose with the EN | IT switch.',
            '— consent (localStorage): remembers whether you accepted or declined statistics.',
          ],
        },
        {
          title: 'Statistics, only with your consent',
          body: [
            'If you accept in the banner, we use PostHog, with servers in the European Union, to understand which pages are viewed, where visits come from and which buttons are used. We do not collect your name, email or phone and we do not use this data for advertising.',
            '— ph_…_posthog (cookie and localStorage): a random visit identifier, kept for up to 12 months.',
            'If you decline, PostHog is not even loaded.',
          ],
        },
        {
          title: 'Third-party content',
          body: [
            'The trailers are hosted on Vimeo. The player loads only when you press Play: from then on Vimeo may set its own cookies, as described in its cookie policy. If you do not press Play, Vimeo is not contacted.',
            'The WhatsApp link opens the WhatsApp app or website, which follow their own privacy policy.',
          ],
        },
        {
          title: 'How to change your mind',
          body: [
            'You can change your choice at any time with the “Cookie preferences” link at the bottom of every page. You can also delete cookies and site data from your browser settings.',
            `For any question: ${site.email}. To learn how we handle personal data, read the privacy policy.`,
          ],
        },
      ],
    },
  },
};
