/// <reference types="vitest/config" />
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'

// The site is served from https://thanhhbinh.github.io/Hugo/.
// For a custom domain, change `base` to '/'.
export default defineConfig({
  base: '/Hugo/',
  plugins: [react()],
  build: {
    // Two pages: the site, and the print-only CV that scripts/build-cv.mjs turns into PDFs.
    rollupOptions: { input: { main: resolve(import.meta.dirname, 'index.html'), cv: resolve(import.meta.dirname, 'cv.html') } },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    include: ['tests/**/*.test.{ts,tsx}'],
  },
})
