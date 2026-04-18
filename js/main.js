/**
 * @fileoverview Main entry point for Kotaro the Shiba Portfolio.
 * Orchestrates modules to initialize all interactive features.
 * @author @kotaharus
 */

import { initNavigation } from './modules/navigation.js';
import { initFormHandling } from './modules/form.js';
import { initScrollReveal } from './modules/ui-observer.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Header scroll and smooth internal navigation
  initNavigation();

  // 2. Element reveal animations on scroll
  initScrollReveal();

  // 3. Contact form submission and terminal logs
  initFormHandling();
});