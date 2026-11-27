import { toolbox } from '../../content'
import { useLanguage } from '../../i18n/useLanguage'
import { Chip } from '../ui/Chip'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

export function Toolbox() {
  const { t, pick } = useLanguage()
  return (
    <section id="toolbox" className="section" data-shape="h" aria-labelledby="toolbox-title">
      <SectionHeading index="04" title={t.section.toolbox} id="toolbox-title" />
      <div className="tool-groups">
        {toolbox.map((group, i) => (
          <Reveal key={group.id} index={i} className="tool-group">
            <h3>{pick(group.label)}</h3>
            <div className="chips">
              {group.items.map((item) => (
                <Chip key={item}>{item}</Chip>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
