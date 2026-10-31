import nodemailer from 'nodemailer';

export const config = { runtime: 'nodejs' };

const MAILTO = 'info@jurrself.com';
const hits = new Map();
// ponytail: in-memory rate limit per instance; use Vercel firewall/KV if abuse shows up
const rateLimited = (ip) => {
  const now = Date.now();
  const list = (hits.get(ip) || []).filter((t) => now - t < 600000);
  list.push(now);
  hits.set(ip, list);
  return list.length > 5;
};
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const clean = (v, max) => String(v ?? '').replace(/[\r\n]+/g, ' ').trim().slice(0, max);

export default async function handler(req, res, env = process.env, transportFactory = nodemailer.createTransport) {
  const reply = (code, body) => res.status(code).json(body);
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return reply(405, { success: false }); }
  try {
    if (new URL(req.headers.origin || '').host !== req.headers.host) return reply(403, { success: false });
  } catch { return reply(403, { success: false }); }

  const ip = String(req.headers['x-forwarded-for'] ?? 'unknown').split(',')[0].trim();
  if (rateLimited(ip)) return reply(429, { success: false, message: `Te veel aanvragen. Mail naar ${MAILTO}.` });

  const b = typeof req.body === 'object' && req.body ? req.body : {};
  if (b.website) return reply(200, { success: true }); // honeypot: bots niet wijzer maken
  const name = clean(b.name, 100), email = clean(b.email, 200), message = String(b.message ?? '').trim().slice(0, 4000);
  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return reply(422, { success: false, message: 'Controleer naam en e-mailadres.' });

  const { SMTP_HOST, SMTP_USER, SMTP_PASS, SMTP_FROM, CONTACT_EMAIL_DEFAULT } = env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !SMTP_FROM || !CONTACT_EMAIL_DEFAULT) {
    console.error('contact: SMTP-variabelen ontbreken');
    return reply(503, { success: false, message: `Het formulier is tijdelijk niet beschikbaar. Mail naar ${MAILTO}.` });
  }
  try {
    const port = Number(env.SMTP_PORT || 587);
    const transport = transportFactory({ host: SMTP_HOST, port, secure: port === 465, auth: { user: SMTP_USER, pass: SMTP_PASS } });
    await transport.sendMail({
      from: SMTP_FROM,
      to: CONTACT_EMAIL_DEFAULT,
      replyTo: email,
      subject: `Nieuwe aanvraag via jurrself.com — ${name}`,
      text: `Naam: ${name}\nE-mail: ${email}\n\n${message}`,
      html: `<p><b>Naam:</b> ${esc(name)}<br><b>E-mail:</b> ${esc(email)}</p><p>${esc(message).replace(/\n/g, '<br>')}</p>`,
    });
    return reply(200, { success: true });
  } catch (e) {
    console.error('contact SMTP error:', e.message);
    return reply(502, { success: false, message: `Versturen is niet gelukt. Mail naar ${MAILTO}.` });
  }
}
