# Steuerkanzlei Rozenek — Landing Page Design Spec

**Date:** 2026-06-24  
**Project path:** `/Users/hp/Desktop/Claude/rozenek-landing/`  
**Reference site:** https://steuerkanzlei-rozenek.de/en/main/

---

## 1. Overview

Static multi-page landing site for **Steuerkanzlei Rozenek**, a Frankfurt-based tax consulting firm founded by Roy Rozenek (Steuerberater). The firm specializes in international business structures across DACH, Europe, USA, and Israel — hence trilingual support (German, English, Hebrew).

**Stack:** Pure HTML / CSS / JS, no frameworks. Same pattern as Sasson Zajac project.

---

## 2. Design Tokens

```css
--bg:       #F4F1EB   /* cream */
--bg-dark:  #1A1A18   /* dark ink */
--text:     #1A1A18
--muted:    #7A7A76
--accent:   #3D5A80   /* slate blue */
--line:     rgba(26,26,24,.10)
--serif:    'Cormorant Garamond', Georgia, serif
--sans:     'DM Sans', system-ui, sans-serif
--nav-h:    68px
```

Google Fonts: `Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400` + `DM+Sans:wght@300;400;500`

---

## 3. File Structure

```
rozenek-landing/
├── index.html          ← Homepage
├── services.html       ← Services (Leistungen)
├── about.html          ← About the firm (Kanzlei)
├── contact.html        ← Contact (Kontakt)
├── impressum.html      ← Legal stub (DE requirement)
├── datenschutz.html    ← Privacy stub (GDPR)
├── style.css           ← Global tokens, reset, nav, footer, animations
├── main.js             ← Cursor, scroll reveals, nav scroll behavior, mobile menu
├── translations.js     ← Full i18n dictionary {de, en, he}
├── i18n.js             ← Language switcher logic + RTL toggle
└── docs/
    └── superpowers/specs/
        └── 2026-06-24-rozenek-landing-design.md
```

---

## 4. Pages & Sections

### 4.1 `index.html` — Homepage

| Section | Description |
|---|---|
| **Nav** | Shared across all pages (see §6) |
| **Hero** | Two-column split: left = headline + stats, right = dark panel with quote |
| **Services strip** | 4-column grid teasing each service with number, name, short desc, link |
| **About teaser** | Two-column: left = copy about Roy Rozenek, right = pull quote |
| **CTA band** | Dark band with tagline + two buttons (form, WhatsApp) |
| **Footer** | Shared across all pages (see §6) |

Hero headline (translatable): *"Your partner for clear structures, confident decisions."*  
Stats: 15+ years · 3 languages · 4+ countries

### 4.2 `services.html` — Leistungen / Services

| Section | Description |
|---|---|
| **Page hero** | Narrow banner with page title and breadcrumb |
| **Services list** | 4 services, each with number, title, full description, and icon/accent line |
| **CTA band** | Same dark band as homepage |

Services (from reference site):
1. **Steueroptimierung** — Tax optimization and planning
2. **Internationale Strukturen** — Cross-border business structures (DACH, Europe, USA, Israel)
3. **Vermögensplanung** — Wealth planning and asset protection
4. **Digital Consulting** — Modern digital workflows, paperless tax management

### 4.3 `about.html` — Kanzlei / The Firm

| Section | Description |
|---|---|
| **Page hero** | Narrow banner with page title |
| **About Roy** | Large photo placeholder left, bio right. Roy Rozenek, Steuerberater |
| **Philosophy** | 3-column values (Clarity / Partnership / International) |
| **International reach** | Map/flags area showing DE · EU · US · IL |
| **CTA band** | Same dark band |

### 4.4 `contact.html` — Kontakt / Contact

| Section | Description |
|---|---|
| **Page hero** | Narrow banner |
| **Two-column contact** | Left: contact form. Right: WhatsApp CTA + address + map embed |
| **Contact details** | Address, phone, email displayed below |

**Form fields:** Name, Email, Phone (optional), Language preference (DE/EN/HE), Message, Submit  
**Form backend:** Formspree (`https://formspree.io/f/{id}`) — no server needed, works on static hosting  
**WhatsApp:** `https://wa.me/4969667790680?text=...` with pre-filled message in the active language

---

## 5. i18n System

### 5.1 Architecture

