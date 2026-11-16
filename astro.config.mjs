import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';

// Sitio estático publicado en GitHub Pages (usuario FerTarraga → https://fernanda.expertotech.com.ar/).
export default defineConfig({
  site: 'https://fernanda.expertotech.com.ar/',
  base: '/',
  output: 'static',
  trailingSlash: 'always',
  integrations: [preact()],
});
