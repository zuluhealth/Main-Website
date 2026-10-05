export function initInteractions() {
  const navigationTargets = [
    ...document.querySelectorAll('#p-home .door[data-card-href]'),
    ...document.querySelectorAll('#p-providers .ecoZ a.eco-node-link')
  ];
  const destinations = new Set(navigationTargets.map((target) => (
    target.dataset.cardHref || target.getAttribute('href')
  )).filter(Boolean));

  destinations.forEach((destination) => {
    const url = new URL(destination, window.location.origin);
    if (url.origin !== window.location.origin) return;
    const prefetch = document.createElement('link');
    prefetch.rel = 'prefetch';
    prefetch.as = 'document';
    prefetch.href = url.href;
    document.head.append(prefetch);
  });

  document.querySelectorAll('#p-home .door[data-card-href]').forEach((card) => {
    card.addEventListener('click', (event) => {
      if (event.target.closest('a, button, input, select, textarea')) return;
      const destination = card.dataset.cardHref;
      if (destination) window.location.assign(destination);
    });
  });

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  document.querySelectorAll('[data-scroll]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const target = document.querySelector(link.dataset.scroll);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({
        behavior: reducedMotion.matches ? 'auto' : 'smooth',
        block: 'start'
      });
      history.replaceState(null, '', link.dataset.scroll);
    });
  });

  document.querySelectorAll('.choice-row').forEach((row) => {
    const choices = [...row.querySelectorAll('.choice')];
    choices.forEach((choice) => choice.setAttribute('aria-pressed', String(choice.classList.contains('sel'))));
    row.addEventListener('click', (event) => {
      const selected = event.target.closest('.choice');
      if (!selected || !row.contains(selected)) return;
      choices.forEach((choice) => {
        const active = choice === selected;
        choice.classList.toggle('sel', active);
        choice.setAttribute('aria-pressed', String(active));
      });
    });
  });
}
