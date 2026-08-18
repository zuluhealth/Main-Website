export function initReveal() {
  const elements = [...document.querySelectorAll('.rv')];
  if (!elements.length) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reducedMotion.matches || !('IntersectionObserver' in window)) {
    elements.forEach((element) => element.classList.add('rv-instant'));
    return;
  }

  document.documentElement.classList.add('motion-ready');
  const instantHeaderPages = new Set([
    'p-integrate',
    'p-hospitals',
    'p-clinics',
    'p-cds',
    'p-labs',
    'p-radiology',
    'p-insurers',
    'p-pharmacies',
    'p-privacy'
  ]);
  const page = document.querySelector('main.page');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('in');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  elements.forEach((element, index) => {
    if (page && instantHeaderPages.has(page.id) && element.closest('header.hero-provider')) {
      element.classList.add('rv-instant');
      return;
    }
    element.style.animationDelay = `${Math.min(index * 40, 240)}ms`;
    observer.observe(element);
  });
}
