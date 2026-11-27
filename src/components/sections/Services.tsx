import { services } from '../../content'
import { useLanguage } from '../../i18n/useLanguage'
import { Chip } from '../ui/Chip'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'
import { Window } from '../ui/Window'

export function Services() {
  const { t, pick } = useLanguage()
  return (
    <section id="services" className="section" data-shape="dots" aria-labelledby="services-title">
      <SectionHeading index="03" title={t.section.services} id="services-title" file="services.ts" />
      <div className="service-grid">
        {services.items.map((item, i) => (
          <Reveal as="article" key={item.id} index={i} className="service">
            <Window file={item.file}>
              <h3>{pick(item.title)}</h3>
              <p>{pick(item.body)}</p>
              <div className="chips">
                {item.tags.map((tag) => (
                  <Chip key={tag}>{tag}</Chip>
                ))}
              </div>
            </Window>
          </Reveal>
        ))}
      </div>
      <h3 className="sub-title">{t.section.process}</h3>
      <ol className="steps">
        {services.steps.map((step, i) => (
          <Reveal as="li" key={i} index={i} className="step">
            <span className="step-no" aria-hidden="true">{i + 1}</span>
            <h4>{pick(step.title)}</h4>
            <p>{pick(step.body)}</p>
          </Reveal>
        ))}
      </ol>
    </section>
  )
}
