/**
 * @file 404 Error page logic for Kotaro the Shiba's portfolio.
 * Orchestrates component loading, entry animations, and interactive easter eggs.
 * Following Google JavaScript Style Guide and JSDoc standards.
 * @package
 * @author @kotaharus
 */

import { loadComponent, updateCopyrightYear } from './modules/utils.js'; // 追加
import { initNavigation } from './modules/navigation.js';


/* ==========================================================================
   INTERACTIVE LOGIC FUNCTIONS
   ========================================================================== */

/**
 * Attaches click listeners to the dog paw icon for random bark popups.
 * @returns {void}
 */
function setupDogIconInteractions() {
  /** @type {HTMLElement|null} */
  const dogIcon = document.querySelector('.p-error__icon');
  if (!dogIcon) return;

  dogIcon.addEventListener('click', (e) => {
    /** @type {string[]} */
    const barks = ['Woof!', 'Wan!', 'Bark!', 'Bow-wow!'];
    const randomBark = barks[Math.floor(Math.random() * barks.length)];
    createBarkPopup(e.clientX, e.clientY, randomBark);
  });
}

/**
 * Sets up the footer bone icon as a trigger for the special bone rain effect.
 * @returns {void}
 */
function setupEasterEggTrigger() {
  /** @type {HTMLElement|null} */
  const eggTrigger = document.getElementById('easter-egg-trigger');
  if (!eggTrigger) return;

  eggTrigger.addEventListener('click', (e) => {
    e.preventDefault();
    triggerSpecialEffect('WOOF!');
  });
}

/**
 * Monitors keyboard input to detect the secret Konami Code sequence.
 * @returns {void}
 */
function initKonamiCode() {
  /** @const {!Array<string>} */
  const konamiSequence = [
    'ArrowUp', 'ArrowUp',
    'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight',
    'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
  ];

  /** @type {number} */
  let index = 0;

  document.addEventListener('keydown', (e) => {
    if (e.code === konamiSequence[index]) {
      index++;
      if (index === konamiSequence.length) {
        triggerSpecialEffect('SUPER SHIBA');
        index = 0;
      }
    } else {
      index = 0;
    }
  });
}

/**
 * Triggers a visual easter egg including a watermark change and bone rain.
 * @param {string} text - The temporary text to display in the watermark.
 * @returns {void}
 */
function triggerSpecialEffect(text) {
  /** @type {HTMLElement|null} */
  const watermark = document.getElementById('watermark');
  if (watermark) {
    const originalText = watermark.innerText;
    watermark.innerText = text;
    watermark.classList.add('is-super');

    setTimeout(() => {
      watermark.innerText = originalText;
      watermark.classList.remove('is-super');
    }, 5000);
  }

  for (let i = 0; i < 35; i++) {
    setTimeout(createFallingBone, i * 120);
  }
}

/**
 * Creates and animates a single falling bone particle.
 * @returns {void}
 */
function createFallingBone() {
  const bone = document.createElement('i');
  bone.className = 'fa-solid fa-bone c-falling-bone';
  bone.setAttribute('aria-hidden', 'true');

  bone.style.left = `${Math.random() * 100}vw`;
  const duration = Math.random() * 2 + 2;
  bone.style.animationDuration = `${duration}s`;
  const size = 1 + Math.random() * 2.5;
  bone.style.fontSize = `${size}rem`;

  document.body.appendChild(bone);
  setTimeout(() => bone.remove(), duration * 1000);
}

/**
 * Displays a temporary bark text popup at the specified coordinates.
 * @param {number} x - Horizontal coordinate in pixels.
 * @param {number} y - Vertical coordinate in pixels.
 * @param {string} text - Message to display.
 * @returns {void}
 */
function createBarkPopup(x, y, text) {
  const popup = document.createElement('div');
  popup.className = 'c-bark-popup';
  popup.innerText = text;

  const offsetX = (Math.random() - 0.5) * 120;
  const offsetY = (Math.random() - 0.5) * 60;

  popup.style.left = `${x + offsetX}px`;
  popup.style.top = `${y + offsetY}px`;

  document.body.appendChild(popup);
  setTimeout(() => popup.remove(), 800);
}

/* ==========================================================================
   INITIALIZATION
   ========================================================================== */

/**
 * Bootstraps all interactive features for the 404 error page.
 * @returns {Promise<void>}
 */
async function bootstrap404() {
  // Always reveal content immediately for UX
  const errorReveal = document.getElementById('error-reveal');
  if (errorReveal) {
    errorReveal.classList.add('is-active');
  }

  try {
    // Attempt to load shared header and footer
    await Promise.all([
      loadComponent('main-header', 'components/header.html'),
      loadComponent('main-footer', 'components/footer.html')
    ]);

    // フッター読み込み完了後に実行
    updateCopyrightYear();
    
    // Initialize interactive logic
    initNavigation();
    initKonamiCode();
    setupDogIconInteractions();
    setupEasterEggTrigger();

  } catch (error) {
    /** @type {Error} */
    const e = error;
    console.warn('UI components partially loaded:', e.message);
    // Core logic fallback
    initKonamiCode();
  }
}

// Kick off the script after all functions are defined
bootstrap404();