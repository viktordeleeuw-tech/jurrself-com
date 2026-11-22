import nl from './nl.json';
import en from './en.json';
import es from './es.json';

// Engels is de basistaal en staat op /; Nederlands en Spaans onder /nl/ en /es/.
export const langs = ['en', 'nl', 'es'] as const;
export const baseLang = 'en' as const;
export type Lang = (typeof langs)[number];
export type Dict = typeof nl;
const dicts: Record<Lang, Dict> = { nl, en, es };

export const t = (lang: Lang): Dict => dicts[lang];
export const labels: Record<Lang, string> = { nl: 'NL', en: 'EN', es: 'ES' };
export const locales: Record<Lang, string> = { nl: 'nl_NL', en: 'en_GB', es: 'es_ES' };

// Slug per pagina per taal; '' = home.
export const slugs = {
  home: { nl: '', en: '', es: '' },
  offer: { en: 'offer', nl: 'aanbod', es: 'oferta' },
  about: { en: 'about', nl: 'over-mij', es: 'sobre-mi' },
  contact: { en: 'contact', nl: 'contact', es: 'contacto' },
  privacy: { en: 'privacy', nl: 'privacy', es: 'privacidad' },
} as const;
export type PageKey = keyof typeof slugs;
export const pageKeys = Object.keys(slugs) as PageKey[];

export const pagePath = (lang: Lang, page: PageKey = 'home') => {
  const base = lang === baseLang ? '' : `/${lang}`;
  const slug = slugs[page][lang];
  return slug ? `${base}/${slug}` : `${base}/`;
};
