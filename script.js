(() => {
  // -------- Theme handling --------
  // Light-first: the system preference is deliberately ignored so every visitor
  // lands in light. Dark only applies when someone chooses it here, and that
  // choice persists across visits.
  const saved = localStorage.getItem('site-theme');
  document.body.setAttribute('data-theme', saved === 'dark' ? 'dark' : 'light');

  const themeToggle = document.getElementById('themeToggle');
  function updateToggleIcon() {
    themeToggle.textContent = document.body.getAttribute('data-theme') === 'dark' ? '☀️' : '🌙';
  }
  updateToggleIcon();

  themeToggle.addEventListener('click', () => {
    const next = document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.body.setAttribute('data-theme', next);
    localStorage.setItem('site-theme', next);
    updateToggleIcon();
    // the embedded demo is a separate document, so it has to be told as well
    const frame = document.querySelector('.reel iframe');
    if (frame) frame.src = reelSrc();
  });

  // -------- Typing line under the headline --------
  const phrases = [
    'owning BNPL growth at ShopeePay',
    'managing a $3M/month lifecycle budget',
    'building cohort heatmap dashboards',
    'shipping credit products for sellers'
  ];

  const typingEl = document.getElementById('typing');
  let phIndex = 0, charIndex = 0, deleting = false;

  const TYPING_SPEED = 60;
  const DELETING_SPEED = 30;
  const DELAY_AFTER = 1600;

  function tick() {
    const current = phrases[phIndex];

    if (!deleting) {
      charIndex++;
      typingEl.textContent = current.slice(0, charIndex);
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(tick, DELAY_AFTER);
        return;
      }
    } else {
      charIndex--;
      typingEl.textContent = current.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        phIndex = (phIndex + 1) % phrases.length;
      }
    }
    setTimeout(tick, deleting ? DELETING_SPEED : TYPING_SPEED);
  }

  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    setTimeout(tick, 600);
  } else {
    typingEl.textContent = phrases[0];
  }

  // -------- Scroll progress in the nav --------
  // Section reveals are handled in CSS (animation-timeline: view()), so the
  // only thing left for JS is telling you how far through the page you are.
  const progress = document.getElementById('navProgress');
  let ticking = false;

  function updateProgress() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
    progress.style.width = Math.min(100, Math.max(0, pct)) + '%';
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) { ticking = true; requestAnimationFrame(updateProgress); }
  }, { passive: true });
  updateProgress();

  // -------- Mobile menu --------
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');

  menuToggle && menuToggle.addEventListener('click', () => {
    const isOpen = mobileMenu.style.display === 'flex';
    mobileMenu.style.display = isOpen ? 'none' : 'flex';
  });

  mobileMenu && mobileMenu.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => mobileMenu.style.display = 'none')
  );

  // -------- The NAVI demo, embedded and playing itself --------
  // The poster ships in the HTML so the card is complete before any of this
  // runs. The iframe replaces it only when the card is actually approaching
  // the viewport, on a screen wide enough to read it, and when the visitor
  // hasn't asked for less motion.
  const reel = document.getElementById('naviReel');

  function reelSrc() {
    const dark = document.body.getAttribute('data-theme') === 'dark';
    return reel.dataset.src + (dark ? '-dark' : '');
  }

  function mountReel() {
    if (!reel || reel.querySelector('iframe')) return;
    const frame = document.createElement('iframe');
    frame.src = reelSrc();
    frame.loading = 'lazy';
    frame.tabIndex = -1;
    frame.setAttribute('aria-hidden', 'true');
    frame.title = 'NAVI demo, playing';
    reel.appendChild(frame);
    reel.insertAdjacentHTML('beforeend', '<span class="badge"><i></i>playing</span>');
  }

  if (reel) {
    const wideEnough = window.matchMedia('(min-width: 760px)').matches;
    const stillness = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (wideEnough && !stillness && 'IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { mountReel(); io.disconnect(); }
        });
      }, { rootMargin: '300px' });
      io.observe(reel);
    }
  }

  // -------- Year in footer --------
  document.getElementById('year').textContent = new Date().getFullYear();

  // -------- Accessibility focus outline --------
  function handleFirstTab(e) {
    if (e.key === 'Tab') {
      document.documentElement.classList.add('show-focus');
      window.removeEventListener('keydown', handleFirstTab);
    }
  }
  window.addEventListener('keydown', handleFirstTab);
})();
