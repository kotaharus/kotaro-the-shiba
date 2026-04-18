/**
 * @fileoverview UI Observer module handles scroll-triggered animations.
 * Uses Intersection Observer for performance-efficient reveal effects.
 * @package
 */

/**
 * Initializes the intersection observer for scroll-reveal animations.
 * Targets elements with the '.u-reveal' class and specific skill bar fills.
 * @export
 * @returns {void}
 */
export function initScrollReveal() {
  /** @type {NodeListOf<HTMLElement>} */
  const revealElements = document.querySelectorAll('.u-reveal');

  if (revealElements.length === 0) return;

  /** @type {IntersectionObserver} */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Activate the reveal animation
        entry.target.classList.add('is-active');

        // Special handling for the skills section to animate progress bars
        if (entry.target.id === 'skills') {
          animateSkillBars(entry.target);
        }

        // Performance: Stop observing once the animation is triggered
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach((el) => {
    revealObserver.observe(el);
  });
}

/**
 * Animates the progress bar fills within a specific container.
 * @param {Element} container - The parent container (e.g., #skills).
 * @returns {void}
 */
function animateSkillBars(container) {
  /** @type {NodeListOf<HTMLElement>} */
  const bars = container.querySelectorAll('.c-progress__fill');
  bars.forEach((bar) => {
    /** @type {string|null} */
    const targetWidth = bar.getAttribute('data-percent');
    if (targetWidth) {
      bar.style.width = targetWidth;
    }
  });
}