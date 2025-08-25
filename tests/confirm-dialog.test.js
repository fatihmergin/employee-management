import { describe, it, expect } from 'vitest';
import '../src/components/confirm-dialog.js';
import { setLang } from '../src/translations.js';

describe('<confirm-dialog>', () => {
  it('defaults and events', async () => {
    setLang('en');
    const el = document.createElement('confirm-dialog');
    el.open = true;
    el.message = 'Hello';
    document.body.appendChild(el);
    await el.updateComplete;
    const s = el.shadowRoot;
    expect(s.textContent).toContain('Are you sure?');
    expect(s.textContent).toContain('Proceed');
    expect(s.textContent).toContain('Cancel');
    let canceled = false;
    el.addEventListener('cancel', () => (canceled = true));
    s.querySelector('.backdrop').click();
    expect(canceled).toBe(true);
    el.open = true;
    await el.updateComplete;
    let confirmed = false;
    el.addEventListener('confirm', () => (confirmed = true));
    s.querySelector('.proceed').click();
    expect(confirmed).toBe(true);
    expect(el.open).toBe(false);
  });
});
