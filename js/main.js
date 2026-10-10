// Mobile nav, Madrid clock with online status, footer year.

(function () {
  'use strict';

  // ---------------------------------------------------------------------------
  // Mobile navigation
  // ---------------------------------------------------------------------------
  const toggle = document.querySelector('.nav__toggle');
  const menu = document.getElementById('nav-menu');

  function setMenuOpen(open) {
    toggle.setAttribute('aria-expanded', String(open));
    menu.classList.toggle('is-open', open);
  }

  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      setMenuOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });

    menu.addEventListener('click', function (event) {
      if (event.target.closest('a')) setMenuOpen(false);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setMenuOpen(false);
        toggle.focus();
      }
    });
  }

  // ---------------------------------------------------------------------------
  // Clock and online status (Europe/Madrid, regardless of visitor's time zone)
  // ---------------------------------------------------------------------------
  const TIME_ZONE = 'Europe/Madrid';
  const ONLINE_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  const ONLINE_START = 9 * 60;       // 09:00, in minutes since midnight
  const ONLINE_END = 16 * 60 + 30;   // 16:30 (exclusive)

  const formatter = new Intl.DateTimeFormat('en-GB', {
    timeZone: TIME_ZONE,
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hourCycle: 'h23'
  });

  const timeEl = document.getElementById('madrid-time');
  const presenceEl = document.getElementById('presence');
  const presenceLabel = presenceEl && presenceEl.querySelector('.status__label');

  function madridNow() {
    const parts = {};
    formatter.formatToParts(new Date()).forEach(function (part) {
      parts[part.type] = part.value;
    });
    return {
      weekday: parts.weekday,
      hour: parts.hour,
      minute: parts.minute,
      second: parts.second,
      minutes: Number(parts.hour) * 60 + Number(parts.minute)
    };
  }

  function updateClock() {
    const now = madridNow();
    const online = ONLINE_DAYS.includes(now.weekday) &&
      now.minutes >= ONLINE_START && now.minutes < ONLINE_END;

    if (timeEl) timeEl.textContent = now.hour + ':' + now.minute + ':' + now.second;
    if (presenceEl) presenceEl.classList.toggle('is-online', online);
    if (presenceLabel) presenceLabel.textContent = online ? 'Online' : 'Offline';
  }

  updateClock();
  setInterval(updateClock, 1000);

  // ---------------------------------------------------------------------------
  // Footer year
  // ---------------------------------------------------------------------------
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
