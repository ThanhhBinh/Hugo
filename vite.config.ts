/// <reference types="vitest/config" />
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// The site is served from https://thanhhbinh.github.io/Hugo/.
// For a custom domain, change `base` to '/'.
export default defineConfig({
  base: '/Hugo/',
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    include: ['tests/**/*.test.{ts,tsx}'],
  },
})
