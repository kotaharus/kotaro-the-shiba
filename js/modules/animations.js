/**
 * @fileoverview Animations module handles mathematical pathfinding and decorative effects.
 * Specifically manages the cubic Bezier-based paw print "signature" animation.
 * @package
 */

/**
 * Coordinates for a single point in 2D space.
 * @typedef {Object} Point
 * @property {number} x - Horizontal coordinate.
 * @property {number} y - Vertical coordinate.
 */

/**
 * Control points defining a cubic Bezier curve segment.
 * @typedef {Object} BezierSegment
 * @property {Point} p0 - Start point.
 * @property {Point} p1 - Control point 1.
 * @property {Point} p2 - Control point 2.
 * @property {Point} p3 - End point.
 */

/**
 * Triggers the signature paw print animation across the screen.
 * Uses multiple Bezier segments for organic movement.
 * @export
 * @returns {Promise<void>} Resolves when the full animation sequence completes.
 */
export async function triggerSignatureAnimation() {
  const stepCount = 40;
  const duration = 4000;
  const interval = duration / stepCount;

  const w = window.innerWidth;
  const h = window.innerHeight;

  /** @type {BezierSegment[]} */
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
      
      // Calculate angle based on the next point (tangent approximation)
      const delta = 0.01;
      const futurePos = getBezierPoint(seg.p0, seg.p1, seg.p2, seg.p3, Math.min(segmentT + delta, 1));
      const angleRad = Math.atan2(futurePos.y - pos.y, futurePos.x - pos.x);
      const angleDeg = (angleRad * (180 / Math.PI)) + 90;
      
      createFootprint(pos.x, pos.y, angleDeg, i);
    }, i * interval);
  }

  return new Promise(resolve => setTimeout(resolve, duration));
}

/**
 * Calculates a point coordinate on a cubic Bezier curve at time t.
 * @param {Point} p0 - Start point.
 * @param {Point} p1 - Control point 1.
 * @param {Point} p2 - Control point 2.
 * @param {Point} p3 - End point.
 * @param {number} t - Time parameter (0.0 to 1.0).
 * @returns {Point} The calculated X and Y coordinates.
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
 * Creates a paw print DOM element and handles its animation lifecycle.
 * @param {number} x - Horizontal position in pixels.
 * @param {number} y - Vertical position in pixels.
 * @param {number} rotation - Rotation in degrees.
 * @param {number} index - The step index used for alternating offset.
 * @returns {void}
 */
function createFootprint(x, y, rotation, index) {
  const footprint = document.createElement('div');
  footprint.className = 'u-footprint';
  
  // A11y: Decorative element should be hidden from screen readers
  footprint.setAttribute('aria-hidden', 'true');
  
  footprint.innerHTML = '<i class="fa-solid fa-paw"></i>';
  footprint.style.left = `${x}px`;
  footprint.style.top = `${y}px`;
  footprint.style.setProperty('--rotation', `${rotation}deg`);
  
  // Alternate offset for left/right paw effect
  footprint.style.marginTop = index % 2 === 0 ? '-15px' : '15px';
  
  document.body.appendChild(footprint);
  
  // Cleanup: Remove from DOM after CSS animation completes
  footprint.addEventListener('animationend', () => footprint.remove());
}