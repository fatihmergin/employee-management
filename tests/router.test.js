import { describe, it, expect, vi } from 'vitest';

const h = vi.hoisted(() => {
  const setRoutesSpy = vi.fn();
  const RouterCtor = vi.fn(() => ({ setRoutes: setRoutesSpy }));
  return { setRoutesSpy, RouterCtor };
});
vi.mock('@vaadin/router', () => ({ Router: h.RouterCtor }));

import { initRouter } from '../src/router.js';

describe('router', () => {
  it('initializes and sets routes', () => {
    const target = document.createElement('div');
    const router = initRouter(target);
    expect(h.RouterCtor).toHaveBeenCalledWith(target);
    expect(h.setRoutesSpy).toHaveBeenCalled();
    expect(router).toBeTruthy();
  });
});
