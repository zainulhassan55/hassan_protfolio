import { about, timeline } from '../data/content'
import { useReveal } from '../hooks/useReveal'

export function About() {
  const titleRef = useReveal<HTMLHeadingElement>()
  const bodyRef = useReveal<HTMLDivElement>()
  const listRef = useReveal<HTMLUListElement>()

  return (
    <section id="about" className="section-pad bg-[var(--color-surface)]">
      <div className="container-wide">
        <p className="section-label">Profile</p>
        <h2 ref={titleRef} className="reveal section-title">
          About
        </h2>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div ref={bodyRef} className="reveal reveal-delay-1 space-y-5">
            <p className="font-display text-[clamp(1.25rem,2.2vw,1.55rem)] leading-snug text-[var(--color-heading)] text-balance">
              {about.lead}
            </p>
            <p className="leading-relaxed text-[var(--color-text-soft)]">{about.body}</p>
          </div>

          <div>
            <h3 className="mb-1 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-text-faint)]">
              Experience & Education
            </h3>
            <ul ref={listRef} className="reveal reveal-delay-2 mt-4 border-t border-[var(--color-line)]">
              {timeline.map((item) => (
                <li
                  key={item.id}
                  className="grid gap-2 border-b border-[var(--color-line)] py-5 sm:grid-cols-[8.75rem_1fr] sm:gap-6"
                >
                  <span className="pt-0.5 text-sm font-semibold text-[var(--color-accent)]">
                    {item.period}
                  </span>
                  <div>
                    <p className="font-semibold tracking-tight text-[var(--color-heading)]">
                      {item.title}
                    </p>
                    <p className="mt-0.5 text-sm font-medium text-[var(--color-text-soft)]">
                      {item.org}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-faint)]">
                      {item.detail}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
