/**
 * Aneel Khan Portfolio — java.js
 * All interactive behaviour for the portfolio site.
 */

'use strict';

/* ============================================================
   1. NAVBAR SCROLL BEHAVIOUR
   ============================================================ */
(function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  function onScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load
})();

/* ============================================================
   2. ACTIVE NAV LINK ON SCROLL (Intersection Observer)
   ============================================================ */
(function initActiveNavOnScroll() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('#navbar .nav-link');

  if (!sections.length || !navLinks.length) return;

  function setActive(id) {
    navLinks.forEach(function (link) {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + id) {
        link.classList.add('active');
      }
    });
  }

  const observerOptions = {
    root: null,
    rootMargin: '-100px 0px -60% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        setActive(entry.target.id);
      }
    });
  }, observerOptions);

  sections.forEach(function (section) {
    observer.observe(section);
  });
})();

/* ============================================================
   3. NAVBAR ACTIVE STATE ON CLICK
   ============================================================ */
(function initNavClickActive() {
  const navLinks = document.querySelectorAll('#navbar .nav-link');

  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.forEach(function (l) { l.classList.remove('active'); });
      link.classList.add('active');
    });
  });
})();

/* ============================================================
   4. MOBILE MENU AUTO-CLOSE
   ============================================================ */
(function initMobileMenuClose() {
  const navLinks = document.querySelectorAll('#navbar .nav-link');
  const navbarCollapse = document.getElementById('navbarNav');
  if (!navbarCollapse) return;

  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      // Only close if the collapse is currently open (visible)
      if (navbarCollapse.classList.contains('show')) {
        var bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
        if (bsCollapse) {
          bsCollapse.hide();
        }
      }
    });
  });
})();

/* ============================================================
   5. PROJECT FILTER BUTTONS
   ============================================================ */
(function initProjectFilter() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards  = document.querySelectorAll('.project-card');

  if (!filterButtons.length || !projectCards.length) return;

  filterButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      // Update active state
      filterButtons.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');

      var filter = btn.getAttribute('data-filter');

      projectCards.forEach(function (card) {
        var category = card.getAttribute('data-category');

        if (filter === 'all' || category === filter) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
})();

/* ============================================================
   6. CONTACT FORM VALIDATION + MAILTO
   ============================================================ */
(function initContactForm() {
  var form = document.getElementById('contact-form');
  if (!form) return;

  function showError(fieldId, message) {
    var errorEl = document.getElementById(fieldId + '-error');
    if (errorEl) {
      errorEl.textContent = message;
    }
    var input = document.getElementById(fieldId);
    if (input) {
      input.style.borderColor = '#c0392b';
    }
  }

  function clearError(fieldId) {
    var errorEl = document.getElementById(fieldId + '-error');
    if (errorEl) {
      errorEl.textContent = '';
    }
    var input = document.getElementById(fieldId);
    if (input) {
      input.style.borderColor = '';
    }
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // Live clearing of errors as user types
  ['contact-name', 'contact-email', 'contact-subject', 'contact-message'].forEach(function (id) {
    var el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', function () { clearError(id); });
    }
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var nameEl    = document.getElementById('contact-name');
    var emailEl   = document.getElementById('contact-email');
    var subjectEl = document.getElementById('contact-subject');
    var msgEl     = document.getElementById('contact-message');

    var name    = nameEl    ? nameEl.value.trim()    : '';
    var email   = emailEl   ? emailEl.value.trim()   : '';
    var subject = subjectEl ? subjectEl.value.trim() : '';
    var message = msgEl     ? msgEl.value.trim()     : '';

    var isValid = true;

    // Validate name
    if (name.length < 2) {
      showError('contact-name', 'Please enter your full name (at least 2 characters).');
      isValid = false;
    } else {
      clearError('contact-name');
    }

    // Validate email
    if (!email || !isValidEmail(email)) {
      showError('contact-email', 'Please enter a valid email address.');
      isValid = false;
    } else {
      clearError('contact-email');
    }

    // Validate subject
    if (!subject) {
      showError('contact-subject', 'Please enter a subject.');
      isValid = false;
    } else {
      clearError('contact-subject');
    }

    // Validate message
    if (message.length < 10) {
      showError('contact-message', 'Please enter a message (at least 10 characters).');
      isValid = false;
    } else {
      clearError('contact-message');
    }

    if (isValid) {
      var mailtoBody = 'From: ' + name + ' (' + email + ')\n\n' + message;
      var mailtoURL  = 'mailto:aneelkhan748@gmail.com'
        + '?subject=' + encodeURIComponent(subject)
        + '&body='    + encodeURIComponent(mailtoBody);

      window.location.href = mailtoURL;
    }
  });
})();

/* ============================================================
   7. BACK-TO-TOP BUTTON
   ============================================================ */
(function initBackToTop() {
  var btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', function () {
    if (window.scrollY > 400) {
      btn.classList.add('show');
    } else {
      btn.classList.remove('show');
    }
  }, { passive: true });

  btn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

/* ============================================================
   8. SCROLL REVEAL ANIMATION (Intersection Observer)
   ============================================================ */
(function initScrollReveal() {
  var revealEls = document.querySelectorAll('.reveal');
  if (!revealEls.length) return;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // animate only once
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.08
  });

  revealEls.forEach(function (el) {
    observer.observe(el);
  });
})();

/* ============================================================
   9. FOOTER YEAR
   ============================================================ */
(function setFooterYear() {
  var yearEl = document.getElementById('footer-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();
