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
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const key = el.dataset.i18nHtml;
      if (t[key] !== undefined) el.innerHTML = t[key];
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
