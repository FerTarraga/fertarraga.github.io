import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import tailwind from '@astrojs/tailwind';

// Sitio estático publicado en GitHub Pages (usuario FerTarraga → https://fernanda.expertotech.com.ar/).
export default defineConfig({
  site: 'https://fernanda.expertotech.com.ar/',
  base: '/',
  output: 'static',
  trailingSlash: 'always',
  // Tailwind solo se aplica donde se importa `tailwind-admin.css` (el panel); no inyecta estilos base en el sitio.
  integrations: [preact(), tailwind({ applyBaseStyles: false })],
});