- `translations.js` exports a `TRANSLATIONS` object:
  ```js
  const TRANSLATIONS = {
    de: { nav_services: 'Leistungen', hero_title: '...', ... },
    en: { nav_services: 'Services',   hero_title: '...', ... },
    he: { nav_services: 'שירותים',    hero_title: '...', ... }
  }
  ```
- All translatable text nodes get a `data-i18n="key"` attribute
- `i18n.js` reads the saved language from `localStorage`, applies translations on `DOMContentLoaded`, and re-applies on switcher click

### 5.2 RTL Support for Hebrew

```js
// i18n.js
function setLanguage(lang) {
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'he' ? 'rtl' : 'ltr';
  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = TRANSLATIONS[lang][el.dataset.i18n] ?? el.textContent;
  });
  localStorage.setItem('lang', lang);
}
```

RTL CSS additions in `style.css`:
```css
[dir="rtl"] .nav-links { flex-direction: row-reverse; }
[dir="rtl"] .hero-left { border-right: none; border-left: 1px solid var(--line); }
[dir="rtl"] .quote-block { border-left: none; border-right: 2px solid var(--accent); padding-left: 0; padding-right: 24px; }
```

### 5.3 Language Switcher UI

Nav element: `DE | EN | עב` — clicking stores preference in `localStorage`, triggers `setLanguage()`. Active language highlighted in `--accent` color.

---

## 6. Shared Components

### Nav
- Height: 68px, sticky, `position: sticky; top: 0`
- Logo: `Cormorant Garamond` 22px, weight 300
- Links: uppercase, 11px, letter-spacing .12em
- Right: lang switcher + CTA button (outline style)
- Mobile: burger menu at ≤860px, slides down full-width overlay
- Scroll behavior: adds `.scrolled` class on scroll → subtle `box-shadow`

### Footer
- 4-column grid: branding + contact info / services links / firm links / language flags
- Background: `--bg` (cream), top border `--line`
- Bottom bar: copyright, legal links (Impressum, Datenschutz)

### Grain overlay
```css
body::after {
  content: ''; position: fixed; inset: 0;
  pointer-events: none; z-index: 9990; opacity: .03;
  background-image: url("data:image/svg+xml,...noise SVG...");
}
```

### Custom cursor
- Desktop only (`@media (pointer: fine)`)
- Dot + ring, `mix-blend-mode: difference`
- Expands on `.hovering` (hover over links/buttons)

### Scroll reveals
- `IntersectionObserver` adds `.visible` class
- Elements start `opacity:0; transform:translateY(16px)`
- Transition: `opacity .5s ease, transform .5s ease`

---

## 7. Animations

- Page load: `pgIn` — `opacity:0 → 1`, `translateY(4px) → none`, duration `.28s`
- Nav CTA hover: background fills to `--accent`
- Service items: subtle background tint on hover
- CTA band buttons: `--accent` fill + scale `.98` on click

---

## 8. Responsive Breakpoints

| Breakpoint | Changes |
|---|---|
| `≤1024px` | Hero columns reduce padding |
| `≤860px` | Nav collapses to burger; hero goes single column; services grid 2×2 |
| `≤480px` | Services grid 1 column; CTA band stacks vertically |

---

## 9. Contact Form

**Provider:** Formspree (free tier, 50 submissions/month)  
**Setup:** User creates account at formspree.io, gets a form endpoint `https://formspree.io/f/{id}`  
**Submission:** `fetch()` POST with `Content-Type: application/json`  
**Success state:** Form hides, success message shows in active language  
**Fields:** name, email, phone (optional), lang_preference, message

---

## 10. WhatsApp Integration

Per-language pre-filled messages:
```js
const WA_MESSAGES = {
  de: 'Guten Tag, ich interessiere mich für eine kostenlose Erstberatung.',
  en: 'Hello, I am interested in a free initial consultation.',
  he: 'שלום, אני מעוניין/ת בייעוץ ראשוני חינמי.'
}
// Link: https://wa.me/4969667790680?text=encodeURIComponent(WA_MESSAGES[lang])
```

---

## 11. Legal Pages (stub)

Two stub pages linked from footer:
- `impressum.html` — German legal requirement, placeholder content
- `datenschutz.html` — Privacy policy placeholder (GDPR)

These pages have nav + footer but minimal body content (placeholder text noting "content to be filled by client").

---

## 12. Out of Scope

- CMS or admin interface
- Blog / news section
- Client portal or login
- Analytics integration (client adds their own GA tag)
- Actual Formspree account setup (client responsibility)
