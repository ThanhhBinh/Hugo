import { projects, type Project } from '../../content'
import { useLanguage } from '../../i18n/useLanguage'
import { Chip } from '../ui/Chip'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { t, pick } = useLanguage()
  return (
    <Reveal as="article" index={index} className={`card project ${project.group}`}>
      <header>
        <h4>{project.name}</h4>
        <span className="role">{pick(project.role)}</span>
      </header>
      <dl>
        <div>
          <dt>{t.labels.problem}</dt>
          <dd>{pick(project.problem)}</dd>
        </div>
        <div>
          <dt>{t.labels.solution}</dt>
          <dd>{pick(project.solution)}</dd>
        </div>
      </dl>
      <div className="chips">
        {project.stack.map((s) => (
          <Chip key={s}>{s}</Chip>
        ))}
      </div>
    </Reveal>
  )
}

export function Projects() {
  const { t } = useLanguage()
  const work = projects.filter((p) => p.group === 'work')
  const school = projects.filter((p) => p.group === 'school')
  return (
    <section id="projects" className="section" data-shape="h" aria-labelledby="projects-title">
      <SectionHeading index="03" title={t.section.projects} id="projects-title" />
      <h3 className="sub-title">{t.section.projectsWork}</h3>
      <div className="card-grid">
        {work.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} />
        ))}
      </div>
      <h3 className="sub-title">{t.section.projectsSchool}</h3>
      <div className="card-grid compact">
        {school.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} />
        ))}
      </div>
    </section>
  )
}
