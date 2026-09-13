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
