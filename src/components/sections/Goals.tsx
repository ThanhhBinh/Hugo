import { goals } from '../../content'
import { useLanguage } from '../../i18n/useLanguage'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

export function Goals() {
  const { t, pick } = useLanguage()
  return (
    <section id="goals" className="section" data-shape="dots" aria-labelledby="goals-title">
      <SectionHeading index="06" title={t.section.goals} id="goals-title" file="goals.md" />
      <div className="goal-grid">
        {goals.map((goal, i) => (
          <Reveal as="article" key={goal.id} index={i} className="card goal">
            <p className="goal-kicker">{pick(goal.kicker)}</p>
            <h3>{pick(goal.title)}</h3>
            <p>{pick(goal.body)}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
