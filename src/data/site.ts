// Datos base del portal de Fernanda Tárraga. Son los valores por defecto: cuando existen en la base
// (`site_settings`, `site_content`, `nav_items`), el contenido editable del admin tiene prioridad.
export const SITE = {
  id: 'fernanda',
  name: 'Fernanda Tárraga',
  tagline: 'Analista Funcional de Sistemas | Data Analyst',
  url: 'https://fernanda.expertotech.com.ar/',
  linkedin: 'https://www.linkedin.com/in/iristarraga/',
  year: new Date().getFullYear(),
} as const;

export interface NavItem { id: string; label: string; href: string }

export const NAV: NavItem[] = [
  { id: 'inicio', label: 'Inicio', href: '/' },
  { id: 'sobre', label: 'Sobre mí', href: '/sobre-mi/' },
  { id: 'portafolio', label: 'Portafolio', href: '/portafolio/' },
  { id: 'blog', label: 'Blog', href: '/blog/' },
  { id: 'contacto', label: 'Contáctame', href: '/contacto/' },
];

// Cuatro espacios fijos de redes (misma plantilla que el sitio de Mauricio). href vacío = pendiente de confirmar.
export const NETWORKS = [
  { key: 'x', label: 'X', href: '' },
  { key: 'instagram', label: 'Instagram', href: '' },
  { key: 'linkedin', label: 'LinkedIn', href: SITE.linkedin },
  { key: 'github', label: 'GitHub', href: '' },
] as const;

export const ICON_PATHS: Record<string, string> = {
  x: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
  instagram: 'M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm0 2a3 3 0 00-3 3v10a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H7zm5 3.5a4.5 4.5 0 110 9 4.5 4.5 0 010-9zm0 2a2.5 2.5 0 100 5 2.5 2.5 0 000-5zM17.5 5.5a1 1 0 110 2 1 1 0 010-2z',
  linkedin: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
  github: 'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12',
};
