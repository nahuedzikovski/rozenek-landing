# Steuerkanzlei Rozenek — Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a 4-page static multilingual landing site (DE/EN/HE with RTL) for Steuerkanzlei Rozenek, Frankfurt.

**Architecture:** Pure HTML/CSS/JS, no frameworks. Shared `style.css` + `main.js` across all pages. `translations.js` holds the full i18n dictionary; `i18n.js` applies translations via `data-i18n` attributes and toggles `dir="rtl"` for Hebrew. Contact form via Formspree fetch; WhatsApp CTA with per-language pre-filled message.

**Tech Stack:** HTML5, CSS3 (custom properties), Vanilla JS (ES6+), Google Fonts (Cormorant Garamond + DM Sans), Formspree (form backend).

---

## Task 1: Project scaffold + style.css

**Files:**
- Create: `rozenek-landing/style.css`
- Create: `rozenek-landing/.gitignore`

- [ ] **Step 1: Init git and create .gitignore**

```bash
cd /Users/hp/Desktop/Claude/rozenek-landing
git init
echo ".DS_Store\n.superpowers/" > .gitignore
```

- [ ] **Step 2: Write style.css**

Create `style.css` with the full content below:

```css
/* ============================================================
   Steuerkanzlei Rozenek — style.css
============================================================ */

/* ── Reset ── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
img  { display: block; max-width: 100%; }
a    { color: inherit; text-decoration: none; }
button { border: none; background: none; cursor: pointer; font: inherit; }

/* ── Tokens ── */
:root {
  --bg:      #F4F1EB;
  --bg-dark: #1A1A18;
  --text:    #1A1A18;
  --muted:   #7A7A76;
  --accent:  #3D5A80;
  --line:    rgba(26,26,24,.10);
  --serif:   'Cormorant Garamond', Georgia, serif;
  --sans:    'DM Sans', system-ui, sans-serif;
  --nav-h:   68px;
}

/* ── Base ── */
body {
  background: var(--bg);
  color: var(--text);
  font-family: var(--sans);
  font-weight: 300;
  line-height: 1.6;
  overflow-x: hidden;
  animation: pgIn .28s ease-out both;
}
@keyframes pgIn {
  from { opacity: 0; transform: translateY(4px); }
  to   { opacity: 1; transform: none; }
}

/* Grain overlay */
body::after {
  content: '';
  position: fixed; inset: 0;
  pointer-events: none; z-index: 9990; opacity: .03;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E");
}

/* ── Custom Cursor ── */
@media (pointer: fine) {
  *, *::before, *::after { cursor: none !important; }
}
.cur {
  position: fixed; top: 0; left: 0;
  border-radius: 50%; pointer-events: none;
  z-index: 9999; will-change: transform;
  mix-blend-mode: difference;
}
#cur-dot  { width: 7px;  height: 7px;  background: #fff; opacity: .9; transition: width .22s, height .22s, opacity .22s; }
#cur-ring { width: 36px; height: 36px; border: 1px solid #fff; opacity: .5; transition: width .3s, height .3s, opacity .3s; }
body.hovering #cur-dot  { width: 11px; height: 11px; opacity: 1; }
body.hovering #cur-ring { width: 48px; height: 48px; opacity: .7; }

/* ── Scroll Reveals ── */
.reveal {
  opacity: 0;
  transform: translateY(16px);
  transition: opacity .5s ease, transform .5s ease;
}
.reveal.visible { opacity: 1; transform: none; }

/* ── Nav ── */
nav {
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 48px; height: var(--nav-h);
  border-bottom: 1px solid var(--line);
  background: var(--bg);
  position: sticky; top: 0; z-index: 100;
  transition: box-shadow .25s;
}
nav.scrolled { box-shadow: 0 2px 20px rgba(26,26,24,.07); }

.nav-logo {
  font-family: var(--serif); font-size: 20px; font-weight: 300;
  letter-spacing: .03em; color: var(--text); white-space: nowrap;
}

.nav-links { display: flex; gap: 32px; }
.nav-links a {
  font-size: 11px; letter-spacing: .13em; text-transform: uppercase;
  color: var(--muted); transition: color .2s;
}
.nav-links a:hover, .nav-links a.active { color: var(--accent); }

.nav-right { display: flex; align-items: center; gap: 24px; }

.lang-switcher { display: flex; align-items: center; gap: 8px; }
.lang-switcher button {
  font-size: 11px; letter-spacing: .08em; color: var(--muted);
  transition: color .2s; background: none; border: none;
  padding: 2px 0; cursor: pointer;
}
.lang-switcher button.active { color: var(--accent); font-weight: 500; }
.lang-sep { color: var(--line); font-size: 13px; }

.nav-cta {
  border: 1px solid var(--text); padding: 9px 20px;
  font-size: 11px; letter-spacing: .09em; color: var(--text);
  transition: background .2s, color .2s; white-space: nowrap;
}
.nav-cta:hover { background: var(--accent); border-color: var(--accent); color: #fff; }

/* Burger */
.burger { display: none; flex-direction: column; gap: 5px; padding: 4px; }
.burger span { display: block; width: 22px; height: 1px; background: var(--text); transition: transform .25s, opacity .25s; }

/* Mobile menu */
.mobile-menu {
  display: none; position: fixed; inset: var(--nav-h) 0 0 0;
  background: var(--bg); z-index: 99; flex-direction: column;
  align-items: center; justify-content: center; gap: 32px;
  border-top: 1px solid var(--line);
}
.mobile-menu.open { display: flex; }
.mobile-menu a { font-size: 28px; font-family: var(--serif); font-weight: 300; font-style: italic; color: var(--text); }
.mobile-menu .mobile-lang { display: flex; gap: 20px; margin-top: 16px; }
.mobile-menu .mobile-lang button { font-size: 15px; color: var(--muted); background: none; border: none; cursor: pointer; }
.mobile-menu .mobile-lang button.active { color: var(--accent); font-weight: 500; }

/* ── Page Hero (inner pages) ── */
.page-hero {
  padding: 64px 48px 56px;
  border-bottom: 1px solid var(--line);
}
.page-hero-label {
  font-size: 10px; letter-spacing: .18em; text-transform: uppercase;
  color: var(--muted); margin-bottom: 20px;
}
.page-hero-title {
  font-family: var(--serif); font-size: 56px; font-weight: 300;
  font-style: italic; line-height: 1.1; color: var(--text);
}

/* ── CTA Band ── */
.cta-band {
  background: var(--bg-dark); padding: 64px 48px;
  display: flex; align-items: center; justify-content: space-between; gap: 40px;
}
.cta-band-text {
  font-family: var(--serif); font-size: 36px; font-weight: 300;
  font-style: italic; color: #fff; line-height: 1.3; max-width: 480px;
}
.cta-band-buttons { display: flex; gap: 14px; flex-shrink: 0; }
.btn-primary {
  background: var(--accent); color: #fff;
  padding: 14px 28px; font-size: 11px; letter-spacing: .1em;
  text-transform: uppercase; border: 1px solid var(--accent);
  transition: background .2s, transform .1s; cursor: pointer;
}
.btn-primary:hover { background: #2e4460; }
.btn-primary:active { transform: scale(.98); }
.btn-wa {
  background: transparent; color: #fff;
  border: 1px solid rgba(255,255,255,.25); padding: 14px 28px;
  font-size: 11px; letter-spacing: .1em; text-transform: uppercase;
  transition: border-color .2s; cursor: pointer;
}
.btn-wa:hover { border-color: rgba(255,255,255,.6); }

/* ── Footer ── */
footer {
  background: var(--bg); border-top: 1px solid var(--line);
  padding: 56px 48px 0;
}
.footer-grid {
  display: grid; grid-template-columns: 1.4fr 1fr 1fr auto;
  gap: 48px; padding-bottom: 48px;
}
.footer-brand .logo {
  font-family: var(--serif); font-size: 20px; font-weight: 300;
  margin-bottom: 6px;
}
.footer-brand p { font-size: 12px; color: var(--muted); line-height: 1.8; margin-top: 12px; }
.footer-col-title {
  font-size: 10px; letter-spacing: .15em; text-transform: uppercase;
  color: var(--muted); margin-bottom: 16px;
}
.footer-col a { display: block; font-size: 12px; color: rgba(26,26,24,.65); margin-bottom: 10px; transition: color .2s; }
.footer-col a:hover { color: var(--accent); }
.footer-flags { display: flex; gap: 12px; font-size: 22px; }
.footer-bottom {
  border-top: 1px solid var(--line); padding: 18px 0;
  display: flex; justify-content: space-between; align-items: center;
}
.footer-bottom-left { font-size: 11px; color: var(--muted); letter-spacing: .04em; }
.footer-bottom-right { display: flex; gap: 24px; }
.footer-bottom-right a { font-size: 11px; color: var(--muted); transition: color .2s; }
.footer-bottom-right a:hover { color: var(--text); }

/* ── RTL Overrides ── */
[dir="rtl"] .nav-links        { flex-direction: row-reverse; }
[dir="rtl"] .nav-right        { flex-direction: row-reverse; }
[dir="rtl"] .hero-left        { border-right: none; border-left: 1px solid var(--line); }
[dir="rtl"] .quote-block      { border-left: none; border-right: 2px solid var(--accent); padding-left: 0; padding-right: 24px; }
[dir="rtl"] .services-grid    { direction: rtl; }
[dir="rtl"] .footer-grid      { direction: rtl; }
[dir="rtl"] .page-hero        { text-align: right; }
[dir="rtl"] .about-left       { text-align: right; }
[dir="rtl"] .cta-band         { flex-direction: row-reverse; }
[dir="rtl"] .footer-bottom    { flex-direction: row-reverse; }

/* ── Responsive ── */
@media (max-width: 1024px) {
  nav { padding: 0 32px; }
  .page-hero { padding: 48px 32px 40px; }
  .cta-band  { padding: 48px 32px; }
  footer     { padding: 48px 32px 0; }
}

@media (max-width: 860px) {
  .nav-links  { display: none; }
  .nav-cta    { display: none; }
  .lang-switcher { display: none; }
  .burger     { display: flex; }

  .hero       { grid-template-columns: 1fr !important; }
  .hero-right { display: none; }

  .services-grid { grid-template-columns: 1fr 1fr !important; }
  .about-strip   { grid-template-columns: 1fr !important; }
  .about-right   { display: none; }

  .footer-grid { grid-template-columns: 1fr 1fr; gap: 32px; }
  .cta-band    { flex-direction: column; align-items: flex-start; }
}

@media (max-width: 480px) {
  nav { padding: 0 20px; }
  .page-hero { padding: 40px 20px 32px; }
  .page-hero-title { font-size: 36px; }
  .cta-band  { padding: 40px 20px; }
  .cta-band-text { font-size: 26px; }
  .cta-band-buttons { flex-direction: column; width: 100%; }
  .btn-primary, .btn-wa { text-align: center; }
  .services-grid { grid-template-columns: 1fr !important; }
  footer     { padding: 40px 20px 0; }
  .footer-grid { grid-template-columns: 1fr; }
}
```

