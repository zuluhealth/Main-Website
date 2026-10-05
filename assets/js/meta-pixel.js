/* Zulu public B2B marketing only. Never include this on the app or EMR. */
(() => {
  'use strict';
  if (window.__zuluMetaInstalled) return;
  window.__zuluMetaInstalled = true;

  const PIXEL_ID = '807382675764913';
  const CONSENT_KEY = 'zulu_marketing_consent_v1';
  const MAX_AGE = 180 * 24 * 60 * 60 * 1000;
  const HOSTS = new Set(['zulu.health', 'www.zulu.health']);
  const PRODUCTS = {
    '/providers/': 'Zulu provider solutions',
    '/providers/clinics/': 'Zulu CMS',
    '/providers/hospitals/': 'IQVIA HIS and EMR',
    '/providers/labs/': 'Zulu laboratory solutions',
    '/providers/radiology/': 'Zulu radiology solutions',
    '/providers/pharmacies/': 'Zulu pharmacy solutions',
    '/providers/cds/': 'Zulu clinical decision support',
    '/providers/integrate/': 'Zulu integration',
    '/payers/': 'Zulu payer solutions'
  };
  const PATHS = new Set(['/', '/about/', '/contact/', ...Object.keys(PRODUCTS)]);
  const campaignKeys = new Set(['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'utm_id', 'fbclid']);
  let consent = readConsent();
  let initialized = false;
  let viewed = false;
  let panel;
  let settings;
  let previousFocus;
  const contactTimes = new Map();

  function readConsent() {
    try {
      const saved = JSON.parse(localStorage.getItem(CONSENT_KEY));
      if (saved && ['granted', 'denied'].includes(saved.choice)
        && Number.isFinite(saved.time) && saved.time <= Date.now()
        && Date.now() - saved.time < MAX_AGE) return saved.choice;
    } catch { /* No storage means no remembered consent. */ }
    return null;
  }

  function safeURL(url) {
    if (!PATHS.has(url.pathname)) return false;
    for (const [key, value] of url.searchParams) {
      if (!campaignKeys.has(key) || !/^[a-z0-9_.~-]{1,512}$/i.test(value)) return false;
    }
    // Legacy hash routes redirect before measurement; free text is never accepted.
    if (url.hash && !/^#[a-z][a-z0-9_-]*$/i.test(url.hash)) return false;
    return true;
  }

  function eligible() {
    if (!HOSTS.has(location.hostname) || location.protocol !== 'https:') return false;
    if (!safeURL(new URL(location.href))) return false;
    if (navigator.globalPrivacyControl === true) return false;
    if (document.referrer) {
      try {
        const ref = new URL(document.referrer);
        if (ref.hostname === 'zulu.health' || ref.hostname.endsWith('.zulu.health')) {
          if (!HOSTS.has(ref.hostname) || !safeURL(ref)) return false;
        } else if (ref.search || ref.hash || ref.pathname !== '/') return false;
      } catch { return false; }
    }
    return true;
  }

  function bootstrap() {
    if (initialized || consent !== 'granted' || !eligible()) return;
    // Meta's asynchronous base loader, held until the visitor opts in.
    !function(f,b,e,v,n,t,s) {
      if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;
      t.addEventListener('load', () => {
        if (consent !== 'granted') clearMetaCookies();
      });
      s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s);
    }(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
    window.fbq.disablePushState = true;
    window.fbq('set', 'autoConfig', false, PIXEL_ID);
    window.fbq('consent', 'grant');
    window.fbq('init', PIXEL_ID);
    initialized = true;
  }

  function track(event, parameters = {}) {
    if (consent !== 'granted' || !eligible()) return;
    bootstrap();
    if (initialized) window.fbq('trackSingle', PIXEL_ID, event, parameters);
  }

  function pageView() {
    if (viewed || consent !== 'granted' || !eligible()) return;
    viewed = true;
    track('PageView');
    const product = PRODUCTS[location.pathname];
    if (product) track('ViewContent', { content_name: product, content_category: 'Business software' });
  }

  function contact(channel) {
    if (consent !== 'granted' || !eligible()) return;
    // Ignore rapid duplicate activation without suppressing later real attempts.
    const now = Date.now();
    if (now - (contactTimes.get(channel) || 0) < 1500) return;
    contactTimes.set(channel, now);
    track('Contact', { content_name: channel });
  }

  function clearMetaCookies() {
    for (const name of ['_fbp', '_fbc']) {
      for (const domain of ['', '; domain=' + location.hostname, '; domain=.zulu.health']) {
        document.cookie = name + '=; Max-Age=0; path=/' + domain + '; SameSite=Lax; Secure';
      }
    }
  }

  function applyConsent(choice) {
    consent = choice;
    if (choice !== 'granted') {
      if (initialized) {
        // A slow SDK must not replay pre-withdrawal events when it arrives.
        if (!window.fbq.callMethod && Array.isArray(window.fbq.queue)) {
          window.fbq.queue = window.fbq.queue.filter(call =>
            !String(call[0]).startsWith('track') && call[0] !== 'consent');
          window.fbq.queue.unshift(['consent', 'revoke']);
          viewed = false;
        } else window.fbq('consent', 'revoke');
      }
      clearMetaCookies();
    } else {
      if (initialized && eligible()) window.fbq('consent', 'grant');
      pageView();
    }
  }

  function choose(choice) {
    try { localStorage.setItem(CONSENT_KEY, JSON.stringify({ choice, time: Date.now() })); } catch { /* Keep current-page choice. */ }
    applyConsent(choice);
    panel.hidden = true;
    if (previousFocus?.isConnected) previousFocus.focus();
    else if (panel.contains(document.activeElement)) document.activeElement.blur();
  }

  function buildControls() {
    const privacyLink = document.querySelector('footer a[href="/privacy/"]');
    if (!privacyLink) return;
    const item = document.createElement('li');
    settings = document.createElement('button');
    settings.type = 'button';
    settings.className = 'zulu-cookie-settings';
    settings.textContent = 'Cookie settings';
    settings.setAttribute('aria-controls', 'zulu-cookie-panel');
    item.append(settings);
    privacyLink.closest('li').after(item);

    panel = document.createElement('section');
    panel.id = 'zulu-cookie-panel';
    panel.className = 'zulu-cookie-panel';
    panel.hidden = true;
    panel.setAttribute('role', 'region');
    panel.setAttribute('aria-labelledby', 'zulu-cookie-title');
    panel.innerHTML = '<h2 id="zulu-cookie-title">Your cookie choice</h2>'
      + '<p>With your permission, we use Meta cookies on our business pages to measure advertising and build audiences. Meta receives information about your browser and these visits. You can change your choice anytime.</p>'
      + '<a href="/privacy/#advertising-cookies">Privacy details</a>'
      + '<div class="zulu-cookie-actions"><button type="button" data-choice="denied">Reject optional</button><button type="button" data-choice="granted">Accept marketing</button></div>'
      + '<button type="button" class="zulu-cookie-close" hidden>Keep current choice</button>';
    panel.querySelectorAll('[data-choice]').forEach(button => {
      button.addEventListener('click', () => choose(button.dataset.choice));
    });
    const close = panel.querySelector('.zulu-cookie-close');
    close.addEventListener('click', () => { panel.hidden = true; previousFocus?.focus(); });
    settings.addEventListener('click', () => {
      previousFocus = document.activeElement;
      close.hidden = consent === null;
      panel.hidden = false;
      panel.querySelector('[data-choice]').focus();
    });
    document.body.append(panel);
    // Consumer, privacy, error and redirected pages do not prompt or track.
    if (consent === null && eligible()) panel.hidden = false;
  }

  document.addEventListener('click', event => {
    if (!event.isTrusted || event.defaultPrevented || event.button !== 0) return;
    const link = event.target.closest?.('a[href]');
    if (!link) return;
    const url = new URL(link.href, location.href);
    if (link.classList.contains('booking-link') && url.origin === 'https://outlook.office.com'
      && url.pathname === '/book/ZuluPlatformDemos@basbina352.com/') contact('Demo booking handoff');
    else if (location.pathname === '/contact/' && url.protocol === 'mailto:') contact('Email composer opened');
  });
  document.addEventListener('submit', event => {
    if (event.isTrusted && event.target.id === 'contactForm' && event.target.checkValidity()) {
      // The existing form opens an email draft. It does not submit a lead.
      contact('Email composer opened');
    }
  });
  window.addEventListener('storage', event => {
    if (event.key === CONSENT_KEY || event.key === null) {
      applyConsent(readConsent());
      if (panel) panel.hidden = consent !== null || !eligible();
    }
  });
  buildControls();
  pageView();
})();
