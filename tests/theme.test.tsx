import { act, render, screen } from '@testing-library/react'
import { describe, expect, test, vi } from 'vitest'
import { LanguageProvider } from '../src/i18n/LanguageProvider'
import { ThemeToggle } from '../src/components/ui/ThemeToggle'
import { LanguageSwitch } from '../src/components/ui/LanguageSwitch'
import { en } from '../src/i18n/en'

declare const stubMatchMedia: (m?: (q: string) => boolean) => void

function renderUi(ui: React.ReactNode) {
  return render(<LanguageProvider>{ui}</LanguageProvider>)
}

describe('ThemeToggle', () => {
  test('follows the system dark preference, then toggles and remembers light', () => {
    stubMatchMedia((q) => q === '(prefers-color-scheme: dark)')
    renderUi(<ThemeToggle />)
    expect(document.documentElement.dataset.theme).toBe('dark')
    act(() => screen.getByRole('button', { name: en.switch.themeToLight }).click())
    expect(document.documentElement.dataset.theme).toBe('light')
    expect(localStorage.getItem('hugo.theme')).toBe('light')
  })

  test('still renders when storage throws', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('blocked')
    })
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('blocked')
    })
    renderUi(<ThemeToggle />)
    expect(document.documentElement.dataset.theme).toBe('light')
    act(() => screen.getByRole('button').click())
    expect(document.documentElement.dataset.theme).toBe('dark')
  })
})

describe('LanguageSwitch', () => {
  test('shows each language in its own name and switches to Vietnamese', () => {
    renderUi(<LanguageSwitch />)
    const group = screen.getByRole('group', { name: en.switch.language })
    const english = screen.getByRole('button', { name: 'English' })
    const vietnamese = screen.getByRole('button', { name: 'Tiếng Việt' })
    expect(group).toContainElement(english)
    expect(english).toHaveAttribute('lang', 'en')
    expect(vietnamese).toHaveAttribute('lang', 'vi')
    expect(english).toHaveAttribute('aria-pressed', 'true')
    act(() => vietnamese.click())
    expect(vietnamese).toHaveAttribute('aria-pressed', 'true')
    expect(document.documentElement.lang).toBe('vi')
  })
})
