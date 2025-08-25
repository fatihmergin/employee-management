import { afterEach } from 'vitest';

document.documentElement.lang = 'en';

if (!globalThis.crypto) globalThis.crypto = {};
if (!globalThis.crypto.randomUUID) {
  globalThis.crypto.randomUUID = () =>
    'test-uuid-' + Math.random().toString(16).slice(2);
}

afterEach(() => {
  document.body.innerHTML = '';
});
