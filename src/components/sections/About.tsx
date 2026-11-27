import { profile } from '../../content'
import { useLanguage } from '../../i18n/useLanguage'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

export function About() {
  const { t, pick } = useLanguage()
  return (
    <section id="about" className="section" data-shape="h" aria-labelledby="about-title">
      <SectionHeading index="01" title={t.section.about} id="about-title" />
      {pick(profile.about).map((paragraph, i) => (
        <Reveal as="p" key={i} index={i} className="lead">{paragraph}</Reveal>
      ))}
    </section>
  )
}
