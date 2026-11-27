import { act, render, screen } from '@testing-library/react'
import { describe, expect, test, vi } from 'vitest'
import { resolveInitialLanguage } from '../src/i18n/resolveLanguage'
import { LanguageProvider } from '../src/i18n/LanguageProvider'
import { useLanguage } from '../src/i18n/useLanguage'
import { en } from '../src/i18n/en'
import { vi as viStrings } from '../src/i18n/vi'

describe('resolveInitialLanguage', () => {
  test('URL parameter wins over storage and browser', () => {
    expect(resolveInitialLanguage({ search: '?lang=vi', stored: 'en', navigatorLang: 'en-US' })).toBe('vi')
  })
  test('unknown URL value falls back to the stored language', () => {
    expect(resolveInitialLanguage({ search: '?lang=fr', stored: 'vi', navigatorLang: 'en' })).toBe('vi')
  })
  test('Vietnamese browser picks vi when nothing is stored', () => {
    expect(resolveInitialLanguage({ search: '', stored: null, navigatorLang: 'vi-VN' })).toBe('vi')
  })
  test('garbage everywhere falls back to English', () => {
    expect(resolveInitialLanguage({ search: '', stored: 'xx', navigatorLang: undefined })).toBe('en')
  })
})

function Probe() {
  const { t, setLang } = useLanguage()
  return (
    <>
      <h1>{t.hero.title}</h1>
      <button onClick={() => setLang('vi')}>vi</button>
    </>
  )
}

describe('LanguageProvider', () => {
  test('renders English when storage throws', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('blocked')
    })
    render(<LanguageProvider><Probe /></LanguageProvider>)
    expect(screen.getByRole('heading')).toHaveTextContent(en.hero.title)
  })

  test('switching to Vietnamese updates html lang, title, meta and storage', () => {
    const meta = document.createElement('meta')
    meta.name = 'description'
    document.head.appendChild(meta)
    render(<LanguageProvider><Probe /></LanguageProvider>)
    act(() => screen.getByRole('button', { name: 'vi' }).click())
    expect(screen.getByRole('heading')).toHaveTextContent(viStrings.hero.title)
    expect(document.documentElement.lang).toBe('vi')
    expect(document.title).toBe(viStrings.meta.title)
    expect(meta.content).toBe(viStrings.meta.description)
    expect(localStorage.getItem('hugo.lang')).toBe('vi')
    meta.remove()
  })
})
