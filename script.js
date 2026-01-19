(() => {
  const langButtons = document.querySelectorAll('[data-lang].segmented__btn');
  const docButtons = document.querySelectorAll('[data-doc].segmented__btn');
  const docs = document.querySelectorAll('.doc');
  const yearEl = document.getElementById('year');

  const STORAGE_LANG = 'policy_lang';
  const STORAGE_DOC = 'policy_doc';

  function setSelected(buttons, activeBtn) {
    buttons.forEach(b => b.setAttribute('aria-selected', b === activeBtn ? 'true' : 'false'));
  }

  function showLang(lang) {
    const allLangArticles = document.querySelectorAll('.lang');
    allLangArticles.forEach(a => a.classList.remove('is-active'));

    docs.forEach(doc => {
      const active = doc.querySelector(`.lang[data-lang="${lang}"]`);
      if (active) active.classList.add('is-active');
    });

    const activeBtn = Array.from(langButtons).find(b => b.dataset.lang === lang) || langButtons[0];
    setSelected(langButtons, activeBtn);
    localStorage.setItem(STORAGE_LANG, lang);
    document.documentElement.lang = lang === 'ua' ? 'uk' : lang;
  }

  function showDoc(docName) {
    docs.forEach(d => {
      const isActive = d.dataset.doc === docName;
      d.hidden = !isActive;
    });

    const activeBtn = Array.from(docButtons).find(b => b.dataset.doc === docName) || docButtons[0];
    setSelected(docButtons, activeBtn);
    localStorage.setItem(STORAGE_DOC, docName);
  }

  langButtons.forEach(btn => {
    btn.addEventListener('click', () => showLang(btn.dataset.lang));
  });

  docButtons.forEach(btn => {
    btn.addEventListener('click', () => showDoc(btn.dataset.doc));
  });

  // init
  const initialLang = localStorage.getItem(STORAGE_LANG) || 'ru';
  const initialDoc = localStorage.getItem(STORAGE_DOC) || 'privacy';

  showDoc(initialDoc);
  showLang(initialLang);

  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
