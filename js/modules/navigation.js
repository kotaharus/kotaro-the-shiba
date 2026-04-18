/**
 * @file Navigation module handles header behavior and smooth scrolling.
 * @package
 */

/**
 * Initializes all navigation-related features for the portfolio.
 * This includes sticky header effects and smooth internal anchor links.
 * @returns {void}
 */
export function initNavigation() {
  /** @type {HTMLElement|null} */
  const header = document.getElementById('main-header');
  setupHeaderScroll(header);
  setupSmoothScroll();
}

/**
 * Attaches a scroll event listener to manage the header's 'is-scrolled' state.
 * Uses requestAnimationFrame to ensure 60fps performance during scrolling.
 * @param {HTMLElement|null} header - The header element to be manipulated.
 * @returns {void}
 */
function setupHeaderScroll(header) {
  if (!header) return;

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        if (window.scrollY > 50) {
          header.classList.add('is-scrolled');
        } else {
          header.classList.remove('is-scrolled');
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

/**
 * Sets up event listeners for all internal anchor links to perform smooth scrolling.
 * Calculates position accounting for the fixed header offset.
 * @returns {void}
 */
function setupSmoothScroll() {
  /** @type {NodeList} */
  const internalLinks = document.querySelectorAll('a[href^="#"]');

  internalLinks.forEach((anchor) => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');

      if (href && href.startsWith('#') && href.length > 1) {
        e.preventDefault();
        /** @type {HTMLElement|null} */
        const target = document.querySelector(href);

        if (target) {
          /** @constant {number} headerOffset - Standard height of the sticky header */
          const headerOffset = 80;
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });
}