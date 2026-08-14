const routes = new Map([
  ['/', '/'],
  ['/app', '/app/'],
  ['/providers', '/providers/'],
  ['/providers/integrate', '/providers/integrate/'],
  ['/providers/hospitals', '/providers/hospitals/'],
  ['/providers/clinics', '/providers/clinics/'],
  ['/providers/cds', '/providers/cds/'],
  ['/providers/labs', '/providers/labs/'],
  ['/providers/radiology', '/providers/radiology/'],
  ['/providers/pharmacies', '/providers/pharmacies/'],
  ['/providers/insurers', '/payers/'],
  ['/payers', '/payers/'],
  ['/about', '/about/'],
  ['/contact', '/contact/'],
  ['/privacy', '/privacy/']
]);

export function redirectLegacyHashRoute() {
  const legacyPath = window.location.hash.match(/^#(\/[^?#]*)/)?.[1];
  if (!legacyPath || !routes.has(legacyPath)) return false;
  window.location.replace(routes.get(legacyPath));
  return true;
}
