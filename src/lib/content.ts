// Contenido editable (tabla `site_content`) con valores por defecto en el código.
// Si la base no responde, el build NO falla: usa el texto por defecto y avisa en el log.
import { db } from './db';
import { SITE } from '../data/site';

type Row = { page: string; key: string; lang: string; value: string };
let cache: Promise<Map<string, string>> | null = null;

async function load(): Promise<Map<string, string>> {
  const map = new Map<string, string>();
  try {
    const { data, error } = await db.from('site_content').select('page, key, lang, value').eq('site', SITE.id);
    if (error) throw error;
    for (const r of (data ?? []) as Row[]) map.set(`${r.page}.${r.key}.${r.lang}`, r.value);
  } catch (e) {
    console.warn('No se pudo cargar site_content; se usan los textos por defecto:', (e as Error).message ?? e);
  }
  return map;
}

/** Texto editable: `t('home', 'banner_title', 'texto por defecto')`. */
export async function t(page: string, key: string, fallback: string, lang = 'es'): Promise<string> {
  cache ??= load();
  const map = await cache;
  const v = map.get(`${page}.${key}.${lang}`);
  return v && v.trim() ? v : fallback;
}
