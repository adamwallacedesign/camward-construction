/* =========================================================
   Camward Timber Construction — redesign-v2
   Lenis smooth scroll + GSAP ScrollTrigger
   Mirrors weitz.com architecture (without paid ScrollSmoother)
   ========================================================= */

(function () {
  'use strict';

  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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

  /* ---------- Header scroll state ---------- */
  const header = $('.site-header');
  const onScroll = () => {
    if (!header) return;
    if (window.scrollY > 50) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Boot once libs are ready ---------- */
  function bootScroll() {
    if (typeof window.Lenis === 'undefined' || typeof window.gsap === 'undefined' || typeof window.ScrollTrigger === 'undefined') {
      return setTimeout(bootScroll, 30);
    }

    gsap.registerPlugin(ScrollTrigger);

    /* Lenis smooth scroll (replaces ScrollSmoother) */
    const lenis = !reduceMotion ? new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo.out
      smoothWheel: true,
      smoothTouch: false,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
    }) : null;

    if (lenis) {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);

      // Anchor links go through Lenis
      $$('a[href^="#"]').forEach(a => {
        a.addEventListener('click', (e) => {
          const id = a.getAttribute('href');
          if (id.length <= 1) return;
          const target = document.querySelector(id);
          if (!target) return;
          e.preventDefault();
          lenis.scrollTo(target, { offset: -60, duration: 1.4 });
        });
      });
    }

    /* ---------- HERO: pin + scrub fill ---------- */
    const hero = $('#hero');
    if (hero) {
      ScrollTrigger.create({
        trigger: hero,
        start: 'top top',
        end: '+=80%',
        pin: false,
        scrub: 0.6,
        onUpdate: (self) => {
          if (self.progress > 0.25) hero.classList.add('is-filled');
          else hero.classList.remove('is-filled');
        },
      });

      // Subtle bg parallax (image moves slower than scroll)
      const heroBg = hero.querySelector('.hero-bg img');
      if (heroBg) {
        gsap.to(heroBg, {
          yPercent: 18,
          ease: 'none',
          scrollTrigger: {
            trigger: hero,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.4,
          },
        });
      }

      // Hero copy slides up + fades out as you scroll past
      const heroInner = hero.querySelector('.hero-inner');
      if (heroInner) {
        gsap.to(heroInner, {
          y: -60,
          opacity: 0.4,
          ease: 'none',
          scrollTrigger: {
            trigger: hero,
            start: 'top top',
            end: 'bottom 50%',
            scrub: 0.6,
          },
        });
      }
    }

    /* ---------- SECTION SCALE: subtle scale-in on enter ---------- */
    $$('.section-scale').forEach(sec => {
      gsap.fromTo(sec,
        { scale: 0.97, opacity: 0.85 },
        {
          scale: 1,
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sec,
            start: 'top 90%',
            end: 'top 50%',
            scrub: 1,
          },
        });
    });

    /* ---------- CONTENT-FADE: gentle reveal ---------- */
    $$('.content-fade').forEach(el => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 88%',
        once: true,
        onEnter: () => el.classList.add('is-in'),
      });
    });

    /* ---------- GRID-ITEMS: stagger active class within siblings ---------- */
    const groupedByParent = new Map();
    $$('.grid-item').forEach(item => {
      const p = item.parentElement;
      if (!groupedByParent.has(p)) groupedByParent.set(p, []);
      groupedByParent.get(p).push(item);
    });
    groupedByParent.forEach(items => {
      items.forEach((item, i) => {
        ScrollTrigger.create({
          trigger: item,
          start: 'top 88%',
          once: true,
          onEnter: () => {
            setTimeout(() => item.classList.add('active'), i * 70);
          },
        });
      });
    });

    /* ---------- STATS: pinned section, scrub between stats with cross-fade bgs ---------- */
    const stats = $('#stats');
    if (stats) {
      const slides = stats.querySelectorAll('.stat-slide');
      const dots   = stats.querySelectorAll('.stats-rail-dot');
      const bgs    = stats.querySelectorAll('.stat-bg');
      const pin    = stats.querySelector('.stats-pin');
      const total  = slides.length;

      const setActive = (idx) => {
        slides.forEach((s, i) => s.classList.toggle('is-active', i === idx));
        dots.forEach((d, i) => d.classList.toggle('is-active', i === idx));
        bgs.forEach((b, i) => b.classList.toggle('is-active', i === idx));
      };
      setActive(0);

      ScrollTrigger.create({
        trigger: stats,
        start: 'top top',
        end: () => `+=${(total) * window.innerHeight * 0.9}`,
        pin: pin,
        pinSpacing: true,
        scrub: 0.4,
        onUpdate: (self) => {
          const idx = Math.min(total - 1, Math.floor(self.progress * total));
          setActive(idx);
        },
      });

      // Subtle parallax on all bg images — visible one drifts slowly through the pin
      const bgImgs = stats.querySelectorAll('.stat-bg img');
      if (bgImgs.length) {
        gsap.to(bgImgs, {
          yPercent: 8,
          ease: 'none',
          scrollTrigger: {
            trigger: stats,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.6,
          },
        });
      }
    }

    /* ---------- Refresh on resize / load ---------- */
    window.addEventListener('load', () => ScrollTrigger.refresh());
  }

  bootScroll();

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
      if (typeof window.Lenis !== 'undefined') {
        const lenisInstance = window.__lenis;
        if (lenisInstance) lenisInstance.stop();
      }
      lbClose.focus();
    };
    const close = () => {
      lb.classList.remove('open');
      lb.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (window.__lenis) window.__lenis.start();
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
