// Posts del blog de Fernanda (tabla `blogs`, columna site = 'fernanda'). Si la base no responde, el build sigue con la lista vacía.
import { db } from './db';
import { SITE } from '../data/site';

export interface Post {
  slug: string;
  title: string;
  pubDate: Date;
  author: string;
  description: string;
  body: string;
  coverUrl?: string;
  categories: string[];
}

export async function getPosts(): Promise<Post[]> {
  try {
    const { data, error } = await db
      .from('blogs')
      .select('slug, title, pub_date, author, categories, description, body_markdown, cover_url')
      .eq('site', SITE.id)
      .eq('draft', false)
      .order('pub_date', { ascending: false });
    if (error) throw error;
    return (data ?? []).map((r: any) => ({
      slug: r.slug,
      title: r.title,
      pubDate: new Date(`${String(r.pub_date).slice(0, 10)}T00:00:00`),
      author: r.author ?? SITE.name,
      description: r.description ?? '',
      body: r.body_markdown ?? '',
      coverUrl: r.cover_url ?? undefined,
      categories: Array.isArray(r.categories) ? r.categories : [],
    }));
  } catch (e) {
    console.warn('No se pudieron cargar los posts del blog:', (e as Error).message ?? e);
    return [];
  }
}

export const formatDate = (d: Date) =>
  new Intl.DateTimeFormat('es-AR', { year: 'numeric', month: 'long', day: 'numeric' }).format(d);
