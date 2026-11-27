import { createContext } from 'react'
import type { Lang, Localized, UiStrings } from './types'

export interface LanguageValue {
  lang: Lang
  setLang: (lang: Lang) => void
  t: UiStrings
  pick: <T>(value: Localized<T>) => T
}

export const LanguageContext = createContext<LanguageValue | null>(null)
