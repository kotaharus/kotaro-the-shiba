/**
 * @file Main entry point.
 * Ensures components are loaded before initializing UI logic.
 * @author @kotaharus
 */
import { loadComponent } from './modules/utils.js';
import { initNavigation } from './modules/navigation.js';
import { initScrollReveal } from './modules/ui-observer.js';
import { initFormHandling } from './modules/form.js';

async function bootstrap() {
  try {
    // 1. Critical: Wait for the header and the footer to be injected into the DOM
    await Promise.all([
      loadComponent('main-header', 'components/header.html'),
      loadComponent('main-footer', 'components/footer.html')
    ]);

    // 2. Initialize modules only after the DOM is ready
    initNavigation();    // This needs the header links
    initScrollReveal();  // This handles the reveal animations
    initFormHandling(); // This handles the contact form
    
  } catch (error) {
    console.error("Critical boot error:", error);
    // Fallback: If header fails, still try to show content
    initScrollReveal();
  }
}

bootstrap();