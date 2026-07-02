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

function bgLuminance(el) {
  while (el && el !== document.documentElement) {
    const bg = window.getComputedStyle(el).backgroundColor;
    const m = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?/);
    if (m && (m[4] === undefined || parseFloat(m[4]) > 0.05)) {
      const [r, g, b] = [+m[1], +m[2], +m[3]].map(c => {
        c /= 255;
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    }
    el = el.parentElement;
  }
  return 1;
}

window.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  if (dot) dot.style.transform = `translate(calc(${mx}px - 50%), calc(${my}px - 50%))`;
  const under = document.elementFromPoint(mx, my);
  document.body.classList.toggle('hovering', !!under?.closest(HOVERABLE));
  document.body.classList.toggle('cursor-dark', bgLuminance(under) < 0.12);
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
    const [s1, s2, s3] = burger.querySelectorAll('span');
    const closeBurger = () => {
      mobileMenu.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      s1.style.transform = ''; s2.style.opacity = ''; s3.style.transform = '';
    };
    burger.addEventListener('click', () => {
      const open = mobileMenu.classList.toggle('open');
      burger.setAttribute('aria-expanded', open);
      document.body.style.overflow = open ? 'hidden' : '';
      if (open) {
        s1.style.transform = 'translateY(6px) rotate(45deg)';
        s2.style.opacity   = '0';
        s3.style.transform = 'translateY(-6px) rotate(-45deg)';
      } else {
        s1.style.transform = ''; s2.style.opacity = ''; s3.style.transform = '';
      }
    });
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeBurger);
    });
  }

  /* ── Active nav section ── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  if (sections.length && navLinks.length) {
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = '#' + entry.target.id;
          navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === id));
        }
      });
    }, { rootMargin: '-20% 0px -80% 0px' });
    sections.forEach(s => sectionObserver.observe(s));
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
