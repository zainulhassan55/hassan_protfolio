import { useEffect, useState } from 'react'
import { usePortfolio } from '../context/PortfolioContext'

export function Navbar() {
  const { data } = usePortfolio()
  const { site, navLinks } = data
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-200 ${
        scrolled || open
          ? 'border-b border-[var(--color-line)] bg-[rgba(16,16,18,0.92)] backdrop-blur-md'
          : 'bg-transparent'
      }`}
    >
      <nav className="container-wide flex items-center justify-between px-[clamp(1.25rem,4vw,2.75rem)] py-4">
        <a
          href="#top"
          className="font-display text-[1.05rem] font-semibold tracking-tight text-[var(--color-heading)] transition-opacity hover:opacity-80"
          onClick={() => setOpen(false)}
        >
          {site.shortName}
        </a>

        <ul className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a href={link.href} className="nav-link">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a href="#contact" className="btn btn-primary btn-sm hidden lg:inline-flex">
          Contact
        </a>

        <button
          type="button"
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-md border border-transparent transition-colors hover:border-[var(--color-line)] hover:bg-white/[0.03] lg:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={`block h-0.5 w-5 bg-[var(--color-heading)] transition-transform ${
              open ? 'translate-y-[4px] rotate-45' : ''
            }`}
          />
          <span
            className={`block h-0.5 w-5 bg-[var(--color-heading)] transition-opacity ${
              open ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block h-0.5 w-5 bg-[var(--color-heading)] transition-transform ${
              open ? '-translate-y-[4px] -rotate-45' : ''
            }`}
          />
        </button>
      </nav>

      {open && (
        <div className="border-t border-[var(--color-line)] bg-[var(--color-bg)] lg:hidden">
          <ul className="flex flex-col px-6 py-4">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="block border-b border-[var(--color-line)] py-3.5 text-base font-medium text-[var(--color-heading)] last:border-b-0"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-4">
              <a
                href="#contact"
                className="btn btn-primary w-full"
                onClick={() => setOpen(false)}
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
