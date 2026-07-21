import { usePortfolio } from '../context/PortfolioContext'

export function Footer() {
  const { data } = usePortfolio()
  const { site } = data
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-[var(--color-line)] bg-[var(--color-bg)] px-[clamp(1.25rem,4vw,2.75rem)] py-7">
      <div className="container-wide flex flex-col gap-3 text-sm text-[var(--color-text-faint)] sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {site.name}
        </p>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <a href="#about" className="btn btn-ghost">
            About
          </a>
          <a href="#work" className="btn btn-ghost">
            Projects
          </a>
          <a href="#contact" className="btn btn-ghost">
            Contact
          </a>
          <span className="tracking-wide text-[var(--color-text-faint)]">
            Asia University · CCRI · Taiwan
          </span>
        </div>
      </div>
    </footer>
  )
}
