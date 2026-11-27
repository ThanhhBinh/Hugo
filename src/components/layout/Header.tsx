import avatar from '../../assets/images/hugo-avatar-320.webp'
import { useActiveSection } from '../../hooks/useActiveSection'
import { useLanguage } from '../../i18n/useLanguage'
import { LanguageSwitch } from '../ui/LanguageSwitch'
import { ThemeToggle } from '../ui/ThemeToggle'

const NAV_IDS = ['about', 'experience', 'projects', 'toolbox', 'education', 'contact'] as const

export function Header() {
  const { t } = useLanguage()
  const active = useActiveSection(['hero', ...NAV_IDS])

  return (
    <header className="site-header">
      <a className="skip-link" href="#about">{t.skip}</a>
      <div className="header-bar">
        <a className="brand" href="#hero">
          <img src={avatar} alt="Hugo" width="36" height="36" />
          <span>Hugo</span>
        </a>
        <nav className="main-nav" aria-label={t.nav.label}>
          {NAV_IDS.map((id) => (
            <a key={id} href={`#${id}`} aria-current={active === id ? 'true' : undefined}>
              {t.nav[id]}
            </a>
          ))}
        </nav>
        <div className="header-tools">
          <LanguageSwitch />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
