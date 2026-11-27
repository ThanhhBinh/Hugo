import { contact, primaryContactHref } from '../../content'
import { useLanguage } from '../../i18n/useLanguage'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

export function Contact() {
  const { t, pick } = useLanguage()
  return (
    <section id="contact" className="section contact" data-shape="ring" aria-labelledby="contact-title">
      <SectionHeading index="06" title={t.section.contact} id="contact-title" />
      <Reveal as="p" className="contact-lead">{t.contact.lead}</Reveal>
      <Reveal index={1}>
        <a className="btn btn-primary btn-lg" href={primaryContactHref(contact)}>{t.hero.cta} →</a>
      </Reveal>
      <Reveal as="ul" index={2} className="contact-list">
        {contact.email && (
          <li><span>{t.contact.email}</span><a href={`mailto:${contact.email}`}>{contact.email}</a></li>
        )}
        <li><span>{t.contact.github}</span><a href={contact.github}>github.com/ThanhhBinh</a></li>
        <li><span>{t.contact.location}</span>{pick(contact.location)}</li>
      </Reveal>
    </section>
  )
}
