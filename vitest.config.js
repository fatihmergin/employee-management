import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.js'],
    include: ['tests/**/*.test.js'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      lines: 85,
      functions: 85,
      branches: 80,
      statements: 85,
      exclude: ['web-dev-server.config.mjs']
    }
  }
});