- [ ] **Step 3: Open browser and verify tokens load (no errors)**

Open any HTML file that links style.css in a browser (or just validate the CSS has no syntax errors):
```bash
cd /Users/hp/Desktop/Claude/rozenek-landing
# Quick syntax check — should print nothing if valid
node -e "require('fs').readFileSync('style.css','utf8')" && echo "CSS file readable"
```

- [ ] **Step 4: Commit**

```bash
git add style.css .gitignore
git commit -m "feat: add design system — tokens, nav, footer, CTA band, reveals, RTL, responsive"
```

---

## Task 2: translations.js — full i18n dictionary

**Files:**
- Create: `rozenek-landing/translations.js`

- [ ] **Step 1: Write translations.js**

```js
const TRANSLATIONS = {
  de: {
    /* Nav */
    nav_services: 'Leistungen',
    nav_about:    'Kanzlei',
    nav_contact:  'Kontakt',
    nav_cta:      'Erstberatung',

    /* Footer */
    footer_col_services: 'Leistungen',
    footer_col_firm:     'Kanzlei',
    footer_col_lang:     'Sprache',
    footer_impressum:    'Impressum',
    footer_privacy:      'Datenschutz',
    footer_copy:         '© 2025 Steuerkanzlei Rozenek · Frankfurt am Main',

    /* Homepage — Hero */
    hero_label:     'Frankfurt am Main · Steuerberatung',
    hero_title_1:   'Ihr Partner für',
    hero_title_2:   'klare Strukturen,',
    hero_title_3:   'sichere Entscheidungen.',
    hero_subtitle:  'Steuerberatung, internationale Unternehmensstrukturen und Vermögensplanung für Unternehmer in DACH, Europa und Israel.',
    stat_years_label:     'Jahre Erfahrung',
    stat_langs_label:     'Sprachen',
    stat_countries_label: 'Länder',
    hero_quote:       '"Steuerrecht ist keine Last — es ist eine strategische Chance."',
    hero_quote_author:'Roy Rozenek, Steuerberater',

    /* Homepage — Services strip */
    services_label: 'Leistungen',
    s1_name: 'Steueroptimierung',
    s1_desc: 'Strategische Steuerplanung und -optimierung für Privatpersonen und Unternehmen.',
    s1_link: 'Mehr →',
    s2_name: 'Internationale Strukturen',
    s2_desc: 'Grenzüberschreitende Unternehmensstrukturen in DACH, Europa, USA und Israel.',
    s2_link: 'Mehr →',
    s3_name: 'Vermögensplanung',
    s3_desc: 'Umfassende Vermögensplanung und Vermögensschutzstrategien.',
    s3_link: 'Mehr →',
    s4_name: 'Digital Consulting',
    s4_desc: 'Moderne digitale Workflows für papierloses und effizientes SteuerManagement.',
    s4_link: 'Mehr →',

    /* Homepage — About teaser */
    about_label: 'Die Kanzlei',
    about_title: 'Mehr als Buchhaltung — ein strategischer Partner.',
    about_text:  'Roy Rozenek, Steuerberater, gründete die Kanzlei mit einem Ziel: Unternehmern dieselben ausgefeilten Steuerstrategien anzubieten, die sonst nur Großkonzernen vorbehalten sind — auf Deutsch, Englisch und Hebräisch.',
    about_cta:   'Über uns →',

    /* CTA Band */
    cta_text:     'Starten Sie mit einer kostenlosen Erstberatung.',
    cta_btn_form: 'Formular ausfüllen',
    cta_btn_wa:   'WhatsApp ↗',

    /* Services page */
    page_services_title:    'Leistungen',
    page_services_subtitle: 'Maßgeschneiderte Steuerstrategien für Unternehmer.',
    s1_full_desc: 'Wir analysieren Ihre steuerliche Situation ganzheitlich und entwickeln eine individuelle Strategie zur Minimierung Ihrer Steuerlast — rechtssicher, nachhaltig und auf Ihre Ziele ausgerichtet. Ob Einkommensteuer, Körperschaftsteuer oder Umsatzsteuer: Wir finden legale Wege zur Optimierung.',
    s2_full_desc: 'Ob Holdingstrukturen, Betriebsstätten im Ausland oder grenzüberschreitende Beteiligungen — wir begleiten Sie bei der Planung und Umsetzung internationaler Unternehmensstrukturen mit Fokus auf DACH, Europa, USA und Israel.',
    s3_full_desc: 'Ihre Vermögenssicherung beginnt mit einer klaren Strategie. Wir beraten Sie bei der steueroptimierten Übertragung von Vermögen, der Nachlassplanung und dem Schutz Ihres Privatvermögens vor unnötiger Steuerlast.',
    s4_full_desc: 'Dank moderner digitaler Workflows arbeiten wir papierlos, effizient und transparent. Belege, Dokumente und Kommunikation werden digital verwaltet — so haben Sie jederzeit den Überblick über Ihre steuerliche Situation.',

    /* About page */
    page_about_title:  'Die Kanzlei',
    about_roy_label:   'Steuerberater · Gründer',
    about_roy_bio:     'Roy Rozenek ist zugelassener Steuerberater mit langjähriger Erfahrung in der Beratung internationaler Unternehmer. Als mehrsprachiger Berater mit Expertise in deutschem, europäischem und israelischem Steuerrecht bietet er eine seltene Kombination aus juristischer Präzision und unternehmerischem Denken. Die Kanzlei wurde gegründet, um Mandanten maßgeschneiderte Lösungen zu bieten, die über die reine Compliance hinausgehen.',
    values_label:  'Unsere Werte',
    val1_title:    'Klarheit',
    val1_desc:     'Komplexes Steuerrecht in verständliche Strategien übersetzen — das ist unser Versprechen.',
    val2_title:    'Partnerschaft',
    val2_desc:     'Wir denken langfristig und begleiten Sie bei jeder unternehmerischen Entscheidung.',
    val3_title:    'International',
    val3_desc:     'Kompetenz in drei Sprachen und vier Rechtssystemen — für globale Unternehmer.',
    reach_label:   'Internationale Präsenz',
    reach_text:    'Wir beraten Mandanten in Deutschland, der EU, den USA und Israel — mit tiefem Verständnis der jeweiligen Steuer- und Rechtssysteme.',

    /* Contact page */
    page_contact_title: 'Kontakt',
    form_name:     'Name',
    form_email:    'E-Mail',
    form_phone:    'Telefon (optional)',
    form_lang:     'Bevorzugte Sprache',
    form_message:  'Ihre Nachricht',
    form_submit:   'Senden',
    form_success:  'Vielen Dank! Wir melden uns in Kürze bei Ihnen.',
    wa_title:      'WhatsApp',
    wa_text:       'Für schnelle Antworten schreiben Sie uns direkt auf WhatsApp.',
    wa_btn:        'Chat öffnen',
    address_label: 'Adresse',
    wa_message:    'Guten Tag, ich interessiere mich für eine kostenlose Erstberatung.',
  },

  en: {
    /* Nav */
    nav_services: 'Services',
    nav_about:    'The Firm',
    nav_contact:  'Contact',
    nav_cta:      'Free Consultation',

    /* Footer */
    footer_col_services: 'Services',
    footer_col_firm:     'The Firm',
    footer_col_lang:     'Language',
    footer_impressum:    'Legal Notice',
    footer_privacy:      'Privacy',
    footer_copy:         '© 2025 Steuerkanzlei Rozenek · Frankfurt am Main',

    /* Homepage — Hero */
    hero_label:     'Frankfurt am Main · Tax Consulting',
    hero_title_1:   'Your partner for',
    hero_title_2:   'clear structures,',
    hero_title_3:   'confident decisions.',
    hero_subtitle:  'Tax consulting, international business structures, and wealth planning for entrepreneurs across DACH, Europe, and Israel.',
    stat_years_label:     'Years Experience',
    stat_langs_label:     'Languages',
    stat_countries_label: 'Countries',
    hero_quote:       '"Tax law is not a burden — it is a strategic opportunity."',
    hero_quote_author:'Roy Rozenek, Tax Advisor',

    /* Homepage — Services strip */
    services_label: 'Services',
    s1_name: 'Tax Optimization',
    s1_desc: 'Strategic tax planning and optimization for individuals and businesses.',
    s1_link: 'More →',
    s2_name: 'International Structures',
    s2_desc: 'Cross-border business structures across DACH, Europe, USA, and Israel.',
    s2_link: 'More →',
    s3_name: 'Wealth Planning',
    s3_desc: 'Comprehensive wealth planning and asset protection strategies.',
    s3_link: 'More →',
    s4_name: 'Digital Consulting',
    s4_desc: 'Modern digital workflows for seamless, paperless tax management.',
    s4_link: 'More →',

    /* Homepage — About teaser */
    about_label: 'The Firm',
    about_title: 'Beyond standard accounting — a strategic partner.',
    about_text:  'Roy Rozenek, Tax Advisor, founded the firm with one goal: provide entrepreneurial clients with the same sophisticated tax strategies available to large corporations — in German, English, and Hebrew.',
    about_cta:   'About us →',

    /* CTA Band */
    cta_text:     'Start with a free initial consultation.',
    cta_btn_form: 'Fill out form',
    cta_btn_wa:   'WhatsApp ↗',

    /* Services page */
    page_services_title:    'Services',
    page_services_subtitle: 'Tailored tax strategies for entrepreneurs.',
    s1_full_desc: 'We take a holistic view of your tax situation and develop an individual strategy to minimize your tax burden — legally sound, sustainable, and aligned with your goals. From income tax to corporate and VAT: we find legal paths to optimization.',
    s2_full_desc: 'Whether holding structures, foreign permanent establishments, or cross-border investments — we guide you through planning and implementing international business structures with a focus on DACH, Europe, USA, and Israel.',
    s3_full_desc: 'Your wealth protection starts with a clear strategy. We advise on tax-optimized asset transfers, succession planning, and protecting your private assets from unnecessary tax burdens.',
    s4_full_desc: 'Thanks to modern digital workflows, we work paperlessly, efficiently, and transparently. Documents and communication are managed digitally — giving you a clear picture of your tax situation at any time.',

    /* About page */
    page_about_title:  'The Firm',
    about_roy_label:   'Tax Advisor · Founder',
    about_roy_bio:     'Roy Rozenek is a licensed tax advisor with extensive experience advising international entrepreneurs. As a multilingual advisor with expertise in German, European, and Israeli tax law, he offers a rare combination of legal precision and entrepreneurial thinking. The firm was founded to provide clients with tailored solutions that go beyond mere compliance.',
    values_label:  'Our Values',
    val1_title:    'Clarity',
    val1_desc:     'Translating complex tax law into understandable strategies — that is our promise.',
    val2_title:    'Partnership',
    val2_desc:     'We think long-term and support you through every entrepreneurial decision.',
    val3_title:    'International',
    val3_desc:     'Expertise in three languages and four legal systems — for global entrepreneurs.',
    reach_label:   'International Reach',
    reach_text:    'We advise clients in Germany, the EU, the USA, and Israel — with deep understanding of each jurisdiction\'s tax and legal systems.',

    /* Contact page */
    page_contact_title: 'Contact',
    form_name:     'Name',
    form_email:    'Email',
    form_phone:    'Phone (optional)',
    form_lang:     'Preferred Language',
    form_message:  'Your Message',
    form_submit:   'Send',
    form_success:  'Thank you! We\'ll be in touch soon.',
    wa_title:      'WhatsApp',
    wa_text:       'For quick responses, write to us directly on WhatsApp.',
    wa_btn:        'Open Chat',
    address_label: 'Address',
    wa_message:    'Hello, I am interested in a free initial consultation.',
  },

  he: {
    /* Nav */
    nav_services: 'שירותים',
    nav_about:    'משרדנו',
    nav_contact:  'צור קשר',
    nav_cta:      'ייעוץ ראשוני',

    /* Footer */
    footer_col_services: 'שירותים',
    footer_col_firm:     'משרדנו',
    footer_col_lang:     'שפה',
    footer_impressum:    'הצהרה משפטית',
    footer_privacy:      'פרטיות',
    footer_copy:         '© 2025 Steuerkanzlei Rozenek · פרנקפורט',

    /* Homepage — Hero */
    hero_label:     'פרנקפורט · ייעוץ מס',
    hero_title_1:   'השותף שלך',
    hero_title_2:   'למבנים ברורים,',
    hero_title_3:   'החלטות בטוחות.',
    hero_subtitle:  'ייעוץ מס, מבני עסקים בינלאומיים ותכנון עושר ליזמים ברחבי DACH, אירופה וישראל.',
    stat_years_label:     'שנות ניסיון',
    stat_langs_label:     'שפות',
    stat_countries_label: 'מדינות',
    hero_quote:       '"דיני מס אינם נטל — הם הזדמנות אסטרטגית."',
    hero_quote_author:'רוי רוזנק, יועץ מס',

    /* Homepage — Services strip */
    services_label: 'שירותים',
    s1_name: 'אופטימיזציה מיסויית',
    s1_desc: 'תכנון מס אסטרטגי ואופטימיזציה ליחידים וחברות.',
    s1_link: 'עוד →',
    s2_name: 'מבנים בינלאומיים',
    s2_desc: 'מבני עסקים חוצי-גבולות ב-DACH, אירופה, ארה״ב וישראל.',
    s2_link: 'עוד →',
    s3_name: 'תכנון עושר',
    s3_desc: 'תכנון עושר מקיף ואסטרטגיות הגנה על נכסים.',
    s3_link: 'עוד →',
    s4_name: 'ייעוץ דיגיטלי',
    s4_desc: 'זרימות עבודה דיגיטליות מודרניות לניהול מס ללא נייר.',
    s4_link: 'עוד →',

    /* Homepage — About teaser */
    about_label: 'המשרד',
    about_title: 'מעבר לחשבונאות רגילה — שותף אסטרטגי.',
    about_text:  'רוי רוזנק, יועץ מס, הקים את המשרד עם מטרה אחת: לספק ללקוחות יזמים את אסטרטגיות המס המתוחכמות הזמינות לתאגידים גדולים — בגרמנית, אנגלית ועברית.',
    about_cta:   'עלינו →',

    /* CTA Band */
    cta_text:     'התחילו עם ייעוץ ראשוני חינמי.',
    cta_btn_form: 'מלאו טופס',
    cta_btn_wa:   'WhatsApp ↗',

    /* Services page */
    page_services_title:    'שירותים',
    page_services_subtitle: 'אסטרטגיות מס מותאמות אישית ליזמים.',
    s1_full_desc: 'אנו בוחנים את מצבכם המיסויי באופן הוליסטי ומפתחים אסטרטגיה אישית להפחתת נטל המס — חוקית, בת-קיימא ומתואמת ליעדים שלכם. ממס הכנסה ועד מס חברות ומע״מ: אנו מוצאים נתיבים חוקיים לאופטימיזציה.',
    s2_full_desc: 'בין אם מדובר במבני החזקה, מוסדות קבע בחו״ל או השקעות חוצות גבולות — אנו מלווים אתכם בתכנון ובביצוע מבני עסקים בינלאומיים עם דגש על DACH, אירופה, ארה״ב וישראל.',
    s3_full_desc: 'הגנת הנכסים שלכם מתחילה באסטרטגיה ברורה. אנו מייעצים בהעברת נכסים ממוסה-אופטימלית, תכנון עיזבון והגנה על הרכוש הפרטי שלכם מנטל מס מיותר.',
    s4_full_desc: 'הודות לזרימות עבודה דיגיטליות מודרניות, אנו עובדים ללא נייר, ביעילות ובשקיפות. מסמכים ותקשורת מנוהלים דיגיטלית — כך תמיד תהיה לכם תמונה ברורה של מצבכם המיסויי.',

    /* About page */
    page_about_title:  'משרדנו',
    about_roy_label:   'יועץ מס · מייסד',
    about_roy_bio:     'רוי רוזנק הוא יועץ מס מורשה בעל ניסיון רב בייעוץ ליזמים בינלאומיים. כיועץ רב-לשוני עם מומחיות בדיני המס הגרמניים, האירופאיים והישראלים, הוא מציע שילוב נדיר של דיוק משפטי וחשיבה יזמית. המשרד הוקם כדי לספק ללקוחות פתרונות מותאמים אישית החורגים מעמידה פשוטה בדרישות החוק.',
    values_label:  'הערכים שלנו',
    val1_title:    'בהירות',
    val1_desc:     'תרגום דיני מס מורכבים לאסטרטגיות מובנות — זו ההבטחה שלנו.',
    val2_title:    'שותפות',
    val2_desc:     'אנו חושבים לטווח ארוך ומלווים אתכם בכל החלטה עסקית.',
    val3_title:    'בינלאומי',
    val3_desc:     'מומחיות בשלוש שפות וארבעה מערכות משפט — ליזמים גלובליים.',
    reach_label:   'נוכחות בינלאומית',
    reach_text:    'אנו מייעצים ללקוחות בגרמניה, האיחוד האירופי, ארה״ב וישראל — עם הבנה עמוקה של מערכות המס והמשפט בכל אחת מהמדינות.',

    /* Contact page */
    page_contact_title: 'צור קשר',
    form_name:     'שם',
    form_email:    'אימייל',
    form_phone:    'טלפון (אופציונלי)',
    form_lang:     'שפה מועדפת',
    form_message:  'הודעה',
    form_submit:   'שלח',
    form_success:  'תודה! ניצור איתך קשר בקרוב.',
    wa_title:      'WhatsApp',
    wa_text:       'לתגובות מהירות, כתבו לנו ישירות ב-WhatsApp.',
    wa_btn:        'פתח צ\'אט',
    address_label: 'כתובת',
    wa_message:    'שלום, אני מעוניין/ת בייעוץ ראשוני חינמי.',
  }
};
```

