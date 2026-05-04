/* ============================================================
   Portfolio — main.js
   ============================================================ */

(function () {
  'use strict';

  /* ---- Sticky nav backdrop ---- */
  const header = document.getElementById('site-header');
  /* The header already has backdrop-filter via CSS; nothing extra needed */

  /* ---- Active nav link on scroll ---- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll(
    '.nav-links a[href^="#"], .mobile-nav-links a[href^="#"]'
  );

  function setActive(id) {
    navLinks.forEach(function (a) {
      a.classList.toggle('active', a.getAttribute('href') === '#' + id);
    });
  }

  if (sections.length && 'IntersectionObserver' in window) {
    const sectionObs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-30% 0px -60% 0px' }
    );
    sections.forEach(function (s) { sectionObs.observe(s); });
  }

  /* ---- Scroll-triggered reveal ---- */
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const revealObs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    reveals.forEach(function (el) { revealObs.observe(el); });
  } else {
    /* Fallback: just show everything */
    reveals.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ---- Mobile menu ---- */
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const menuClose  = document.getElementById('menuClose');

  function openMenu() {
    mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden';
    menuToggle.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
    menuToggle.setAttribute('aria-expanded', 'false');
  }

  menuToggle && menuToggle.addEventListener('click', openMenu);
  menuClose  && menuClose.addEventListener('click', closeMenu);
  mobileMenu && mobileMenu.addEventListener('click', function (e) {
    if (e.target === mobileMenu) closeMenu();
  });
  document.querySelectorAll('.mobile-nav-links a').forEach(function (a) {
    a.addEventListener('click', closeMenu);
  });

  /* ---- Project filter ---- */
  const filterPills   = document.querySelectorAll('.filter-pill');
  const projectWraps  = document.querySelectorAll('.project-card-wrap');
  const countEl       = document.querySelector('.project-count');

  filterPills.forEach(function (pill) {
    pill.addEventListener('click', function () {
      filterPills.forEach(function (p) { p.classList.remove('active'); });
      pill.classList.add('active');

      var tag = pill.dataset.tag;
      var count = 0;
      projectWraps.forEach(function (wrap) {
        var tags = JSON.parse(wrap.dataset.tags || '[]');
        var show = tag === 'All' || tags.includes(tag);
        wrap.style.display = show ? '' : 'none';
        if (show) count++;
      });
      if (countEl) countEl.textContent = count;
    });
  });

  /* ---- Project modal ---- */
  var modal       = document.getElementById('projectModal');
  var modalTitle  = document.getElementById('modalTitle');
  var modalBody   = document.getElementById('modalContent');

  function openModal(data) {
    modalTitle.textContent = data.name;

    var metaHtml = [data.type, data.status, 'Role: ' + data.role]
      .map(function (t) { return '<span class="badge">' + escHtml(t) + '</span>'; })
      .join('');

    var coverHtml = data.media && data.media.coverImage
      ? '<img class="dialog-cover" src="' + escHtml(data.media.coverImage) + '" alt="' + escHtml(data.name) + ' cover" onerror="this.style.display=\'none\'">'
      : '';

    var longDesc = data.longDescription
      ? '<p class="dialog-desc">' + escHtml(data.longDescription) + '</p>'
      : '';

    var featuresHtml = (data.features || [])
      .map(function (f) { return '<li>' + escHtml(f) + '</li>'; })
      .join('');

    var techHtml = (data.techStack || [])
      .map(function (t) { return '<span class="badge">' + escHtml(t) + '</span>'; })
      .join('');

    var linksHtml = '';
    if (data.links) {
      if (data.links.playstore) linksHtml += '<a class="button" href="' + escHtml(data.links.playstore) + '" target="_blank" rel="noreferrer">Play Store</a>';
      if (data.links.github)    linksHtml += '<a class="button-secondary" href="' + escHtml(data.links.github) + '" target="_blank" rel="noreferrer">GitHub</a>';
      if (data.links.demo)      linksHtml += '<a class="button-secondary" href="' + escHtml(data.links.demo) + '" target="_blank" rel="noreferrer">Demo</a>';
    }

    modalBody.innerHTML =
      coverHtml +
      '<div class="dialog-meta">' + metaHtml + '</div>' +
      longDesc +
      '<div class="dialog-grid">' +
        '<div class="dialog-block"><h4>Features</h4><ul class="dialog-list">' + featuresHtml + '</ul></div>' +
        '<div class="dialog-block"><h4>Tech Stack</h4><div class="chip-row">' + techHtml + '</div></div>' +
      '</div>' +
      (linksHtml ? '<div class="hero-actions" style="margin-top:16px">' + linksHtml + '</div>' : '');

    modal.showModal();
  }

  function escHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  document.querySelectorAll('.project-card').forEach(function (card) {
    var data;
    try { data = JSON.parse(card.dataset.project); } catch (e) { return; }

    card.addEventListener('click', function () { openModal(data); });
    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(data); }
    });
  });

  document.getElementById('modalClose') &&
    document.getElementById('modalClose').addEventListener('click', function () { modal.close(); });

  modal && modal.addEventListener('click', function (e) {
    /* Close when clicking the backdrop (outside dialog box) */
    var rect = modal.getBoundingClientRect();
    if (
      e.clientX < rect.left || e.clientX > rect.right ||
      e.clientY < rect.top  || e.clientY > rect.bottom
    ) {
      modal.close();
    }
  });

  /* Close modal on Escape (browsers do this natively for <dialog>, but be safe) */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal && modal.open) modal.close();
  });

})();
