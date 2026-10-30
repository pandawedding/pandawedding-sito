// Video in autoplay solo quando ha senso: niente con "riduci movimento",
// risparmio dati attivo o connessioni lente.
type NetworkInformation = { saveData?: boolean; effectiveType?: string };

export function canAutoplay(): boolean {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  const conn = (navigator as Navigator & { connection?: NetworkInformation }).connection;
  if (conn?.saveData) return false;
  if (conn?.effectiveType && /(^|-)2g|3g/.test(conn.effectiveType)) return false;
  return true;
}

/** Mette in pausa il video quando esce dallo schermo o la scheda è nascosta */
export function pauseWhenHidden(video: HTMLVideoElement, target: Element = video) {
  let inView = true;
  const sync = () => {
    if (inView && !document.hidden) video.play().catch(() => {});
    else video.pause();
  };
  // Se il primo play() viene interrotto dal caricamento, riprova quando i dati ci sono
  video.addEventListener('canplay', sync, { once: true });
  new IntersectionObserver(([entry]) => {
    inView = entry.isIntersecting;
    sync();
  }).observe(target);
  document.addEventListener('visibilitychange', sync);
}
