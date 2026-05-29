/* ============================================
   SOUMYARANJAN BEHERA — PORTFOLIO SCRIPT
   ============================================ */

// ── 1. THEME TOGGLE (dark / light with persistence)
const themeBtn = document.getElementById('themeBtn');
const htmlEl   = document.documentElement;

function setTheme(t) {
  htmlEl.classList.toggle('dark', t === 'dark');
  if (themeBtn) {
    themeBtn.innerHTML = t === 'dark'
      ? '<i class="fas fa-moon"></i>'
      : '<i class="fas fa-sun"></i>';
  }
  localStorage.setItem('theme', t);
}

const savedTheme = localStorage.getItem('theme')
  || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
setTheme(savedTheme);

if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    setTheme(htmlEl.classList.contains('dark') ? 'light' : 'dark');
  });
}

// ── 2. NAVBAR SCROLL EFFECT
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// Keep the active nav link in sync with clicks and scroll position.
const navLinks = Array.from(document.querySelectorAll('.nav-link, .mobile-nav-link'));
const navSections = ['home', 'about', 'skills', 'projects', 'contact']
  .map(id => document.getElementById(id))
  .filter(Boolean);

function setActiveNav(targetId) {
  navLinks.forEach(link => {
    const isActive = link.getAttribute('href') === `#${targetId}`;
    link.classList.toggle('active', isActive);
    if (isActive) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });
}

if (navSections.length) {
  setActiveNav('home');

  let navScrollTicking = false;

  const updateActiveNavFromScroll = () => {
    const navOffset = (navbar ? navbar.offsetHeight : 0) + 120;
    const scrollPosition = window.scrollY + navOffset;
    let activeSectionId = navSections[0].id;

    navSections.forEach(section => {
      if (section.offsetTop <= scrollPosition) {
        activeSectionId = section.id;
      }
    });

    setActiveNav(activeSectionId);
  };

  const handleNavScroll = () => {
    if (navScrollTicking) return;
    navScrollTicking = true;

    window.requestAnimationFrame(() => {
      updateActiveNavFromScroll();
      navScrollTicking = false;
    });
  };

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  window.addEventListener('resize', updateActiveNavFromScroll);
  window.addEventListener('load', updateActiveNavFromScroll);
}

// ── 3. MOBILE MENU TOGGLE
const menuBtn    = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');

function syncMenuButtonState(isOpen) {
  if (!menuBtn) return;
  menuBtn.setAttribute('aria-expanded', String(isOpen));

  const icon = menuBtn.querySelector('i');
  if (!icon) return;

  icon.classList.toggle('fa-bars', !isOpen);
  icon.classList.toggle('fa-xmark', isOpen);
}

if (menuBtn && mobileMenu) {
  menuBtn.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    syncMenuButtonState(isOpen);
  });
}

function closeMobileMenu() {
  if (mobileMenu) {
    mobileMenu.classList.remove('open');
    syncMenuButtonState(false);
  }
}

// Close mobile nav on resize to desktop
window.addEventListener('resize', () => {
  if (window.innerWidth >= 768) closeMobileMenu();
});

// ── 4. SMOOTH ANCHOR SCROLLING
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId.length > 1) {
      e.preventDefault();
      const el = document.querySelector(targetId);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveNav(targetId.slice(1));
      closeMobileMenu();
    }
  });
});

// ── 5. SCROLL TO TOP BUTTON
const scrollTopBtn = document.getElementById('scrollTop');
window.addEventListener('scroll', () => {
  if (scrollTopBtn) scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
});
if (scrollTopBtn) {
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ── 6. SCROLL REVEAL (IntersectionObserver)
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── 7. TYPED.JS INITIALIZATION
window.addEventListener('DOMContentLoaded', () => {
  if (window.Typed) {
    new Typed('#typed-text', {
      strings: ['Frontend Developer.'],
    //   strings: ['Frontend Development', 'Tailwind CSS', 'JavaScript', 'React JS'],
      typeSpeed: 55,
      backSpeed: 35,
      backDelay: 1600,
      loop: true,
    });
  }
});

// ── 8. RESUME DOWNLOAD BUTTON
// Tries to open resume.pdf; falls back to GitHub profile
function resumeBtn() {
  const resumeUrl = 'resume.pdf';
  fetch(resumeUrl, { method: 'HEAD' })
    .then(res => {
      if (res.ok) window.open(resumeUrl, '_blank');
      else window.open('assets/Soumyaranjan_Behera Resume.pdf', '_blank');
    })
    .catch(() => window.open('assets/Soumyaranjan_Behera Resume.pdf', '_blank'));
}

