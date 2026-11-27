import { useEffect, useRef } from 'react'
import { experience } from '../../content'
import { useLanguage } from '../../i18n/useLanguage'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

export function Experience() {
  const { t, pick } = useLanguage()
  const listRef = useRef<HTMLOListElement>(null)

  // The timeline line fills up as the visitor scrolls through it (CSS variable --fill, 0–1).
  useEffect(() => {
    const list = listRef.current
    if (!list) return
    let frame = 0
    const update = () => {
      frame = 0
      const rect = list.getBoundingClientRect()
      const fill = rect.height ? (window.innerHeight * 0.6 - rect.top) / rect.height : 0
      list.style.setProperty('--fill', Math.min(1, Math.max(0, fill)).toFixed(3))
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <section id="experience" className="section" data-shape="dots" aria-labelledby="experience-title">
      <SectionHeading index="04" title={t.section.experience} id="experience-title" />
      <ol className="timeline" ref={listRef}>
        {experience.map((item, i) => (
          <Reveal as="li" key={item.id} index={i} className="timeline-item">
            <p className="period">{pick(item.period)}</p>
            <h3>
              {item.role} <span className="org">· {pick(item.org)}</span>
            </h3>
            <p>{pick(item.summary)}</p>
            {item.team && <p className="team">{t.labels.team}: {pick(item.team)}</p>}
            {item.highlight && <p className="badge">↑ {pick(item.highlight)}</p>}
          </Reveal>
        ))}
      </ol>
    </section>
  )
}
