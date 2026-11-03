/**
 * Aneel Khan — Portfolio Website JavaScript
 * Pure Vanilla JavaScript (No backend, no database, no third-party dependencies)
 * Two-space indentation, clean architecture, accessible
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. Navigation & Mobile Menu Handler
  // --------------------------------------------------------------------------
  const navbar = document.querySelector('.navbar-custom');
  const navToggler = document.querySelector('.navbar-toggler-custom');
  const navMenuWrapper = document.querySelector('.nav-menu-wrapper');
  const navLinks = document.querySelectorAll('.nav-link-custom');

  // Sticky navbar shadow on scroll
  const handleNavbarScroll = () => {
    if (window.scrollY > 25) {
      navbar.classList.add('navbar-scrolled');
    } else {
      navbar.classList.remove('navbar-scrolled');
    }
  };
  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll();

  // Mobile menu toggle
  if (navToggler && navMenuWrapper) {
    navToggler.addEventListener('click', () => {
      const isExpanded = navToggler.getAttribute('aria-expanded') === 'true';
      navToggler.setAttribute('aria-expanded', !isExpanded);
      navMenuWrapper.classList.toggle('show');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (event) => {
      if (!navbar.contains(event.target) && navMenuWrapper.classList.contains('show')) {
        navMenuWrapper.classList.remove('show');
        navToggler.setAttribute('aria-expanded', 'false');
      }
    });

    // Close menu when clicking any nav link
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        if (navMenuWrapper.classList.contains('show')) {
          navMenuWrapper.classList.remove('show');
          navToggler.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  // --------------------------------------------------------------------------
  // 2. Active Section Scrollspy via IntersectionObserver
  // --------------------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');
  if ('IntersectionObserver' in window && sections.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            const href = link.getAttribute('href');
            if (href === `#${currentId}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach((section) => sectionObserver.observe(section));
  }

  // --------------------------------------------------------------------------
  // 3. Project Category Filtering Logic
  // --------------------------------------------------------------------------
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-item');
  const backendEmptyState = document.getElementById('backendEmptyState');
  const resetFilterBtn = document.getElementById('btnResetProjectFilter');

  const applyProjectFilter = (filterValue) => {
    let visibleCount = 0;

    projectCards.forEach((card) => {
      const categories = (card.getAttribute('data-category') || '').toLowerCase().split(' ');
      
      if (filterValue === 'all' || categories.includes(filterValue)) {
        card.style.display = 'block';
        card.style.opacity = '0';
        card.style.transform = 'translateY(10px)';
        setTimeout(() => {
          card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, 30);
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    // Handle empty-state display for categories without projects (e.g. backend)
    if (backendEmptyState) {
      if (visibleCount === 0) {
        backendEmptyState.style.display = 'block';
        backendEmptyState.style.opacity = '0';
        backendEmptyState.style.transform = 'translateY(10px)';
        setTimeout(() => {
          backendEmptyState.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
          backendEmptyState.style.opacity = '1';
          backendEmptyState.style.transform = 'translateY(0)';
        }, 30);
      } else {
        backendEmptyState.style.display = 'none';
      }
    }
  };

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      // Set active button state & accessibility attributes
      filterButtons.forEach((btn) => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
      });
      button.classList.add('active');
      button.setAttribute('aria-selected', 'true');

      const filterValue = button.getAttribute('data-filter').toLowerCase();
      applyProjectFilter(filterValue);
    });
  });

  if (resetFilterBtn) {
    resetFilterBtn.addEventListener('click', () => {
      const allBtn = document.querySelector('.filter-btn[data-filter="all"]');
      if (allBtn) {
        allBtn.click();
      }
    });
  }

  // --------------------------------------------------------------------------
  // 4. Contact Form Validation & Gmail Compose Delivery Workflow
  // --------------------------------------------------------------------------
  const contactForm = document.getElementById('portfolioContactForm');
  const contactFormStatus = document.getElementById('contactFormStatus');

  // Primary recipient email address
  const CONTACT_RECIPIENT_EMAIL = 'aneelkhan748@gmail.com';

  if (contactForm) {
    const inputName = document.getElementById('contactName');
    const inputEmail = document.getElementById('contactEmail');
    const inputSubject = document.getElementById('contactSubject');
    const inputMessage = document.getElementById('contactMessage');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const validateField = (input, isValid, errorText) => {
      const feedbackEl = input.nextElementSibling;
      if (!isValid) {
        input.classList.add('is-invalid');
        if (feedbackEl && feedbackEl.classList.contains('invalid-feedback-custom')) {
          feedbackEl.textContent = errorText;
        }
      } else {
        input.classList.remove('is-invalid');
      }
      return isValid;
    };

    // Live validation on blur & input
    inputName.addEventListener('input', () => {
      validateField(inputName, inputName.value.trim().length >= 2, 'Please enter your full name (at least 2 characters).');
    });

    inputEmail.addEventListener('input', () => {
      validateField(inputEmail, emailRegex.test(inputEmail.value.trim()), 'Please enter a valid email address.');
    });

    inputSubject.addEventListener('input', () => {
      validateField(inputSubject, inputSubject.value.trim().length >= 3, 'Please enter a subject (at least 3 characters).');
    });

    inputMessage.addEventListener('input', () => {
      validateField(inputMessage, inputMessage.value.trim().length >= 10, 'Please write a message of at least 10 characters.');
    });

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameVal = inputName.value.trim();
      const emailVal = inputEmail.value.trim();
      const subjectVal = inputSubject.value.trim();
      const messageVal = inputMessage.value.trim();

      const isNameValid = validateField(inputName, nameVal.length >= 2, 'Please enter your full name (at least 2 characters).');
      const isEmailValid = validateField(inputEmail, emailRegex.test(emailVal), 'Please enter a valid email address.');
      const isSubjValid = validateField(inputSubject, subjectVal.length >= 3, 'Please enter a subject (at least 3 characters).');
      const isMsgValid = validateField(inputMessage, messageVal.length >= 10, 'Please write a message with at least 10 characters.');

      if (isNameValid && isEmailValid && isSubjValid && isMsgValid) {
        // Construct clear, structured email body according to specified format
        const emailBody = `Name: ${nameVal}\nEmail: ${emailVal}\nSubject: ${subjectVal}\n\nMessage:\n${messageVal}`;

        // Construct safe Gmail Compose URL using URLSearchParams
        const gmailParams = new URLSearchParams({
          view: 'cm',
          fs: '1',
          to: CONTACT_RECIPIENT_EMAIL,
          su: subjectVal,
          body: emailBody
        });
        const gmailComposeUrl = `https://mail.google.com/mail/?${gmailParams.toString()}`;

        // Secondary standard mailto URL for desktop mail clients
        const mailtoParams = new URLSearchParams({
          subject: subjectVal,
          body: emailBody
        });
        const mailtoUri = `mailto:${CONTACT_RECIPIENT_EMAIL}?${mailtoParams.toString()}`;

        // Open Gmail Compose directly in a new browser tab
        window.open(gmailComposeUrl, '_blank', 'noopener,noreferrer');

        // Display accurate, informative status feedback (preserve user input so data is not lost)
        if (contactFormStatus) {
          contactFormStatus.style.display = 'block';
          contactFormStatus.innerHTML = `
            <div class="alert alert-success d-flex align-items-start gap-2 mb-0" role="alert" style="background-color: var(--color-warm-beige-light); border: 1.5px solid var(--color-forest-green-border); color: var(--color-forest-green); border-radius: var(--radius-md); padding: 1rem 1.25rem;">
              <i class="bi bi-box-arrow-up-right fs-5 text-success mt-1"></i>
              <div>
                <strong>Gmail Compose Opened in New Tab</strong><br>
                <span class="small">Your inquiry has been formatted and pre-filled for <strong>${CONTACT_RECIPIENT_EMAIL}</strong>. Please review and click <strong>Send</strong> in Gmail to finish delivering your message.</span>
                <div class="mt-2 pt-2 border-top border-secondary-subtle small">
                  <em>Popup blocked or prefer another app?</em> 
                  <a href="${gmailComposeUrl}" target="_blank" rel="noopener noreferrer" class="fw-bold text-decoration-underline me-2">Open Gmail Manually</a> • 
                  <a href="${mailtoUri}" class="fw-bold text-decoration-underline ms-2">Open Default Mail Client</a>
                </div>
              </div>
            </div>
          `;
        }

        // Show toast notification
        showActionToast(
          `<div class="d-flex align-items-center gap-2">
            <i class="bi bi-envelope-check text-success fs-5"></i>
            <div>
              <strong>Opening Gmail Draft</strong><br>
              <small>Click "Send" in Gmail to complete delivery.</small>
            </div>
          </div>`
        );
      }
    });
  }

  // --------------------------------------------------------------------------
  // 5. Toast Notification Utility
  // --------------------------------------------------------------------------
  function showActionToast(messageHtml) {
    let toastContainer = document.getElementById('portfolioToastContainer');
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.id = 'portfolioToastContainer';
      toastContainer.style.position = 'fixed';
      toastContainer.style.bottom = '24px';
      toastContainer.style.left = '24px';
      toastContainer.style.zIndex = '1060';
      toastContainer.style.maxWidth = '380px';
      document.body.appendChild(toastContainer);
    }

    const toastEl = document.createElement('div');
    toastEl.className = 'toast align-items-center show shadow-lg border-0 mb-2';
    toastEl.style.backgroundColor = '#25352D';
    toastEl.style.color = '#F5F0E8';
    toastEl.style.borderRadius = '12px';
    toastEl.style.padding = '12px 16px';
    toastEl.setAttribute('role', 'alert');
    toastEl.setAttribute('aria-live', 'assertive');
    toastEl.setAttribute('aria-atomic', 'true');

    toastEl.innerHTML = `
      <div class="d-flex justify-content-between align-items-center">
        <div>${messageHtml}</div>
        <button type="button" class="btn-close btn-close-white ms-3" aria-label="Close"></button>
      </div>
    `;

    toastContainer.appendChild(toastEl);

    const closeBtn = toastEl.querySelector('.btn-close');
    closeBtn.addEventListener('click', () => {
      toastEl.remove();
    });

    setTimeout(() => {
      if (toastEl.parentNode) {
        toastEl.style.opacity = '0';
        toastEl.style.transition = 'opacity 0.4s ease';
        setTimeout(() => toastEl.remove(), 400);
      }
    }, 4500);
  }

  // --------------------------------------------------------------------------
  // 6. Back-to-Top Button Handler
  // --------------------------------------------------------------------------
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 350) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }, { passive: true });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // --------------------------------------------------------------------------
  // 7. Dynamic Copyright Year
  // --------------------------------------------------------------------------
  const currentYearSpan = document.getElementById('current-year');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // --------------------------------------------------------------------------
  // 8. Scroll-Reveal Observer for Fade-Up Elements
  // --------------------------------------------------------------------------
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const animatedElements = document.querySelectorAll('.fade-up-element');

  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.1
    });

    animatedElements.forEach((el) => revealObserver.observe(el));
  } else {
    // If reduced motion is preferred or observer unsupported, reveal immediately
    animatedElements.forEach((el) => el.classList.add('revealed'));
  }
});
