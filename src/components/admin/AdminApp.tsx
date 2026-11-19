// Módulos del administrador de Fernanda. Para sumar una pantalla de Mauricio: copiar su archivo y agregar una línea acá.
import AdminShell, { type AdminModule } from './AdminShell';
import AbmResource from './AbmResource';
import SocialsEditor from './SocialsEditor';
import SectionsEditor from './SectionsEditor';
import BlogModule from './BlogModule';
import CasesModule from './CasesModule';
import ImagesModule from './ImagesModule';
import { getAboutItems } from '../../lib/eventos';
import { RESOURCES } from '../../data/admin-resources';
import { SITE } from '../../data/site';

const go = (id: string) => { location.hash = id; };

const GROUPS: Record<string, string> = {
  blogs: 'Publicaciones',
  disertaciones: 'Publicaciones',
  site_content: 'Contenido del sitio', projects: 'Contenido del sitio',
  skills: 'Contenido del sitio', nav_items: 'Contenido del sitio', site_settings: 'Contenido del sitio',
  cv_documents: 'Privado',
};

const modules: AdminModule[] = [
  { id: 'imagenes', group: 'Contenido del sitio', label: 'Imágenes', render: () => <ImagesModule siteId={SITE.id} go={go} links={{ eventos: 'disertaciones', blog: 'blog' }} loadAbout={getAboutItems} /> },
  { id: 'secciones', group: 'Contenido del sitio', label: 'Secciones', render: () => <SectionsEditor siteId={SITE.id} items={[{ key: 'eventos', label: 'Eventos' }]} /> },
  { id: 'redes', group: 'Contenido del sitio', label: 'Redes sociales', render: () => <SocialsEditor siteId={SITE.id} /> },
  { id: 'blog', group: 'Publicaciones', label: 'Blog', render: () => <BlogModule /> },
  { id: 'casos', group: 'Publicaciones', label: 'Casos de estudio', render: () => <CasesModule /> },
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
