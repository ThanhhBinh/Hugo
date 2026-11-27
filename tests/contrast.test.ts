import { readFileSync } from 'node:fs'
import { describe, expect, test } from 'vitest'

const css = readFileSync('src/styles/theme.css', 'utf8')

function vars(block: string): Record<string, string> {
  return Object.fromEntries([...block.matchAll(/--([\w-]+):\s*(#[0-9a-fA-F]{6})/g)].map((m) => [m[1]!, m[2]!]))
}
function lum(hex: string) {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4)) as [number, number, number]
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}
const ratio = (a: string, b: string) => {
  const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x) as [number, number]
  return (hi + 0.05) / (lo + 0.05)
}
function mix(fg: string, bg: string, a: number) {
  const ch = (i: number) => Math.round(parseInt(fg.slice(i, i + 2), 16) * a + parseInt(bg.slice(i, i + 2), 16) * (1 - a))
  return '#' + [1, 3, 5].map((i) => ch(i).toString(16).padStart(2, '0')).join('')
}
const dark = vars(css.slice(0, css.indexOf("[data-theme='light']")))
const light = vars(css.slice(css.indexOf("[data-theme='light']")))

describe('theme contrast (WCAG AA)', () => {
  for (const [name, t] of [['dark', dark], ['light', light]] as const) {
    test(`${name}: text, muted and accent text are readable on bg and panel`, () => {
      for (const bg of [t.bg!, t.surface!]) {
        expect(ratio(t.text!, bg)).toBeGreaterThanOrEqual(4.5)
        expect(ratio(t.muted!, bg)).toBeGreaterThanOrEqual(4.5)
        expect(ratio(t['accent-text']!, bg)).toBeGreaterThanOrEqual(4.5)
        expect(ratio(t.add!, bg)).toBeGreaterThanOrEqual(4.5)
        expect(ratio(t.del!, bg)).toBeGreaterThanOrEqual(4.5)
      }
      // Diff rows: text on its own tint (12% / 10%) over the page background.
      expect(ratio(t.add!, mix(t.add!, t.bg!, 0.12))).toBeGreaterThanOrEqual(4.5)
      expect(ratio(t.del!, mix(t.del!, t.bg!, 0.1))).toBeGreaterThanOrEqual(4.5)
      expect(ratio(t['accent-ink']!, t.accent!)).toBeGreaterThanOrEqual(4.5)
    })
  }
})
