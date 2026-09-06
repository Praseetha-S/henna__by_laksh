/* ═══════════════════════════════════════════════════
   LAKSH HENNA ARTISTRY — Optimized Script v2
═══════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileMenu();
  initScrollProgress();
  initScrollReveals();
  initMouseParallax();
  initMagneticButtons();
  initRippleEffect();
  initLightbox();
  initFAQ();
  initReviewSlider();
  initActiveNav();
  initTiltEffect();
});

/* ─── HEADER SCROLL ──────────────────────────────── */
function initHeader() {
  const header = document.getElementById('header');
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        header.classList.toggle('scrolled', window.scrollY > 50);
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

/* ─── SCROLL PROGRESS ────────────────────────────── */
function initScrollProgress() {
  const bar = document.getElementById('scrollProgress');
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const winScroll = document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        bar.style.width = ((winScroll / height) * 100) + '%';
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

/* ─── INTERSECTION OBSERVER REVEALS ─────────────── */
function initScrollReveals() {
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(el => observer.observe(el));
}

/* ─── HERO PARALLAX (Desktop only) ──────────────── */
function initMouseParallax() {
  const heroImg = document.getElementById('heroImg');
  if (!heroImg) return;

  // Only on non-touch devices for performance
  if (window.matchMedia('(pointer: coarse)').matches) return;

  let rafId = null;
  document.addEventListener('mousemove', (e) => {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => {
      const x = (window.innerWidth  / 2 - e.clientX) / 70;
      const y = (window.innerHeight / 2 - e.clientY) / 70;
      heroImg.style.transform = `translateZ(0) scale(1.12) translate(${x}px, ${y}px)`;
    });
  });
}

/* ─── MAGNETIC BUTTONS (Desktop only) ───────────── */
function initMagneticButtons() {
  if (window.matchMedia('(pointer: coarse)').matches) return;
  const magnets = document.querySelectorAll('.magnetic');
  magnets.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width  / 2) * 0.18;
      const y = (e.clientY - rect.top  - rect.height / 2) * 0.18;
      btn.style.transform = `translate(${x}px, ${y}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0, 0)';
    });
  });
}

/* ─── RIPPLE EFFECT ──────────────────────────────── */
function initRippleEffect() {
  document.querySelectorAll('.ripple-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      ripple.classList.add('ripple');
      const rect = btn.getBoundingClientRect();
      const size  = Math.max(rect.width, rect.height);
      ripple.style.cssText = `
        width: ${size}px; height: ${size}px;
        left: ${e.clientX - rect.left - size / 2}px;
        top:  ${e.clientY - rect.top  - size / 2}px;
      `;
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 650);
    });
  });
}

/* ─── LIGHTBOX ───────────────────────────────────── */
function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  const lbImg    = document.getElementById('lbImg');
  const lbClose  = document.getElementById('lbClose');
  if (!lightbox) return;

  const open = (src) => {
    lbImg.src = src;
    lightbox.classList.add('show');
    document.body.style.overflow = 'hidden';
  };
  const close = () => {
    lightbox.classList.remove('show');
    document.body.style.overflow = '';
  };

  // Click on image itself to open
  document.querySelectorAll('.m-item').forEach(item => {
    item.addEventListener('click', (e) => {
      const img = item.querySelector('img');
      if (img) open(img.src);
    });
    // Also handle the expand button specifically
    const btn = item.querySelector('.lb-open');
    if (btn) {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const img = item.querySelector('img');
        if (img) open(img.src);
      });
    }
  });

  lbClose.addEventListener('click', close);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) close();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });
}

/* ─── FAQ ACCORDION ──────────────────────────────── */
function initFAQ() {
  document.querySelectorAll('.faq-item').forEach(item => {
    item.querySelector('.faq-q').addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      document.querySelectorAll('.faq-item.active').forEach(a => a.classList.remove('active'));
      if (!isActive) item.classList.add('active');
    });
  });
}

/* ─── REVIEW AUTO-SLIDER ─────────────────────────── */
function initReviewSlider() {
  const slider = document.getElementById('reviewSlider');
  if (!slider) return;

  let autoPlay = setInterval(tick, 3800);

  function tick() {
    const atEnd = slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 5;
    slider.scrollTo({
      left: atEnd ? 0 : slider.scrollLeft + 340,
      behavior: 'smooth'
    });
  }

  // Pause on hover / touch
  slider.addEventListener('mouseenter', () => clearInterval(autoPlay));
  slider.addEventListener('mouseleave', () => { autoPlay = setInterval(tick, 3800); });
  slider.addEventListener('touchstart', () => clearInterval(autoPlay), { passive: true });
  slider.addEventListener('touchend', () => { autoPlay = setInterval(tick, 3800); }, { passive: true });
}

/* ─── ACTIVE NAV HIGHLIGHT ───────────────────────── */
function initActiveNav() {
  const sections  = Array.from(document.querySelectorAll('section[id]'));
  const navLinks  = document.querySelectorAll('.nav-link');
  let ticking = false;

  function update() {
    const scrollY = window.scrollY + 160;
    let current   = sections[0]?.getAttribute('id') || '';
    sections.forEach(s => {
      if (s.offsetTop <= scrollY) current = s.getAttribute('id');
    });
    navLinks.forEach(link => {
      const matches = link.getAttribute('href') === `#${current}`;
      link.classList.toggle('active', matches);
    });
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(update); ticking = true; }
  }, { passive: true });
}

/* ─── TILT EFFECT (Desktop only) ────────────────── */
function initTiltEffect() {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  document.querySelectorAll('.tilt-effect').forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const tiltX = ((y - rect.height / 2) / rect.height) * -10;
      const tiltY = ((x - rect.width  / 2) / rect.width ) *  10;
      el.style.transform = `perspective(900px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transition = 'transform 0.45s ease';
      el.style.transform  = 'perspective(900px) rotateX(0) rotateY(0) scale3d(1,1,1)';
    });
    el.addEventListener('mouseenter', () => {
      el.style.transition = 'none';
    });
  });
}

/* ─── MOBILE MENU ────────────────────────────────── */
function initMobileMenu() {
  const menuToggle = document.getElementById('menuToggle');
  const nav        = document.getElementById('nav');
  const navLinks   = document.querySelectorAll('.nav-link');

  // Create a backdrop element
  const backdrop = document.createElement('div');
  backdrop.className = 'nav-backdrop';
  document.body.appendChild(backdrop);

  if (!menuToggle || !nav) return;

  const openMenu = () => {
    menuToggle.classList.add('open');
    nav.classList.add('open');
    backdrop.classList.add('visible');
    document.body.style.overflow = 'hidden';
  };
  const closeMenu = () => {
    menuToggle.classList.remove('open');
    nav.classList.remove('open');
    backdrop.classList.remove('visible');
    document.body.style.overflow = '';
  };

  menuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    nav.classList.contains('open') ? closeMenu() : openMenu();
  });

  backdrop.addEventListener('click', closeMenu);

  navLinks.forEach(link => link.addEventListener('click', () => {
    closeMenu();
  }));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('open')) closeMenu();
  });
}
