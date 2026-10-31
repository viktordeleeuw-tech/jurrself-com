/* Meetpunten: dataLayer-events. GTM beslist wat er verstuurd wordt; zonder toestemming meet GA4 niet. */
const track = (event: string, params: Record<string, string> = {}) => {
  const w = window as unknown as { dataLayer?: object[] };
  (w.dataLayer = w.dataLayer || []).push({ event, ...params });
};
document.addEventListener('click', (e) => {
  const a = (e.target as Element).closest('a[href]');
  if (!a) return;
  const href = a.getAttribute('href') || '';
  const link_text = (a.textContent || '').trim().slice(0, 80);
  if (href.startsWith('tel:')) return track('click_phone', { link_text, country: href.startsWith('tel:+31') ? 'NL' : href.startsWith('tel:+34') ? 'ES' : 'other' });
  if (href.startsWith('mailto:')) return track('click_email', { link_text });
  if (!/^https?:\/\//.test(href)) return;
  const host = new URL(href).hostname.replace(/^www\./, '');
  if (host === location.hostname.replace(/^www\./, '')) return;
  if (a.closest('.jf-footer__powered')) return track('click_powered_by', { site: location.hostname });
  if (/wa\.me|whatsapp\.com/.test(host)) return track('click_whatsapp', { link_text });
  if (/instagram\.com|facebook\.com|tiktok\.com|youtube\.com|spotify\.com|soundcloud\.com/.test(host)) return track('click_social', { network: host });
  track('click_outbound', { link_domain: host });
});
