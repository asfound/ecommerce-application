import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';
import createSvgSpritePlugin from 'vite-plugin-svg-sprite';

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
  plugins: [
    createSvgSpritePlugin({
      exportType: 'vanilla',
      include: '**/icons/*.svg',
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      reporter: ['text', 'html', 'json', 'json-summary'],
      include: ['src/**/*.ts'],
      exclude: [
        '**/main.ts',
        '**/*.d.ts',
        '**/*-types.ts',
        '**/types.ts',
        '**/*-constants.ts',
        '**/constants.ts',
      ],
    },
  },
});
