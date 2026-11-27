import { contact, primaryContactHref } from '../../content'
import { useLanguage } from '../../i18n/useLanguage'
import { cvHref } from '../../lib/cv'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

export function Contact() {
  const { t, pick, lang } = useLanguage()
  return (
    <section id="contact" className="section contact" data-shape="dots" aria-labelledby="contact-title">
      <SectionHeading index="08" title={t.section.contact} id="contact-title" file="contact.sh" />
      <Reveal as="p" className="contact-lead">{t.contact.lead}</Reveal>
      <Reveal index={1}>
        <div className="contact-actions">
          <a className="btn btn-primary btn-lg" href={primaryContactHref(contact)}>{t.contact.sendEmail} →</a>
          <a className="btn btn-ghost btn-lg" href={cvHref(lang)} download>{t.hero.downloadCv}</a>
        </div>
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