- [ ] **Step 2: Commit**

```bash
git add translations.js
git commit -m "feat: add full DE/EN/HE translations dictionary"
```

---

## Task 3: i18n.js — language switcher + RTL

**Files:**
- Create: `rozenek-landing/i18n.js`

- [ ] **Step 1: Write i18n.js**

```js
(function () {
  const SUPPORTED = ['de', 'en', 'he'];
  const DEFAULT_LANG = 'de';

  function setLanguage(lang) {
    if (!SUPPORTED.includes(lang)) lang = DEFAULT_LANG;

    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'he' ? 'rtl' : 'ltr';

    const t = TRANSLATIONS[lang];
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      if (t[key] !== undefined) el.textContent = t[key];
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.dataset.i18nPlaceholder;
      if (t[key] !== undefined) el.placeholder = t[key];
    });

    document.querySelectorAll('[data-i18n-href]').forEach(el => {
      const lang_attr = el.dataset.i18nHref;
      if (lang_attr === 'wa') {
        const msg = encodeURIComponent(t['wa_message'] || '');
        el.href = `https://wa.me/4969667790680?text=${msg}`;
      }
    });

    document.querySelectorAll('.lang-switcher button, .mobile-lang button').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    localStorage.setItem('lang', lang);
  }

  function getSavedLang() {
    const saved = localStorage.getItem('lang');
    const browser = navigator.language?.slice(0, 2);
    if (SUPPORTED.includes(saved)) return saved;
    if (SUPPORTED.includes(browser)) return browser;
    return DEFAULT_LANG;
  }

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.lang-switcher button, .mobile-lang button').forEach(btn => {
      btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
    });
    setLanguage(getSavedLang());
  });
})();
```

- [ ] **Step 2: Verify manually**

After building index.html (Task 5), open in browser, click DE / EN / עב in nav. Verify:
- Text changes language throughout
- For עב: `<html dir="rtl">` is set and layout mirrors
- `localStorage` retains choice on page reload
- WhatsApp link in contact.html updates message language

- [ ] **Step 3: Commit**

```bash
git add i18n.js
git commit -m "feat: add i18n engine with RTL toggle and localStorage persistence"
```

---

## Task 4: main.js — cursor, reveals, nav, burger

**Files:**
- Create: `rozenek-landing/main.js`

- [ ] **Step 1: Write main.js**

```js
document.addEventListener('DOMContentLoaded', () => {

  /* ── Custom Cursor ── */
  const dot  = document.getElementById('cur-dot');
  const ring = document.getElementById('cur-ring');

  if (dot && ring && window.matchMedia('(pointer: fine)').matches) {
    let mx = 0, my = 0, rx = 0, ry = 0;

    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

    (function loop() {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      dot.style.transform  = `translate(${mx - 3.5}px, ${my - 3.5}px)`;
      ring.style.transform = `translate(${rx - 18}px, ${ry - 18}px)`;
      requestAnimationFrame(loop);
    })();

    document.querySelectorAll('a, button, [role="button"]').forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
    });
  }

  /* ── Nav scroll shadow ── */
  const nav = document.querySelector('nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 10);
    }, { passive: true });
  }

  /* ── Burger menu ── */
  const burger = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobile-menu');
  if (burger && mobileMenu) {
    burger.addEventListener('click', () => {
      const open = mobileMenu.classList.toggle('open');
      burger.setAttribute('aria-expanded', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ── Scroll reveals ── */
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
    }, { threshold: 0.12 });
    revealEls.forEach(el => observer.observe(el));
  }

});
```

- [ ] **Step 2: Commit**

```bash
git add main.js
git commit -m "feat: add cursor, nav scroll shadow, burger menu, scroll reveals"
```

---

## Task 5: index.html — Homepage

**Files:**
- Create: `rozenek-landing/index.html`

- [ ] **Step 1: Write index.html**

```html
<!DOCTYPE html>
<html lang="de" dir="ltr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Steuerkanzlei Rozenek — Frankfurt am Main</title>
  <meta name="description" content="Steuerberatung, internationale Unternehmensstrukturen und Vermögensplanung. Frankfurt am Main.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="style.css">
  <style>
    /* ── Hero ── */
    .hero { display: grid; grid-template-columns: 1fr 1fr; min-height: calc(100vh - var(--nav-h)); }
    .hero-left {
      padding: 72px 48px; display: flex; flex-direction: column;
      justify-content: space-between; border-right: 1px solid var(--line);
    }
    .hero-label { font-size: 10px; letter-spacing: .18em; text-transform: uppercase; color: var(--muted); margin-bottom: 28px; }
    .hero-title { font-family: var(--serif); font-size: 56px; font-weight: 300; line-height: 1.12; }
    .hero-title span { display: block; }
    .hero-title .accent { color: var(--accent); font-style: italic; }
    .hero-subtitle { font-size: 13px; color: var(--muted); line-height: 1.85; max-width: 380px; margin-top: 24px; }
    .hero-stats { display: flex; gap: 40px; padding-top: 36px; border-top: 1px solid var(--line); }
    .stat-num { font-family: var(--serif); font-size: 36px; font-weight: 300; color: var(--accent); }
    .stat-label { font-size: 10px; letter-spacing: .12em; text-transform: uppercase; color: var(--muted); margin-top: 4px; }
    .hero-right {
      background: var(--bg-dark); padding: 72px 48px;
      display: flex; flex-direction: column; justify-content: flex-end;
      position: relative; overflow: hidden;
    }
    .hero-right::before {
      content: ''; position: absolute; inset: 0;
      background-image: linear-gradient(rgba(61,90,128,.07) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(61,90,128,.07) 1px, transparent 1px);
      background-size: 52px 52px;
    }
    .hero-img-label { font-size: 10px; letter-spacing: .15em; text-transform: uppercase; color: rgba(255,255,255,.3); margin-bottom: 24px; position: relative; }
    .quote-block { position: relative; border-left: 2px solid var(--accent); padding-left: 24px; }
    .quote-text { font-family: var(--serif); font-size: 24px; font-weight: 300; font-style: italic; color: #fff; line-height: 1.55; margin-bottom: 16px; }
    .quote-author { font-size: 11px; letter-spacing: .1em; text-transform: uppercase; color: rgba(255,255,255,.4); }
    /* ── Services strip ── */
    .services-strip { border-top: 1px solid var(--line); }
    .services-label-bar {
      padding: 16px 48px; background: rgba(61,90,128,.04);
      border-bottom: 1px solid var(--line);
      font-size: 10px; letter-spacing: .16em; text-transform: uppercase; color: var(--muted);
    }
    .services-grid { display: grid; grid-template-columns: repeat(4, 1fr); }
    .service-item { padding: 40px 32px; border-right: 1px solid var(--line); transition: background .2s; }
    .service-item:last-child { border-right: none; }
    .service-item:hover { background: rgba(61,90,128,.03); }
    .service-num { font-size: 10px; color: var(--accent); letter-spacing: .1em; margin-bottom: 14px; }
    .service-name { font-family: var(--serif); font-size: 20px; font-weight: 300; margin-bottom: 10px; }
    .service-desc { font-size: 12px; color: var(--muted); line-height: 1.75; }
    .service-link { display: inline-block; margin-top: 18px; font-size: 11px; letter-spacing: .08em; color: var(--accent); border-bottom: 1px solid currentColor; padding-bottom: 2px; transition: opacity .2s; }
    .service-link:hover { opacity: .7; }
    /* ── About teaser ── */
    .about-strip { display: grid; grid-template-columns: 1fr 1fr; border-top: 1px solid var(--line); }
    .about-left { padding: 72px 48px; border-right: 1px solid var(--line); }
    .about-label { font-size: 10px; letter-spacing: .18em; text-transform: uppercase; color: var(--muted); margin-bottom: 24px; }
    .about-title { font-family: var(--serif); font-size: 38px; font-weight: 300; font-style: italic; line-height: 1.25; margin-bottom: 20px; }
    .about-text { font-size: 13px; color: var(--muted); line-height: 1.85; max-width: 400px; }
    .about-cta { display: inline-block; margin-top: 28px; font-size: 12px; letter-spacing: .08em; color: var(--text); border-bottom: 1px solid var(--text); padding-bottom: 3px; transition: color .2s, border-color .2s; }
    .about-cta:hover { color: var(--accent); border-color: var(--accent); }
    .about-right { padding: 72px 48px; background: rgba(61,90,128,.04); display: flex; align-items: center; }
  </style>
</head>
<body>

<!-- Cursor -->
<div class="cur" id="cur-dot"></div>
<div class="cur" id="cur-ring"></div>

<!-- Nav -->
<nav>
  <a href="index.html" class="nav-logo">Steuerkanzlei Rozenek</a>
  <div class="nav-links">
    <a href="services.html" data-i18n="nav_services">Leistungen</a>
    <a href="about.html"    data-i18n="nav_about">Kanzlei</a>
    <a href="contact.html"  data-i18n="nav_contact">Kontakt</a>
  </div>
  <div class="nav-right">
    <div class="lang-switcher">
      <button data-lang="de" class="active">DE</button>
      <span class="lang-sep">|</span>
      <button data-lang="en">EN</button>
      <span class="lang-sep">|</span>
      <button data-lang="he">עב</button>
    </div>
    <a href="contact.html" class="nav-cta" data-i18n="nav_cta">Erstberatung</a>
  </div>
  <button class="burger" id="burger" aria-label="Menu" aria-expanded="false">
    <span></span><span></span><span></span>
  </button>
</nav>

<!-- Mobile menu -->
<div class="mobile-menu" id="mobile-menu">
  <a href="services.html" data-i18n="nav_services">Leistungen</a>
  <a href="about.html"    data-i18n="nav_about">Kanzlei</a>
  <a href="contact.html"  data-i18n="nav_contact">Kontakt</a>
  <a href="contact.html" class="nav-cta" style="margin-top:8px" data-i18n="nav_cta">Erstberatung</a>
  <div class="mobile-lang">
    <button data-lang="de" class="active">DE</button>
    <button data-lang="en">EN</button>
    <button data-lang="he">עב</button>
  </div>
</div>

<!-- Hero -->
<section class="hero">
  <div class="hero-left">
    <div>
      <p class="hero-label reveal" data-i18n="hero_label">Frankfurt am Main · Steuerberatung</p>
      <h1 class="hero-title reveal">
        <span data-i18n="hero_title_1">Ihr Partner für</span>
        <span class="accent" data-i18n="hero_title_2">klare Strukturen,</span>
        <span data-i18n="hero_title_3">sichere Entscheidungen.</span>
      </h1>
      <p class="hero-subtitle reveal" data-i18n="hero_subtitle">Steuerberatung, internationale Unternehmensstrukturen und Vermögensplanung für Unternehmer in DACH, Europa und Israel.</p>
    </div>
    <div class="hero-stats reveal">
      <div><div class="stat-num">15+</div><div class="stat-label" data-i18n="stat_years_label">Jahre Erfahrung</div></div>
      <div><div class="stat-num">3</div><div class="stat-label" data-i18n="stat_langs_label">Sprachen</div></div>
      <div><div class="stat-num">4+</div><div class="stat-label" data-i18n="stat_countries_label">Länder</div></div>
    </div>
  </div>
  <div class="hero-right">
    <p class="hero-img-label">Roy Rozenek · Steuerberater · Frankfurt</p>
    <div class="quote-block reveal">
      <p class="quote-text" data-i18n="hero_quote">"Steuerrecht ist keine Last — es ist eine strategische Chance."</p>
      <p class="quote-author" data-i18n="hero_quote_author">Roy Rozenek, Steuerberater</p>
    </div>
  </div>
</section>

<!-- Services strip -->
<section class="services-strip">
  <div class="services-label-bar" data-i18n="services_label">Leistungen</div>
  <div class="services-grid">
    <div class="service-item reveal">
      <div class="service-num">01</div>
      <div class="service-name" data-i18n="s1_name">Steueroptimierung</div>
      <div class="service-desc" data-i18n="s1_desc">Strategische Steuerplanung und -optimierung für Privatpersonen und Unternehmen.</div>
      <a href="services.html" class="service-link" data-i18n="s1_link">Mehr →</a>
    </div>
    <div class="service-item reveal">
      <div class="service-num">02</div>
      <div class="service-name" data-i18n="s2_name">Internationale Strukturen</div>
      <div class="service-desc" data-i18n="s2_desc">Grenzüberschreitende Unternehmensstrukturen in DACH, Europa, USA und Israel.</div>
      <a href="services.html" class="service-link" data-i18n="s2_link">Mehr →</a>
    </div>
    <div class="service-item reveal">
      <div class="service-num">03</div>
      <div class="service-name" data-i18n="s3_name">Vermögensplanung</div>
      <div class="service-desc" data-i18n="s3_desc">Umfassende Vermögensplanung und Vermögensschutzstrategien.</div>
      <a href="services.html" class="service-link" data-i18n="s3_link">Mehr →</a>
    </div>
    <div class="service-item reveal">
      <div class="service-num">04</div>
      <div class="service-name" data-i18n="s4_name">Digital Consulting</div>
      <div class="service-desc" data-i18n="s4_desc">Moderne digitale Workflows für papierloses Steuer-Management.</div>
      <a href="services.html" class="service-link" data-i18n="s4_link">Mehr →</a>
    </div>
  </div>
</section>

<!-- About teaser -->
<section class="about-strip">
  <div class="about-left">
    <p class="about-label reveal" data-i18n="about_label">Die Kanzlei</p>
    <h2 class="about-title reveal" data-i18n="about_title">Mehr als Buchhaltung — ein strategischer Partner.</h2>
    <p class="about-text reveal" data-i18n="about_text">Roy Rozenek, Steuerberater, gründete die Kanzlei mit einem Ziel...</p>
    <a href="about.html" class="about-cta reveal" data-i18n="about_cta">Über uns →</a>
  </div>
  <div class="about-right">
    <div class="quote-block reveal">
      <p class="quote-text" style="color:var(--text);font-size:20px" data-i18n="hero_quote">"Steuerrecht ist keine Last — es ist eine strategische Chance."</p>
      <p class="quote-author" style="color:var(--muted)" data-i18n="hero_quote_author">Roy Rozenek, Steuerberater</p>
    </div>
  </div>
</section>

<!-- CTA Band -->
<section class="cta-band">
  <p class="cta-band-text reveal" data-i18n="cta_text">Starten Sie mit einer kostenlosen Erstberatung.</p>
  <div class="cta-band-buttons reveal">
    <a href="contact.html" class="btn-primary" data-i18n="cta_btn_form">Formular ausfüllen</a>
    <a href="contact.html" class="btn-wa" data-i18n="cta_btn_wa">WhatsApp ↗</a>
  </div>
</section>

<!-- Footer -->
<footer>
  <div class="footer-grid">
    <div class="footer-brand">
      <div class="logo">Steuerkanzlei Rozenek</div>
      <p>Schwindstraße 10<br>60325 Frankfurt am Main<br>+49(0)69 66779068-0<br>info@steuerkanzlei-rozenek.de</p>
    </div>
    <div class="footer-col">
      <div class="footer-col-title" data-i18n="footer_col_services">Leistungen</div>
      <a href="services.html" data-i18n="s1_name">Steueroptimierung</a>
      <a href="services.html" data-i18n="s2_name">Internationale Strukturen</a>
      <a href="services.html" data-i18n="s3_name">Vermögensplanung</a>
      <a href="services.html" data-i18n="s4_name">Digital Consulting</a>
    </div>
    <div class="footer-col">
      <div class="footer-col-title" data-i18n="footer_col_firm">Kanzlei</div>
      <a href="about.html"   data-i18n="nav_about">Kanzlei</a>
      <a href="contact.html" data-i18n="nav_contact">Kontakt</a>
      <a href="impressum.html"    data-i18n="footer_impressum">Impressum</a>
      <a href="datenschutz.html"  data-i18n="footer_privacy">Datenschutz</a>
    </div>
    <div>
      <div class="footer-col-title" data-i18n="footer_col_lang">Sprache</div>
      <div class="footer-flags">🇩🇪 🇬🇧 🇮🇱</div>
    </div>
  </div>
  <div class="footer-bottom">
    <span class="footer-bottom-left" data-i18n="footer_copy">© 2025 Steuerkanzlei Rozenek · Frankfurt am Main</span>
    <div class="footer-bottom-right">
      <a href="impressum.html"   data-i18n="footer_impressum">Impressum</a>
      <a href="datenschutz.html" data-i18n="footer_privacy">Datenschutz</a>
    </div>
  </div>
</footer>

<script src="translations.js"></script>
<script src="i18n.js"></script>
<script src="main.js"></script>
</body>
</html>
```

- [ ] **Step 2: Open in browser and verify**

Open `index.html` directly in a browser (double-click or `open index.html`). Check:
- [ ] Fonts load (Cormorant Garamond italic hero title)
- [ ] Hero two-column layout renders
- [ ] Stats row visible at bottom of hero-left
- [ ] Quote block visible in dark right panel
- [ ] Services 4-column grid renders
- [ ] About teaser two-column renders
- [ ] CTA band dark with two buttons
- [ ] Footer 4-column grid
- [ ] Click DE / EN / עב — text changes language, עב activates RTL (layout mirrors)

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: build homepage — hero, services strip, about teaser, CTA band, footer"
```

---

## Task 6: services.html — Leistungen

**Files:**
- Create: `rozenek-landing/services.html`

- [ ] **Step 1: Write services.html**

```html
<!DOCTYPE html>
<html lang="de" dir="ltr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Leistungen — Steuerkanzlei Rozenek</title>
  <meta name="description" content="Steueroptimierung, internationale Strukturen, Vermögensplanung und Digital Consulting.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="style.css">
  <style>
    .services-list { padding: 0 48px; }
    .service-row {
      display: grid; grid-template-columns: 80px 1fr;
      gap: 48px; padding: 64px 0;
      border-bottom: 1px solid var(--line);
      align-items: start;
    }
    .service-row:last-child { border-bottom: none; }
    .service-row-num { font-family: var(--serif); font-size: 48px; font-weight: 300; color: var(--accent); opacity: .4; line-height: 1; padding-top: 6px; }
    .service-row-body { max-width: 720px; }
    .service-row-name { font-family: var(--serif); font-size: 40px; font-weight: 300; font-style: italic; margin-bottom: 20px; line-height: 1.15; }
    .service-row-desc { font-size: 14px; color: var(--muted); line-height: 1.9; }
    .service-row-accent { display: block; width: 32px; height: 2px; background: var(--accent); margin-bottom: 20px; }
    @media (max-width: 860px) {
      .services-list { padding: 0 24px; }
      .service-row { grid-template-columns: 1fr; gap: 16px; padding: 48px 0; }
      .service-row-num { font-size: 32px; }
      .service-row-name { font-size: 28px; }
    }
    @media (max-width: 480px) {
      .services-list { padding: 0 20px; }
    }
  </style>
</head>
<body>

<div class="cur" id="cur-dot"></div>
<div class="cur" id="cur-ring"></div>

<nav>
  <a href="index.html" class="nav-logo">Steuerkanzlei Rozenek</a>
  <div class="nav-links">
    <a href="services.html" class="active" data-i18n="nav_services">Leistungen</a>
    <a href="about.html"    data-i18n="nav_about">Kanzlei</a>
    <a href="contact.html"  data-i18n="nav_contact">Kontakt</a>
  </div>
  <div class="nav-right">
    <div class="lang-switcher">
      <button data-lang="de" class="active">DE</button>
      <span class="lang-sep">|</span>
      <button data-lang="en">EN</button>
      <span class="lang-sep">|</span>
      <button data-lang="he">עב</button>
    </div>
    <a href="contact.html" class="nav-cta" data-i18n="nav_cta">Erstberatung</a>
  </div>
  <button class="burger" id="burger" aria-label="Menu" aria-expanded="false">
    <span></span><span></span><span></span>
  </button>
</nav>

<div class="mobile-menu" id="mobile-menu">
  <a href="services.html" data-i18n="nav_services">Leistungen</a>
  <a href="about.html"    data-i18n="nav_about">Kanzlei</a>
  <a href="contact.html"  data-i18n="nav_contact">Kontakt</a>
  <a href="contact.html" class="nav-cta" style="margin-top:8px" data-i18n="nav_cta">Erstberatung</a>
  <div class="mobile-lang">
    <button data-lang="de" class="active">DE</button>
    <button data-lang="en">EN</button>
    <button data-lang="he">עב</button>
  </div>
</div>

<div class="page-hero">
  <p class="page-hero-label reveal">Steuerkanzlei Rozenek</p>
  <h1 class="page-hero-title reveal" data-i18n="page_services_title">Leistungen</h1>
  <p style="margin-top:16px;font-size:14px;color:var(--muted);max-width:480px" class="reveal" data-i18n="page_services_subtitle">Maßgeschneiderte Steuerstrategien für Unternehmer.</p>
</div>

<div class="services-list">
  <div class="service-row reveal">
    <div class="service-row-num">01</div>
    <div class="service-row-body">
      <span class="service-row-accent"></span>
      <h2 class="service-row-name" data-i18n="s1_name">Steueroptimierung</h2>
      <p class="service-row-desc" data-i18n="s1_full_desc">Wir analysieren Ihre steuerliche Situation ganzheitlich...</p>
    </div>
  </div>
  <div class="service-row reveal">
    <div class="service-row-num">02</div>
    <div class="service-row-body">
      <span class="service-row-accent"></span>
      <h2 class="service-row-name" data-i18n="s2_name">Internationale Strukturen</h2>
      <p class="service-row-desc" data-i18n="s2_full_desc">Ob Holdingstrukturen...</p>
    </div>
  </div>
  <div class="service-row reveal">
    <div class="service-row-num">03</div>
    <div class="service-row-body">
      <span class="service-row-accent"></span>
      <h2 class="service-row-name" data-i18n="s3_name">Vermögensplanung</h2>
      <p class="service-row-desc" data-i18n="s3_full_desc">Ihre Vermögenssicherung...</p>
    </div>
  </div>
  <div class="service-row reveal">
    <div class="service-row-num">04</div>
    <div class="service-row-body">
      <span class="service-row-accent"></span>
      <h2 class="service-row-name" data-i18n="s4_name">Digital Consulting</h2>
      <p class="service-row-desc" data-i18n="s4_full_desc">Dank moderner digitaler Workflows...</p>
    </div>
  </div>
</div>

<section class="cta-band" style="margin-top:80px">
  <p class="cta-band-text reveal" data-i18n="cta_text">Starten Sie mit einer kostenlosen Erstberatung.</p>
  <div class="cta-band-buttons reveal">
    <a href="contact.html" class="btn-primary" data-i18n="cta_btn_form">Formular ausfüllen</a>
    <a href="contact.html" class="btn-wa" data-i18n="cta_btn_wa">WhatsApp ↗</a>
  </div>
</section>

<footer>
  <div class="footer-grid">
    <div class="footer-brand">
      <div class="logo">Steuerkanzlei Rozenek</div>
      <p>Schwindstraße 10<br>60325 Frankfurt am Main<br>+49(0)69 66779068-0<br>info@steuerkanzlei-rozenek.de</p>
    </div>
    <div class="footer-col">
      <div class="footer-col-title" data-i18n="footer_col_services">Leistungen</div>
      <a href="services.html" data-i18n="s1_name">Steueroptimierung</a>
      <a href="services.html" data-i18n="s2_name">Internationale Strukturen</a>
      <a href="services.html" data-i18n="s3_name">Vermögensplanung</a>
      <a href="services.html" data-i18n="s4_name">Digital Consulting</a>
    </div>
    <div class="footer-col">
      <div class="footer-col-title" data-i18n="footer_col_firm">Kanzlei</div>
      <a href="about.html"   data-i18n="nav_about">Kanzlei</a>
      <a href="contact.html" data-i18n="nav_contact">Kontakt</a>
      <a href="impressum.html"   data-i18n="footer_impressum">Impressum</a>
      <a href="datenschutz.html" data-i18n="footer_privacy">Datenschutz</a>
    </div>
    <div>
      <div class="footer-col-title" data-i18n="footer_col_lang">Sprache</div>
      <div class="footer-flags">🇩🇪 🇬🇧 🇮🇱</div>
    </div>
  </div>
  <div class="footer-bottom">
    <span class="footer-bottom-left" data-i18n="footer_copy">© 2025 Steuerkanzlei Rozenek · Frankfurt am Main</span>
    <div class="footer-bottom-right">
      <a href="impressum.html"   data-i18n="footer_impressum">Impressum</a>
      <a href="datenschutz.html" data-i18n="footer_privacy">Datenschutz</a>
    </div>
  </div>
</footer>

<script src="translations.js"></script>
<script src="i18n.js"></script>
<script src="main.js"></script>
</body>
</html>
```

- [ ] **Step 2: Open services.html in browser and verify**
- [ ] 4 service rows with number / accent line / title / description
- [ ] Scroll reveals animate in
- [ ] Language switch updates all service names and descriptions
- [ ] CTA band visible at bottom

- [ ] **Step 3: Commit**

```bash
git add services.html
git commit -m "feat: build services page with 4 service rows"
```

---

## Task 7: about.html — Kanzlei

**Files:**
- Create: `rozenek-landing/about.html`

- [ ] **Step 1: Write about.html**

```html
<!DOCTYPE html>
<html lang="de" dir="ltr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Kanzlei — Steuerkanzlei Rozenek</title>
  <meta name="description" content="Roy Rozenek, Steuerberater. Internationale Steuerberatung in Frankfurt am Main.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="style.css">
  <style>
    /* Roy section */
    .roy-section { display: grid; grid-template-columns: 1fr 1fr; border-bottom: 1px solid var(--line); }
    .roy-photo {
      background: var(--bg-dark); min-height: 480px;
      display: flex; align-items: flex-end; padding: 40px;
      position: relative; overflow: hidden;
    }
    .roy-photo::before {
      content: ''; position: absolute; inset: 0;
      background-image: linear-gradient(rgba(61,90,128,.06) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(61,90,128,.06) 1px, transparent 1px);
      background-size: 48px 48px;
    }
    .roy-photo-label { position: relative; font-family: var(--serif); font-size: 28px; font-weight: 300; font-style: italic; color: #fff; line-height: 1.3; }
    .roy-bio { padding: 64px 48px; display: flex; flex-direction: column; justify-content: center; }
    .roy-bio-label { font-size: 10px; letter-spacing: .18em; text-transform: uppercase; color: var(--muted); margin-bottom: 8px; }
    .roy-name { font-family: var(--serif); font-size: 44px; font-weight: 300; margin-bottom: 24px; line-height: 1.1; }
    .roy-bio-text { font-size: 13px; color: var(--muted); line-height: 1.9; max-width: 440px; }
    /* Values */
    .values-section { padding: 80px 48px; border-bottom: 1px solid var(--line); }
    .values-label { font-size: 10px; letter-spacing: .18em; text-transform: uppercase; color: var(--muted); margin-bottom: 48px; }
    .values-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 48px; }
    .value-item { border-top: 2px solid var(--accent); padding-top: 24px; }
    .value-num { font-size: 10px; color: var(--accent); letter-spacing: .1em; margin-bottom: 16px; }
    .value-title { font-family: var(--serif); font-size: 28px; font-weight: 300; font-style: italic; margin-bottom: 12px; }
    .value-desc { font-size: 12px; color: var(--muted); line-height: 1.8; }
    /* Reach */
    .reach-section { display: grid; grid-template-columns: 1fr 1fr; }
    .reach-left { padding: 64px 48px; background: rgba(61,90,128,.04); display: flex; flex-direction: column; justify-content: center; border-right: 1px solid var(--line); }
    .reach-label { font-size: 10px; letter-spacing: .18em; text-transform: uppercase; color: var(--muted); margin-bottom: 24px; }
    .reach-title { font-family: var(--serif); font-size: 36px; font-weight: 300; font-style: italic; line-height: 1.25; margin-bottom: 20px; }
    .reach-text { font-size: 13px; color: var(--muted); line-height: 1.85; }
    .reach-right { padding: 64px 48px; display: flex; align-items: center; justify-content: center; }
    .flags-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; }
    .flag-item { text-align: center; }
    .flag-item .flag { font-size: 48px; margin-bottom: 8px; }
    .flag-item .flag-label { font-size: 11px; letter-spacing: .1em; text-transform: uppercase; color: var(--muted); }
    @media (max-width: 860px) {
      .roy-section  { grid-template-columns: 1fr; }
      .roy-photo    { min-height: 280px; }
      .roy-bio      { padding: 40px 24px; }
      .values-section { padding: 56px 24px; }
      .values-grid  { grid-template-columns: 1fr; gap: 32px; }
      .reach-section { grid-template-columns: 1fr; }
      .reach-right  { display: none; }
    }
  </style>
</head>
<body>

<div class="cur" id="cur-dot"></div>
<div class="cur" id="cur-ring"></div>

<nav>
  <a href="index.html" class="nav-logo">Steuerkanzlei Rozenek</a>
  <div class="nav-links">
    <a href="services.html" data-i18n="nav_services">Leistungen</a>
    <a href="about.html" class="active" data-i18n="nav_about">Kanzlei</a>
    <a href="contact.html"  data-i18n="nav_contact">Kontakt</a>
  </div>
  <div class="nav-right">
    <div class="lang-switcher">
      <button data-lang="de" class="active">DE</button>
      <span class="lang-sep">|</span>
      <button data-lang="en">EN</button>
      <span class="lang-sep">|</span>
      <button data-lang="he">עב</button>
    </div>
    <a href="contact.html" class="nav-cta" data-i18n="nav_cta">Erstberatung</a>
  </div>
  <button class="burger" id="burger" aria-label="Menu" aria-expanded="false">
    <span></span><span></span><span></span>
  </button>
</nav>

<div class="mobile-menu" id="mobile-menu">
  <a href="services.html" data-i18n="nav_services">Leistungen</a>
  <a href="about.html"    data-i18n="nav_about">Kanzlei</a>
  <a href="contact.html"  data-i18n="nav_contact">Kontakt</a>
  <a href="contact.html" class="nav-cta" style="margin-top:8px" data-i18n="nav_cta">Erstberatung</a>
  <div class="mobile-lang">
    <button data-lang="de" class="active">DE</button>
    <button data-lang="en">EN</button>
    <button data-lang="he">עב</button>
  </div>
</div>

<div class="page-hero">
  <p class="page-hero-label reveal">Steuerkanzlei Rozenek</p>
  <h1 class="page-hero-title reveal" data-i18n="page_about_title">Die Kanzlei</h1>
</div>

<!-- Roy section -->
<section class="roy-section">
  <div class="roy-photo reveal">
    <div class="roy-photo-label">Roy Rozenek<br>Steuerberater</div>
  </div>
  <div class="roy-bio reveal">
    <p class="roy-bio-label" data-i18n="about_roy_label">Steuerberater · Gründer</p>
    <h2 class="roy-name">Roy Rozenek</h2>
    <p class="roy-bio-text" data-i18n="about_roy_bio">Roy Rozenek ist zugelassener Steuerberater...</p>
  </div>
</section>

<!-- Values -->
<section class="values-section">
  <p class="values-label reveal" data-i18n="values_label">Unsere Werte</p>
  <div class="values-grid">
    <div class="value-item reveal">
      <div class="value-num">01</div>
      <h3 class="value-title" data-i18n="val1_title">Klarheit</h3>
      <p class="value-desc" data-i18n="val1_desc">Komplexes Steuerrecht in verständliche Strategien übersetzen.</p>
    </div>
    <div class="value-item reveal">
      <div class="value-num">02</div>
      <h3 class="value-title" data-i18n="val2_title">Partnerschaft</h3>
      <p class="value-desc" data-i18n="val2_desc">Wir denken langfristig und begleiten Sie bei jeder Entscheidung.</p>
    </div>
    <div class="value-item reveal">
      <div class="value-num">03</div>
      <h3 class="value-title" data-i18n="val3_title">International</h3>
      <p class="value-desc" data-i18n="val3_desc">Kompetenz in drei Sprachen und vier Rechtssystemen.</p>
    </div>
  </div>
</section>

<!-- International reach -->
<section class="reach-section">
  <div class="reach-left">
    <p class="reach-label reveal" data-i18n="reach_label">Internationale Präsenz</p>
    <h2 class="reach-title reveal">DE · EU · US · IL</h2>
    <p class="reach-text reveal" data-i18n="reach_text">Wir beraten Mandanten in Deutschland, der EU, den USA und Israel.</p>
  </div>
  <div class="reach-right reveal">
    <div class="flags-grid">
      <div class="flag-item"><div class="flag">🇩🇪</div><div class="flag-label">Deutschland</div></div>
      <div class="flag-item"><div class="flag">🇪🇺</div><div class="flag-label">Europa</div></div>
      <div class="flag-item"><div class="flag">🇺🇸</div><div class="flag-label">USA</div></div>
      <div class="flag-item"><div class="flag">🇮🇱</div><div class="flag-label">Israel</div></div>
    </div>
  </div>
</section>

<section class="cta-band">
  <p class="cta-band-text reveal" data-i18n="cta_text">Starten Sie mit einer kostenlosen Erstberatung.</p>
  <div class="cta-band-buttons reveal">
    <a href="contact.html" class="btn-primary" data-i18n="cta_btn_form">Formular ausfüllen</a>
    <a href="contact.html" class="btn-wa" data-i18n="cta_btn_wa">WhatsApp ↗</a>
  </div>
</section>

<footer>
  <div class="footer-grid">
    <div class="footer-brand">
      <div class="logo">Steuerkanzlei Rozenek</div>
      <p>Schwindstraße 10<br>60325 Frankfurt am Main<br>+49(0)69 66779068-0<br>info@steuerkanzlei-rozenek.de</p>
    </div>
    <div class="footer-col">
      <div class="footer-col-title" data-i18n="footer_col_services">Leistungen</div>
      <a href="services.html" data-i18n="s1_name">Steueroptimierung</a>
      <a href="services.html" data-i18n="s2_name">Internationale Strukturen</a>
      <a href="services.html" data-i18n="s3_name">Vermögensplanung</a>
      <a href="services.html" data-i18n="s4_name">Digital Consulting</a>
    </div>
    <div class="footer-col">
      <div class="footer-col-title" data-i18n="footer_col_firm">Kanzlei</div>
      <a href="about.html"   data-i18n="nav_about">Kanzlei</a>
      <a href="contact.html" data-i18n="nav_contact">Kontakt</a>
      <a href="impressum.html"   data-i18n="footer_impressum">Impressum</a>
      <a href="datenschutz.html" data-i18n="footer_privacy">Datenschutz</a>
    </div>
    <div>
      <div class="footer-col-title" data-i18n="footer_col_lang">Sprache</div>
      <div class="footer-flags">🇩🇪 🇬🇧 🇮🇱</div>
    </div>
  </div>
  <div class="footer-bottom">
    <span class="footer-bottom-left" data-i18n="footer_copy">© 2025 Steuerkanzlei Rozenek · Frankfurt am Main</span>
    <div class="footer-bottom-right">
      <a href="impressum.html"   data-i18n="footer_impressum">Impressum</a>
      <a href="datenschutz.html" data-i18n="footer_privacy">Datenschutz</a>
    </div>
  </div>
</footer>

<script src="translations.js"></script>
<script src="i18n.js"></script>
<script src="main.js"></script>
</body>
</html>
```

- [ ] **Step 2: Open about.html in browser and verify**
- [ ] Roy section dark/light split
- [ ] 3 values grid with accent top border
- [ ] Flags grid in reach section
- [ ] Language switch updates bio, values, reach text

- [ ] **Step 3: Commit**

```bash
git add about.html
git commit -m "feat: build about page — Roy bio, values, international reach"
```

---

## Task 8: contact.html — Kontakt

**Files:**
- Create: `rozenek-landing/contact.html`

- [ ] **Step 1: Write contact.html**

```html
<!DOCTYPE html>
<html lang="de" dir="ltr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Kontakt — Steuerkanzlei Rozenek</title>
  <meta name="description" content="Kontaktieren Sie Steuerkanzlei Rozenek in Frankfurt am Main.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="style.css">
  <style>
    .contact-grid { display: grid; grid-template-columns: 1fr 1fr; border-top: 1px solid var(--line); min-height: 540px; }
    .contact-form-col { padding: 64px 48px; border-right: 1px solid var(--line); }
    .contact-right-col { padding: 64px 48px; }
    .contact-col-label { font-size: 10px; letter-spacing: .18em; text-transform: uppercase; color: var(--muted); margin-bottom: 32px; }
    /* Form */
    .form-group { margin-bottom: 24px; }
    .form-group label { display: block; font-size: 11px; letter-spacing: .1em; text-transform: uppercase; color: var(--muted); margin-bottom: 8px; }
    .form-group input,
    .form-group select,
    .form-group textarea {
      width: 100%; padding: 12px 16px;
      border: 1px solid var(--line); background: transparent;
      font-family: var(--sans); font-size: 13px; color: var(--text);
      transition: border-color .2s; outline: none;
      appearance: none;
    }
    .form-group input:focus,
    .form-group select:focus,
    .form-group textarea:focus { border-color: var(--accent); }
    .form-group textarea { resize: vertical; min-height: 120px; }
    .form-submit {
      width: 100%; padding: 16px; background: var(--accent); color: #fff;
      font-size: 12px; letter-spacing: .1em; text-transform: uppercase;
      border: none; cursor: pointer; transition: background .2s;
      font-family: var(--sans);
    }
    .form-submit:hover { background: #2e4460; }
    .form-success {
      display: none; padding: 20px; border-left: 3px solid var(--accent);
      background: rgba(61,90,128,.06); font-size: 14px; color: var(--text);
      font-family: var(--serif); font-style: italic; font-size: 18px;
      line-height: 1.5;
    }
    /* WhatsApp card */
    .wa-card {
      border: 1px solid var(--line); padding: 32px; margin-bottom: 40px;
      transition: border-color .2s;
    }
    .wa-card:hover { border-color: var(--accent); }
    .wa-card-title { font-family: var(--serif); font-size: 28px; font-weight: 300; font-style: italic; margin-bottom: 12px; }
    .wa-card-text { font-size: 13px; color: var(--muted); margin-bottom: 24px; line-height: 1.7; }
    .wa-btn {
      display: inline-flex; align-items: center; gap: 10px;
      background: #25D366; color: #fff; padding: 12px 24px;
      font-size: 12px; letter-spacing: .08em; text-transform: uppercase;
      transition: background .2s;
    }
    .wa-btn:hover { background: #1da851; }
    /* Address */
    .address-block { margin-top: 0; }
    .address-title { font-size: 10px; letter-spacing: .18em; text-transform: uppercase; color: var(--muted); margin-bottom: 16px; }
    .address-text { font-size: 13px; color: var(--text); line-height: 2; }
    .address-text a { color: var(--accent); }
    @media (max-width: 860px) {
      .contact-grid { grid-template-columns: 1fr; }
      .contact-form-col { padding: 40px 24px; border-right: none; border-bottom: 1px solid var(--line); }
      .contact-right-col { padding: 40px 24px; }
    }
    @media (max-width: 480px) {
      .contact-form-col, .contact-right-col { padding: 32px 20px; }
    }
  </style>
</head>
<body>

<div class="cur" id="cur-dot"></div>
<div class="cur" id="cur-ring"></div>

<nav>
  <a href="index.html" class="nav-logo">Steuerkanzlei Rozenek</a>
  <div class="nav-links">
    <a href="services.html" data-i18n="nav_services">Leistungen</a>
    <a href="about.html"    data-i18n="nav_about">Kanzlei</a>
    <a href="contact.html" class="active" data-i18n="nav_contact">Kontakt</a>
  </div>
  <div class="nav-right">
    <div class="lang-switcher">
      <button data-lang="de" class="active">DE</button>
      <span class="lang-sep">|</span>
      <button data-lang="en">EN</button>
      <span class="lang-sep">|</span>
      <button data-lang="he">עב</button>
    </div>
    <a href="contact.html" class="nav-cta" data-i18n="nav_cta">Erstberatung</a>
  </div>
  <button class="burger" id="burger" aria-label="Menu" aria-expanded="false">
    <span></span><span></span><span></span>
  </button>
</nav>

<div class="mobile-menu" id="mobile-menu">
  <a href="services.html" data-i18n="nav_services">Leistungen</a>
  <a href="about.html"    data-i18n="nav_about">Kanzlei</a>
  <a href="contact.html"  data-i18n="nav_contact">Kontakt</a>
  <a href="contact.html" class="nav-cta" style="margin-top:8px" data-i18n="nav_cta">Erstberatung</a>
  <div class="mobile-lang">
    <button data-lang="de" class="active">DE</button>
    <button data-lang="en">EN</button>
    <button data-lang="he">עב</button>
  </div>
</div>

<div class="page-hero">
  <p class="page-hero-label reveal">Steuerkanzlei Rozenek</p>
  <h1 class="page-hero-title reveal" data-i18n="page_contact_title">Kontakt</h1>
</div>

<div class="contact-grid">
  <!-- Left: Form -->
  <div class="contact-form-col">
    <p class="contact-col-label reveal" data-i18n="nav_cta">Erstberatung</p>

    <form id="contact-form" class="reveal" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
      <div class="form-group">
        <label for="name" data-i18n="form_name">Name</label>
        <input type="text" id="name" name="name" required data-i18n-placeholder="form_name" placeholder="Name">
      </div>
      <div class="form-group">
        <label for="email" data-i18n="form_email">E-Mail</label>
        <input type="email" id="email" name="email" required data-i18n-placeholder="form_email" placeholder="E-Mail">
      </div>
      <div class="form-group">
        <label for="phone" data-i18n="form_phone">Telefon (optional)</label>
        <input type="tel" id="phone" name="phone" data-i18n-placeholder="form_phone" placeholder="Telefon (optional)">
      </div>
      <div class="form-group">
        <label for="lang_pref" data-i18n="form_lang">Bevorzugte Sprache</label>
        <select id="lang_pref" name="lang_preference">
          <option value="de">Deutsch</option>
          <option value="en">English</option>
          <option value="he">עברית</option>
        </select>
      </div>
      <div class="form-group">
        <label for="message" data-i18n="form_message">Ihre Nachricht</label>
        <textarea id="message" name="message" required data-i18n-placeholder="form_message" placeholder="Ihre Nachricht"></textarea>
      </div>
      <button type="submit" class="form-submit" data-i18n="form_submit">Senden</button>
    </form>

    <div class="form-success" id="form-success" data-i18n="form_success">
      Vielen Dank! Wir melden uns in Kürze bei Ihnen.
    </div>
  </div>

  <!-- Right: WhatsApp + Address -->
  <div class="contact-right-col">
    <p class="contact-col-label reveal">WhatsApp · Adresse</p>

    <div class="wa-card reveal">
      <h3 class="wa-card-title" data-i18n="wa_title">WhatsApp</h3>
      <p class="wa-card-text" data-i18n="wa_text">Für schnelle Antworten schreiben Sie uns direkt auf WhatsApp.</p>
      <a class="wa-btn" href="https://wa.me/4969667790680" data-i18n-href="wa" target="_blank" rel="noopener">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        <span data-i18n="wa_btn">Chat öffnen</span>
      </a>
    </div>

    <div class="address-block reveal">
      <p class="address-title" data-i18n="address_label">Adresse</p>
      <div class="address-text">
        Steuerkanzlei Rozenek<br>
        Schwindstraße 10<br>
        60325 Frankfurt am Main<br>
        Deutschland<br><br>
        <a href="tel:+4969667790680">+49(0)69 66779068-0</a><br>
        <a href="mailto:info@steuerkanzlei-rozenek.de">info@steuerkanzlei-rozenek.de</a>
      </div>
    </div>
  </div>
</div>

<footer>
  <div class="footer-grid">
    <div class="footer-brand">
      <div class="logo">Steuerkanzlei Rozenek</div>
      <p>Schwindstraße 10<br>60325 Frankfurt am Main<br>+49(0)69 66779068-0<br>info@steuerkanzlei-rozenek.de</p>
    </div>
    <div class="footer-col">
      <div class="footer-col-title" data-i18n="footer_col_services">Leistungen</div>
      <a href="services.html" data-i18n="s1_name">Steueroptimierung</a>
      <a href="services.html" data-i18n="s2_name">Internationale Strukturen</a>
      <a href="services.html" data-i18n="s3_name">Vermögensplanung</a>
      <a href="services.html" data-i18n="s4_name">Digital Consulting</a>
    </div>
    <div class="footer-col">
      <div class="footer-col-title" data-i18n="footer_col_firm">Kanzlei</div>
      <a href="about.html"   data-i18n="nav_about">Kanzlei</a>
      <a href="contact.html" data-i18n="nav_contact">Kontakt</a>
      <a href="impressum.html"   data-i18n="footer_impressum">Impressum</a>
      <a href="datenschutz.html" data-i18n="footer_privacy">Datenschutz</a>
    </div>
    <div>
      <div class="footer-col-title" data-i18n="footer_col_lang">Sprache</div>
      <div class="footer-flags">🇩🇪 🇬🇧 🇮🇱</div>
    </div>
  </div>
  <div class="footer-bottom">
    <span class="footer-bottom-left" data-i18n="footer_copy">© 2025 Steuerkanzlei Rozenek · Frankfurt am Main</span>
    <div class="footer-bottom-right">
      <a href="impressum.html"   data-i18n="footer_impressum">Impressum</a>
      <a href="datenschutz.html" data-i18n="footer_privacy">Datenschutz</a>
    </div>
  </div>
</footer>

<script src="translations.js"></script>
<script src="i18n.js"></script>
<script src="main.js"></script>
<script>
  const form = document.getElementById('contact-form');
  const success = document.getElementById('form-success');
  if (form) {
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form));
      try {
        const res = await fetch(form.action, {
          method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(data)
        });
        if (res.ok) { form.style.display = 'none'; success.style.display = 'block'; }
        else { alert('Submission error. Please try again.'); }
      } catch { alert('Network error. Please try again.'); }
    });
  }
</script>
</body>
</html>
```

- [ ] **Step 2: Replace Formspree placeholder**

In `contact.html`, replace `YOUR_FORM_ID` on the `<form action>` with the actual Formspree endpoint once the client creates their account at formspree.io. Until then the form renders correctly but submissions will fail.

- [ ] **Step 3: Open contact.html in browser and verify**
- [ ] Form renders with all 5 fields
- [ ] WhatsApp card visible with green button
- [ ] Address block renders with phone and email links
- [ ] Language switch updates all labels and the WhatsApp pre-fill message
- [ ] Switching to עב shows Hebrew labels, RTL layout

- [ ] **Step 4: Commit**

```bash
git add contact.html
git commit -m "feat: build contact page — Formspree form, WhatsApp CTA, address"
```

---

## Task 9: Legal stub pages

**Files:**
- Create: `rozenek-landing/impressum.html`
- Create: `rozenek-landing/datenschutz.html`

- [ ] **Step 1: Write impressum.html**

```html
<!DOCTYPE html>
<html lang="de" dir="ltr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Impressum — Steuerkanzlei Rozenek</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="style.css">
  <style>
    .legal-body { max-width: 720px; padding: 64px 48px; }
    .legal-body h2 { font-family: var(--serif); font-size: 28px; font-weight: 300; font-style: italic; margin: 40px 0 16px; }
    .legal-body p  { font-size: 13px; color: var(--muted); line-height: 1.85; margin-bottom: 12px; }
    .legal-body a  { color: var(--accent); }
    @media (max-width: 480px) { .legal-body { padding: 40px 20px; } }
  </style>
</head>
<body>
<div class="cur" id="cur-dot"></div>
<div class="cur" id="cur-ring"></div>
<nav>
  <a href="index.html" class="nav-logo">Steuerkanzlei Rozenek</a>
  <div class="nav-links">
    <a href="services.html" data-i18n="nav_services">Leistungen</a>
    <a href="about.html"    data-i18n="nav_about">Kanzlei</a>
    <a href="contact.html"  data-i18n="nav_contact">Kontakt</a>
  </div>
  <div class="nav-right">
    <div class="lang-switcher">
      <button data-lang="de" class="active">DE</button>
      <span class="lang-sep">|</span>
      <button data-lang="en">EN</button>
      <span class="lang-sep">|</span>
      <button data-lang="he">עב</button>
    </div>
    <a href="contact.html" class="nav-cta" data-i18n="nav_cta">Erstberatung</a>
  </div>
  <button class="burger" id="burger" aria-label="Menu" aria-expanded="false">
    <span></span><span></span><span></span>
  </button>
</nav>
<div class="mobile-menu" id="mobile-menu">
  <a href="services.html" data-i18n="nav_services">Leistungen</a>
  <a href="about.html"    data-i18n="nav_about">Kanzlei</a>
  <a href="contact.html"  data-i18n="nav_contact">Kontakt</a>
  <div class="mobile-lang">
    <button data-lang="de" class="active">DE</button>
    <button data-lang="en">EN</button>
    <button data-lang="he">עב</button>
  </div>
</div>
<div class="page-hero">
  <p class="page-hero-label">Steuerkanzlei Rozenek</p>
  <h1 class="page-hero-title">Impressum</h1>
</div>
<div class="legal-body">
  <h2>Angaben gemäß § 5 TMG</h2>
  <p>Steuerkanzlei Rozenek<br>Schwindstraße 10<br>60325 Frankfurt am Main<br>Deutschland</p>
  <h2>Kontakt</h2>
  <p>Telefon: +49(0)69 66779068-0<br>E-Mail: <a href="mailto:info@steuerkanzlei-rozenek.de">info@steuerkanzlei-rozenek.de</a></p>
  <h2>Berufsbezeichnung und berufsrechtliche Regelungen</h2>
  <p>Berufsbezeichnung: Steuerberater (verliehen in der Bundesrepublik Deutschland)</p>
  <p><em>Dieser Inhalt wird vom Mandanten ausgefüllt. / This content is to be completed by the client.</em></p>
</div>
<footer>
  <div class="footer-grid">
    <div class="footer-brand"><div class="logo">Steuerkanzlei Rozenek</div></div>
    <div class="footer-col">
      <div class="footer-col-title" data-i18n="footer_col_services">Leistungen</div>
      <a href="services.html" data-i18n="s1_name">Steueroptimierung</a>
      <a href="services.html" data-i18n="s2_name">Internationale Strukturen</a>
    </div>
    <div class="footer-col">
      <div class="footer-col-title" data-i18n="footer_col_firm">Kanzlei</div>
      <a href="about.html" data-i18n="nav_about">Kanzlei</a>
      <a href="contact.html" data-i18n="nav_contact">Kontakt</a>
    </div>
    <div></div>
  </div>
  <div class="footer-bottom">
    <span class="footer-bottom-left" data-i18n="footer_copy">© 2025 Steuerkanzlei Rozenek · Frankfurt am Main</span>
    <div class="footer-bottom-right">
      <a href="impressum.html" data-i18n="footer_impressum">Impressum</a>
      <a href="datenschutz.html" data-i18n="footer_privacy">Datenschutz</a>
    </div>
  </div>
</footer>
<script src="translations.js"></script>
<script src="i18n.js"></script>
<script src="main.js"></script>
</body>
</html>
```

- [ ] **Step 2: Write datenschutz.html**

Copy `impressum.html`, change `<title>` to `Datenschutz — Steuerkanzlei Rozenek`, change the `<h1>` to `Datenschutz`, and replace the legal body content with:

```html
<div class="legal-body">
  <h2>Datenschutzerklärung</h2>
  <p>Der Schutz Ihrer persönlichen Daten ist uns ein besonderes Anliegen. Wir verarbeiten Ihre Daten daher ausschließlich auf Grundlage der gesetzlichen Bestimmungen (DSGVO, TKG 2003).</p>
  <h2>Kontaktformular</h2>
  <p>Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert.</p>
  <h2>Ihre Rechte</h2>
  <p>Ihnen stehen bezüglich Ihrer bei uns gespeicherten Daten grundsätzlich die Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit und Widerspruch zu.</p>
  <p><em>Dieser Inhalt wird vom Mandanten ausgefüllt. / This content is to be completed by the client.</em></p>
</div>
```

- [ ] **Step 3: Commit**

```bash
git add impressum.html datenschutz.html
git commit -m "feat: add legal stub pages (Impressum, Datenschutz)"
```

---

## Task 10: Final verification pass

- [ ] **Step 1: Open all 4 main pages and test across 3 languages**

For each page (`index.html`, `services.html`, `about.html`, `contact.html`):
- [ ] DE: all text in German, layout LTR
- [ ] EN: all text in English, layout LTR
- [ ] עב: all text in Hebrew, `<html dir="rtl">`, layout mirrors (nav links reversed, quote border switches side)

- [ ] **Step 2: Test responsive breakpoints**

Resize browser to 860px and 480px:
- [ ] 860px: burger appears, hero collapses to single column, services grid goes 2×2
- [ ] 480px: services grid goes 1 column, CTA band stacks vertically

- [ ] **Step 3: Test nav scroll behavior**

Scroll down any page — `box-shadow` should appear on nav after 10px scroll.

- [ ] **Step 4: Test contact form flow**

Submit the form (with a real Formspree ID if available). Verify:
- [ ] Form hides on success
- [ ] `form-success` message appears in the active language

- [ ] **Step 5: Test WhatsApp links**

Click WhatsApp button on contact page in each language. Verify the pre-filled message changes per language.

- [ ] **Step 6: Final commit**

```bash
git add -A
git commit -m "chore: final verification pass — all pages, all languages, responsive confirmed"
```

---

## Notes for the client

**Formspree setup (required for contact form):**
1. Create free account at https://formspree.io
2. Create a new form
3. Copy the form endpoint (e.g., `https://formspree.io/f/xpzgkbrd`)
4. Replace `YOUR_FORM_ID` in `contact.html` line with the `<form action>` attribute

**Hebrew translations:** Have a native Hebrew speaker review the `he` section of `translations.js` before launch — translations were generated with care but benefit from professional review.

**Legal pages:** `impressum.html` and `datenschutz.html` contain placeholder content. The client's lawyer should complete these before going live.
