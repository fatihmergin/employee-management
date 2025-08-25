import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('@vaadin/router', () => ({ Router: { go: vi.fn() } }));
vi.mock('../src/store/store.js', () => {
  let list = [{ id: '1', firstName: 'Ada', lastName: 'Lovelace', email: 'ada@example.com' }];
  return {
    add: vi.fn(emp => { list = [{ id: 'x', ...emp }, ...list]; }),
    update: vi.fn((id, p) => { list = list.map(e => e.id===id?{...e, ...p}:e); }),
    subscribe: cb => { cb(list); return () => {}; }
  };
});

import { Router } from '@vaadin/router';
import '../src/components/employee-form.js';
import { setLang } from '../src/translations.js';
import { add, update } from '../src/store/store.js';

const getByLabel = (root, text) =>
  [...root.querySelectorAll('.field .label')].find(n => n.textContent.trim() === text)?.parentElement;

describe('<employee-form>', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    setLang('en');
    Object.defineProperty(window, 'location', { value: new URL('http://localhost/'), writable: true });
  });

  it('validates and adds', async () => {
    const el = document.createElement('employee-form');
    document.body.appendChild(el);
    await el.updateComplete;
    const s = el.shadowRoot;

    s.querySelector('form').dispatchEvent(new Event('submit', { bubbles:true, cancelable:true }));
    await el.updateComplete;
    expect(s.textContent).toContain('Required');

    getByLabel(s, 'First Name').querySelector('input').value = 'Grace';
    getByLabel(s, 'First Name').querySelector('input').dispatchEvent(new Event('input'));
    getByLabel(s, 'Last Name').querySelector('input').value = 'Hopper';
    getByLabel(s, 'Last Name').querySelector('input').dispatchEvent(new Event('input'));
    getByLabel(s, 'Email').querySelector('input').value = 'grace@example.com';
    getByLabel(s, 'Email').querySelector('input').dispatchEvent(new Event('input'));
    getByLabel(s, 'Date of Employment').querySelector('input').value = '1952-06-01';
    getByLabel(s, 'Date of Employment').querySelector('input').dispatchEvent(new Event('input'));
    getByLabel(s, 'Date of Birth').querySelector('input').value = '1906-12-09';
    getByLabel(s, 'Date of Birth').querySelector('input').dispatchEvent(new Event('input'));
    const dep = getByLabel(s, 'Department').querySelector('select');
    dep.value = 'Tech'; dep.dispatchEvent(new Event('change'));
    const pos = getByLabel(s, 'Position').querySelector('select');
    pos.value = 'Senior'; pos.dispatchEvent(new Event('change'));

    s.querySelector('form').dispatchEvent(new Event('submit', { bubbles:true, cancelable:true }));
    expect(add).toHaveBeenCalled();
    expect(Router.go).toHaveBeenCalledWith('/');
  });

  it('edit opens dialog and updates', async () => {
    Object.defineProperty(window, 'location', { value: new URL('http://localhost/edit/1'), writable: true });
    const el = document.createElement('employee-form');
    document.body.appendChild(el);
    await el.updateComplete;

    const s = el.shadowRoot;
    getByLabel(s, 'Date of Employment').querySelector('input').value = '1952-06-01';
    getByLabel(s, 'Date of Employment').querySelector('input').dispatchEvent(new Event('input'));
    getByLabel(s, 'Date of Birth').querySelector('input').value = '1906-12-09';
    getByLabel(s, 'Date of Birth').querySelector('input').dispatchEvent(new Event('input'));
    const dep = getByLabel(s, 'Department').querySelector('select');
    dep.value = 'Tech'; dep.dispatchEvent(new Event('change'));
    const pos = getByLabel(s, 'Position').querySelector('select');
    pos.value = 'Senior'; pos.dispatchEvent(new Event('change'));
    getByLabel(s, 'Phone').querySelector('input').value = '+905311112233';
    getByLabel(s, 'Phone').querySelector('input').dispatchEvent(new Event('input'));

    s.querySelector('form').dispatchEvent(new Event('submit', { bubbles:true, cancelable:true }));
    await el.updateComplete;

    const dlg = s.querySelector('confirm-dialog');
    expect(dlg.open).toBe(true);

    dlg.dispatchEvent(new CustomEvent('confirm'));
    expect(update).toHaveBeenCalledWith('1', expect.any(Object));
    expect(Router.go).toHaveBeenCalledWith('/');
  });
});
