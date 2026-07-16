/* ============================================================
   AI Course — global JS
   Handles: i18n, copy buttons, progress, glossary popovers,
            quiz scoring, TOC active-section highlighting
   NOTE: keep in sync with courses/investment/assets/js/app.js
         (only LANG_KEY / PROGRESS_KEY differ between the two)
   ============================================================ */

(function () {
  'use strict';

  // ---------- i18n: language toggle ----------
  const LANG_KEY = 'course-lang';          // shared across both courses
  function applyLang(lang) {
    document.documentElement.setAttribute('data-lang', lang);
    localStorage.setItem(LANG_KEY, lang);
    document.querySelectorAll('.lang-toggle button').forEach(b => {
      b.classList.toggle('active', b.dataset.lang === lang);
    });
    // Update <html lang>
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
  }
  function initLang() {
    const saved = localStorage.getItem(LANG_KEY) || 'zh';
    applyLang(saved);
    document.querySelectorAll('.lang-toggle button').forEach(b => {
      b.addEventListener('click', () => applyLang(b.dataset.lang));
    });
  }

  // ---------- Copy buttons ----------
  function initCopyButtons() {
    document.querySelectorAll('[data-copy]').forEach(btn => {
      btn.addEventListener('click', async () => {
        const target = btn.dataset.copy;
        let text = '';
        if (target.startsWith('#')) {
          const el = document.querySelector(target);
          text = el ? (el.innerText || el.textContent) : '';
        } else {
          text = target;
        }
        try {
          await navigator.clipboard.writeText(text);
          const original = btn.textContent;
          btn.textContent = '✓ Copied';
          btn.classList.add('copied');
          setTimeout(() => {
            btn.textContent = original;
            btn.classList.remove('copied');
          }, 1400);
        } catch (e) {
          btn.textContent = 'Copy failed';
        }
      });
    });
    // Auto-copy buttons in code-header
    document.querySelectorAll('pre').forEach(pre => {
      if (pre.dataset.nocopy === 'true') return;
      if (pre.previousElementSibling && pre.previousElementSibling.classList.contains('code-header')) return;
      const header = document.createElement('div');
      header.className = 'code-header';
      const label = pre.dataset.lang || 'code';
      header.innerHTML = `<span>${label}</span><button class="copy-btn">Copy</button>`;
      pre.parentNode.insertBefore(header, pre);
      header.querySelector('button').addEventListener('click', async () => {
        const text = pre.innerText;
        await navigator.clipboard.writeText(text);
        const btn = header.querySelector('button');
        btn.textContent = '✓ Copied';
        btn.classList.add('copied');
        setTimeout(() => { btn.textContent = 'Copy'; btn.classList.remove('copied'); }, 1400);
      });
    });
  }

  // ---------- Progress tracking ----------
  const PROGRESS_KEY = 'ai-course-progress';
  function getProgress() {
    try { return JSON.parse(localStorage.getItem(PROGRESS_KEY)) || {}; }
    catch { return {}; }
  }
  function setProgress(p) {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(p));
  }
  function markCurrentChapterRead() {
    const id = document.body.dataset.chapterId;
    if (!id) return;
    const p = getProgress();
    p[id] = { read: true, at: Date.now() };
    setProgress(p);
  }
  function paintProgressOnCards() {
    const p = getProgress();
    document.querySelectorAll('.card[data-chapter-id]').forEach(card => {
      if (p[card.dataset.chapterId]?.read) card.classList.add('done');
    });
    // Total progress count
    const el = document.getElementById('progress-count');
    if (el) {
      const done = Object.values(p).filter(x => x.read).length;
      const total = document.querySelectorAll('.card[data-chapter-id]').length;
      el.textContent = `${done} / ${total}`;
    }
  }

  // ---------- Glossary terms ----------
  // Markup: <span class="term" data-term="token">token</span>
  // Loads /assets/data/glossary.json with { token: {zh, en, zhDef, enDef}, ... }
  let glossaryData = null;
  async function loadGlossary() {
    if (glossaryData !== null) return glossaryData;
    try {
      const res = await fetch('../assets/data/glossary.json');
      if (!res.ok) throw new Error('not found');
      glossaryData = await res.json();
    } catch {
      try {
        const res = await fetch('assets/data/glossary.json');
        glossaryData = await res.json();
      } catch {
        glossaryData = {};
      }
    }
    return glossaryData;
  }
  async function initGlossary() {
    const terms = document.querySelectorAll('.term[data-term]');
    if (!terms.length) return;
    const g = await loadGlossary();
    terms.forEach(t => {
      const key = t.dataset.term;
      const entry = g[key];
      if (!entry) return;
      const lang = document.documentElement.dataset.lang || 'zh';
      const pop = document.createElement('span');
      pop.className = 'term-popover';
      const en = entry.en || key;
      const def = lang === 'zh' ? (entry.zhDef || entry.enDef) : (entry.enDef || entry.zhDef);
      pop.innerHTML = `<span class="term-en">${en}</span>${def}`;
      t.appendChild(pop);
      // Click to toggle open
      t.addEventListener('click', e => {
        e.stopPropagation();
        const isOpen = t.classList.contains('open');
        document.querySelectorAll('.term.open').forEach(el => el.classList.remove('open'));
        if (!isOpen) t.classList.add('open');
      });
    });
    // Click outside closes all
    document.addEventListener('click', () => {
      document.querySelectorAll('.term.open').forEach(el => el.classList.remove('open'));
    });
  }

  // ---------- Quiz scoring ----------
  function initQuiz() {
    document.querySelectorAll('.quiz-q').forEach(q => {
      const opts = q.querySelectorAll('.quiz-opt');
      const fb = q.querySelector('.quiz-feedback');
      opts.forEach(opt => {
        opt.addEventListener('click', () => {
          const correct = opt.dataset.correct === 'true';
          opts.forEach(o => o.classList.remove('correct', 'wrong'));
          opt.classList.add(correct ? 'correct' : 'wrong');
          if (fb) {
            fb.classList.remove('correct', 'wrong');
            fb.classList.add('show', correct ? 'correct' : 'wrong');
            const ex = opt.dataset.explain || (correct
              ? (fb.dataset.right || '答对了 / Correct!')
              : (fb.dataset.wrong || '再想想 / Try again'));
            fb.textContent = ex;
          }
        });
      });
    });
  }

  // ---------- TOC active link ----------
  function initToc() {
    const tocLinks = document.querySelectorAll('.toc a[href^="#"]');
    if (!tocLinks.length) return;
    const sections = Array.from(tocLinks).map(a => {
      const id = a.getAttribute('href').slice(1);
      return { link: a, el: document.getElementById(id) };
    }).filter(s => s.el);
    function onScroll() {
      const y = window.scrollY + 100;
      let active = sections[0];
      for (const s of sections) {
        if (s.el.offsetTop <= y) active = s;
      }
      tocLinks.forEach(l => l.classList.remove('active'));
      if (active) active.link.classList.add('active');
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ---------- Boot ----------
  document.addEventListener('DOMContentLoaded', () => {
    initLang();
    initCopyButtons();
    paintProgressOnCards();
    initGlossary();
    initQuiz();
    initToc();
    // mark chapter pages as read when scrolling past 80%
    if (document.body.dataset.chapterId) {
      const mark = () => {
        const scrolled = (window.scrollY + window.innerHeight) / document.body.scrollHeight;
        if (scrolled > 0.8) { markCurrentChapterRead(); window.removeEventListener('scroll', mark); }
      };
      window.addEventListener('scroll', mark, { passive: true });
    }
  });
})();
