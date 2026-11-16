// Galería y proyectos editables (tablas `gallery_items` y `projects`) con valores por defecto en JSON.
// Si la base no responde, el build NO falla: usa los valores por defecto y avisa en el log.
import { db } from './db';
import { SITE_ID } from '../data/site-id';
import galleryDefaults from '../data/gallery-defaults.json';
import projectsDefaults from '../data/projects-defaults.json';

export interface GalleryItem { slot: string; image_url: string; alt: string; caption: string }
export interface Project { slug: string; title: string; summary: string; category: string; position: number }

export async function getGallery(): Promise<Map<string, GalleryItem>> {
  const map = new Map<string, GalleryItem>((galleryDefaults as GalleryItem[]).map((g) => [g.slot, g]));
  try {
    const { data, error } = await db.from('gallery_items').select('slot, image_url, alt, caption').eq('site', SITE_ID).eq('published', true);
    if (error) throw error;
    for (const r of (data ?? []) as GalleryItem[]) {
      const base = map.get(r.slot);
      map.set(r.slot, { slot: r.slot, image_url: r.image_url ?? '', alt: r.alt ?? '', caption: r.caption ?? base?.caption ?? '' });
    }
  } catch (e) {
    console.warn('No se pudo cargar gallery_items; se usan los valores por defecto:', (e as Error).message ?? e);
  }
  return map;
}

export async function getProjects(lang = 'es'): Promise<Project[]> {
  try {
    const { data, error } = await db
      .from('projects')
      .select('slug, title, summary, category, position')
      .eq('site', SITE_ID).eq('lang', lang).eq('published', true)
      .order('position', { ascending: true });
    if (error) throw error;
    if (data && data.length) return data as Project[];
  } catch (e) {
    console.warn('No se pudo cargar projects; se usan los valores por defecto:', (e as Error).message ?? e);
  }
  return projectsDefaults as Project[];
}
