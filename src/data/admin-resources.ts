// Recursos editables del CMS de Fernanda (tablas de Supabase). Para sumar uno: agregar una entrada acá.
import type { Resource } from '../components/admin/AbmResource';

const PAGES = ['home', 'sobre-mi', 'portafolio', 'contacto'];
const LANGS = ['es', 'en'];

export const RESOURCES: Resource[] = [
  {
    table: 'disertaciones', label: 'Eventos', orderBy: { column: 'event_date', ascending: false },
    listColumns: ['title', 'event_date', 'event_name', 'draft'], defaults: { draft: false, show_in_about: true, author: 'Fernanda Tárraga' },
    fields: [
      { name: 'title', label: 'Nombre del evento', type: 'text', required: true },
      { name: 'slug', label: 'Dirección (slug)', type: 'text', required: true, help: 'Solo minúsculas, números y guiones.' },
      { name: 'event_date', label: 'Fecha', type: 'date' },
      { name: 'event_name', label: 'Lugar o institución', type: 'text' },
      { name: 'categories', label: 'Tipo', type: 'tags', help: 'Ej.: Participante, Charla, Taller, Hackatón, Premio. Separados por coma.' },
      { name: 'description', label: 'Descripción', type: 'textarea' },
      { name: 'gallery_urls', label: 'Fotos del evento', type: 'images', bucket: 'blog-images', help: 'Se suben una sola vez y se usan en Eventos, Sobre mí e Inicio.' },
      { name: 'main_photo', label: 'Foto principal (opcional)', type: 'image', bucket: 'blog-images' },
      { name: 'certificate_url', label: 'Certificado (opcional)', type: 'image', bucket: 'blog-images', help: 'Si el evento no tiene fotos, la tarjeta muestra el certificado.' },
      { name: 'slides_urls', label: 'Diapositivas (opcional)', type: 'images', bucket: 'blog-images', help: 'No se usan en Sobre mí ni en el Inicio.' },
      { name: 'show_in_about', label: 'Aparece en Sobre mí', type: 'checkbox' },
      { name: 'featured_home', label: 'Foto del Inicio', type: 'checkbox' },
      { name: 'draft', label: 'Borrador (no se publica)', type: 'checkbox' },
    ],
  },
  {
    table: 'site_content', label: 'Textos', orderBy: { column: 'page' },
    listColumns: ['page', 'key', 'value'],
    fields: [
      { name: 'page', label: 'Página', type: 'select', options: PAGES, required: true },
      { name: 'key', label: 'Clave', type: 'text', required: true, help: 'Ej.: banner_title, banner_button, quote, about_title.' },
      { name: 'value', nameEn: 'value_en', label: 'Texto', type: 'textarea-i18n', required: true },
    ],
  },
  {
    table: 'projects', label: 'Proyectos', orderBy: { column: 'position' },
    listColumns: ['title', 'category', 'published'], defaults: { lang: 'es', published: true },
    fields: [
      { name: 'slug', label: 'Identificador', type: 'text', required: true },
      { name: 'title', nameEn: 'title_en', label: 'Título', type: 'text-i18n', required: true },
      { name: 'summary', nameEn: 'summary_en', label: 'Resumen', type: 'textarea-i18n' },
      { name: 'category', nameEn: 'category_en', label: 'Categoría', type: 'text-i18n' },
      { name: 'tags', label: 'Etiquetas', type: 'tags' },
      { name: 'links', label: 'Enlaces (JSON)', type: 'json', help: 'Ej.: {"demo": "https://…"}' },
      { name: 'featured', label: 'Destacado', type: 'checkbox' },
      { name: 'position', label: 'Orden', type: 'number' },
      { name: 'published', label: 'Publicado', type: 'checkbox' },
    ],
  },
  {
    table: 'skills', label: 'Habilidades', orderBy: { column: 'position' },
    listColumns: ['group_name', 'name', 'published'], defaults: { published: true },
    fields: [
      { name: 'group_name', label: 'Grupo', type: 'text', required: true },
      { name: 'name', label: 'Nombre', type: 'text', required: true },
      { name: 'position', label: 'Orden', type: 'number' },
      { name: 'published', label: 'Publicado', type: 'checkbox' },
    ],
  },
  {
    table: 'nav_items', label: 'Menú', orderBy: { column: 'position' },
    listColumns: ['label', 'href', 'visible'], defaults: { area: 'menu', visible: true },
    fields: [
      { name: 'area', label: 'Zona', type: 'select', options: ['menu', 'recursos'], required: true },
      { name: 'label', nameEn: 'label_en', label: 'Etiqueta', type: 'text-i18n', required: true },
      { name: 'href', nameEn: 'href_en', label: 'Enlace', type: 'text-i18n', required: true },
      { name: 'position', label: 'Orden', type: 'number' },
      { name: 'visible', label: 'Visible', type: 'checkbox' },
    ],
  },
  {
    table: 'site_settings', label: 'Ajustes', orderBy: { column: 'site' },
    listColumns: ['site', 'updated_at'],
    fields: [
      { name: 'data', label: 'Ajustes (JSON)', type: 'json', required: true, help: 'Ej.: {"tagline": "…", "tagline_en": "…", "sections": {"eventos": true, "recursos": false}}. Las redes se editan en «Redes sociales».' },
    ],
  },
  {
    table: 'cv_documents', label: 'CV (es/en)', orderBy: { column: 'lang' },
    listColumns: ['lang', 'updated_at'], preview: true,
    fields: [
      { name: 'lang', label: 'Idioma', type: 'select', options: LANGS, required: true },
      { name: 'data', label: 'Contenido (JSON)', type: 'json', required: true, help: 'Privado: no se publica en el sitio.' },
    ],
  },
];
