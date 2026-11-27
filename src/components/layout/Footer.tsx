import { useLanguage } from '../../i18n/useLanguage'

const YEAR = new Date().getFullYear()

export function Footer() {
  const { t } = useLanguage()
  return (
    <footer className="site-footer">
      <span>© {YEAR} Hugo · Phan Thanh Bình</span>
      <span>{t.footer.note}</span>
    </footer>
  )
}
