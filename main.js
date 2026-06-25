document.addEventListener('DOMContentLoaded', () => {

  /* ── Custom Cursor ── */
  const dot  = document.getElementById('cur-dot');
  const ring = document.getElementById('cur-ring');

  if (dot && ring && window.matchMedia('(pointer: fine)').matches) {
    document.body.classList.add('js-cursor');
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
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => observer.observe(el));
  }

});
