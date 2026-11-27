import { education } from '../../content'
import { useLanguage } from '../../i18n/useLanguage'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

export function Education() {
  const { t, pick } = useLanguage()
  return (
    <section id="education" className="section" data-shape="h" aria-labelledby="education-title">
      <SectionHeading index="05" title={t.section.education} id="education-title" />
      {education.studying && (
        <Reveal className="card school studying">
          <div>
            <p className="period">● {pick(education.studying.status)}</p>
            <h3>{pick(education.studying.school)}</h3>
            <p>{pick(education.studying.program)}</p>
          </div>
        </Reveal>
      )}
      <Reveal className="card school" index={1}>
        <div>
          <h3>{pick(education.school)}</h3>
          <p>{pick(education.major)}</p>
          <p className="period">{education.period}</p>
        </div>
        <div className="gpa">
          <span className="gpa-value">{education.gpa}</span>
          <span className="gpa-label">{t.labels.gpa} · {pick(education.gpaNote)}</span>
        </div>
      </Reveal>
      <div className="edu-columns">
        <Reveal index={1}>
          <h3 className="sub-title">{t.section.awards}</h3>
          <ul className="plain-list">
            {education.awards.map((a) => (
              <li key={a.label.en}><span className="year">{a.year}</span>{pick(a.label)}</li>
            ))}
            {education.certs.map((c) => (
              <li key={c.label}><span className="year">{c.year}</span>{c.label}</li>
            ))}
          </ul>
        </Reveal>
        <Reveal index={2}>
          <h3 className="sub-title">{t.section.activities}</h3>
          <ul className="plain-list">
            {education.activities.map((a) => (
              <li key={a.label.en}><span className="year">{a.period}</span>{pick(a.label)}</li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
