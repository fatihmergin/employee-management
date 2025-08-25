import { describe, it, expect, vi, beforeEach } from 'vitest';
vi.mock('@vaadin/router', () => ({ Router: { go: vi.fn() } }));
vi.mock('../src/store/store.js', () => {
  let list = [
    { id: '1', firstName: 'Fatih', lastName: 'Ergin', email: 'atih@example.com', phone: '+901234567890', department: 'Tech', position: 'Senior' },
    { id: '2', firstName: 'Grace', lastName: 'Hopper',  email: 'grace@ex.co', phone: '+901111111111', department: 'Analytics', position: 'Junior' }
  ];
  const subs = new Set(); const notify = () => subs.forEach(fn => fn([...list]));
  return {
    subscribe: cb => { subs.add(cb); cb([...list]); return () => subs.delete(cb); },
    remove: vi.fn(id => { list = list.filter(e => e.id !== id); notify(); })
  };
});
import '../src/components/employee-list.js';
import { remove } from '../src/store/store.js';
import { setLang } from '../src/translations.js';

describe('<employee-list>', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    setLang('en');
    vi.useFakeTimers();
  });

  it('filters and toggles view', async () => {
    const el = document.createElement('employee-list');
    document.body.appendChild(el);
    await el.updateComplete;
    const s = el.shadowRoot;
    const input = s.querySelector('.search input');
    input.value = 'Grace';
    input.dispatchEvent(new Event('input'));
    vi.advanceTimersByTime(260);
    await el.updateComplete;
    expect(s.textContent).toContain('Grace');
    expect(s.textContent).not.toContain('Ada');
    s.querySelectorAll('.toggle .iconbtn')[1].click();
    await el.updateComplete;
    expect(s.querySelector('.grid')).toBeTruthy();
  });

  it('delete flow', async () => {
    const el = document.createElement('employee-list');
    document.body.appendChild(el);
    await el.updateComplete;
    const s = el.shadowRoot;
    s.querySelector('tbody .actions .delete').click();
    await el.updateComplete;
    const dlg = s.querySelector('confirm-dialog');
    expect(dlg.open).toBe(true);
    dlg.dispatchEvent(new CustomEvent('confirm'));
    expect(remove).toHaveBeenCalled();
  });
});
