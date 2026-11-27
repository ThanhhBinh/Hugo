import { career, profile } from '../../content'
import { useLanguage } from '../../i18n/useLanguage'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

export function Highlights() {
  const { t, pick } = useLanguage()
  return (
    <section id="highlights" className="section" data-shape="dots" aria-labelledby="highlights-title">
      <SectionHeading index="01" title={t.section.highlights} id="highlights-title" />
      <ol className="ladder" aria-label={t.section.highlights}>
        {career.ladder.map((step, i) => (
          <Reveal as="li" key={step.role} index={i} className={`ladder-step${i === career.ladder.length - 1 ? ' current' : ''}`}>
            <span className="ladder-role">{step.role}</span>
            <span className="ladder-date">{step.date}</span>
          </Reveal>
        ))}
      </ol>
      <div className="stats">
        {career.stats.map((s, i) => (
          <Reveal key={s.value} index={i} className="card stat">
            <span className="stat-value">{s.value}</span>
            <span className="stat-label">{pick(s.label)}</span>
          </Reveal>
        ))}
      </div>
      <div className="about-text">
        {pick(profile.about).map((paragraph, i) => (
          <Reveal as="p" key={i} index={i} className="lead">{paragraph}</Reveal>
        ))}
      </div>
    </section>
  )
}
