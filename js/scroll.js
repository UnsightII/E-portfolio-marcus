// Feature: john-marcus-portfolio
// Smooth scroll module - handles smooth scrolling to anchor links

export function initSmoothScroll() {
  // Get the fixed nav height
  const navHeight = document.querySelector('#main-nav')?.offsetHeight || 70;

  // Handle all anchor links
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;

    const href = link.getAttribute('href');
    if (href === '#') return;

    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();

    // Calculate scroll position accounting for fixed nav
    const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;

    // Use smooth scroll behavior
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  });
}

