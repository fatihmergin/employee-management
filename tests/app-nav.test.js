import { describe, it, expect, vi, beforeEach } from 'vitest';
vi.mock('@vaadin/router', () => ({ Router: { go: vi.fn() } }));
import { Router } from '@vaadin/router';
import '../src/components/app-nav.js';
import { setLang } from '../src/translations.js';

describe('<app-nav>', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    setLang('en');
  });

  it('routes on nav clicks', async () => {
    const el = document.createElement('app-nav');
    document.body.appendChild(el);
    await el.updateComplete;
    const s = el.shadowRoot;
    s.querySelector('.navlink[href="/"]').click();
    expect(Router.go).toHaveBeenCalledWith('/');
    s.querySelector('.left').click();
    expect(Router.go).toHaveBeenCalledWith('/');
  });

  it('toggles language', async () => {
    const el = document.createElement('app-nav');
    document.body.appendChild(el);
    await el.updateComplete;
    el.shadowRoot.querySelector('.flag').click();
    expect(document.documentElement.lang).toBe('tr');
  });
});
