import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { readStorage, writeStorage } from '../lib/storage'
import { LanguageContext, type LanguageValue } from './context'
import { en } from './en'
import { resolveInitialLanguage } from './resolveLanguage'
import type { Lang, Localized } from './types'
import { vi } from './vi'

const STORAGE_KEY = 'hugo.lang'
const STRINGS = { en, vi }

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() =>
    resolveInitialLanguage({
      search: window.location.search,
      stored: readStorage(STORAGE_KEY),
      navigatorLang: navigator.language,
    }),
  )

  const setLang = useCallback((next: Lang) => {
    setLangState(next)
    writeStorage(STORAGE_KEY, next)
  }, [])

  // Keep the document in sync for screen readers, search engines and the tab title.
  useEffect(() => {
    const t = STRINGS[lang]
    document.documentElement.lang = lang
    document.title = t.meta.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.meta.description)
  }, [lang])

  const value = useMemo<LanguageValue>(
    () => ({ lang, setLang, t: STRINGS[lang], pick: <T,>(v: Localized<T>) => v[lang] }),
    [lang, setLang],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}
