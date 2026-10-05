import { initCarousel } from './carousel.js';
import { initCompareScreens } from './compare.js';
import { initContactForm } from './contact.js';
import { initInteractions } from './interactions.js?v=20260814-4';
import { redirectLegacyHashRoute } from './legacy-routes.js';
import { initNavigation } from './navigation.js';
import { initReveal } from './reveal.js';

if (!redirectLegacyHashRoute()) {
  [
    initNavigation,
    initInteractions,
    initContactForm,
    initCarousel,
    initCompareScreens,
    initReveal
  ].forEach((initialize) => {
    try {
      initialize();
    } catch {
      // Keep independent page features operational when one initializer fails.
    }
  });
}
