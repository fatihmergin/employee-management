import { describe, it, expect, vi } from 'vitest';

const h = vi.hoisted(() => {
  const setRoutesSpy = vi.fn();
  const RouterCtor = vi.fn(() => ({ setRoutes: setRoutesSpy }));
  return { setRoutesSpy, RouterCtor };
});
vi.mock('@vaadin/router', () => ({ Router: h.RouterCtor }));

import '../src/app-root.js';

describe('<app-root>', () => {
  it('creates router and sets routes', async () => {
    const el = document.createElement('app-root');
    document.body.appendChild(el);
    await el.updateComplete;
    expect(h.RouterCtor).toHaveBeenCalled();
    expect(h.setRoutesSpy).toHaveBeenCalled();
    expect(el.shadowRoot.querySelector('#outlet')).toBeTruthy();
  });
});
