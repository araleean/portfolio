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

// Inject nav before body content
document.body.insertAdjacentHTML('afterbegin', NAV_HTML);

// Nav behaviour — always visible
window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;
  nav.classList.toggle('scrolled', currentScrollY > 40);
});
