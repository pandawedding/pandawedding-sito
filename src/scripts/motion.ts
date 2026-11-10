// Scorrimenti comandati da JS: con "riduci movimento" si salta subito al punto, senza animazione.
// (La regola CSS su scroll-behavior non vale per scrollBy / scrollIntoView con behavior esplicito.)
export const scrollBehavior = (): ScrollBehavior =>
  matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
