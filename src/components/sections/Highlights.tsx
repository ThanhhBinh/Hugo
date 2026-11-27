import { career, profile } from '../../content'
import { useCountUp } from '../../hooks/useCountUp'
import { useInView } from '../../hooks/useInView'
import { useLanguage } from '../../i18n/useLanguage'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'
import { Window } from '../ui/Window'

function Stat({ value, label }: { value: string; label: string }) {
  const [ref, seen] = useInView<HTMLDivElement>(0.5)
  const shown = useCountUp(value, seen)
  return (
    <div className="card stat" ref={ref}>
      <span className="stat-value">{shown}</span>
      <span className="stat-label">{label}</span>
    </div>
  )
}

export function Highlights() {
  const { t, pick } = useLanguage()
  const [logRef, logSeen] = useInView<HTMLOListElement>(0.5)
  const commits = [...career.ladder].reverse()
  return (
    <section id="highlights" className="section" data-shape="dots" aria-labelledby="highlights-title">
      <SectionHeading index="01" title={t.section.highlights} id="highlights-title" file="git log --career" />
      <Window file="career.log">
        <ol className={`ladder${logSeen ? ' in' : ''}`} aria-label={t.section.highlights} ref={logRef}>
          {commits.map((step, i) => (
            <li key={step.role} className="commit">
              <span className="commit-dot" aria-hidden="true">*</span>
              <span className="commit-date">{step.date}</span>
              {i === 0 && <span className="commit-head">(HEAD → main)</span>}
              <span className="commit-role">{step.role}</span>
            </li>
          ))}
        </ol>
      </Window>
      <div className="stats">
        {career.stats.map((s) => (
          <Stat key={s.value} value={s.value} label={pick(s.label)} />
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
