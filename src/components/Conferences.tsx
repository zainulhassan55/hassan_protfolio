import { usePortfolio } from '../context/PortfolioContext'
import { useReveal } from '../hooks/useReveal'

export function Conferences() {
  const { data } = usePortfolio()
  const { conferences } = data
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
          Talks, workshops, and academic events related to AI, cybersecurity, and digital health.
        </p>

        <div ref={tableRef} className="reveal reveal-delay-1 mt-11 overflow-x-auto rounded-lg border border-[var(--color-line)]">
          <table className="w-full min-w-[40rem] border-collapse text-left">
            <thead>
              <tr className="border-b border-[var(--color-line)] bg-white/[0.02] text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-[var(--color-text-faint)]">
                <th className="px-4 py-3.5 font-semibold sm:px-5">Year</th>
                <th className="px-4 py-3.5 font-semibold sm:px-5">Event</th>
                <th className="px-4 py-3.5 font-semibold sm:px-5">Role</th>
                <th className="px-4 py-3.5 font-semibold sm:px-5">Location</th>
              </tr>
            </thead>
            <tbody>
              {conferences.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-[var(--color-line)] transition-colors last:border-b-0 hover:bg-white/[0.025]"
                >
                  <td className="px-4 py-5 align-top text-sm font-semibold text-[var(--color-heading)] sm:px-5">
                    {item.year}
                  </td>
                  <td className="px-4 py-5 align-top sm:px-5">
                    <p className="font-semibold tracking-tight text-[var(--color-heading)]">
                      {item.event}
                    </p>
                    <p className="mt-1 text-sm text-[var(--color-text-soft)]">{item.title}</p>
                  </td>
                  <td className="px-4 py-5 align-top sm:px-5">
                    <span className="status-pill">{item.role}</span>
                  </td>
                  <td className="px-4 py-5 align-top text-sm text-[var(--color-text-soft)] sm:px-5">
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
