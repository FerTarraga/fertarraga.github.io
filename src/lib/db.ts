// Cliente de datos: Supabase self-hosted en Contabo (https://api.velocitylab.com.ar).
// Misma API que el sitio de Mauricio (`db.from()`, `db.auth`, `db.storage`).
import { createClient } from '@supabase/supabase-js';
import { SITE_ID } from '../data/site-id';

const supabaseUrl = (import.meta.env.PUBLIC_SUPABASE_URL as string | undefined) || 'https://api.velocitylab.com.ar';
// Clave `anon`: pública por diseño. La seguridad real está en las políticas RLS de la base.
const supabaseAnonKey = (import.meta.env.PUBLIC_SUPABASE_ANON_KEY as string | undefined) || '';
const inBrowser = typeof window !== 'undefined';

export const db = createClient(supabaseUrl, supabaseAnonKey, {
  auth: { persistSession: inBrowser, autoRefreshToken: inBrowser, detectSessionInUrl: false },
});


// Funciones de IA del blog: una sola Edge Function (`blog-ai`) con OpenRouter; el panel sigue llamando por los nombres de siempre.
const BLOG_AI = new Set(['blog-fetch-url', 'blog-proposals', 'blog-write', 'blog-review', 'blog-revise', 'blog-cover']);
const invokeFunction = db.functions.invoke.bind(db.functions);
async function invokeBlogAi(name: string, opts?: any) {
  const { data, error } = await invokeFunction('blog-ai', { ...opts, body: { ...(opts?.body ?? {}), action: name, site: SITE_ID } });
  if (error) {
    // Muestra el mensaje real de la función (p. ej. «Falta OPENROUTER_API_KEY») en vez del genérico de supabase-js.
    let message = (error as Error).message;
    try { message = (await (error as any).context.json())?.error ?? message; } catch { /* sin cuerpo */ }
    return { data: null, error: new Error(message) };
  }
  return { data, error: null };
}
(db.functions as any).invoke = (name: string, opts?: any) => (BLOG_AI.has(name) ? invokeBlogAi(name, opts) : invokeFunction(name, opts));

import { sessionExpired, clearSessionStart } from './session';

export {
  SESSION_DURATION_MS,
  markSessionStart,
  clearSessionStart,
  sessionExpired,
  scheduleSessionEnd,
  resolveLoginUser,
} from './session';

/** Cierra la sesión de Supabase si pasó el tiempo máximo de sesión del panel. */
export async function enforceSessionExpiry() {
  if (sessionExpired()) {
    await db.auth.signOut();
    clearSessionStart();
    return true;
  }
  return false;
}
