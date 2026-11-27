import { useLanguage } from '../../i18n/useLanguage'
import type { Lang } from '../../i18n/types'

// Each language is written in its own language; no flags (flags are countries, not languages).
const OPTIONS: Array<{ lang: Lang; name: string; short: string }> = [
  { lang: 'en', name: 'English', short: 'EN' },
  { lang: 'vi', name: 'Tiếng Việt', short: 'VI' },
]

export function LanguageSwitch() {
  const { lang, setLang, t } = useLanguage()
  return (
    <div className="lang-switch" role="group" aria-label={t.switch.language}>
      {OPTIONS.map((option) => (
        <button
          key={option.lang}
          type="button"
          lang={option.lang}
          aria-pressed={lang === option.lang}
          aria-label={option.name}
          onClick={() => setLang(option.lang)}
        >
          <span className="long" aria-hidden="true">{option.name}</span>
          <span className="short" aria-hidden="true">{option.short}</span>
        </button>
      ))}
    </div>
  )
}
