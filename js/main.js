// ================================
// SARAB-E-ZEESHT — Main JavaScript
// ================================

// ---- NAV SCROLL EFFECT ----
const nav = document.querySelector('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  });
}

// ---- MOBILE MENU ----
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileClose = document.getElementById('mobileClose');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
}
if (mobileClose) {
  mobileClose.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
}
if (mobileMenu) {
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// ---- HERO PARTICLES ----
function createParticles() {
  const container = document.querySelector('.hero-particles');
  if (!container) return;
  for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.cssText = `
      left: ${Math.random() * 100}%;
      --dur: ${6 + Math.random() * 10}s;
      --dx: ${(Math.random() - 0.5) * 100}px;
      --op: ${0.3 + Math.random() * 0.5};
      animation-delay: ${Math.random() * 8}s;
    `;
    container.appendChild(p);
  }
}
createParticles();

// ---- SCROLL REVEAL ----
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

// expose globally so chapter-list scripts can use it
window.observer = observer;

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// ---- ACTIVE NAV LINKS ----
(function setActiveNav() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(link => {
    const href = link.getAttribute('href').split('/').pop();
    if (href === path) link.classList.add('active');
  });
})();

// ---- CHAPTER SEARCH ----
const searchInput = document.getElementById('chapterSearch');
if (searchInput) {
  searchInput.addEventListener('input', function () {
    const q = this.value.trim().toLowerCase();
    document.querySelectorAll('.chapter-card, .chapter-row').forEach(card => {
      const text = card.textContent.toLowerCase();
      card.style.display = !q || text.includes(q) ? '' : 'none';
    });
  });
}

// ---- BOOKMARK SYSTEM ----
const BOOKMARKS_KEY = 'sarab_bookmarks';
const LAST_READ_KEY = 'sarab_last_read';

function getBookmarks() {
  try { return JSON.parse(localStorage.getItem(BOOKMARKS_KEY)) || []; }
  catch { return []; }
}

function saveBookmarks(bm) {
  localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bm));
}

function toggleBookmark(chapterNum, chapterName) {
  let bm = getBookmarks();
  const idx = bm.findIndex(b => b.num === chapterNum);
  if (idx > -1) {
    bm.splice(idx, 1);
    showToast('Bookmark removed');
  } else {
    bm.push({ num: chapterNum, name: chapterName, ts: Date.now() });
    showToast('✦ Bookmarked!');
  }
  saveBookmarks(bm);
  updateBookmarkBtn(chapterNum);
}

function updateBookmarkBtn(chapterNum) {
  const btn = document.getElementById('bookmarkBtn');
  if (!btn) return;
  const bm = getBookmarks();
  const isBookmarked = bm.some(b => b.num === chapterNum);
  btn.classList.toggle('active', isBookmarked);
  btn.textContent = isBookmarked ? '✦ Bookmarked' : '✧ Bookmark';
}

// ---- LAST READ SYSTEM ----
function setLastRead(chapterNum, chapterName) {
  localStorage.setItem(LAST_READ_KEY, JSON.stringify({ num: chapterNum, name: chapterName }));
}

function getLastRead() {
  try { return JSON.parse(localStorage.getItem(LAST_READ_KEY)); }
  catch { return null; }
}

// ---- CONTINUE READING BANNER ----
function initContinueBanner() {
  const lastRead = getLastRead();
  const banner = document.getElementById('continueBanner');
  if (!banner || !lastRead) return;
  const nameEl = banner.querySelector('.continue-banner-chapter');
  const btn = banner.querySelector('.continue-banner-btn');
  if (nameEl) nameEl.textContent = lastRead.name;
  // Determine correct path depth
  const isRoot = !window.location.pathname.includes('/pages/');
  const prefix = isRoot ? 'pages/' : '';
  if (btn) btn.href = `${prefix}chapter.html?ch=${lastRead.num}`;
  setTimeout(() => banner.classList.add('visible'), 2500);
  const closeBtn = document.getElementById('continueBannerClose');
  if (closeBtn) closeBtn.addEventListener('click', () => banner.classList.remove('visible'));
}
initContinueBanner();

// ---- TOAST NOTIFICATION ----
function showToast(msg) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.style.cssText = `
      position:fixed; bottom:6rem; left:50%; transform:translateX(-50%);
      background:var(--bg-elevated); border:1px solid var(--border-glow);
      color:var(--gold); font-family:'Cinzel',serif; font-size:0.7rem;
      letter-spacing:0.2em; text-transform:uppercase; padding:0.75rem 1.5rem;
      border-radius:4px; z-index:3000; transition:opacity 0.4s ease;
      box-shadow:0 4px 20px rgba(91,59,138,0.3); white-space:nowrap;
    `;
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.style.opacity = '1';
  clearTimeout(toast._t);
  toast._t = setTimeout(() => { toast.style.opacity = '0'; }, 2500);
}

// ---- READING PROGRESS BAR ----
function initProgressBar() {
  const bar = document.getElementById('progressBar');
  if (!bar) return;
  const update = () => {
    const docH = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docH > 0 ? (window.scrollY / docH) * 100 : 0;
    bar.style.width = pct + '%';
  };
  window.addEventListener('scroll', update, { passive: true });
  update();
}
initProgressBar();

// ---- FEEDBACK FORM ----
const feedbackForm = document.getElementById('feedbackForm');
if (feedbackForm) {
  feedbackForm.addEventListener('submit', function (e) {
    e.preventDefault();
    feedbackForm.style.display = 'none';
    const success = document.getElementById('formSuccess');
    if (success) success.style.display = 'block';
  });
}
