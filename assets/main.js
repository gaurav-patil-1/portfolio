(function () {
  'use strict';

  var html = document.documentElement;

  /* ---------- Circular Favicon ---------- */
  (function () {
    var img = new Image();
    img.onload = function () {
      var size = 64;
      var canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      var ctx = canvas.getContext('2d');
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(img, 0, 0, size, size);
      var link = document.querySelector("link[rel='icon']");
      if (link) {
        link.type = 'image/png';
        link.href = canvas.toDataURL('image/png');
      }
    };
    img.src = 'assets/avatar.jpg';
  }());

  /* ---------- Theme ---------- */
  var THEME_COLORS = { dark: '#0e0d0b', light: '#faf6ef' };

  function currentTheme() {
    return html.getAttribute('data-theme') || 'dark';
  }

  function setTheme(theme) {
    html.setAttribute('data-theme', theme);
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', THEME_COLORS[theme]);
  }

  var savedTheme = localStorage.getItem('theme');
  if (!savedTheme && window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    savedTheme = 'light';
  }
  setTheme(savedTheme || 'dark');

  var themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var next = currentTheme() === 'dark' ? 'light' : 'dark';
      setTheme(next);
      localStorage.setItem('theme', next);
    });
  }

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

  /* ---------- Local Time (IST) ---------- */
  (function () {
    var timeEl = document.getElementById('localTime');
    if (!timeEl) return;
    var fmt = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit'
    });
    function tick() { timeEl.textContent = fmt.format(new Date()); }
    tick();
    setInterval(tick, 30000);
  }());

  /* ---------- Header scrolled state ---------- */
  var header = document.getElementById('siteHeader');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('scrolled', window.scrollY > 10);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Mobile menu overlay ---------- */
  (function () {
    var toggle = document.getElementById('menuToggle');
    var overlay = document.getElementById('menuOverlay');
    if (!toggle || !overlay) return;

    function setMenu(open) {
      document.body.classList.toggle('menu-open', open);
      document.body.style.overflow = open ? 'hidden' : '';
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      overlay.setAttribute('aria-hidden', String(!open));
    }

    toggle.addEventListener('click', function () {
      setMenu(!document.body.classList.contains('menu-open'));
    });

    overlay.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () { setMenu(false); });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && document.body.classList.contains('menu-open')) setMenu(false);
    });
  }());

  /* ---------- GitHub Contribution Heatmap ---------- */
  (function () {
    var username = 'gaurav-patil-1';
    var container = document.getElementById('contrib-calendar');
    if (!container) return;

    var COLORS = {
      dark:  ['#201d19', '#4a2617', '#8a3d1e', '#cf5525', '#ff6d3f'],
      light: ['#eee8df', '#f6c9b2', '#e88f5e', '#d05a25', '#a83c0e']
    };
    var LABEL = { dark: '#78726a', light: '#989085' };

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
            '<text x="' + (wi * STEP) + '" y="10" fill="' + LABEL[theme] +
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

    /* Native GitHub stats — total, longest streak, current streak */
    function renderStats(contributions) {
      var statsEl = document.getElementById('gh-stats');
      if (!statsEl) return;

      var total = 0;
      var longest = 0;
      var run = 0;

      contributions.forEach(function (c) {
        total += c.count;
        if (c.count > 0) {
          run++;
          if (run > longest) longest = run;
        } else {
          run = 0;
        }
      });

      // Current streak: consecutive days ending today (or yesterday, if today has none yet)
      var current = 0;
      var i = contributions.length - 1;
      if (i >= 0 && contributions[i].count === 0) i--;
      while (i >= 0 && contributions[i].count > 0) { current++; i--; }

      function stat(value, label) {
        return '<div class="gh-stat"><span class="gh-stat-value">' + value +
          '</span><span class="gh-stat-label mono">' + label + '</span></div>';
      }

      statsEl.innerHTML =
        stat(total.toLocaleString('en'), 'Contributions · past year') +
        stat(longest + (longest === 1 ? ' day' : ' days'), 'Longest streak') +
        stat(current + (current === 1 ? ' day' : ' days'), 'Current streak');
    }

    var cachedWeeks = null;

    function draw(theme) {
      if (!cachedWeeks) return;
      container.innerHTML = renderSVG(cachedWeeks, theme);
      attachTooltips();
    }

    // Re-render on theme change
    new MutationObserver(function () {
      draw(currentTheme());
    }).observe(html, { attributes: true, attributeFilter: ['data-theme'] });

    // Show loading placeholder
    container.innerHTML = '<div class="contrib-loading">Loading contributions…</div>';

    fetch('https://github-contributions-api.jogruber.de/v4/' + username + '?y=last')
      .then(function (r) { return r.json(); })
      .then(function (data) {
        cachedWeeks = buildWeeks(data.contributions);
        draw(currentTheme());
        renderStats(data.contributions);
      })
      .catch(function () {
        container.innerHTML = '<div class="contrib-loading">Could not load contribution data.</div>';
      });
  }());

  /* ---------- Nav active state on scroll ---------- */
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('a[data-section]');

  function setActiveNav(id) {
    navLinks.forEach(function (link) {
      link.classList.toggle('active', link.getAttribute('data-section') === id);
    });
  }

  if (sections.length && 'IntersectionObserver' in window) {
    var sectionObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          setActiveNav(entry.target.id);
        }
      });
    }, { rootMargin: '-20% 0px -60% 0px' });

    sections.forEach(function (s) { sectionObs.observe(s); });
  }

  /* ---------- Scroll Reveal ---------- */
  var revealEls = document.querySelectorAll(
    '.section-head, .about-statement, .about-facts, .stack-rows, .xp-row, ' +
    '.feature, .projects-more, .activity-sub, .contrib-calendar-wrap, .gh-stats, ' +
    '.contact-kicker, .contact-cta, .contact-email-row, .cf-form, .contact-socials'
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

      function legacyCopy() {
        var ta = document.createElement('textarea');
        ta.value = text;
        ta.style.cssText = 'position:fixed;opacity:0;pointer-events:none';
        document.body.appendChild(ta);
        ta.select();
        var ok = false;
        try { ok = document.execCommand('copy'); } catch (e) { /* unsupported */ }
        document.body.removeChild(ta);
        showToast(ok ? '✓ Email copied!' : 'Copy failed — email is gauravpatil5152@gmail.com');
      }

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text)
          .then(function () { showToast('✓ Email copied!'); })
          .catch(legacyCopy);
      } else {
        legacyCopy();
      }
    });
  });

  /* ---------- Easter Egg — Konami Code ---------- */
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
      submitBtn.textContent = 'Sending…';
      statusEl.textContent = '';
      statusEl.className = 'cf-status';

      fetch('https://api.web3forms.com/submit', { method: 'POST', body: new FormData(form) })
        .then(function (r) { return r.json(); })
        .then(function (res) {
          if (res.success) {
            statusEl.textContent = '✓ Message sent! I’ll get back to you soon.';
            statusEl.className = 'cf-status success';
            form.reset();
          } else {
            throw new Error('failed');
          }
        })
        .catch(function () {
          statusEl.textContent = 'Something went wrong — try emailing directly.';
          statusEl.className = 'cf-status error';
        })
        .finally(function () {
          submitBtn.disabled = false;
          submitBtn.innerHTML = 'Send message<span class="btn-arrow" aria-hidden="true">→</span>';
        });
    });
  }());

})();
