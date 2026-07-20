import { projects } from '../data/content'
import { useReveal } from '../hooks/useReveal'

export function Work() {
  const titleRef = useReveal<HTMLHeadingElement>()
  const listRef = useReveal<HTMLUListElement>()

  return (
    <section id="work" className="section-pad bg-[var(--color-bg)]">
      <div className="container-wide">
        <p className="section-label">Selected Work</p>
        <h2 ref={titleRef} className="reveal section-title">
          Projects
        </h2>
        <p className="section-intro">
          Production work delivered as a MERN stack developer at K2X TECH — sample case studies until
          live details are published.
        </p>

        <ul ref={listRef} className="reveal reveal-delay-1 mt-11 grid gap-4 sm:grid-cols-2">
          {projects.map((project) => (
            <li key={project.id} className="panel-card">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-[1.2rem] tracking-tight">{project.title}</h3>
                <span className="shrink-0 pt-1 text-sm text-[var(--color-text-faint)]">
                  {project.year}
                </span>
              </div>
              <p className="mt-1.5 text-sm font-semibold text-[var(--color-accent)]">
                {project.role}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-soft)]">
                {project.blurb}
              </p>
              <p className="mt-4 text-xs font-medium tracking-[0.04em] text-[var(--color-text-faint)]">
                {project.stack.join(' · ')}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
