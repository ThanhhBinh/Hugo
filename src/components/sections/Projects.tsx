import { projects, type Project } from '../../content'
import { useLanguage } from '../../i18n/useLanguage'
import { Chip } from '../ui/Chip'
import { ProjectArt } from '../ui/ProjectArt'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

function Stack({ stack }: { stack: string[] }) {
  return (
    <div className="chips">
      {stack.map((s) => (
        <Chip key={s}>{s}</Chip>
      ))}
    </div>
  )
}

/** Big case-study card for the projects Hugo built at work. */
function CaseCard({ project, index }: { project: Project; index: number }) {
  const { t, pick } = useLanguage()
  return (
    <Reveal as="article" index={0} className={`card case${index % 2 ? ' flip' : ''}`}>
      {project.art !== 'none' && (
        <figure className="case-art">
          <ProjectArt kind={project.art} />
          <figcaption>{t.labels.illustration}</figcaption>
        </figure>
      )}
      <div className="case-body">
        <header>
          <h3>{project.name}</h3>
          <span className="role">{pick(project.role)}</span>
        </header>
        <dl>
          <div>
            <dt>{t.labels.problem}</dt>
            <dd>{pick(project.problem)}</dd>
          </div>
          <div>
            <dt>{t.labels.did}</dt>
            <dd>
              <ul className="did-list">
                {project.did && pick(project.did).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </dd>
          </div>
          {project.result && (
            <div>
              <dt>{t.labels.result}</dt>
              <dd>{pick(project.result)}</dd>
            </div>
          )}
        </dl>
        <Stack stack={project.stack} />
      </div>
    </Reveal>
  )
}

function SmallCard({ project, index }: { project: Project; index: number }) {
  const { t, pick } = useLanguage()
  return (
    <Reveal as="article" index={index} className="card project school">
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
      <Stack stack={project.stack} />
    </Reveal>
  )
}

export function Projects() {
  const { t } = useLanguage()
  const work = projects.filter((p) => p.group === 'work')
  const school = projects.filter((p) => p.group === 'school')
  return (
    <section id="projects" className="section" data-shape="dots" aria-labelledby="projects-title">
      <SectionHeading index="02" title={t.section.projects} id="projects-title" />
      <h3 className="sub-title">{t.section.projectsWork}</h3>
      <div className="case-list">
        {work.map((p, i) => (
          <CaseCard key={p.id} project={p} index={i} />
        ))}
      </div>
      <h3 className="sub-title">{t.section.projectsSchool}</h3>
      <div className="card-grid compact">
        {school.map((p, i) => (
          <SmallCard key={p.id} project={p} index={i} />
        ))}
      </div>
    </section>
  )
}
