# fertarraga.github.io

Portal personal de Fernanda Tárraga. Astro (sitio estático) + Preact (panel de administración) + Supabase (datos y login).
Misma plantilla visual y mismo stack que el sitio de Mauricio.

## Desarrollo
```bash
npm install
cp .env.example .env   # completar PUBLIC_SUPABASE_ANON_KEY
npm run dev
```

## Contenido (CMS)
- Panel: `/admin/` (login con Supabase Auth; el usuario necesita un perfil `admin` con `site = 'fernanda'` o `'*'`).
- Recursos editables: ver `src/data/admin-resources.ts`. Textos con valor por defecto en el código: `src/lib/content.ts`.
- Si la base no responde, el build no falla: usa los textos por defecto y deja un aviso en el log.

## Publicación
GitHub Pages con GitHub Actions (`.github/workflows/deploy.yml`). En el repositorio: Settings > Pages > Source = **GitHub Actions**.
El workflow también corre con `repository_dispatch` (`contenido-actualizado`) y cada 12 horas.

## Envío de mensajes
`public/assets/site-config.js`: endpoint de Formspree de Fernanda y clave pública de reCAPTCHA.
