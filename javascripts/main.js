document.addEventListener('DOMContentLoaded', function () {
  const nav = document.querySelector('.section-nav');
  const tabs = Array.from(nav.querySelectorAll('a[href^="#"]'));
  const panels = Array.from(document.querySelectorAll('.section-panel'));
  const toggles = Array.from(document.querySelectorAll('.toggle-btn'));

  function setAbstract(button, open) {
    const abstract = document.getElementById(button.dataset.target);
    if (!abstract) return;
    abstract.hidden = !open;
    button.setAttribute('aria-expanded', String(open));
  }

  toggles.forEach(function (button) {
    button.addEventListener('click', function () {
      setAbstract(button, button.getAttribute('aria-expanded') !== 'true');
    });
  });

  function activate(panelId) {
    tabs.forEach(function (tab) {
      const selected = tab.getAttribute('aria-controls') === panelId;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
    });
    panels.forEach(function (panel) {
      panel.hidden = panel.id !== panelId;
    });
  }

  nav.setAttribute('role', 'tablist');
  tabs.forEach(function (tab) {
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-controls', tab.hash.slice(1));
  });
  panels.forEach(function (panel) {
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('aria-labelledby', 'tab-' + panel.id);
    panel.tabIndex = 0;
  });

  function restoreFromLocation() {
    let id;
    try {
      id = decodeURIComponent(window.location.hash.slice(1));
    } catch (_) {
      id = '';
    }
    const target = document.getElementById(id);
    const panel = target && target.closest('.section-panel');
    if (target && !panel) return;
    activate(panel ? panel.id : panels[0].id);

    // Existing links to individual abstracts still reveal the right section.
    if (panel && target.classList.contains('abstract')) {
      const button = toggles.find(function (item) { return item.dataset.target === id; });
      if (button) setAbstract(button, true);
    }
  }

  function selectTab(tab) {
    const id = tab.getAttribute('aria-controls');
    activate(id);
    // pushState preserves the reading position; Back restores the prior tab.
    if (window.location.hash !== '#' + id) {
      window.history.pushState(null, '', '#' + id);
    }
  }

  tabs.forEach(function (tab, index) {
    tab.addEventListener('click', function (event) {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      selectTab(tab);
    });
    tab.addEventListener('keydown', function (event) {
      let next;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      else if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = tabs.length - 1;
      else if (event.key === ' ') next = index;
      else return;
      event.preventDefault();
      tabs[next].focus();
      selectTab(tabs[next]);
    });
  });

  activate(panels[0].id);
  restoreFromLocation();
  document.documentElement.classList.add('tabs-ready');
  window.addEventListener('popstate', restoreFromLocation);
  window.addEventListener('hashchange', restoreFromLocation);
});
