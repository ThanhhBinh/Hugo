import avatar320 from '../../assets/images/hugo-avatar-320.webp'
import avatar720 from '../../assets/images/hugo-avatar-720.webp'
import { profile } from '../../content'
import { useLanguage } from '../../i18n/useLanguage'
import { cvHref } from '../../lib/cv'

/** Highlights the name "Hugo" inside the hero sentence. */
function withName(text: string) {
  const [before, ...rest] = text.split('Hugo')
  if (!rest.length) return text
  return (
    <>
      {before}
      <span className="name">Hugo</span>
      {rest.join('Hugo')}
    </>
  )
}

export function Hero() {
  const { t, lang } = useLanguage()
  return (
    <section id="hero" className="hero" data-shape="sphere" aria-labelledby="hero-title">
      <div className="hero-text">
        <p className="eyebrow">{t.hero.eyebrow}</p>
        <h1 id="hero-title">{withName(t.hero.title)}</h1>
        <p className="hero-sub">
          <strong>{profile.fullName}</strong> · {t.hero.subtitle}
        </p>
        <p className="hero-keywords">
          {t.hero.keywords} · <span>React · TypeScript · Flutter</span>
        </p>
        <div className="hero-actions">
          <a className="btn btn-primary" href={cvHref(lang)} download>{t.hero.downloadCv}</a>
          <a className="btn btn-ghost" href="#contact">{t.hero.hire}</a>
        </div>
      </div>
      <figure className="hero-avatar">
        <img src={avatar720} srcSet={`${avatar320} 320w, ${avatar720} 720w`} sizes="(min-width: 960px) 340px, 220px" alt="Hugo" width="340" height="340" />
      </figure>
    </section>
  )
}
