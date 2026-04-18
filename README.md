# 🐾 Kotaro the Shiba | Developer Portfolio

[![Code Style: Google](https://img.shields.io/badge/code%20style-google-blue.svg)](https://google.github.io/styleguide/jsguide.html)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

A high-performance, Shiba-themed developer portfolio built with a focus on clean architecture, smooth animations, and interactive user experience.

---

## 🚀 Project Requirements Checklist
* [x] **Integration**: Seamlessly combined HTML5, CSS3 (BEM), and Vanilla JavaScript.
* [x] **Showcase**: Dedicated gallery section for projects and work samples.
* [x] **Professionalism**: Detailed qualifications and interactive contact layer.
* [x] **Interactivity**: Advanced UI feedback including a custom terminal and path-finding animations.

---

## 📖 Overview
This portfolio showcases the technical persona of **Kotaro the Shiba**, a "Software Engineer's dog." The project demonstrates how to blend professional engineering standards with creative UI/UX gimmicks to solve the "boring portfolio" problem.

### Key Technical Highlights:
* **Advanced Pathfinding:** A 3-segment **Cubic Bézier curve** implementation that calculates real-time tangent vectors for organic movement.

* **Async Terminal Feedback:** A custom-built asynchronous terminal emulator simulating back-end process logs.

* **Performance Optimized:** Achieves 60fps animations using `Intersection Observer` and `requestAnimationFrame`.

* **Interactive UX:** Includes a Konami Code listener and localized "Bone Rain" events.

---

## ✨ Hidden Gimmicks & Easter Eggs
1. **Signature Walk:** After form submission, Kotaro walks across the screen using mathematical pathfinding.

2. **The Shiba-Terminal:** A retro-style terminal providing real-time asynchronous "bark-end" logs.

3. **Digital Frisbees:** Can you find the hidden link in the Hero section?

4. **The Legendary Secret:** Perform `↑↑↓↓←→←→BA` on the 404 page to trigger **Super Shiba Mode**.

---

## 🛠 Tech Stack & Standards
* **Core Engine: Vanilla JavaScript (ES6+)**

    * **Pure Logic:** Developed entirely without external frameworks (React/Vue) to demonstrate deep understanding of native Web APIs and the DOM.

    * **Standards:** Strictly follows the [**Google JavaScript Style Guide**](https://google.github.io/styleguide/jsguide.html).

    * **Maintainability:** Fully documented with **JSDoc** and enforced strict scoping via `DOMContentLoaded`.

* **Styling Architecture: HTML5 & CSS3 (BEM)**
    
    * **Methodology:** Utilizes **BEM** naming conventions for modular, component-based CSS.
    
    * **Modern CSS:** Leverages CSS Custom Properties for consistent design tokens.

* **Performance First**

    * Optimized for near-instant **Time to Interactive (TTI)** by eliminating framework overhead.

---

## 📂 Project Structure
```text
.
├── index.html          # Main landing page
├── 404.html            # Custom error page with easter eggs
├── css/                # Core design system (BEM based)
├── js/                 # Business logic and Bézier pathfinding
└── img/                # Visual assets and gallery images
```

## 🧠 Engineering Philosophy

### 1. Adherence to Global Standards
By following the **Google HTML/CSS and JavaScript Style Guides**, the codebase ensures that any engineer can pick up the project and understand the logic instantly. This consistency is the backbone of scalable software development.

### 2. Math-Driven UI (Cubic Bézier Curve)
Instead of simple linear movements, we utilized **Cubic Bézier Curves** for organic pathfinding. The footprint orientation is calculated using the derivative (tangent) of the cubic function:

$$B(t) = (1-t)^3P_0 + 3(1-t)^2tP_1 + 3(1-t)t^2P_2 + t^3P_3$$

This mathematical approach ensures that each paw print is perfectly aligned with the direction of travel, creating a natural "walking" effect that goes beyond standard CSS animations.

### 3. Memory Management & Lifecycle
To prevent DOM bloating and ensure high performance, every dynamically injected element (such as footprints, terminal logs, and falling bones) is automatically garbage-collected from the DOM using `animationend` or `transitionend` listeners. This ensures zero memory leaks even after multiple user interactions.

### 4. Architecture Decision: Single Page Performance
While I am proficient in modularizing components using **Web Components** or the **Fetch API**, I deliberately chose a single-file inline structure for this specific portfolio.
* **Optimization:** Minimized HTTP requests to achieve the fastest possible **LCP (Largest Contentful Paint)** and **TTI (Time to Interactive)**.
* **Scalability Readiness:** For larger applications, I implement a component-based architecture to ensure reusability and separation of concerns.

---

## 📦 Getting Started
1. **Clone the repository.**

2. **Ensure the `img/` directory** contains all necessary visual assets (Hero, Profile, Gallery).

3. **Open `index.html`** in any modern evergreen browser.

4. **Trigger the signature animation:** Fill out the contact form and click "Send a Woof!".

---

## 💌 Special Acknowledgements
This project is dedicated to **Kotaro**, my beloved Shiba Inu.

While I handled the syntax and logic, Kotaro provided the essential "emotional debugging" and reminded me to step away from the screen for fresh air. This portfolio is as much her work as it is mine.

*Thank you, Kotaro, for being the best partner a developer could ask for.* 🐾

---

## 📜 License & Copyright

This project is licensed under the terms specified in the [LICENSE](./LICENSE) file.

**Copyright (c) @kotaharus**

All rights reserved. 

The source code, logic, design, and all visual assets (including images and animations) contained within this repository are the exclusive property of the author. This project is made public strictly for **portfolio review and recruitment purposes**. 

### 🚫 Prohibited Actions
- **No Redistribution:** Copying or redistributing the source code in this repository is strictly prohibited.
- **Academic Integrity:** Use of this code for school assignments, bootcamps, or certifications is not permitted.
- **Commercial Use:** Any commercial use of the assets or logic within this project is forbidden.

### ✅ Permitted
- Reviewing the code for evaluation purposes and learning from the architectural patterns described.

---

## 👤 Author
- **Handle:** @kotaharus
- **Role:** Lead Engineer / Shiba Caretaker

*Built with ❤️ and high-quality treats.*