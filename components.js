// ── Page fade in ──
document.addEventListener('DOMContentLoaded', () => document.body.classList.add('loaded'));

// ── Shared Nav & Footer ──
// Edit this file to update nav/footer across all pages

const NAV_HTML = `
  <nav id="nav">
    <div class="nav-inner">
      <a class="nav-logo" href="/index.html">Ara An</a>
      <ul class="nav-links">
        <li><a href="/index.html">Projects</a></li>
        <li><a href="/about.html">About</a></li>
      </ul>
    </div>
  </nav>
`;

const FOOTER_HTML = `
  <footer>
    <div class="footer-inner">
      <div class="footer-bottom">
        <div class="footer-links">
          <a class="footer-link" href="mailto:araleean@gmail.com">araleean@gmail.com</a>
          <a class="footer-link" href="https://www.linkedin.com/in/araan/" target="_blank">LinkedIn</a>
        </div>
        <div class="footer-copy">© 2026</div>
      </div>
    </div>
  </footer>
`;

// Inject nav before body content
document.body.insertAdjacentHTML('afterbegin', NAV_HTML);

// Nav behaviour — always visible
window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;
  nav.classList.toggle('scrolled', currentScrollY > 40);
});

// ── Other Projects ──
const PROJECTS = [
  { slug: 'promo-engine',        company: 'theScore Bet',           label: 'Promotion Engine',                          href: 'promo-engine.html',        bg: '#2d3e5f', thumb: 'images/promo-engine-thumb.png' },
  { slug: 'hollywood-casino',    company: 'Hollywood Casino',       label: 'Standalone Casino',                          href: 'hollywood-casino.html',    bg: '#1a0a2e', thumb: 'images/hwcasino-thumbnail.png' },
  { slug: 'espn-bet-onboarding', company: 'theScore Bet & ESPN Bet', label: 'Sign Up Optimization',               href: 'espn-bet-onboarding.html', bg: '#2D387F', thumb: 'images/espnbet-thumbnail.png' },
  { slug: 'thescore-bet',        company: 'theScore Bet',           label: 'Launching theScore Bet', href: 'thescore-bet.html',        bg: '#71AFF5', thumb: 'images/tsblaunch-thumbnail.png' },
  { slug: 'telus-accessories',   company: 'TELUS Digital',          label: 'Accessories',      href: 'telus-accessories.html',   bg: '#f0ede8', thumb: 'images/telus-accessories-thumbnail.png' },
  { slug: 'telus-cart',          company: 'TELUS Digital',          label: 'Cart',                 href: 'telus-cart.html',          bg: '#774D9C', thumb: 'images/telus-cart-thumbnail.png' },
];

(function injectOtherProjects() {
  const page = location.pathname.split('/').pop().replace('.html', '') || 'index';
  if (page === 'index' || page === 'about') return;

  const others = PROJECTS.filter(p => p.slug !== page);

  const cards = others.map(p => `
    <a class="op-card" href="${p.href}">
      <div class="op-thumb" style="background:${p.bg};">
        <img src="${p.thumb}" alt="${p.label}">
      </div>
      <div class="op-meta">
        <div class="op-eyebrow">${p.company}</div>
        <div class="op-title">${p.label}</div>
      </div>
    </a>
  `).join('');

  const html = `
    <style>
      .op-section {
        border-top: 0.5px solid #e8e8e8;
        padding: 56px 0 72px;
      }
      .op-inner {
        max-width: 1100px;
        margin: 0 auto;
        padding: 0 60px;
      }
      .op-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 32px;
      }
      .op-heading {
        font-size: 28px;
        font-weight: 500;
        color: #252525;
        line-height: 1.15;
      }
      .op-arrows { display: flex; gap: 8px; }
      .op-arrow {
        width: 40px; height: 40px;
        border-radius: 50%;
        border: 1px solid #e0e0e0;
        background: #fff;
        cursor: pointer;
        display: flex; align-items: center; justify-content: center;
        color: #252525;
        transition: background 0.2s, border-color 0.2s;
        flex-shrink: 0;
      }
      .op-arrow:hover { background: #f5f5f5; border-color: #bbb; }
      .op-arrow svg { display: block; }
      .op-track-wrap { overflow: hidden; }
      .op-track {
        display: flex;
        gap: 20px;
        transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
      }
      .op-card {
        flex: 0 0 calc(33.333% - 14px);
        text-decoration: none;
        color: inherit;
        display: flex;
        flex-direction: column;
        gap: 14px;
      }
      .op-thumb {
        border-radius: 12px;
        overflow: hidden;
        aspect-ratio: 4/3;
        transition: opacity 0.2s;
      }
      .op-thumb img {
        width: 100%; height: 100%;
        object-fit: cover;
        object-position: top;
        display: block;
      }
      .op-card:hover .op-thumb { opacity: 0.88; }
      .op-eyebrow {
        font-size: 13px;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: #9b9b9b;
        font-weight: 400;
        margin-bottom: 2px;
      }
      .op-title {
        font-size: 18px;
        font-weight: 500;
        color: #252525;
        line-height: 1.3;
      }
      .op-card:hover .op-title { text-decoration: underline; text-underline-offset: 3px; }
      @media (max-width: 768px) {
        .op-inner { padding: 0 24px; }
        .op-card { flex: 0 0 80%; }
      }
    </style>
    <div class="op-section">
      <div class="op-inner">
        <div class="op-header">
          <div class="op-heading">Other projects</div>
          <div class="op-arrows">
            <button class="op-arrow" id="op-prev"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 12L6 8l4-4" stroke="#252525" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
            <button class="op-arrow" id="op-next"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="#252525" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
          </div>
        </div>
        <div class="op-track-wrap">
          <div class="op-track" id="op-track">${cards}</div>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', html);

  let idx = 0;
  const track = document.getElementById('op-track');
  const cardEls = track.querySelectorAll('.op-card');
  const visible = window.innerWidth <= 768 ? 1 : 3;
  const max = Math.max(0, cardEls.length - visible);

  function slide(dir) {
    idx = Math.max(0, Math.min(idx + dir, max));
    const w = cardEls[0].getBoundingClientRect().width + 20;
    track.style.transform = `translateX(-${idx * w}px)`;
  }

  document.getElementById('op-prev').addEventListener('click', () => slide(-1));
  document.getElementById('op-next').addEventListener('click', () => slide(1));
})();

