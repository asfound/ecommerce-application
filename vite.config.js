import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  base: './',
  build: {
    minify: true,
    sourcemap: false,
    assetsDir: '',
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src'),
    },
  },

  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      reporter: ['text', 'html', 'lcov'],
      include: ['src/**/*.{ts}']
    },
  }
});
