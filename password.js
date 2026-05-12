// ── Case Study Password Protection ──
// Password is checked once per session, then stored

const PASSWORD = 'toronto';
const SESSION_KEY = 'portfolio_unlocked';

function isUnlocked() {
  return sessionStorage.getItem(SESSION_KEY) === 'true';
}

function unlock() {
  sessionStorage.setItem(SESSION_KEY, 'true');
}

function showPasswordPrompt() {
  // Create overlay
  const overlay = document.createElement('div');
  overlay.id = 'password-overlay';
  overlay.innerHTML = `
    <div class="password-modal">
      <p class="password-label">This case study is password protected.</p>
      <div class="password-input-wrap">
        <input type="password" id="password-input" placeholder="Enter password" autocomplete="off" />
        <button id="password-submit">Enter</button>
      </div>
      <p class="password-error" id="password-error"></p>
    </div>
  `;

  // Styles
  const style = document.createElement('style');
  style.textContent = `
    #password-overlay {
      position: fixed;
      inset: 0;
      background: #ffffff;
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'DM Sans', sans-serif;
    }
    .password-modal {
      display: flex;
      flex-direction: column;
      gap: 20px;
      max-width: 360px;
      width: 100%;
      padding: 0 24px;
    }
    .password-label {
      font-size: 15px;
      color: #141410;
      font-weight: 400;
    }
    .password-input-wrap {
      display: flex;
      gap: 0;
      border: 1px solid #e8e8e8;
      border-radius: 4px;
      overflow: hidden;
    }
    #password-input {
      flex: 1;
      padding: 12px 16px;
      font-size: 15px;
      font-family: 'DM Sans', sans-serif;
      border: none;
      outline: none;
      color: #141410;
    }
    #password-submit {
      padding: 12px 20px;
      background: #141410;
      color: #ffffff;
      border: none;
      font-size: 15px;
      font-family: 'DM Sans', sans-serif;
      font-weight: 500;
      cursor: pointer;
      transition: background 0.2s;
    }
    #password-submit:hover { background: #333; }
    .password-error {
      font-size: 13px;
      color: #c17b4e;
      min-height: 20px;
    }
  `;

  document.head.appendChild(style);
  document.body.appendChild(overlay);

  // Hide page content
  document.body.style.overflow = 'hidden';

  const input = document.getElementById('password-input');
  const submit = document.getElementById('password-submit');
  const error = document.getElementById('password-error');

  input.focus();

  function attempt() {
    if (input.value.toLowerCase().trim() === PASSWORD) {
      unlock();
      overlay.style.opacity = '0';
      overlay.style.transition = 'opacity 0.3s';
      setTimeout(() => {
        overlay.remove();
        document.body.style.overflow = '';
      }, 300);
    } else {
      error.textContent = 'Incorrect password. Try again.';
      input.value = '';
      input.focus();
    }
  }

  submit.addEventListener('click', attempt);
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') attempt();
  });
}

// Run on page load
if (!isUnlocked()) {
  showPasswordPrompt();
}
