import { siteConfig } from './config.js';

export function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const selected = (group) => form
    .querySelector(`.choice-row[data-group="${group}"] .choice.sel`)
    ?.textContent.trim() || 'Not selected';

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const lines = [
      'Zulu call request',
      '',
      `I am a: ${selected('type')}`,
      `Today, we run: ${selected('system')}`,
      `Interested in: ${selected('intent')}`,
      '',
      `Full name: ${data.get('name') || ''}`,
      `Organization: ${data.get('organization') || ''}`,
      `Email: ${data.get('email') || ''}`,
      `Phone / WhatsApp: ${data.get('phone') || ''}`,
      '',
      `Notes: ${data.get('message') || ''}`
    ];
    const subject = encodeURIComponent('Zulu provider call request');
    const body = encodeURIComponent(lines.join('\n'));
    window.location.assign(`mailto:${siteConfig.email}?subject=${subject}&body=${body}`);
  });
}
