export function initCarousel() {
  const carousel = document.getElementById('fcar');
  if (!carousel) return;

  const slides = [...carousel.querySelectorAll('.fcar-phone')];
  const panels = [...carousel.querySelectorAll('.fcar-panel')];
  const dotsWrap = document.getElementById('fcarDots');
  const progress = document.getElementById('fcarProg');
  const previous = document.getElementById('fcarPrev');
  const next = document.getElementById('fcarNext');
  const pause = document.getElementById('fcarPause');
  const count = Math.min(slides.length, panels.length);
  if (!count || !dotsWrap || !progress || !previous || !next || !pause) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let current = 0;
  let timer = null;
  let visible = false;
  let userPaused = false;
  let interactionPaused = false;

  panels.slice(0, count).forEach((_, index) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.setAttribute('aria-label', `Show feature ${index + 1} of ${count}`);
    dot.setAttribute('aria-controls', slides[index].id);
    dot.addEventListener('click', () => {
      show(index);
      schedule();
    });
    dotsWrap.appendChild(dot);
  });
  const dots = [...dotsWrap.children];

  const canPlay = () => visible
    && !document.hidden
    && !reducedMotion.matches
    && !userPaused
    && !interactionPaused;

  const updatePauseControl = () => {
    const paused = userPaused || reducedMotion.matches;
    pause.classList.toggle('paused', paused);
    pause.setAttribute('aria-pressed', String(paused));
    pause.disabled = reducedMotion.matches;
    pause.setAttribute(
      'aria-label',
      reducedMotion.matches
        ? 'Auto-advance disabled by reduced-motion preference'
        : userPaused ? 'Resume auto-advance' : 'Pause auto-advance'
    );
  };

  const stop = () => {
    clearTimeout(timer);
    timer = null;
    progress.classList.remove('run');
  };

  const schedule = () => {
    stop();
    if (!canPlay()) return;
    void progress.offsetWidth;
    progress.classList.add('run');
    timer = window.setTimeout(() => {
      show(current + 1);
      schedule();
    }, 6000);
  };

  function show(index) {
    current = (index + count) % count;
    slides.forEach((slide, slideIndex) => {
      const active = slideIndex === current;
      slide.classList.toggle('on', active);
      slide.setAttribute('aria-hidden', String(!active));
      slide.toggleAttribute('inert', !active);
      slide.querySelectorAll('[data-compare-phone]').forEach((comparison) => {
        comparison.tabIndex = active ? 0 : -1;
      });
    });
    panels.forEach((panel, panelIndex) => {
      const active = panelIndex === current;
      panel.classList.toggle('on', active);
      panel.setAttribute('aria-hidden', String(!active));
      panel.toggleAttribute('inert', !active);
    });
    dots.forEach((dot, dotIndex) => {
      const active = dotIndex === current;
      dot.classList.toggle('on', active);
      dot.setAttribute('aria-pressed', String(active));
    });
  }

  previous.addEventListener('click', () => { show(current - 1); schedule(); });
  next.addEventListener('click', () => { show(current + 1); schedule(); });
  pause.addEventListener('click', () => {
    userPaused = !userPaused;
    updatePauseControl();
    schedule();
  });

  carousel.addEventListener('pointerenter', () => {
    interactionPaused = true;
    schedule();
  });
  carousel.addEventListener('pointerleave', () => {
    interactionPaused = false;
    schedule();
  });
  carousel.addEventListener('focusin', () => {
    interactionPaused = true;
    schedule();
  });
  carousel.addEventListener('focusout', (event) => {
    if (carousel.contains(event.relatedTarget)) return;
    interactionPaused = false;
    schedule();
  });

  const observer = new IntersectionObserver((entries) => {
    visible = entries.some((entry) => entry.isIntersecting);
    schedule();
  }, { threshold: 0.35 });
  observer.observe(carousel);

  document.addEventListener('visibilitychange', schedule);
  reducedMotion.addEventListener('change', () => {
    updatePauseControl();
    schedule();
  });

  show(0);
  updatePauseControl();
}
