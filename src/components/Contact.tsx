import { contact } from '../data/content'
import { useReveal } from '../hooks/useReveal'

export function Contact() {
  const blockRef = useReveal<HTMLDivElement>()

  return (
    <section id="contact" className="section-pad bg-[var(--color-elevated)]">
      <div className="container-wide">
        <div
          ref={blockRef}
          className="reveal grid gap-10 md:grid-cols-[1.25fr_auto] md:items-center"
        >
          <div>
            <p className="section-label">Contact</p>
            <h2 className="section-title">Let’s work together</h2>
            <p className="section-intro">{contact.note}</p>
            <a
              href={`mailto:${contact.email}`}
              className="mt-5 inline-block text-lg font-medium tracking-tight text-[var(--color-heading)] underline decoration-white/20 underline-offset-4 transition-colors hover:decoration-[var(--color-accent)]"
            >
              {contact.email}
            </a>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={`mailto:${contact.email}`} className="btn-primary">
              Email Me
            </a>
            <a
              href={contact.linkedIn}
              target="_blank"
              rel="noreferrer"
              className="btn-secondary"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
