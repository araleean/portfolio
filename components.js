// ── Page fade in ──
document.addEventListener('DOMContentLoaded', () => document.body.classList.add('loaded'));

// ── Shared Nav & Footer ──
// Edit this file to update nav/footer across all pages

const NAV_HTML = `
  <nav id="nav">
    <div class="nav-inner">
      <a class="nav-logo" href="/index.html">Ara An</a>
      <ul class="nav-links">
        <li><a href="/index.html">Work</a></li>
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

// ── Project data for "More Work" footer ──
const PROJECTS = [
  {
    slug: 'hollywood-casino',
    eyebrow: 'Hollywood Casino',
    title: 'Standalone App',
    desc: 'A dedicated experience for casino users across the US and Canada on iOS, Android and desktop.',
    href: 'hollywood-casino.html',
    bg: '#1a0a2e',
    thumb: 'images/hwcasino-thumbnail.png',
  },
  {
    slug: 'espn-bet-onboarding',
    eyebrow: 'ESPN Bet',
    title: 'Onboarding',
    desc: 'Rethinking a complex sign-up flow to reduce drop-off and drive growth.',
    href: 'espn-bet-onboarding.html',
    bg: '#2D387F',
    thumb: 'images/espnbet-thumbnail.png',
  },
  {
    slug: 'thescore-bet',
    eyebrow: 'theScore Bet',
    title: 'App Launch',
    desc: 'Introducing sports betting from your favourite sports app.',
    href: 'thescore-bet.html',
    bg: '#71AFF5',
    thumb: 'images/tsblaunch-thumbnail.png',
  },
  {
    slug: 'telus-accessories',
    eyebrow: 'TELUS',
    title: 'Digital Life: Accessories',
    desc: 'Turning TELUS.com into a destination for tech with curation, lifestyle content, and a seamless shopping experience.',
    href: 'telus-accessories.html',
    bg: '#f0ede8',
    thumb: 'images/telus-accessories-thumbnail.png',
  },
  {
    slug: 'telus-cart',
    eyebrow: 'TELUS',
    title: 'Cart',
    desc: 'Building TELUS\'s first e-commerce cart — from accessories only to a full phones and plans checkout.',
    href: 'telus-cart.html',
    bg: '#774D9C',
    thumb: 'images/telus-cart-thumbnail.png',
  },
];

function injectMoreWork() {
  const page = location.pathname.split('/').pop().replace('.html', '') || 'index';
  const others = PROJECTS.filter(p => p.slug !== page).slice(0, 3);
  if (!others.length) return;

  const cards = others.map(p => `
    <a class="mw-card" href="${p.href}">
      <div class="mw-img" style="background:${p.bg};">
        <img src="${p.thumb}" alt="${p.title}">
      </div>
      <div class="mw-eyebrow">${p.eyebrow}</div>
      <div class="mw-title">${p.title}</div>
    </a>
  `).join('');

  const html = `
    <style>
      .more-work {
        border-top: 0.5px solid #e8e8e8;
        padding: 64px 0 80px;
        max-width: 1100px;
        margin: 0 auto;
        padding-left: 60px;
        padding-right: 60px;
      }
      .mw-label {
        font-family: 'DIN Condensed', 'DINCondensed-Bold', impact, sans-serif;
        font-size: 20px;
        font-weight: 700;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        color: #252525;
        margin-bottom: 32px;
      }
      .mw-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 24px;
      }
      .mw-card {
        text-decoration: none;
        color: inherit;
        display: block;
      }
      .mw-img {
        width: 100%;
        aspect-ratio: 4/3;
        border-radius: 8px;
        overflow: hidden;
        margin-bottom: 12px;
      }
      .mw-img img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: top;
        display: block;
        transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      }
      .mw-card:hover .mw-img img { transform: scale(1.03); }
      .mw-eyebrow {
        font-size: 11px;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: #9a9890;
        margin-bottom: 4px;
      }
      .mw-title {
        font-size: 15px;
        font-weight: 500;
        color: #252525;
        line-height: 1.3;
      }
      @media (max-width: 768px) {
        .more-work { padding: 48px 16px 60px; }
        .mw-grid { grid-template-columns: 1fr 1fr; gap: 16px; }
      }
      @media (max-width: 480px) {
        .mw-grid { grid-template-columns: 1fr; }
      }
    </style>
    <div class="more-work">
      <div class="mw-label">More Work</div>
      <div class="mw-grid">${cards}</div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', html);
}

// Inject nav before body content
document.body.insertAdjacentHTML('afterbegin', NAV_HTML);

// Inject more work footer on case study pages
injectMoreWork();

// Nav behaviour — always visible
window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;
  nav.classList.toggle('scrolled', currentScrollY > 40);
});

