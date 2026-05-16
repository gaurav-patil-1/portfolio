(function () {
  'use strict';

  /* ---------- Copyright Year ---------- */
  var yearEl = document.getElementById('copy-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Dynamic Experience ---------- */
  var expEl = document.getElementById('yearsExp');
  if (expEl) {
    var start = new Date(2023, 9, 9); // Oct 9, 2023
    var years = Math.floor((new Date() - start) / (365.25 * 24 * 60 * 60 * 1000));
    expEl.textContent = years + '+';
  }

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
      applyContribTheme(next);
    });
  }

  /* ---------- GitHub Contribution Images Theme ---------- */
  function applyContribTheme(theme) {
    var imgs = document.querySelectorAll('.js-theme-img');
    imgs.forEach(function (img) {
      var src = img.getAttribute('data-' + theme + '-src');
      if (src) img.src = src;
    });
  }
  applyContribTheme(savedTheme);

  /* ---------- GitHub Contribution Heatmap ---------- */
  (function () {
    var username = 'gaurav-patil-1';
    var container = document.getElementById('contrib-calendar');
    if (!container) return;

    var COLORS = {
      dark:  ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
      light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39']
    };

    var CELL = 11;
    var GAP  = 2;
    var STEP = CELL + GAP;

    var DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

    function formatDate(d) {
      return d.getFullYear() + '-' +
        String(d.getMonth() + 1).padStart(2, '0') + '-' +
        String(d.getDate()).padStart(2, '0');
    }

    function humanDate(dateStr) {
      var parts = dateStr.split('-');
      var d = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
      return DAYS[d.getDay()] + ', ' + MONTHS[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
    }

    function buildWeeks(contributions) {
      var map = {};
      contributions.forEach(function (c) { map[c.date] = c; });

      var today = new Date();
      // Start from the Sunday 52 full weeks before this week's Sunday
      var start = new Date(today);
      start.setDate(start.getDate() - today.getDay() - 52 * 7);

      var weeks = [];
      var cur = new Date(start);
      while (cur <= today) {
        var week = [];
        for (var di = 0; di < 7; di++) {
          var ds = formatDate(cur);
          var info = map[ds] || { count: 0, level: 0 };
          week.push({ date: ds, count: info.count, level: Math.min(info.level, 4) });
          cur.setDate(cur.getDate() + 1);
        }
        weeks.push(week);
      }
      return weeks;
    }

    function renderSVG(weeks, theme) {
      var colors = COLORS[theme];
      var W = weeks.length * STEP;
      var H = 7 * STEP + 20; // extra space for month labels

      var rects = [];
      var monthLabels = [];
      var lastMonth = -1;

      weeks.forEach(function (week, wi) {
        // Month label at the top of first week of a new month
        var firstDay = week[0];
        var m = Number(firstDay.date.split('-')[1]) - 1;
        if (m !== lastMonth) {
          monthLabels.push(
            '<text x="' + (wi * STEP) + '" y="10" fill="' +
            (theme === 'dark' ? '#8b949e' : '#57606a') +
            '" font-size="9" font-family="inherit">' + MONTHS[m] + '</text>'
          );
          lastMonth = m;
        }

        week.forEach(function (day, di) {
          var x = wi * STEP;
          var y = di * STEP + 16; // offset for month labels
          var color = colors[day.level];
          var label = day.count === 0
            ? 'No contributions on ' + humanDate(day.date)
            : day.count + ' contribution' + (day.count !== 1 ? 's' : '') + ' on ' + humanDate(day.date);
          rects.push(
            '<rect x="' + x + '" y="' + y + '" width="' + CELL + '" height="' + CELL +
            '" rx="2" fill="' + color + '" data-label="' + label + '" style="cursor:pointer"/>'
          );
        });
      });

      return '<svg viewBox="0 0 ' + W + ' ' + H +
        '" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;display:block">' +
        monthLabels.join('') + rects.join('') + '</svg>';
    }

    function getTooltip() {
      var t = document.getElementById('contrib-tooltip');
      if (!t) {
        t = document.createElement('div');
        t.id = 'contrib-tooltip';
        document.body.appendChild(t);
      }
      return t;
    }

    function attachTooltips() {
      var tooltip = getTooltip();
      container.querySelectorAll('rect[data-label]').forEach(function (rect) {
        rect.addEventListener('mouseenter', function () {
          tooltip.textContent = rect.getAttribute('data-label');
          tooltip.style.display = 'block';
        });
        rect.addEventListener('mousemove', function (e) {
          tooltip.style.left = (e.clientX + 14) + 'px';
          tooltip.style.top  = (e.clientY - 36) + 'px';
        });
        rect.addEventListener('mouseleave', function () {
          tooltip.style.display = 'none';
        });
      });
    }

    var cachedWeeks = null;

    function draw(theme) {
      if (!cachedWeeks) return;
      container.innerHTML = renderSVG(cachedWeeks, theme);
      attachTooltips();
    }

    // Re-render on theme change
    new MutationObserver(function () {
      draw(html.getAttribute('data-theme') || 'dark');
    }).observe(html, { attributes: true, attributeFilter: ['data-theme'] });

    // Show loading placeholder
    container.innerHTML = '<div class="contrib-loading">Loading contributions\u2026</div>';

    fetch('https://github-contributions-api.jogruber.de/v4/' + username + '?y=last')
      .then(function (r) { return r.json(); })
      .then(function (data) {
        cachedWeeks = buildWeeks(data.contributions);
        draw(html.getAttribute('data-theme') || 'dark');
      })
      .catch(function () {
        container.innerHTML = '<div class="contrib-loading">Could not load contribution data.</div>';
      });
  }());

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
