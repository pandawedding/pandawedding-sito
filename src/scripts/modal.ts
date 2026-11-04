// Pannelli a schermo intero (foto, film, diari): la pagina sotto resta ferma
// e il tasto indietro del telefono chiude il pannello invece di uscire dal sito.

export function lockScroll() {
  document.documentElement.style.overflow = 'hidden';
}

/** Sblocca solo quando non resta aperto nessun pannello (una foto si può aprire sopra un diario) */
export function unlockScroll() {
  if (!document.querySelector('dialog[open]')) document.documentElement.style.overflow = '';
}

/** Collega un pannello alla cronologia; restituisce la funzione che lo apre */
export function historyModal(dialog: HTMLDialogElement) {
  let token = 0;

  dialog.addEventListener('close', () => {
    unlockScroll();
    if (history.state?.modal === token) history.back();
  });
  window.addEventListener('popstate', () => {
    if (dialog.open && history.state?.modal !== token) dialog.close();
  });

  return () => {
    if (dialog.open) return;
    token = Date.now();
    history.pushState({ ...history.state, modal: token }, '');
    dialog.showModal();
    lockScroll();
  };
}
