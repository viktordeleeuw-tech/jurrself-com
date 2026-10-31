// Automatisch: elke pagina in src/pages (behalve 404 en endpoints) komt in de sitemap.
const pages = Object.keys(import.meta.glob('./**/*.astro'))
  .map((f) => f.replace('./', '/').replace(/\.astro$/, '').replace(/\/index$/, '/'))
  .filter((p) => p !== '/404')
  .sort();

export const GET = ({ site }: { site: URL }) =>
  new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages
      .map((p) => `<url><loc>${new URL(p, site).href}</loc></url>`)
      .join('')}</urlset>`,
    { headers: { 'Content-Type': 'application/xml' } },
  );
