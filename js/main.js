/* =============================================
   HAREKA — Main JS
   ============================================= */

// --- Scroll header ---
const header = document.querySelector('.header');
if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 10);
  }, { passive: true });
}

// --- Mobile nav ---
const hamburger = document.querySelector('.hamburger');
const mobileNav = document.querySelector('.mobile-nav');
if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileNav.classList.toggle('open');
    document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
  });
  // Close on link click
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// --- Active nav link ---
const currentPage = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav__list a, .mobile-nav a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

// --- Contact form submission (basic) ---
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    btn.textContent = '送信中...';
    btn.disabled = true;
    // Simulate send (replace with Netlify/API integration)
    setTimeout(() => {
      const msg = document.getElementById('form-success');
      if (msg) {
        contactForm.style.display = 'none';
        msg.style.display = 'block';
      } else {
        btn.textContent = '送信しました！';
      }
    }, 1200);
  });
}

// --- Scroll reveal (lightweight) ---
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
};
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.card, .service-card, .case-card, .why-card, .blog-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity .5s ease, transform .5s ease, box-shadow .25s ease, border-color .25s ease';
  observer.observe(el);
});
