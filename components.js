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
        <li><a href="mailto:araleean@gmail.com">Contact</a></li>
        <li><a href="https://www.linkedin.com/in/araan/" target="_blank">LinkedIn ↗</a></li>
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

// Nav behaviour — sticky always, hide/show only on mobile
const nav = document.getElementById('nav');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;

  // Scrolled state
  nav.classList.toggle('scrolled', currentScrollY > 40);

  // Hide/show on mobile only
  if (window.innerWidth <= 768) {
    if (currentScrollY > lastScrollY && currentScrollY > 80) {
      nav.classList.add('nav-hidden');
    } else {
      nav.classList.remove('nav-hidden');
    }
  } else {
    nav.classList.remove('nav-hidden');
  }

  lastScrollY = currentScrollY;
});
