// ============================================
// script.js - Sistemas Web Studio
// Animaciones, navegación e interacciones
// ============================================

(function () {
  'use strict';

  // ---- Navbar scroll effect ----
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
  }

  // ---- Mobile nav toggle ----
  const navToggle = document.getElementById('navToggle');
  const navMenu   = document.getElementById('navMenu');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      navToggle.classList.toggle('active');
      document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
    });

    // Cerrar al hacer clic en un link
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navToggle.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // ---- Animate on scroll (Intersection Observer) ----
  const animatedEls = document.querySelectorAll('.animate-on-scroll');
  if (animatedEls.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Stagger: ligero retraso para cada elemento en un grid
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, i * 80);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    animatedEls.forEach(el => observer.observe(el));
  }

  // ---- Skill bars animation ----
  const skillFills = document.querySelectorAll('.skill-fill');
  if (skillFills.length > 0) {
    const skillObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar   = entry.target;
          const width = bar.getAttribute('data-width') || '0';
          bar.style.width = width + '%';
          skillObserver.unobserve(bar);
        }
      });
    }, { threshold: 0.3 });
    skillFills.forEach(bar => skillObserver.observe(bar));
  }

  // ---- Project category filter ----
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card[data-cat]');
  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
          const show = filter === 'all' || card.getAttribute('data-cat') === filter;
          card.style.display = show ? '' : 'none';
          // Re-animate visible cards
          if (show) {
            card.classList.remove('visible');
            setTimeout(() => card.classList.add('visible'), 50);
          }
        });
      });
    });
  }

  // ---- Contact form: loading state ----
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      const btn = this.querySelector('button[type="submit"]');
      if (btn) {
        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
      }
    });
  }

  // ---- Smooth scroll for anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ---- Auto-dismiss alerts ----
  document.querySelectorAll('.alert').forEach(alert => {
    setTimeout(() => {
      alert.style.transition = 'opacity 0.5s ease';
      alert.style.opacity = '0';
      setTimeout(() => alert.remove(), 500);
    }, 5000);
  });

  // ---- Counter animation for hero stats ----
  function animateCounter(el, target, duration = 1500) {
    const start = 0;
    const step = target / (duration / 16);
    let current = start;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      // Mantener "+" o "%" suffix
      const suffix = el.dataset.suffix || '';
      el.textContent = Math.floor(current) + suffix;
    }, 16);
  }

  // Trigger counters when visible
  const statNums = document.querySelectorAll('.stat-num');
  if (statNums.length > 0) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el  = entry.target;
          const raw = el.textContent.replace(/\D/g, '');
          el.dataset.suffix = el.textContent.replace(/\d/g, '');
          if (raw) animateCounter(el, parseInt(raw));
          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    statNums.forEach(el => counterObserver.observe(el));
  }

  console.log('✅ Sistemas Web Studio — scripts cargados');
})();
