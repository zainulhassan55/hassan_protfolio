import { skillGroups } from '../data/content'
import { useReveal } from '../hooks/useReveal'

export function Skills() {
  const titleRef = useReveal<HTMLHeadingElement>()
  const gridRef = useReveal<HTMLDivElement>()

  return (
    <section id="skills" className="section-pad bg-[var(--color-surface)]">
      <div className="container-wide">
        <p className="section-label">Capabilities</p>
        <h2 ref={titleRef} className="reveal section-title">
          Skills
        </h2>

        <div ref={gridRef} className="reveal reveal-delay-1 mt-11 grid gap-8 md:grid-cols-3 md:gap-10">
          {skillGroups.map((group) => (
            <div key={group.id} className="border-t border-[var(--color-accent)]/70 pt-5">
              <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-heading)]">
                {group.label}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {group.items.map((item) => (
                  <li key={item} className="text-[0.95rem] text-[var(--color-text-soft)]">
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
