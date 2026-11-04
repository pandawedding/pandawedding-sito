// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // TODO: sostituire con il dominio definitivo
  site: 'https://www.pandawedding.it',
  // Inglese principale su "/", italiano su "/it/"
  i18n: {
    locales: ['en', 'it'],
    defaultLocale: 'en',
    routing: { prefixDefaultLocale: false },
  },
  // Foto nel testo di guide e diari: più misure, il telefono scarica quella adatta allo schermo
  image: {
    layout: 'constrained',
    responsiveStyles: false,
    breakpoints: [640, 960],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
