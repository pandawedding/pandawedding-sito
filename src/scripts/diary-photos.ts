// Le foto scritte nel Markdown di un diario si aprono nel visore come le altre.
// Usato dalla pagina statica e dal pannello, che carica il diario solo all'apertura.
export function prepareDiaryPhotos(root: ParentNode) {
  root.querySelectorAll<HTMLImageElement>('.prose-diary img').forEach((img, i) => {
    img.dataset.lightbox = String(i);
    img.dataset.full = img.currentSrc || img.src;
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
