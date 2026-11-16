// Cliente de datos: Supabase self-hosted en Contabo (https://api.velocitylab.com.ar).
// Misma API que el sitio de Mauricio (`db.from()`, `db.auth`, `db.storage`).
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta.env.PUBLIC_SUPABASE_URL as string | undefined) || 'https://api.velocitylab.com.ar';
// Clave `anon`: pública por diseño. La seguridad real está en las políticas RLS de la base.
const supabaseAnonKey = (import.meta.env.PUBLIC_SUPABASE_ANON_KEY as string | undefined) || '';
const inBrowser = typeof window !== 'undefined';

export const db = createClient(supabaseUrl, supabaseAnonKey, {
  auth: { persistSession: inBrowser, autoRefreshToken: inBrowser, detectSessionInUrl: false },
});

export const SESSION_DURATION_MS = 2 * 60 * 60 * 1000;
