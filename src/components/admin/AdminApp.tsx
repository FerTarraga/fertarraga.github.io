// Módulos del administrador de Fernanda. Para sumar una pantalla de Mauricio: copiar su archivo y agregar una línea acá.
import AdminShell, { type AdminModule } from './AdminShell';
import AbmResource from './AbmResource';
import BlogModule from './BlogModule';
import { RESOURCES } from '../../data/admin-resources';
import { SITE } from '../../data/site';

const GROUPS: Record<string, string> = {
  blogs: 'Publicaciones',
  disertaciones: 'Publicaciones',
  site_content: 'Contenido del sitio', gallery_items: 'Contenido del sitio', projects: 'Contenido del sitio',
  skills: 'Contenido del sitio', nav_items: 'Contenido del sitio', site_settings: 'Contenido del sitio',
  cv_documents: 'Privado',
};

const modules: AdminModule[] = [
  { id: 'blog', group: 'Publicaciones', label: 'Blog', render: () => <BlogModule /> },
  ...RESOURCES.map((r) => ({
  id: r.table,
  group: GROUPS[r.table] ?? 'Contenido del sitio',
  label: r.label,
  render: () => <AbmResource siteId={SITE.id} resource={r} />,
})),
];

export default function AdminApp() {
  return <AdminShell siteId={SITE.id} siteName={SITE.name} modules={modules} />;
}
