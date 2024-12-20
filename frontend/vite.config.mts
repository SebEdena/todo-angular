/// <reference types="vitest" />

import angular from '@analogjs/vite-plugin-angular';
import path from 'node:path';

import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [angular()],
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['src/test-setup.ts'],
      include: ['**/*.spec.ts'],
      reporters: ['default'],
      coverage: {
        reporter: ['text', 'json', 'html'],
        include: ['src/app/**/*.ts', '!src/app/models/*.ts'],
        reportOnFailure: true,
      },
    },
    define: {
      'import.meta.vitest': mode !== 'production',
    },
    resolve: {
      alias: {
        src: path.resolve(__dirname, './src'),
      },
    },
  };
});
