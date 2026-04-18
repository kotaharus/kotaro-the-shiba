/**
 * @file Form module handles contact form submissions and terminal feedback.
 * Includes interactive animations and accessibility notifications.
 * @package
 */
import { triggerSignatureAnimation } from './animations.js';

/**
 * Initializes form submission handling and terminal feedback logic.
 * @returns {void}
 */
export function initFormHandling() {
  /** @type {HTMLFormElement|null} */
  const contactForm = document.querySelector('.c-form');
  if (!contactForm) return;

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    await handleFormSubmission(contactForm);
  });
}

/**
 * Processes the form submission, triggers animations, and shows terminal logs.
 * @param {HTMLFormElement} form - The submitted form element.
 * @returns {Promise<void>}
 */
async function handleFormSubmission(form) {
  // Trigger the visual signature and wait for it
  await triggerSignatureAnimation();
  
  // Duration for the paw print animation sequence
  const animationDuration = 4500;
  
  // Trigger the visual feedback (Implementation assumed in animations module)
  // triggerSignatureAnimation(); 

  // Wait for the animation to complete before showing the terminal
  await new Promise(resolve => setTimeout(resolve, animationDuration));
  
  const terminal = createTerminalUI();
  document.body.appendChild(terminal);
  
  // Trigger entry animation
  requestAnimationFrame(() => terminal.classList.add('is-visible'));

  /** @type {string[]} logs - Sequence of feedback messages */
  const logs = [
    "> [SCAN] Sniffing message... [OK]",
    "> [ROUTE] Optimal path found via Park.",
    "> [STATUS] Barking at mail server...",
    "> [SUCCESS] Message delivered! Woof!"
  ];

  const logContainer = terminal.querySelector('.c-terminal__log');
  if (logContainer) {
    for (const line of logs) {
      await typeLogLine(logContainer, line, 60);
      await new Promise(resolve => setTimeout(resolve, 800));
    }
  }

  // Cleanup terminal and reset form
  setTimeout(() => {
    terminal.classList.remove('is-visible');
    setTimeout(() => {
      terminal.remove();
      form.reset();
    }, 500);
  }, 4000);
}

/**
 * Creates the terminal UI component with appropriate ARIA roles for accessibility.
 * @returns {HTMLElement} The terminal container element.
 */
function createTerminalUI() {
  const div = document.createElement('div');
  div.className = 'c-terminal';
  
  // A11y: Ensure screen readers announce the log updates
  div.setAttribute('role', 'status');
  div.setAttribute('aria-live', 'polite');
  
  div.innerHTML = `
    <div class="c-terminal__header" aria-hidden="true">🐾 KOTARO-OS v1.0.2</div>
    <div class="c-terminal__log"></div>
    <span class="c-terminal__cursor" aria-hidden="true"></span>
  `;
  return div;
}

/**
 * Simulates a typing effect for a single log line in the terminal.
 * @param {HTMLElement} container - The element to append the text to.
 * @param {string} text - The string to type out.
 * @param {number} speed - Delay between characters in milliseconds.
 * @returns {Promise<void>}
 */
async function typeLogLine(container, text, speed) {
  const lineElement = document.createElement('div');
  container.appendChild(lineElement);
  for (let i = 0; i < text.length; i++) {
    lineElement.textContent += text[i];
    await new Promise(resolve => setTimeout(resolve, speed));
  }
}