// Feature: john-marcus-portfolio
// Main entry point - initializes all modules

import { initSmoothScroll } from './scroll.js';
import { initNav } from './nav.js';
import { initTabs } from './tabs.js';
import { initLightbox } from './lightbox.js';
import { initArtifacts } from './artifacts.js';
import { initTheme } from './theme.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all modules
  initTheme();
  initSmoothScroll();
  initNav();
  initTabs();
  initLightbox();
  initArtifacts();

  console.log('Portfolio initialized successfully');
});


