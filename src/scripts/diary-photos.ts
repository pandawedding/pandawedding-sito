// Le foto scritte nel Markdown di un diario si aprono nel visore come le altre.
// Usato dalla pagina statica e dal pannello, che carica il diario solo all'apertura.
export function prepareDiaryPhotos(root: ParentNode) {
  root.querySelectorAll<HTMLImageElement>('.prose-diary img').forEach((img, i) => {
    // Spazio reale: su telefono una sotto l'altra a tutta larghezza, da tablet in su al massimo 672px
    // (da sole nella colonna o in coppia nel gruppo). Le foto sono lazy: il browser sceglie dopo questa riga
    img.sizes = '(min-width: 768px) 672px, 100vw';
    // Orizzontale da sola nel paragrafo: esce dalla colonna, larga come i gruppi di foto.
    // Serve alle foto prese da lontano (giardini, sale, drone), che in colonna sembrano piccole
    const alone = img.parentElement?.children.length === 1;
    if (alone && Number(img.getAttribute('width')) > Number(img.getAttribute('height'))) {
      img.classList.add('photo-wide');
      img.sizes = '(min-width: 768px) min(64rem, calc(100vw - 5rem)), 100vw';
    }
    img.dataset.lightbox = String(i);
    // src è la misura grande; currentSrc sul telefono sarebbe quella ridotta
    img.dataset.full = img.src;
    img.dataset.alt = img.alt;
    img.tabIndex = 0;
    img.setAttribute('role', 'button');
    img.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        img.click();
      }
    });
  });
}
