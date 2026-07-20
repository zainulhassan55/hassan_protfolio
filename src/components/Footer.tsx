import { site } from '../data/content'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-[var(--color-line)] bg-[var(--color-bg)] px-[clamp(1.25rem,4vw,2.75rem)] py-7">
      <div className="container-wide flex flex-col gap-2 text-sm text-[var(--color-text-faint)] sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {site.name}
        </p>
        <p className="tracking-wide">Asia University · CCRI · Taiwan</p>
      </div>
    </footer>
  )
}
