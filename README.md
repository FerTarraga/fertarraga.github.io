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

## Archivos idénticos en los dos portales (Mauricio y Fernanda)
Los repos son independientes, pero estos archivos deben mantenerse **iguales** en ambos. Si se cambia uno, copiarlo al otro:
- `src/styles/personal-profile.css` (plantilla visual) y `src/styles/admin.css` (panel).
- `src/components/admin/AdminShell.tsx` (login, menú y módulos), `AbmResource.tsx` (ABM genérico), `CasesModule.tsx`, `BlogModule.tsx`, `SocialsEditor.tsx`, `SectionsEditor.tsx`, `shared/WizardModal.tsx`, `shared/BusyOverlay.tsx`.
- Modelo de casos: `src/data/case-model.ts`, `src/data/case-templates.ts`, `CaseModal.astro`, `CaseBlock.astro`.
- Lectores con valores por defecto: `content.ts` (textos) y `portal-data.ts` (galería, menú, ajustes; proyectos en Mauricio).

Cada sitio define sus módulos del panel en `src/components/admin/AdminApp.tsx` y sus recursos editables en `src/data/admin-resources.ts`.

## Panel con Tailwind
El panel de administración usa clases de Tailwind (sin preflight), cargadas solo en `/admin/` mediante `src/styles/tailwind-admin.css`. El resto del sitio no recibe esos estilos.
