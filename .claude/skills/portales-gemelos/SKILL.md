---
name: portales-gemelos
description: Los portales de Mauricio (spa-depot) y de Fernanda (spa-depot-fer) son gemelos: misma plantilla, mismo CMS, misma base. Además existen la empresa (landing-velocity) y el taller privado (taller). Usar SIEMPRE antes de cambiar código, estilos, panel o datos en cualquiera de los repos, y antes de publicar.
---

# Portales gemelos (Mauricio y Fernanda) y proyectos hermanos

## Regla central
**Todo cambio de marca personal (código, estilos, panel, datos) se hace en los dos portales**, salvo que sea exclusivo de un sitio (ver «Diferencias»). Si el pedido menciona uno solo, asumir que aplica a ambos y confirmar solo si hay duda. Nunca dejar un sitio con un estilo, componente o tecnología distinta del otro («no Frankenstein»).

| | Mauricio | Fernanda |
|---|---|---|
| Carpeta | `D:\Dev\_Mauglab\spa-depot` | `D:\Dev\_Mauglab\spa-depot-fer` |
| Repo / rama | `mauricioglab/mauricioglab.github.io` / `master` | `FerTarraga/fertarraga.github.io` / `main` |
| Dominio | mauricio.expertotech.com.ar | fernanda.expertotech.com.ar |
| `SITE_ID` en la base | `mauricio` | `fernanda` |
| Código de datos | `src/utils/` | `src/lib/` |
| Páginas | `src/pages-personal/`, `src/pages-shared/` | `src/pages/`, `src/components/pages/` |
| Hosting | GitHub Pages | GitHub Pages |

Stack igual en ambos: Astro 5 (sitio estático) + Preact (panel `/admin/`) + Supabase propio (`https://api.velocitylab.com.ar`). Los datos viven en tablas con columna `site`.

## Proyectos hermanos (NO son gemelos: no se replica ahí lo de los portales)
- **`D:\Dev\_Mauglab\landing-velocity`** — sitio de la empresa (`velocitylab.com.ar`, Cloudflare, `site='velocity'`). Salió de `spa-depot`. Tiene su propia plantilla; solo comparte archivos del panel con los portales si algún día se le arma uno.
- **`D:\Dev\_Mauglab\taller`** — herramientas privadas y extensiones de Mauricio (calculadora, nutrición, movimiento, workspace-mapper, videos, vsagenda, extensiones). Repo modular: `modulos/<x>/` con `modulo.json`; ningún módulo importa de otro. Destino: Cloudflare Pages + Cloudflare Access.
- **`D:\Dev\_Mauglab\contabo`** — backend, migraciones y docs (NO es un repo git). Detalle de la separación en `contabo/docs/separacion_repos.md`.
Si un pedido toca herramientas privadas o la empresa, trabajar en el repo que corresponde, no en los portales.

## Archivos que deben ser IDÉNTICOS entre los dos portales (salvo la ruta de los imports)
- `src/styles/personal-profile.css`, `src/styles/admin.css`.
- Panel: `AdminShell.tsx`, `AbmResource.tsx`, `CasesModule.tsx`, `BlogModule.tsx`, `SocialsEditor.tsx`, `SectionsEditor.tsx`, `shared/WizardModal.tsx`, `shared/BusyOverlay.tsx`.
- Modelo de casos: `src/data/case-model.ts`, `src/data/case-templates.ts`, `CaseModal.astro`, `CaseBlock.astro`.
- Lectores con valores por defecto: `content.ts`, `portal-data.ts` (la interfaz `SiteSettings.sections` es igual en ambos), iconos de redes.
Cada sitio define SUS módulos en `AdminApp.tsx`, SUS recursos en `src/data/admin-resources.ts` y SUS valores por defecto en `src/data/settings-defaults.json`.
Al terminar, comparar los pares con `diff` (ignorando `../utils` vs `../lib`) para comprobar que no divergieron.

## Diferencias legítimas
- **Zona Lab, Curiosidades y el Teleprompter (`/lab/teleprompter/`) son solo de Mauricio.** Fernanda no los tiene: en su panel solo aparece la sección «Eventos» y su `curiosidades` queda en `false`.
- «Curiosidades» (`/curiosidades/`: juego del mate y rincón retro) se activa con el interruptor `site_settings.data.sections.curiosidades` (panel → Secciones). El juego del mate solo se carga en esa página.
- Zona Lab admite recursos de tipo «herramienta» (`source_type = 'herramienta'`, enlace interno): artículo + botón «Abrir herramienta».
- Blog: Mauricio usa `BlogLayout.astro` (título + pestañas Artículos | Zona Lab + barra lateral con buscar, etiqueta y archivo); Fernanda usa `Base.astro` con `.pt-blog`. Mismo esquema visual, distinto layout.
- Contenido, textos, colores de marca y proyectos son de cada persona.
- Mauricio todavía conserva el build de empresa (`SITE_TARGET=company`) hasta que `landing-velocity` esté en producción; después se poda (ver `contabo/docs/separacion_repos.md`).

## Datos y backend (`D:\Dev\_Mauglab\contabo`)
- Migraciones SQL en `supabase/migrations/` (aplicar en el servidor Contabo, alias SSH `contabo`; respaldar antes). Edge Function `blog-ai` en `supabase/functions/blog-ai/` (se despliega copiándola a `/opt/stack/supabase/volumes/functions/` y reiniciando `functions`).
- Seguridad: RLS por `profiles(role, site)` + `is_site_admin(site)` (un perfil con `site='*'` administra todos los sitios). Las tablas de contenido tienen el trigger `trigger_site_rebuild`, que dispara `repository_dispatch` según `private_settings` (`github_repo_<site>` / `github_token_<site>`).
- Todo contenido nuevo lleva `site`, pares `*_en` para inglés y respeta RLS. Un cambio de esquema se aplica una sola vez, pero el código que lo usa va en los dos repos.

## Flujo de trabajo
1. Leer ambos repos antes de tocar; hacer el cambio en uno y replicarlo en el otro.
2. Build de ambos: `npx astro build` en Fernanda; en Mauricio `SITE_TARGET=personal npx astro build` y, si se tocó algo compartido con la empresa, también `SITE_TARGET=company`.
3. Probar en local sirviendo `dist` (cada build borra `dist`: reiniciar el servidor estático).
4. Mostrar al usuario qué cambió en cada sitio y preguntar «¿publico ambos?».
5. Solo con un sí explícito: commit y push en los dos (`master` / `main`) y revisar GitHub Actions con `gh run list`.

## Reglas que no se rompen
- **Nunca push sin un «sí, publicar» del usuario para ese cambio.** Un sí anterior no vale para el siguiente.
- Crear repos, cuentas, Cloudflare Access, DNS o secretos: pedirlo al usuario una por una. Nunca imprimir ni pegar contraseñas, tokens ni claves. Los secretos de reCAPTCHA viven solo en Formspree.
- Pruebas de panel solo con usuarios descartables creados para eso; borrarlos al terminar y comprobar que quedan 0.
- Los CV son privados. Las diapositivas nunca van en «Sobre mí» ni en Inicio.
- El CV en inglés de Fernanda necesita su revisión.

## Trampas conocidas
- Astro: una regex con `{n,}` dentro de una expresión JSX rompe el compilador; calcular en el frontmatter.
- Scripts largos en Python: escribirlos con la herramienta Write (los heredocs con comillas fallan) y ejecutar con `PYTHONIOENCODING=utf-8`.
- Un `<form>` dentro de `<p>` se rompe: usar `<div>`.
- Los `git add` en Windows avisan de CRLF; es normal.
