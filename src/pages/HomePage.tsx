import { About } from '../components/About'
import { Conferences } from '../components/Conferences'
import { Contact } from '../components/Contact'
import { Footer } from '../components/Footer'
import { Hero } from '../components/Hero'
import { Navbar } from '../components/Navbar'
import { Research } from '../components/Research'
import { ScrollToTop } from '../components/ScrollToTop'
import { Skills } from '../components/Skills'
import { Work } from '../components/Work'

export function HomePage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Work />
        <Research />
        <Conferences />
        <Skills />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  )
}
