import { site } from '../data/content'
import { Portrait } from './Portrait'

export function Hero() {
  return (
    <section id="top" className="hero-panel border-b border-[var(--color-line)]">
      <div className="container-wide grid items-center gap-10 px-[clamp(1.25rem,4vw,2.75rem)] pb-16 pt-28 md:grid-cols-[1.08fr_0.92fr] md:gap-12 md:pb-20 md:pt-32 lg:gap-16">
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

          <div
            className="animate-fade-up mt-9 flex flex-wrap gap-3"
            style={{ animationDelay: '0.28s' }}
          >
            <a href="#work" className="btn-primary">
              View Projects
            </a>
            <a href="#contact" className="btn-secondary">
              Contact Me
            </a>
          </div>

          <p
            className="animate-fade-up mt-8 text-sm tracking-wide text-[var(--color-text-faint)]"
            style={{ animationDelay: '0.34s' }}
          >
            Based at {site.location}
          </p>
        </div>

        <div
          className="animate-fade-up order-1 flex justify-center md:order-2 md:justify-end"
          style={{ animationDelay: '0.12s' }}
        >
          <div className="w-[min(72vw,19.5rem)] sm:w-[21.5rem] lg:w-[23.5rem]">
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
