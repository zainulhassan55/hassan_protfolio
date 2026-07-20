import { conferences } from '../data/content'
import { useReveal } from '../hooks/useReveal'

export function Conferences() {
  const titleRef = useReveal<HTMLHeadingElement>()
  const tableRef = useReveal<HTMLDivElement>()

  return (
    <section id="conferences" className="section-pad bg-[var(--color-bg)]">
      <div className="container-wide">
        <p className="section-label">Events</p>
        <h2 ref={titleRef} className="reveal section-title">
          Conferences
        </h2>
        <p className="section-intro">
          Talks, posters, and academic events — placeholder entries until your live record is ready.
        </p>

        <div ref={tableRef} className="reveal reveal-delay-1 mt-11 overflow-x-auto">
          <table className="w-full min-w-[40rem] border-collapse text-left">
            <thead>
              <tr className="border-b border-[var(--color-line-strong)] text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-[var(--color-text-faint)]">
                <th className="pb-3 pr-4 font-semibold">Year</th>
                <th className="pb-3 pr-4 font-semibold">Event</th>
                <th className="pb-3 pr-4 font-semibold">Role</th>
                <th className="pb-3 font-semibold">Location</th>
              </tr>
            </thead>
            <tbody>
              {conferences.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-[var(--color-line)] transition-colors hover:bg-white/[0.02]"
                >
                  <td className="py-5 pr-4 align-top text-sm font-semibold text-[var(--color-heading)]">
                    {item.year}
                  </td>
                  <td className="py-5 pr-4 align-top">
                    <p className="font-semibold tracking-tight text-[var(--color-heading)]">
                      {item.event}
                    </p>
                    <p className="mt-1 text-sm text-[var(--color-text-soft)]">{item.title}</p>
                  </td>
                  <td className="py-5 pr-4 align-top text-sm font-medium text-[var(--color-accent)]">
                    {item.role}
                  </td>
                  <td className="py-5 align-top text-sm text-[var(--color-text-soft)]">
                    {item.location}
                    <span className="mt-0.5 block text-[var(--color-text-faint)]">{item.date}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
