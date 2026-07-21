import { usePortfolio } from '../context/PortfolioContext'
import { useReveal } from '../hooks/useReveal'

export function Skills() {
  const { data } = usePortfolio()
  const { skillGroups } = data
  const titleRef = useReveal<HTMLHeadingElement>()
  const gridRef = useReveal<HTMLDivElement>()

  return (
    <section id="skills" className="section-pad bg-[var(--color-surface)]">
      <div className="container-wide">
        <p className="section-label">Capabilities</p>
        <h2 ref={titleRef} className="reveal section-title">
          Skills
        </h2>

        <div ref={gridRef} className="reveal reveal-delay-1 mt-11 grid gap-6 md:grid-cols-3 md:gap-5">
          {skillGroups.map((group) => (
            <div
              key={group.id}
              className="rounded-lg border border-[var(--color-line)] bg-[var(--color-bg)] p-5"
            >
              <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-accent)]">
                {group.label}
              </h3>
              <ul className="mt-3">
                {group.items.map((item) => (
                  <li key={item} className="skill-item text-[0.95rem]">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
