// Le foto scritte nel Markdown di un diario si aprono nel visore come le altre.
// Usato dalla pagina statica e dal pannello, che carica il diario solo all'apertura.
export function prepareDiaryPhotos(root: ParentNode) {
  root.querySelectorAll<HTMLImageElement>('.prose-diary img').forEach((img, i) => {
    // Spazio reale: su telefono stanno in griglia, su desktop la colonna è larga 672px.
    // Le foto sono lazy, quindi il browser sceglie la misura dopo questa riga
    img.sizes = '(min-width: 768px) 672px, 62vw';
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
