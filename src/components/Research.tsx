import { research, site } from '../data/content'
import { useReveal } from '../hooks/useReveal'

export function Research() {
  const titleRef = useReveal<HTMLHeadingElement>()
  const listRef = useReveal<HTMLUListElement>()

  return (
    <section id="research" className="section-pad bg-[var(--color-surface)]">
      <div className="container-wide">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="section-label">Academic Work</p>
            <h2 ref={titleRef} className="reveal section-title">
              Research
            </h2>
            <p className="section-intro">
              Ongoing work as a Research Assistant at CCRI, focused on AI and cybersecurity.
            </p>
          </div>
          <a
            href={site.ccriUrl}
            target="_blank"
            rel="noreferrer"
            className="link-accent shrink-0 text-sm"
          >
            aicybersecuritycenter.com ↗
          </a>
        </div>

        <ul ref={listRef} className="reveal reveal-delay-1 mt-11 border-t border-[var(--color-line)]">
          {research.map((item) => (
            <li
              key={item.id}
              className="grid gap-3 border-b border-[var(--color-line)] py-7 md:grid-cols-[11rem_1fr] md:gap-10"
            >
              <span className="text-sm font-semibold tracking-wide text-[var(--color-accent)]">
                {item.status}
              </span>
              <div>
                <h3 className="text-[1.15rem] text-balance md:text-[1.25rem]">{item.title}</h3>
                {item.venue && (
                  <p className="mt-1.5 text-sm text-[var(--color-text-faint)]">{item.venue}</p>
                )}
                <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--color-text-soft)]">
                  {item.blurb}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
