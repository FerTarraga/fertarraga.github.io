import type { APIRoute } from 'astro';
import { getPosts } from '../../lib/blog';
import { SITE } from '../../data/site';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export const GET: APIRoute = async () => {
  const posts = await getPosts();
  const items = posts.map((p) => `<item><title>${esc(p.title)}</title><link>${SITE.url}blog/${p.slug}/</link><guid>${SITE.url}blog/${p.slug}/</guid><pubDate>${p.pubDate.toUTCString()}</pubDate><description>${esc(p.description)}</description></item>`).join('');
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${esc(SITE.name)}</title><link>${SITE.url}blog/</link><description>${esc(SITE.tagline)}</description>${items}</channel></rss>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
