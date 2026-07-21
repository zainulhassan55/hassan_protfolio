export type TimelineItem = {
  id: string
  period: string
  title: string
  org: string
  detail: string
}

export type Project = {
  id: string
  title: string
  role: string
  stack: string[]
  blurb: string
  year: string
  href?: string
}

export type ResearchItem = {
  id: string
  title: string
  status: string
  venue?: string
  blurb: string
}

export type ConferenceRole = 'Speaker' | 'Presenter' | 'Attendee' | 'Poster'

export type Conference = {
  id: string
  title: string
  event: string
  role: ConferenceRole
  location: string
  date: string
  year: string
  url?: string
  note?: string
}

export type SkillGroup = {
  id: string
  label: string
  items: string[]
}

export type Highlight = {
  id: string
  title: string
  detail: string
  icon: 'cap' | 'lab' | 'bulb'
}

export type SiteSettings = {
  name: string
  shortName: string
  headline: string
  tagline: string
  location: string
  role: string
  ccriUrl: string
  portrait: string
  portraitFallback: string
}

export type AboutContent = {
  lead: string
  body: string
}

export type ContactContent = {
  email: string
  note: string
  socials: { label: string; href: string }[]
  linkedIn: string
}

export type NavLink = {
  label: string
  href: string
}

export type PortfolioData = {
  site: SiteSettings
  about: AboutContent
  contact: ContactContent
  highlights: Highlight[]
  timeline: TimelineItem[]
  projects: Project[]
  research: ResearchItem[]
  conferences: Conference[]
  skillGroups: SkillGroup[]
  navLinks: NavLink[]
  source: 'supabase' | 'local'
}
