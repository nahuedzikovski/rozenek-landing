// pgIn animation on body creates a stacking context that breaks position:fixed cursors.
// Remove the animation once done (400ms fallback) to restore normal fixed positioning.
const clearBodyAnim = () => { document.body.style.animation = 'none'; };
document.body.addEventListener('animationend', clearBodyAnim, { once: true });
setTimeout(clearBodyAnim, 400);

/* ── Custom cursor ── */
const dot  = document.getElementById('cur-dot');
const ring = document.getElementById('cur-ring');
let mx = -200, my = -200, rx = -200, ry = -200;

const HOVERABLE = 'a, button, [role="button"]';

window.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  if (dot) dot.style.transform = `translate(calc(${mx}px - 50%), calc(${my}px - 50%))`;
  const under = document.elementFromPoint(mx, my);
  document.body.classList.toggle('hovering', !!under?.closest(HOVERABLE));
}, { passive: true });

document.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));

(function animRing() {
  rx += (mx - rx) * .12;
  ry += (my - ry) * .12;
  if (ring) ring.style.transform = `translate(calc(${rx}px - 50%), calc(${ry}px - 50%))`;
  requestAnimationFrame(animRing);
})();

document.addEventListener('DOMContentLoaded', () => {

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
