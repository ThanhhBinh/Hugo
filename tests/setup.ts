import '@testing-library/jest-dom/vitest'
import { afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'

// jsdom has no matchMedia. Default: no media query matches.
// Tests that need a match override window.matchMedia themselves.
function stubMatchMedia(matches: (query: string) => boolean = () => false) {
  window.matchMedia = vi.fn((query: string) => ({
    matches: matches(query),
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(() => false),
  })) as unknown as typeof window.matchMedia
}
stubMatchMedia()
;(globalThis as { stubMatchMedia?: typeof stubMatchMedia }).stubMatchMedia = stubMatchMedia

afterEach(() => {
  cleanup()
  localStorage.clear()
  vi.restoreAllMocks()
  stubMatchMedia()
})
