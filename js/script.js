/* ==========================================================================
   OM DANGOL — PORTFOLIO SCRIPT ENGINE
   Scroll storytelling, sticky modules, interactive skills clusters,
   category filtering, and dual theme persistence.
   ========================================================================== */

(function () {
  'use strict';

  // ---------------------------------------------------------------------------
  // 1. THEME TOGGLE WITH LOCAL STORAGE PERSISTENCE
  // ---------------------------------------------------------------------------
  function initTheme() {
    const toggleBtn = document.getElementById('themeToggleBtn');
    const storedTheme = localStorage.getItem('om_portfolio_theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = storedTheme || (prefersDark ? 'dark' : 'light');

    document.documentElement.setAttribute('data-theme', initialTheme);

    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', nextTheme);
        localStorage.setItem('om_portfolio_theme', nextTheme);
      });
    }
  }

  // ---------------------------------------------------------------------------
  // 2. READING SCROLL PROGRESS BAR
  // ---------------------------------------------------------------------------
  function initScrollProgress() {
    const progressBar = document.getElementById('scrollProgressBar');
    if (!progressBar) return;

    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressBar.style.width = `${progress}%`;
    }, { passive: true });
  }

  // ---------------------------------------------------------------------------
  // 3. STICKY MODULES OBSERVER & INTERACTIVE TIMELINE
  // ---------------------------------------------------------------------------
  function initModuleObserver() {
    const moduleCards = document.querySelectorAll('.module-story-card');
    const indicatorItems = document.querySelectorAll('.module-indicator-item');

    if (moduleCards.length === 0 || indicatorItems.length === 0) return;

    // Click handler for indicators
    indicatorItems.forEach(item => {
      item.addEventListener('click', () => {
        const targetId = item.dataset.modTarget;
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      });
    });

    // Scroll Observer
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -40% 0px',
      threshold: 0.1
    };

    const moduleObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          indicatorItems.forEach(ind => {
            ind.classList.toggle('active', ind.dataset.modTarget === id);
          });
        }
      });
    }, observerOptions);

    moduleCards.forEach(card => moduleObserver.observe(card));
  }

  // ---------------------------------------------------------------------------
  // 4. PROJECT CATEGORY FILTERING
  // ---------------------------------------------------------------------------
  function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.proj-filter-btn');
    const projectCards = document.querySelectorAll('.showcase-card');

    if (filterBtns.length === 0 || projectCards.length === 0) return;

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        projectCards.forEach(card => {
          const category = card.dataset.category || '';
          if (filter === 'all' || category.includes(filter)) {
            card.style.display = 'flex';
            card.style.animation = 'fadeIn 0.3s ease forwards';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // ---------------------------------------------------------------------------
  // 5. INTERACTIVE SKILLS RELATIONSHIP INSPECTOR
  // ---------------------------------------------------------------------------
  function initSkillInspector() {
    const skillNodes = document.querySelectorAll('.skill-node');
    const nameEl = document.getElementById('inspectorSkillName');
    const relEl = document.getElementById('inspectorSkillRel');

    if (!nameEl || !relEl || skillNodes.length === 0) return;

    skillNodes.forEach(node => {
      node.addEventListener('click', () => {
        skillNodes.forEach(n => n.classList.remove('selected'));
        node.classList.add('selected');

        const skillName = node.dataset.skill;
        const skillRel = node.dataset.rel;

        nameEl.textContent = `Technology: ${skillName}`;
        relEl.innerHTML = `Connected Work & Context: <strong>${skillRel}</strong>`;
      });
    });
  }

  // ---------------------------------------------------------------------------
  // 6. MOBILE DRAWER NAVIGATION
  // ---------------------------------------------------------------------------
  function initMobileMenu() {
    const menuBtn = document.getElementById('mobileMenuBtn');
    const drawer = document.getElementById('mobileDrawer');
    const links = document.querySelectorAll('.mobile-nav-link');

    if (!menuBtn || !drawer) return;

    menuBtn.addEventListener('click', () => {
      const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
      menuBtn.setAttribute('aria-expanded', String(!isExpanded));
      drawer.hidden = isExpanded;
      drawer.style.display = isExpanded ? 'none' : 'block';
    });

    links.forEach(link => {
      link.addEventListener('click', () => {
        menuBtn.setAttribute('aria-expanded', 'false');
        drawer.hidden = true;
        drawer.style.display = 'none';
      });
    });
  }

  // ---------------------------------------------------------------------------
  // 7. CONTACT FORM SUBMISSION HANDLER
  // ---------------------------------------------------------------------------
  function initContactForm() {
    const form = document.getElementById('contactForm');
    const notice = document.getElementById('formStatusNotice');

    if (!form || !notice) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contactName')?.value;
      notice.innerHTML = `✓ Thank you, <strong>${name}</strong>! Your message is formatted and ready. You can also reach out via LinkedIn or GitHub!`;
      notice.style.color = 'var(--accent-green)';
      form.reset();
    });
  }

  // ---------------------------------------------------------------------------
  // INITIALIZATION
  // ---------------------------------------------------------------------------
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initScrollProgress();
    initModuleObserver();
    initProjectFilters();
    initSkillInspector();
    initMobileMenu();
    initContactForm();
  });

})();
