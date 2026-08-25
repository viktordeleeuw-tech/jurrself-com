# CLAUDE.md – LionCraft Project Template

## PROJECT BASICS
**Client:** Jurriaan Walters
**Website:** https://jurrself.com
**Sector:** begeleider naar rust in lichaam en geest

---

## CLAUDE'S STANDAARD WERKWIJZE

### Voorkeur & Principes
- **Communicatie:** Direct, compact, Nederlands. Geen filler.
- **Code:** Geen code zonder Viktor's goedkeuring (plan/specs eerst).
- **Testing:** Viktor test altijd zelf visueel. Mits dit een complete nieuwbouw is en het process versneld voor Claude Code. Claud Code handelt techniek af, geen UI-tests.
- **Output:** Kort en bondig—alleen kern + benodigde besluit.

### Build Preferences (Astro Stack)
- **Framework:** Astro (Static + Islands waar nodig)
- **Styling:** SCSS (variabelen, nesting, mixins)
- **HTML:** Semantisch opgebouwd (`<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<footer>`, `<aside>`, etc.)
- **Components:** Reusable, accessibility-first
- **Performance:** Lighthouse 90+, zero-JS waar mogelijk
- **SEO:** Schema markup ingebouwd, meta-tags generiek houdbaar
- **AI-ready:** Geschikt voor generative search (Perplexity, ChatGPT Search, Gemini) – heldere structuur, geen JS-rendering van essentiële content, leesbaar voor AI-crawlers

---

## CSS & DESIGN STANDAARDEN

### CSS Architecture
- **SCSS only:** Alle styles in `src/styles/` – geen `<style>` blocks in `.astro`-componenten
- Componenten krijgen classNames, die worden in `.scss` gestijld
- Gebruik BEM of eenvoudige naamgeving
- **Geen inline CSS** in JavaScript/JSX
- **Flexbox voorkeur** boven grid (mits niet met flexbox op te lossen)
- **Browsers** in alle browser tot een respectabele veroudering moet de styling van de pagina's er hetzelfde uitzien in elke browser. 

### Design & Build Approach
- **Mobile First:** Ontwerp en bouw EERST voor mobiel (375px viewport), dan scaling naar desktop
- Breakpoints: 375px (mobiel) → 768px (tablet) → 1024px+ (desktop)
- Test visueel op mobiel (devtools F12) vóór release

---

## Afbeeldingen

- Converteer alle rasterafbeeldingen naar `.webp`.
- Gebruik lossless WebP voor logo’s, iconen, illustraties met tekst en screenshots.
- Gebruik voor foto’s WebP met visueel gelijke kwaliteit (start bij quality 82–85); verlaag alleen na visuele controle.
- Lever responsieve formaten aan: bijvoorbeeld 480px, 960px en 1600px breed.
- Gebruik nooit een bronafbeelding groter dan nodig voor de daadwerkelijke weergave.
- Behoud de originele bronbestanden; vervang ze niet.
- Verwijder onnodige metadata.
- Voeg `width`, `height`, `loading="lazy"` toe; gebruik `fetchpriority="high"` alleen voor de hero-afbeelding.
- Controleer na optimalisatie zowel bestandsgrootte als zichtbare kwaliteit.

## PROJECT-SPECIFIEKE SETUP

### File Structure
```
src/
├── components/
│   └── (alleen .astro + .tsx, geen styles)
├── styles/
│   ├── globals.scss
│   ├── components.scss
│   └── [component-name].scss
├── pages/
└── layouts/
```

### Workflow
1. Plan specs eerst → Viktor's approval
2. Bouw dan → Viktor test visueel
3. Claude Code doet geen eigen tests, Viktor test op zijn Mac

### Skills die Claude gebruikt
Voor dit project laadt Claude automatisch:
- `ui-ux-dev` – Components, responsive design, accessibility
- `content-planning` – Pagina-structuur, hero's, copy-layout
- `seo-geo-aeo` – SEO audit, schema, AI-search optimization
- `copywriting` – Copy review/improvement
- `frontend-design` – Visueel design, distinct look-and-feel
- `senior-it-expert` – Architecture, deployment
- `agent files in de map /Users/viktor/Werk/Obsidian/Company Departments` - een team van specialisten

Optioneel (voor specifieke needs):
- `ai-integration-expert` – Automation, MCP-servers
- `socialmedia-marketing-expert` – Social media strategie
- `bedrijfsjurist-expert` – Juridische checks

---

## INTEGRATIONS & TOOLS

### Standard (bijna altijd)
- [ ] **Google Analytics 4** – Tracking code
- [ ] **Schema Markup** – LocalBusiness / Professional / Organization
- [ ] **Sitemap & robots.txt** – Auto-generated
- [ ] **Meta tags** – Dynamisch per pagina

### Conditional (alleen als nodig)
- [ ] **Forms** – Brevo, Formspree, Supabase, of custom?
- [ ] **Email** – Brevo integration?
- [ ] **CMS** – Supabase headless, Sanity, of static?
- [ ] **E-commerce** – Stripe, PayPal?
- [ ] **Membership** – Auth, paywall, content gating?
- [ ] **Automation** – n8n workflows, webhooks?

---

## FILES CLAUDE IGNORES

Zie `.claudeignore` in project root:
- `node_modules/`, `.astro/`, `dist/`, `.vercel/`
- `.env`, `.env.local`
- `public/uploads/`, temp files
- Git history

---

## DEPLOYMENT

**Hosting:** Vercel  
**Git:** GitHub  
**Deploy trigger:** Push to `main`  
**Preview:** Vercel auto-generates per PR  
**CI/CD:** Vercel handles build + deploy  

---

## QUICK START FOR CLAUDE

1. Read this file + `.claudeignore`
2. Check `src/` structure
3. **Always ask** before touching: brand colors, site structure, integrations
4. **Never deploy** without Viktor's visual test
5. If unsure: ask Viktor, don't guess

---

## NOTES & GOTCHAS

[Project-specifieke quirks, client preferences, ongoing issues, tech debt]

---

## SESSION LOG

| Datum | Focus | Status |
|-------|-------|--------|
| | | |

---

**Last Updated:** [Datum]
