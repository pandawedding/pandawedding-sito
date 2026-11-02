// Consenso cookie e PostHog Cloud EU.
// PostHog si carica SOLO dopo "Accetta": prima nessuna richiesta parte verso PostHog.
// Gli eventi arrivano dagli attributi data-track e da alcuni click; mai nome, email o telefono.

type Consent = 'granted' | 'denied';
type PostHog = {
  init: (key: string, config: Record<string, unknown>) => void;
  capture: (event: string, props?: Record<string, unknown>) => void;
  opt_in_capturing: () => void;
  opt_out_capturing: () => void;
};
declare global {
  interface Window {
    posthog?: PostHog & { __SV?: number; _i?: unknown[] };
  }
}

const KEY = import.meta.env.PUBLIC_POSTHOG_KEY as string | undefined;
const API_HOST = 'https://eu.i.posthog.com';
const STORAGE = 'consent';

export const getConsent = (): Consent | null => {
  try {
    const v = localStorage.getItem(STORAGE);
    return v === 'granted' || v === 'denied' ? v : null;
  } catch {
    return null;
  }
};

const saveConsent = (v: Consent) => {
  try {
    localStorage.setItem(STORAGE, v);
  } catch {}
};

// Stub ufficiale di PostHog (versione ridotta): mette in coda le chiamate finché array.js non è caricato
function loadPostHog() {
  if (!KEY || window.posthog?.__SV) return;
  // Come nello snippet ufficiale: un array con i metodi che vi accodano le chiamate, letto da array.js
  const arr = [] as unknown as PostHog & unknown[] & { _i: unknown[]; __SV: number };
  arr._i = [];
  arr.__SV = 1;
  for (const m of ['capture', 'opt_in_capturing', 'opt_out_capturing', 'register', 'reset']) {
    (arr as unknown as Record<string, unknown>)[m] = (...args: unknown[]) => arr.push([m, ...args]);
  }
  arr.init = (key, config) => arr._i.push([key, config, 'posthog']);
  window.posthog = arr;

  const script = document.createElement('script');
  script.async = true;
  script.crossOrigin = 'anonymous';
  script.src = API_HOST.replace('.i.posthog.com', '-assets.i.posthog.com') + '/static/array.js';
  document.head.appendChild(script);

  arr.init(KEY, {
    api_host: API_HOST,
    person_profiles: 'identified_only',
    opt_out_capturing_by_default: true,
    capture_pageview: true,
    capture_pageleave: true, // include la profondità di scroll della pagina
    autocapture: false, // solo eventi espliciti: niente testi dei campi del modulo
    disable_session_recording: true,
  });
  arr.opt_in_capturing();
}

/** Evento analytics: parte solo se c'è il consenso e PostHog è configurato */
export function track(event: string, props: Record<string, unknown> = {}) {
  if (getConsent() !== 'granted' || !window.posthog) return;
  window.posthog.capture(event, { page: location.pathname, ...props });
}

export function setConsent(v: Consent) {
  saveConsent(v);
  if (v === 'granted') loadPostHog();
  else window.posthog?.opt_out_capturing();
}

if (getConsent() === 'granted') loadPostHog();

// Click tracciati: bottoni con data-track, contatti diretti, film e diari
document.addEventListener('click', (e) => {
  const el = (e.target as Element).closest<HTMLElement>('[data-track], a[href^="mailto:"], [data-film], [data-diary]');
  if (!el) return;
  const position = el.dataset.position;
  if (el.dataset.track) track(el.dataset.track, { label: el.dataset.label, position });
  else if (el.matches('a[href^="mailto:"]')) track('click_email', { position });
  if (el.dataset.film) track('film_play', { film: el.dataset.film });
  if (el.dataset.diary) track('diary_open', { slug: el.dataset.diary });
});

// Primo campo compilato del modulo contatti (una volta sola, senza il contenuto)
document.getElementById('contact-form')?.addEventListener('input', () => track('contact_form_start'), { once: true });

// Scorrimento delle righe orizzontali (una volta per riga)
document.querySelectorAll<HTMLElement>('[data-row]').forEach((row) => {
  const scroller = row.matches('ul') ? row : row.querySelector<HTMLElement>('.track');
  scroller?.addEventListener('scroll', () => track('row_scroll', { row: row.dataset.row }), { once: true, passive: true });
});
