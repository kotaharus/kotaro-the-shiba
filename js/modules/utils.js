/**
 * @file Utility functions for UI and DOM manipulation.
 * @author @kotaharus
 */

/**
 * Loads an external HTML component into a specified container.
 * @param {string} containerId - The ID of the header element.
 * @param {string} componentPath - Path to the .html component file.
 * @returns {Promise<void>}
 */
export async function loadComponent(containerId, componentPath) {
  const container = document.getElementById(containerId);
  if (!container) return;

  try {
    const response = await fetch(componentPath);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const html = await response.text();
    container.innerHTML = html;
  } catch (error) {
    console.error(`Failed to load component [${componentPath}]:`, error);
  }
}