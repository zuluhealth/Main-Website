const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

export function initCompareScreens() {
  document.querySelectorAll('[data-compare-phone]').forEach((comparison) => {
    let idleTimer = null;
    let frame = null;
    let pendingClientX = null;

    const showControl = () => {
      comparison.classList.add('is-active');
      clearTimeout(idleTimer);
      idleTimer = window.setTimeout(() => comparison.classList.remove('is-active'), 2000);
    };
    const current = () => {
      const value = Number.parseFloat(comparison.style.getPropertyValue('--split') || '50');
      return Number.isFinite(value) ? value : 50;
    };
    const setPercent = (percent) => {
      const value = clamp(percent, 0, 100);
      comparison.style.setProperty('--split', `${value.toFixed(2)}%`);
      comparison.setAttribute('aria-valuenow', String(Math.round(value)));
      comparison.setAttribute('aria-valuetext', `${Math.round(value)} percent light mode`);
      showControl();
    };
    const updateFromPointer = () => {
      frame = null;
      const rect = comparison.getBoundingClientRect();
      if (!rect.width || pendingClientX === null) return;
      setPercent(((pendingClientX - rect.left) / rect.width) * 100);
    };
    const queuePointerUpdate = (clientX) => {
      pendingClientX = clientX;
      if (!frame) frame = requestAnimationFrame(updateFromPointer);
    };

    comparison.addEventListener('pointerenter', (event) => queuePointerUpdate(event.clientX));
    comparison.addEventListener('pointermove', (event) => queuePointerUpdate(event.clientX));
    comparison.addEventListener('pointerdown', (event) => {
      try { comparison.setPointerCapture(event.pointerId); } catch { /* Capture is optional. */ }
      queuePointerUpdate(event.clientX);
    });
    comparison.addEventListener('pointerup', (event) => {
      try { comparison.releasePointerCapture(event.pointerId); } catch { /* Capture is optional. */ }
      showControl();
    });
    ['pointercancel', 'pointerleave'].forEach((eventName) => {
      comparison.addEventListener(eventName, () => {
        clearTimeout(idleTimer);
        comparison.classList.remove('is-active');
      });
    });
    comparison.addEventListener('focus', showControl);
    comparison.addEventListener('blur', () => comparison.classList.remove('is-active'));
    comparison.addEventListener('keydown', (event) => {
      const changes = {
        ArrowLeft: current() - 5,
        ArrowRight: current() + 5,
        Home: 0,
        End: 100
      };
      if (!(event.key in changes)) return;
      event.preventDefault();
      setPercent(changes[event.key]);
    });
  });
}
