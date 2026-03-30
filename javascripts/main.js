document.addEventListener('DOMContentLoaded', function () {
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('.toggle-btn');
    if (!btn) return;

    e.preventDefault();
    var targetId = btn.getAttribute('data-target');
    var target = document.getElementById(targetId);
    if (!target) return;

    var isOpen = target.classList.contains('is-open');

    if (isOpen) {
      target.classList.remove('is-open');
      btn.setAttribute('aria-expanded', 'false');
      target.addEventListener('transitionend', function handler() {
        if (!target.classList.contains('is-open')) {
          target.hidden = true;
        }
        target.removeEventListener('transitionend', handler);
      });
    } else {
      target.hidden = false;
      // Force reflow so the transition fires
      target.offsetHeight;
      target.classList.add('is-open');
      btn.setAttribute('aria-expanded', 'true');
    }
  });
});
