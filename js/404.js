/**
 * @fileoverview Logic for the 404 Error page of Kotaro the Shiba's portfolio.
 * Manages content entry animations, interactive barking popups, and easter eggs
 * like the bone rain triggered by the Konami Code.
 * @package
 */

/**
 * Initializes all interactive 404 page features upon DOM completion.
 * @listens document#DOMContentLoaded
 */
document.addEventListener('DOMContentLoaded', () => {
    
    /** * @type {HTMLElement|null}
     * Target element for the initial fade-in/slide-up reveal effect.
     */
    const errorReveal = document.getElementById('error-reveal');
    if (errorReveal) {
        setTimeout(() => {
            errorReveal.classList.add('is-active');
        }, 150);
    }

    /**
     * Initializes the keyboard listener for the secret Konami Code sequence.
     */
    initKonamiCode();

    /** * @type {HTMLElement|null}
     * The main interactive icon that triggers barking sounds on click.
     */
    const dogIcon = document.querySelector('.p-error__icon');
    if (dogIcon) {
        dogIcon.addEventListener('click', (e) => {
            /** @type {string[]} List of possible bark strings. */
            const barks = ['Woof!', 'Wan!', 'Bark!', 'Bow-wow!'];
            const randomBark = barks[Math.floor(Math.random() * barks.length)];
            createBarkPopup(e.clientX, e.clientY, randomBark);
        });
    }

    /** * @type {HTMLElement|null}
     * Footer icon used as a manual trigger for the special bone rain effect.
     */
    const eggTrigger = document.getElementById('easter-egg-trigger');
    if (eggTrigger) {
        eggTrigger.addEventListener('click', (e) => {
            e.preventDefault();
            triggerSpecialEffect("WOOF!");
        });
    }
});

/**
 * Monitors physical key presses to detect the Konami Code sequence.
 * Uses KeyboardEvent.code to ensure reliability across different input methods (IME).
 * Sequence: Up, Up, Down, Down, Left, Right, Left, Right, B, A.
 * @returns {void}
 */
function initKonamiCode() {
    /** @const {string[]} Expected physical key code sequence. */
    const konamiSequence = [
        'ArrowUp', 'ArrowUp', 
        'ArrowDown', 'ArrowDown', 
        'ArrowLeft', 'ArrowRight', 
        'ArrowLeft', 'ArrowRight', 
        'KeyB', 'KeyA'
    ];
    
    /** @type {number} Current progress index in the sequence. */
    let index = 0;

    document.addEventListener('keydown', (e) => {
        // Validation based on physical key location to bypass IME issues.
        if (e.code === konamiSequence[index]) {
            index++;
            if (index === konamiSequence.length) {
                triggerSpecialEffect("SUPER SHIBA");
                index = 0;
            }
        } else {
            // Reset sequence unless a modifier key (Shift/Ctrl/Alt) is pressed.
            if (!['ShiftLeft', 'ShiftRight', 'ControlLeft', 'AltLeft'].includes(e.code)) {
                index = 0;
            }
        }
    });
}

/**
 * Triggers a multi-stage visual easter egg.
 * Changes the background watermark text and initiates a "Bone Rain" particle effect.
 * @param {string} text - The temporary string to display in the watermark.
 * @returns {void}
 */
function triggerSpecialEffect(text) {
    /** @type {HTMLElement|null} */
    const watermark = document.getElementById('watermark');
    if (watermark) {
        const original = watermark.innerText;
        watermark.innerText = text;
        watermark.classList.add('is-super');
        
        // Restore original watermark after 5 seconds.
        setTimeout(() => {
            watermark.innerText = original;
            watermark.classList.remove('is-super');
        }, 5000);
    }

    // Sequence bone generation to create a "rain" flow.
    for (let i = 0; i < 35; i++) {
        setTimeout(createFallingBone, i * 120);
    }
}

/**
 * Creates and animates a single falling bone icon.
 * Randomizes position, fall duration, and font size for a dynamic 3D feel.
 * @returns {void}
 */
function createFallingBone() {
    const bone = document.createElement('i');
    bone.className = 'fa-solid fa-bone c-falling-bone';
    bone.setAttribute('aria-hidden', 'true'); // Hide from screen readers.
    
    // Randomized horizontal entry point.
    bone.style.left = `${Math.random() * 100}vw`;
    
    // Randomized fall speed (2s to 4s).
    const duration = Math.random() * 2 + 2;
    bone.style.animationDuration = `${duration}s`;
    
    // Randomized size (1rem to 3.5rem) to simulate depth.
    const size = 1 + Math.random() * 2.5;
    bone.style.fontSize = `${size}rem`;
    
    document.body.appendChild(bone);
    
    // Memory Cleanup: Remove DOM element after animation completes.
    setTimeout(() => bone.remove(), duration * 1000);
}

/**
 * Generates a barking text popup at a specific coordinate with a random offset.
 * @param {number} x - The horizontal click coordinate.
 * @param {number} y - The vertical click coordinate.
 * @param {string} text - The bark message to display.
 * @returns {void}
 */
function createBarkPopup(x, y, text) {
    const popup = document.createElement('div');
    popup.className = 'c-bark-popup';
    popup.innerText = text;
    
    // Calculate randomized offset to prevent popups from stacking perfectly.
    const offsetX = (Math.random() - 0.5) * 120;
    const offsetY = (Math.random() - 0.5) * 60;
    
    popup.style.left = `${x + offsetX}px`;
    popup.style.top = `${y + offsetY}px`;
    
    document.body.appendChild(popup);
    
    // Cleanup popup after animation duration.
    setTimeout(() => popup.remove(), 800);
}