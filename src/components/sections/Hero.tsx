import { useMemo, useState } from 'react'
import avatar320 from '../../assets/images/hugo-avatar-320.webp'
import avatar720 from '../../assets/images/hugo-avatar-720.webp'
import { profile } from '../../content'
import { useLanguage } from '../../i18n/useLanguage'
import { beat } from '../../lib/beat'
import { cvHref } from '../../lib/cv'
import { Terminal } from '../ui/Terminal'

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
  const [ready, setReady] = useState(false)
  // The terminal types its lines; when it is done the 3D scene beats once and the buttons appear.
  const lines = useMemo(
    () => [
      { cmd: 'whoami', out: <><span className="ok">{profile.name.toLowerCase()}</span> — {profile.fullName}</> },
      { cmd: 'cat role.txt', out: t.hero.keywords },
      { cmd: 'cat stack.txt', out: 'React · TypeScript · Flutter' },
    ],
    [t],
  )
  return (
    <section id="hero" className="hero" data-shape="sphere" aria-labelledby="hero-title">
      <div className="hero-text">
        <p className="sr-only">
          {profile.fullName} — {t.hero.keywords} — React · TypeScript · Flutter
        </p>
        <Terminal
          lines={lines}
          onDone={() => {
            setReady(true)
            beat()
          }}
        />
        <p className="eyebrow">{t.hero.eyebrow}</p>
        <h1 id="hero-title">{withName(t.hero.title)}</h1>
        <div className={`hero-actions${ready ? ' ready' : ''}`}>
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
