/**
 * @fileoverview Logic for the 404 Error page, including interactive easter eggs.
 * Features: Barking popups, bone rain effect, and secret Konami code activation.
 * Follows Google JavaScript Style Guide standards for documentation and scoping.
 * @author @kotaharus
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // UI Element Selectors
    const header = document.getElementById('main-header');
    const errorReveal = document.getElementById('error-reveal');
    const watermark = document.getElementById('watermark');
    const eggTrigger = document.getElementById('easter-egg-trigger');
    const dogIcon = document.querySelector('.p-error__icon');

    /**
     * Section 1: Header Scroll Behavior
     * Synchronizes the header's visual state with the window's scroll position.
     */
    let ticking = false;
    if (header) {
        window.addEventListener('scroll', () => {
            if (!ticking) {
                // Optimize scroll event using requestAnimationFrame (60fps).
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
     * Section 2: Viewport Reveal Trigger
     * Animates the main container into view upon page load.
     */
    if (errorReveal) {
        setTimeout(() => {
            errorReveal.classList.add('is-active');
        }, 150);
    }

    /**
     * Section 3: Easter Egg - Interactive Barking
     * Triggers a randomized text popup when the dog icon is clicked.
     */
    if (dogIcon) {
        dogIcon.addEventListener('click', (e) => {
            const barks = ['Woof!', 'Wan!', 'Bow-wow!', 'Arf!', 'Bark!'];
            const randomBark = barks[Math.floor(Math.random() * barks.length)];
            createBarkPopup(e.clientX, e.clientY, randomBark);
        });
    }

    /**
     * Creates a transient bark popup element at specific screen coordinates.
     * @param {number} x Horizontal coordinate (px).
     * @param {number} y Vertical coordinate (px).
     * @param {string} text The bark text to display.
     */
    function createBarkPopup(x, y, text) {
        const popup = document.createElement('div');
        popup.className = 'c-bark-popup';
        popup.innerText = text;
        
        // Add randomization to the final popup position for a dynamic feel.
        const offsetX = (Math.random() - 0.5) * 100;
        const offsetY = (Math.random() - 0.5) * 50;
        
        popup.style.left = `${x + offsetX}px`;
        popup.style.top = `${y + offsetY}px`;
        
        document.body.appendChild(popup);

        // Lifecycle: Remove DOM element after animation completion (0.8s).
        setTimeout(() => popup.remove(), 800);
    }

    /**
     * Section 4: Easter Egg - Bone Rain Trigger
     * Visual effect involving background watermark change and particle animation.
     */
    if (eggTrigger) {
        eggTrigger.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Visual feedback on the background watermark.
            if (watermark) {
                const originalText = watermark.innerText;
                watermark.innerText = "WOOF!";
                watermark.classList.add('is-super');
                
                setTimeout(() => {
                    watermark.innerText = originalText;
                    watermark.classList.remove('is-super');
                }, 3000);
            }

            // Generate particles.
            for (let i = 0; i < 20; i++) {
                setTimeout(createFallingBone, i * 50);
            }
        });
    }

    /**
     * Injects a falling bone element into the DOM with randomized physics.
     */
    function createFallingBone() {
        const bone = document.createElement('i');
        bone.className = 'fa-solid fa-bone c-falling-bone';
        
        const startLeft = Math.random() * window.innerWidth;
        const duration = 2 + Math.random() * 3;
        const size = 1.0 + Math.random() * 2;
        
        bone.style.left = `${startLeft}px`;
        bone.style.animationDuration = `${duration}s`;
        bone.style.fontSize = `${size}rem`;
        
        document.body.appendChild(bone);

        // Memory Cleanup: Remove element after it exits the viewport.
        setTimeout(() => bone.remove(), duration * 1000);
    }

    /**
     * Section 5: Easter Egg - Konami Code Integration
     * Sequence: Up, Up, Down, Down, Left, Right, Left, Right, B, A.
     */
    const konamiCode = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 
        'b', 'a'
    ];
    let konamiIndex = 0;

    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                activateSuperShiba();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0; // Reset on error.
        }
    });

    /**
     * Activates the "Super Shiba" visual state.
     * Changes watermark text and triggers a major bone rain event.
     */
    function activateSuperShiba() {
        if (watermark) {
            watermark.innerText = "SUPER SHIBA";
            watermark.classList.add('is-super');
            
            // Heavy bone rain event.
            for (let i = 0; i < 50; i++) {
                setTimeout(createFallingBone, i * 50);
            }
            
            // Revert state after 10 seconds.
            setTimeout(() => {
                watermark.innerText = "404";
                watermark.classList.remove('is-super');
            }, 10000);
        }
    }
});