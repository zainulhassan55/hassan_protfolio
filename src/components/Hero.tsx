import { usePortfolio } from '../context/PortfolioContext'
import { Portrait } from './Portrait'
import { HeroTechVisual } from './HeroTechVisual'

const domains = [
  { label: 'Artificial Intelligence', short: 'AI' },
  { label: 'Cybersecurity', short: 'Security' },
  { label: 'Healthcare Tech', short: 'Healthcare' },
]

export function Hero() {
  const { data } = usePortfolio()
  const { site } = data

  return (
    <section id="top" className="hero-panel relative overflow-hidden border-b border-[var(--color-line)]">
      <HeroTechVisual />

      <div className="container-wide relative z-10 grid items-center gap-10 px-[clamp(1.25rem,4vw,2.75rem)] pb-16 pt-28 md:grid-cols-[1.08fr_0.92fr] md:gap-12 md:pb-20 md:pt-32 lg:gap-16">
        <div className="order-2 md:order-1">
          <p
            className="animate-fade-up section-label"
            style={{ animationDelay: '0.05s' }}
          >
            {site.role}
          </p>

          <h1
            className="animate-fade-up mt-1 text-[clamp(2.5rem,5.4vw,4rem)] text-balance"
            style={{ animationDelay: '0.1s' }}
          >
            {site.name}
          </h1>

          <p
            className="animate-fade-up mt-4 text-[1.15rem] font-medium tracking-tight text-[var(--color-navy-mid)]"
            style={{ animationDelay: '0.16s' }}
          >
            {site.headline}
          </p>

          <p
            className="animate-fade-up mt-4 max-w-[32rem] text-[1.04rem] leading-relaxed text-[var(--color-text-soft)]"
            style={{ animationDelay: '0.22s' }}
          >
            {site.tagline}
          </p>

          <ul
            className="animate-fade-up mt-6 flex flex-wrap gap-2"
            style={{ animationDelay: '0.28s' }}
          >
            {domains.map((domain, index) => (
              <li
                key={domain.short}
                className="domain-chip"
                style={{ animationDelay: `${0.35 + index * 0.08}s` }}
              >
                <span className="domain-chip-dot" aria-hidden="true" />
                {domain.label}
              </li>
            ))}
          </ul>

          <div
            className="animate-fade-up mt-9 flex flex-wrap gap-3"
            style={{ animationDelay: '0.42s' }}
          >
            <a href="#work" className="btn btn-primary">
              View Projects
              <span aria-hidden="true">→</span>
            </a>
            <a href="#research" className="btn btn-secondary">
              View Research
            </a>
          </div>

          <p
            className="animate-fade-up mt-8 text-sm tracking-wide text-[var(--color-text-faint)]"
            style={{ animationDelay: '0.48s' }}
          >
            Based at {site.location}
          </p>
        </div>

        <div
          className="animate-fade-up order-1 relative flex justify-center md:order-2 md:justify-end"
          style={{ animationDelay: '0.12s' }}
        >
          <div className="portrait-orbit absolute inset-0 m-auto hidden h-[88%] w-[88%] max-w-[24rem] md:block" aria-hidden="true" />
          <div className="relative w-[min(72vw,19.5rem)] sm:w-[21.5rem] lg:w-[23.5rem]">
            <Portrait
              src={site.portrait}
              fallback={site.portraitFallback}
              alt={`${site.name} portrait`}
              name={site.name}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
