// Automatisch uit de routes in i18n/index.ts, met hreflang-alternatieven per pagina.
import { langs, pageKeys, pagePath } from '../i18n/index.ts';

export const GET = ({ site }: { site: URL }) => {
  const abs = (p: string) => new URL(p, site).href;
  const urls = pageKeys.flatMap((page) =>
    langs.map((lang) => {
      const alts = langs.map((l) => `<xhtml:link rel="alternate" hreflang="${l}" href="${abs(pagePath(l, page))}"/>`).join('');
      const dflt = `<xhtml:link rel="alternate" hreflang="x-default" href="${abs(pagePath('en', page))}"/>`;
      return `<url><loc>${abs(pagePath(lang, page))}</loc>${alts}${dflt}</url>`;
    }),
  );
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls.join('')}</urlset>`,
    { headers: { 'Content-Type': 'application/xml' } },
  );
};
