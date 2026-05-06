// Feature: john-marcus-portfolio
// Navigation module - hamburger toggle and active link tracking

export function initNav() {
  // Add .js-enabled class to html for CSS fallback
  document.documentElement.classList.add('js-enabled');

  const hamburger = document.querySelector('.nav__hamburger');
  const navMenu = document.querySelector('#nav-menu');
  const navLinks = document.querySelectorAll('.nav__link');

  // Hamburger toggle
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', !isExpanded);
    });
  }

  // Close menu on link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (hamburger) {
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Close menu on window resize if width >= 768px
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768 && hamburger) {
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });

  // Active link tracking using IntersectionObserver
  const sections = document.querySelectorAll('section[id]');
  
  const observerOptions = {
    root: null,
    rootMargin: '-100px 0px -66% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Remove active class from all links
        navLinks.forEach(link => link.classList.remove('nav__link--active'));
        
        // Add active class to corresponding link
        const activeLink = document.querySelector(`a[href="#${entry.target.id}"]`);
        if (activeLink) {
          activeLink.classList.add('nav__link--active');
        }
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}

