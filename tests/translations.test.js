import { describe, it, expect } from 'vitest';
import { t, getLang, setLang, onLangChange } from '../src/translations.js';

describe('translations', () => {
  it('defaults to en and falls back to key', () => {
    expect(getLang()).toBe('en');
    expect(t('save')).toBeDefined();
    expect(t('__missing__')).toBe('__missing__');
  });

  it('emits change on setLang', () => {
    let seen = null;
    const off = onLangChange(l => (seen = l));
    setLang('tr');
    expect(getLang()).toBe('tr');
    expect(seen).toBe('tr');
    off();
    setLang('en'); // back
  });
});
