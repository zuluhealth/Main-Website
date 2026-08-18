const focusableSelector = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])'
].join(',');

export function initNavigation() {
  const nav = document.getElementById('topnav');
  const links = document.getElementById('primary-navigation');
  const burger = document.querySelector('.nav-burger');
  if (!nav || !links || !burger) return;

  const mobile = window.matchMedia('(max-width: 880px)');
  const main = document.querySelector('main');
  const footer = document.querySelector('footer');
  let lastFocused = null;
  let open = false;

  const setOutsideInert = (inactive) => {
    [main, footer].forEach((element) => element?.toggleAttribute('inert', inactive));
  };

  const syncMode = () => {
    if (!mobile.matches) {
      open = false;
      links.classList.remove('open');
      links.removeAttribute('inert');
      burger.setAttribute('aria-expanded', 'false');
      burger.setAttribute('aria-label', 'Menu');
      document.body.classList.remove('nav-open');
      setOutsideInert(false);
      return;
    }
    links.toggleAttribute('inert', !open);
  };

  const setOpen = (nextOpen, { restoreFocus = false } = {}) => {
    if (nextOpen && !mobile.matches) return;
    open = nextOpen;
    if (open) lastFocused = document.activeElement;
    links.classList.toggle('open', open);
    links.toggleAttribute('inert', mobile.matches && !open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Menu');
    document.body.classList.toggle('nav-open', open);
    setOutsideInert(open);

    if (open) {
      requestAnimationFrame(() => links.querySelector(focusableSelector)?.focus());
    } else if (restoreFocus && lastFocused instanceof HTMLElement) {
      lastFocused.focus();
    }
  };

  burger.addEventListener('click', () => setOpen(!open, { restoreFocus: open }));
  links.addEventListener('click', (event) => {
    if (event.target.closest('a')) setOpen(false);
  });

  document.addEventListener('keydown', (event) => {
    if (!open) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      setOpen(false, { restoreFocus: true });
      return;
    }
    if (event.key !== 'Tab') return;
    const focusable = [...links.querySelectorAll(focusableSelector)].filter((element) => !element.hasAttribute('inert'));
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable.at(-1);
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  let scrollFrame = null;
  const syncScroll = () => {
    if (scrollFrame) return;
    scrollFrame = requestAnimationFrame(() => {
      nav.classList.toggle('scrolled', window.scrollY > 24);
      scrollFrame = null;
    });
  };
  window.addEventListener('scroll', syncScroll, { passive: true });
  mobile.addEventListener('change', syncMode);
  syncMode();
  syncScroll();
}
