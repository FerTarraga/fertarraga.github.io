import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';

// Sitio estático publicado en GitHub Pages (usuario FerTarraga → https://fertarraga.github.io/).
export default defineConfig({
  site: 'https://fertarraga.github.io/',
  base: '/',
  output: 'static',
  trailingSlash: 'always',
  integrations: [preact()],
});
