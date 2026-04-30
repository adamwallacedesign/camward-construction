/* =========================================================
   Camward Timber Construction
   Vanilla JS: mobile nav, lightbox, scroll reveal, year
   ========================================================= */

(function () {
  'use strict';

  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));

  /* ---------- Footer year ---------- */
  const yr = $('#year');
  if (yr) yr.textContent = new Date().getFullYear();

  /* ---------- Mobile nav ---------- */
  const navToggle = $('.nav-toggle');
  const nav = $('#nav');
  if (navToggle && nav) {
    const closeNav = () => {
      nav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    };
    const openNav = () => {
      nav.classList.add('open');
      navToggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    };
    navToggle.addEventListener('click', () => {
      nav.classList.contains('open') ? closeNav() : openNav();
    });
    nav.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') closeNav();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('open')) closeNav();
    });
  }

  /* ---------- Scroll reveal ---------- */
  const revealable = $$('.section, .hero-inner');
  revealable.forEach(el => el.classList.add('reveal'));

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -10% 0px' });
    revealable.forEach(el => io.observe(el));
  } else {
    revealable.forEach(el => el.classList.add('in'));
  }

  /* ---------- Parallax ---------- */
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const parallaxEls = $$('[data-parallax]');

  if (parallaxEls.length && !reduceMotion) {
    let ticking = false;
    const anchorFor = (el) => el.closest('section, .hero') || el.parentElement;
    const update = () => {
      const vh = window.innerHeight;
      parallaxEls.forEach(el => {
        const rect = anchorFor(el).getBoundingClientRect();
        if (rect.bottom < -100 || rect.top > vh + 100) return;
        const speed = parseFloat(el.dataset.parallax) || 0.25;
        const centre = rect.top + rect.height / 2;
        const offset = (centre - vh / 2) * -speed;
        el.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
      });
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    update();
  }

  /* ---------- Lightbox ---------- */
  const lb       = $('#lightbox');
  const lbImg    = $('#lb-img');
  const lbCap    = $('#lb-cap');
  const lbClose  = $('.lb-close');
  const lbPrev   = $('.lb-prev');
  const lbNext   = $('.lb-next');
  const triggers = $$('.g-btn');

  if (lb && triggers.length) {
    const slides = triggers.map(btn => {
      const img = btn.querySelector('img');
      const cap = btn.querySelector('.g-cap');
      return { src: img.src, alt: img.alt, caption: cap ? cap.textContent : '' };
    });
    let current = 0;
    let lastFocus = null;

    const show = (i) => {
      current = (i + slides.length) % slides.length;
      const s = slides[current];
      lbImg.src = s.src;
      lbImg.alt = s.alt;
      lbCap.textContent = s.caption;
    };
    const open = (i) => {
      lastFocus = document.activeElement;
      show(i);
      lb.classList.add('open');
      lb.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      lbClose.focus();
    };
    const close = () => {
      lb.classList.remove('open');
      lb.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      lbImg.src = '';
      if (lastFocus) lastFocus.focus();
    };

    triggers.forEach((btn) => {
      btn.addEventListener('click', () => open(parseInt(btn.dataset.index, 10) || 0));
    });
    lbClose.addEventListener('click', close);
    lbPrev.addEventListener('click', () => show(current - 1));
    lbNext.addEventListener('click', () => show(current + 1));
    lb.addEventListener('click', (e) => {
      if (e.target === lb) close();
    });
    document.addEventListener('keydown', (e) => {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape')      close();
      if (e.key === 'ArrowLeft')  show(current - 1);
      if (e.key === 'ArrowRight') show(current + 1);
    });
  }
})();
