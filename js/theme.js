// Feature: john-marcus-portfolio
// Theme module - dark/light mode toggle

export function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  const html = document.documentElement;
  const themeIcon = themeToggle?.querySelector('.theme-icon');

  // Get saved theme preference or default to light
  const savedTheme = localStorage.getItem('theme') || 'light';
  setTheme(savedTheme);

  // Theme toggle click handler
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = html.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      setTheme(newTheme);
    });
  }

  function setTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    if (themeIcon) {
      themeIcon.textContent = theme === 'light' ? '🌙' : '☀️';
    }
  }

  // Respect system preference if no saved preference
  if (!localStorage.getItem('theme')) {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(prefersDark ? 'dark' : 'light');
  }

  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      setTheme(e.matches ? 'dark' : 'light');
    }
  });
}
