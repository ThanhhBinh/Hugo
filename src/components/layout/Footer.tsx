import { useLanguage } from '../../i18n/useLanguage'

export function Footer() {
  const { t } = useLanguage()
  return (
    <footer className="site-footer">
      <span>© {new Date().getFullYear()} Hugo · Phan Thanh Bình</span>
      <span>{t.footer.note}</span>
    </footer>
  )
}
