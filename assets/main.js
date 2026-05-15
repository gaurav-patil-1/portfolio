(function () {
  'use strict';

  /* ---------- Copyright Year ---------- */
  var yearEl = document.getElementById('copy-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Theme Toggle ---------- */
  var themeToggle = document.getElementById('themeToggle');
  var html = document.documentElement;
  var savedTheme = localStorage.getItem('theme') || 'dark';
  html.setAttribute('data-theme', savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var current = html.getAttribute('data-theme');
      var next = current === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
    });
  }

  /* ---------- Dock Active State on Scroll ---------- */
  var sections = document.querySelectorAll('section[id]');
  var dockItems = document.querySelectorAll('.dock-item[data-section]');

  function setActiveDock(id) {
    dockItems.forEach(function (item) {
      if (item.getAttribute('data-section') === id) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }

  if (sections.length && 'IntersectionObserver' in window) {
    var sectionObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          setActiveDock(entry.target.id);
        }
      });
    }, { rootMargin: '-20% 0px -60% 0px' });

    sections.forEach(function (s) { sectionObs.observe(s); });
  }

  /* ---------- Smooth dock click ---------- */
  dockItems.forEach(function (item) {
    item.addEventListener('click', function (e) {
      var href = item.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        var target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  /* ---------- Scroll Reveal ---------- */
  var revealEls = document.querySelectorAll(
    '.section, .glass-card, .hero-content, .hero-stats, .timeline-entry'
  );

  if ('IntersectionObserver' in window) {
    var revealObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });

    revealEls.forEach(function (el) {
      el.classList.add('reveal');
      revealObs.observe(el);
    });
  }

  /* ---------- Hide dock on scroll up near hero, show otherwise ---------- */
  var dock = document.getElementById('dock');
  var lastScroll = 0;

  if (dock) {
    window.addEventListener('scroll', function () {
      var currentScroll = window.scrollY;
      if (currentScroll < 100) {
        dock.style.opacity = '1';
        dock.style.transform = 'translateX(-50%) translateY(0)';
      }
      lastScroll = currentScroll;
    }, { passive: true });
  }

})();
