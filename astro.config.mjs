// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // TODO: sostituire con il dominio definitivo
  site: 'https://www.pandawedding.it',
  vite: {
    plugins: [tailwindcss()],
  },
});
