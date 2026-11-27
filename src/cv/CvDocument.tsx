import avatar from '../assets/images/hugo-avatar-320.webp'
import { contact, education, experience, goals, profile, projects, toolbox } from '../content'
import { en } from '../i18n/en'
import type { Lang } from '../i18n/types'
import { vi } from '../i18n/vi'

const UI = { en, vi }

/** Print-friendly CV built from the same content as the website. No phone, address or social profiles beyond GitHub. */
export function CvDocument({ lang }: { lang: Lang }) {
  const t = UI[lang]
  const work = projects.filter((p) => p.group === 'work')
  return (
    <article className="cv" lang={lang}>
      <header className="cv-head">
        <img src={avatar} alt="" width="84" height="84" />
        <div>
          <h1>{profile.fullName}</h1>
          <p className="cv-role">{t.hero.keywords}</p>
          <p className="cv-contact">
            <span>{contact.email}</span>
            <span>{contact.github.replace('https://', '')}</span>
            <span>{contact.location[lang]}</span>
          </p>
        </div>
      </header>

      <section>
        <h2>{t.section.highlights}</h2>
        {profile.about[lang].map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </section>

      <section>
        <h2>{t.section.experience}</h2>
        {experience.map((item) => (
          <div className="cv-item" key={item.id}>
            <p className="cv-line">
              <span><strong>{item.role}</strong> · {item.org[lang]}</span>
              <span className="cv-period">{item.period[lang]}</span>
            </p>
            <p>{item.summary[lang]}</p>
            {item.team && <p>{t.labels.team}: {item.team[lang]}</p>}
          </div>
        ))}
      </section>

      <section>
        <h2>{t.section.projects}</h2>
        {work.map((p) => (
          <div className="cv-item" key={p.id}>
            <p className="cv-line">
              <span><strong>{p.name}</strong> · {p.role[lang]}</span>
              <span className="cv-period">{p.stack.join(' · ')}</span>
            </p>
            <ul>
              {p.did?.[lang].map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
            {p.result && <p>{t.labels.result}: {p.result[lang]}</p>}
          </div>
        ))}
      </section>

      <section>
        <h2>{t.section.toolbox}</h2>
        <ul className="cv-tools">
          {toolbox.map((g) => (
            <li key={g.id}>
              <strong>{g.label[lang]}:</strong> {g.items.join(', ')}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>{t.section.education}</h2>
        {education.studying && (
          <p>
            <strong>{education.studying.school[lang]}</strong> · {education.studying.program[lang]} ({education.studying.status[lang]})
          </p>
        )}
        <p>
          <strong>{education.school[lang]}</strong> · {education.major[lang]}{' '}
          <span className="cv-period">{education.period}</span>
        </p>
        <p>{t.labels.gpa} {education.gpa} · {education.gpaNote[lang]}</p>
        <p>{education.awards.map((a) => `${a.year} ${a.label[lang]}`).join(' · ')} · {education.certs.map((c) => `${c.year} ${c.label}`).join(' · ')}</p>
      </section>

      <section>
        <h2>{t.section.goals}</h2>
        <ul>
          {goals.map((g) => (
            <li key={g.id}>
              <strong>{g.title[lang]}.</strong> {g.body[lang]}
            </li>
          ))}
        </ul>
      </section>
    </article>
  )
}
