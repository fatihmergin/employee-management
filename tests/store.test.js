import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as store from '../src/store/store.js';

describe('store', () => {
  beforeEach(() => localStorage.clear());

  it('subscribe gives snapshot immediately', () => {
    const spy = vi.fn();
    const off = store.subscribe(spy);
    expect(spy).toHaveBeenCalledTimes(1);
    off();
  });

  it('add / update / remove notify', () => {
    const spy = vi.fn();
    const off = store.subscribe(spy);

    store.add({ firstName: 'Test', email: 't@e.co' });
    const afterAdd = spy.mock.calls.at(-1)[0];
    const id = afterAdd[0].id;

    store.update(id, { lastName: 'User' });
    const updated = spy.mock.calls.at(-1)[0][0];
    expect(updated.lastName).toBe('User');

    store.remove(id);
    const afterRemove = spy.mock.calls.at(-1)[0];
    expect(afterRemove.find(e => e.id === id)).toBeFalsy();

    off();
  });
});
