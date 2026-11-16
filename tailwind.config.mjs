/** Tailwind solo para los paneles del administrador (utilidades). Sin preflight: no altera la plantilla del sitio. */
export default {
  content: ['./src/components/admin/**/*.{tsx,ts}', './src/pages/admin/**/*.astro'],
  corePlugins: { preflight: false },
  theme: { extend: {} },
};
