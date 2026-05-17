(function () {
  'use strict';

  /* ---------- Role Duration Badges ---------- */
  (function () {
    function getDuration(start, end) {
      var s = new Date(start);
      var e = new Date(end);
      var years  = e.getFullYear() - s.getFullYear();
      var months = e.getMonth()    - s.getMonth();
      if (e.getDate() < s.getDate()) { months--; }
      if (months < 0) { years--; months += 12; }
      var y = years  > 0 ? years  + ' yr'  + (years  > 1 ? 's' : '') : '';
      var m = months > 0 ? months + ' mo'  + (months > 1 ? 's' : '') : '';
      return [y, m].filter(Boolean).join(' ') || '< 1 mo';
    }

    var se1 = document.getElementById('dur-se1');
    if (se1) se1.textContent = getDuration('2023-10-08', '2025-03-01');

    var se2 = document.getElementById('dur-se2');
    if (se2) se2.textContent = getDuration('2025-03-01', new Date());
  }());

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

  /* ---------- Scroll Progress Bar ---------- */
  var scrollBar = document.getElementById('scroll-bar');
  if (scrollBar) {
    window.addEventListener('scroll', function () {
      var scrolled = document.documentElement.scrollTop || document.body.scrollTop;
      var total    = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      scrollBar.style.width = (total > 0 ? (scrolled / total) * 100 : 0) + '%';
    }, { passive: true });
  }

  /* ---------- Toast ---------- */
  function showToast(msg) {
    var t = document.getElementById('toast');
    if (!t) return;
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(t._hideTimer);
    t._hideTimer = setTimeout(function () { t.classList.remove('show'); }, 2500);
  }

  /* ---------- Copy Email ---------- */
  document.querySelectorAll('.copy-btn[data-copy]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var text = btn.getAttribute('data-copy');
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(function () { showToast('\u2713 Email copied!'); });
      } else {
        var ta = document.createElement('textarea');
        ta.value = text;
        ta.style.cssText = 'position:fixed;opacity:0;pointer-events:none';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        showToast('\u2713 Email copied!');
      }
    });
  });

  /* ---------- Easter Egg - Konami Code ---------- */
  (function () {
    var CODE = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown',
                'ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
    var pos = 0;
    var overlay  = document.getElementById('easter-egg');
    var closeBtn = document.getElementById('easter-egg-close');

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && overlay) { overlay.classList.remove('active'); pos = 0; return; }
      if (e.key === CODE[pos]) {
        pos++;
        if (pos === CODE.length) {
          pos = 0;
          if (overlay) { overlay.setAttribute('aria-hidden', 'false'); overlay.classList.add('active'); }
        }
      } else {
        pos = (e.key === CODE[0]) ? 1 : 0;
      }
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', function () {
        overlay.setAttribute('aria-hidden', 'true');
        overlay.classList.remove('active');
      });
    }
    if (overlay) {
      overlay.addEventListener('click', function (e) {
        if (e.target === overlay) { overlay.setAttribute('aria-hidden', 'true'); overlay.classList.remove('active'); }
      });
    }
  }());

  /* ---------- Contact Form (Web3Forms) ---------- */
  (function () {
    var form      = document.getElementById('contact-form');
    var statusEl  = document.getElementById('cf-status');
    var submitBtn = document.getElementById('cf-submit');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending\u2026';
      statusEl.textContent = '';
      statusEl.className = 'cf-status';

      fetch('https://api.web3forms.com/submit', { method: 'POST', body: new FormData(form) })
        .then(function (r) { return r.json(); })
        .then(function (res) {
          if (res.success) {
            statusEl.textContent = '\u2713 Message sent! I\u2019ll get back to you soon.';
            statusEl.className = 'cf-status success';
            form.reset();
          } else {
            throw new Error('failed');
          }
        })
        .catch(function () {
          statusEl.textContent = 'Something went wrong \u2014 try emailing directly.';
          statusEl.className = 'cf-status error';
        })
        .finally(function () {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Send Message';
        });
    });
  }());

})();
