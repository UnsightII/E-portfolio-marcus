// Feature: john-marcus-portfolio
// Tabs module - Term Reflections tab switcher

export function initTabs() {
  const tabs = document.querySelectorAll('[role="tab"]');
  const panels = document.querySelectorAll('[role="tabpanel"]');

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      // Remove active state from all tabs and panels
      tabs.forEach(t => {
        t.setAttribute('aria-selected', 'false');
        t.setAttribute('tabindex', '-1');
      });
      panels.forEach(p => {
        p.classList.remove('tab-panel--active');
        p.setAttribute('hidden', '');
      });

      // Set active state for clicked tab
      tab.setAttribute('aria-selected', 'true');
      tab.setAttribute('tabindex', '0');
      tab.focus();

      // Show corresponding panel
      const panelId = tab.getAttribute('aria-controls');
      const panel = document.getElementById(panelId);
      if (panel) {
        panel.classList.add('tab-panel--active');
        panel.removeAttribute('hidden');
      }
    });

    // Arrow key navigation
    tab.addEventListener('keydown', (e) => {
      let targetTab = null;

      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        targetTab = index === 0 ? tabs[tabs.length - 1] : tabs[index - 1];
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        targetTab = index === tabs.length - 1 ? tabs[0] : tabs[index + 1];
      } else if (e.key === 'Home') {
        e.preventDefault();
        targetTab = tabs[0];
      } else if (e.key === 'End') {
        e.preventDefault();
        targetTab = tabs[tabs.length - 1];
      }

      if (targetTab) {
        targetTab.click();
      }
    });
  });
}

