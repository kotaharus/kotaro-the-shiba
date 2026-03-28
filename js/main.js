/**
 * @fileoverview Main entry point for Kotaro the Shiba Portfolio.
 * Orchestrates header effects, scroll animations, navigation, and form feedback.
 * @author @kotaharus
 */

document.addEventListener('DOMContentLoaded', () => {

  /**
   * Section 1: Header Scroll Behavior
   * Manages the 'is-scrolled' state based on vertical scroll offset.
   */
  const header = document.getElementById('main-header');
  let ticking = false;

  if (header) {
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
   * Section 2: Viewport Intersection Observer
   * Handles element reveal animations and progress bar transitions.
   */
  const revealElements = document.querySelectorAll('.u-reveal');

  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-active');

          if (entry.target.id === 'skills') {
            const bars = entry.target.querySelectorAll('.c-progress__fill');
            bars.forEach((bar) => {
              const targetWidth = bar.getAttribute('data-percent');
              bar.style.width = targetWidth;
            });
            revealObserver.unobserve(entry.target);
          } else {
            revealObserver.unobserve(entry.target);
          }
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
   * Section 3: Smooth Navigation Setup
   * Overrides default anchor behavior for smooth internal scrolling.
   */
  const setupSmoothScroll = () => {
    const internalLinks = document.querySelectorAll('a[href^="#"]');

    internalLinks.forEach((anchor) => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        if (href.startsWith('#') && href.length > 1) {
          e.preventDefault();
          const target = document.querySelector(href);

          if (target) {
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
  };

  /**
   * Section 4: Signature Interaction (Paw Prints & Terminal)
   * Executes a sequential animation of paw prints followed by a terminal log.
   */
  const contactForm = document.querySelector('.c-form');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const stepCount = 40;
      const duration = 4000;
      const interval = duration / stepCount;

      const w = window.innerWidth;
      const h = window.innerHeight;

      const pathSegments = [
        { p0: { x: w * -0.1, y: h * 0.9 }, p1: { x: w * 0.2, y: h * 0.9 }, p2: { x: w * 0.1, y: h * 0.4 }, p3: { x: w * 0.5, y: h * 0.5 } },
        { p0: { x: w * 0.5, y: h * 0.5 }, p1: { x: w * 0.8, y: h * 0.2 }, p2: { x: w * 0.2, y: h * 0.2 }, p3: { x: w * 0.5, y: h * 0.5 } },
        { p0: { x: w * 0.5, y: h * 0.5 }, p1: { x: w * 0.7, y: h * 0.6 }, p2: { x: w * 0.9, y: h * 0.3 }, p3: { x: w * 1.1, y: h * -0.1 } }
      ];

      for (let i = 0; i < stepCount; i++) {
        setTimeout(() => {
          const globalT = i / (stepCount - 1);
          const segmentIndex = Math.min(Math.floor(globalT * pathSegments.length), pathSegments.length - 1);
          const segmentT = (globalT * pathSegments.length) - segmentIndex;
          const seg = pathSegments[segmentIndex];
          const pos = getBezierPoint(seg.p0, seg.p1, seg.p2, seg.p3, segmentT);
          
          const delta = 0.01;
          const futurePos = getBezierPoint(seg.p0, seg.p1, seg.p2, seg.p3, Math.min(segmentT + delta, 1));
          const angleRad = Math.atan2(futurePos.y - pos.y, futurePos.x - pos.x);
          const angleDeg = (angleRad * (180 / Math.PI)) + 90;
          
          createFootprint(pos.x, pos.y, angleDeg, i);
        }, i * interval);
      }

      await new Promise(resolve => setTimeout(resolve, duration + 500));
      
      const terminal = createTerminalUI();
      document.body.appendChild(terminal);
      
      requestAnimationFrame(() => terminal.classList.add('is-visible'));

      const logs = [
        "> [SCAN] Sniffing message... [OK]",
        "> [ROUTE] Optimal path found via Park.",
        "> [STATUS] Barking at mail server...",
        "> [SUCCESS] Message delivered! Woof!"
      ];

      const logContainer = terminal.querySelector('.c-terminal__log');
      
      for (const line of logs) {
        await typeLogLine(logContainer, line, 60); 
        await new Promise(resolve => setTimeout(resolve, 800)); 
      }

      setTimeout(() => {
        terminal.classList.remove('is-visible');
        setTimeout(() => {
          terminal.remove();
          contactForm.reset();
        }, 500);
      }, 4000);
    });
  }

  /**
   * Calculates coordinates on a cubic Bezier curve.
   * @param {Object} p0 Start point.
   * @param {Object} p1 Control point 1.
   * @param {Object} p2 Control point 2.
   * @param {Object} p3 End point.
   * @param {number} t Time parameter (0-1).
   * @return {Object} X and Y coordinates.
   */
  function getBezierPoint(p0, p1, p2, p3, t) {
    const cx = 3 * (p1.x - p0.x);
    const bx = 3 * (p2.x - p1.x) - cx;
    const ax = p3.x - p0.x - cx - bx;
    const cy = 3 * (p1.y - p0.y);
    const by = 3 * (p2.y - p1.y) - cy;
    const ay = p3.y - p0.y - cy - by;
    return {
      x: ax * (t * t * t) + bx * (t * t) + cx * t + p0.x,
      y: ay * (t * t * t) + by * (t * t) + cy * t + p0.y
    };
  }

  /**
   * Generates a paw print element and manages its lifecycle.
   * @param {number} x X coordinate.
   * @param {number} y Y coordinate.
   * @param {number} rotation Rotation in degrees.
   * @param {number} index Step index.
   */
  function createFootprint(x, y, rotation, index) {
    const footprint = document.createElement('div');
    footprint.className = 'u-footprint';
    footprint.innerHTML = '<i class="fa-solid fa-paw"></i>';
    footprint.style.left = `${x}px`;
    footprint.style.top = `${y}px`;
    footprint.style.setProperty('--rotation', `${rotation}deg`);
    footprint.style.marginTop = index % 2 === 0 ? '-15px' : '15px';
    document.body.appendChild(footprint);
    footprint.addEventListener('animationend', () => footprint.remove());
  }

  /**
   * Initializes the terminal UI component.
   * @return {HTMLElement} The terminal container element.
   */
  function createTerminalUI() {
    const div = document.createElement('div');
    div.className = 'c-terminal';
    div.innerHTML = `
      <div class="c-terminal__header">🐾 KOTARO-OS v1.0.2</div>
      <div class="c-terminal__log"></div>
      <span class="c-terminal__cursor"></span>
    `;
    return div;
  }

  /**
   * Simulates typing effect for a single log line.
   * @param {HTMLElement} container The log container.
   * @param {string} text The text to type.
   * @param {number} speed Interval in ms between characters.
   */
  async function typeLogLine(container, text, speed) {
    const lineElement = document.createElement('div');
    container.appendChild(lineElement);
    for (let i = 0; i < text.length; i++) {
      lineElement.textContent += text[i];
      await new Promise(resolve => setTimeout(resolve, speed));
    }
  }

  setupSmoothScroll();
});