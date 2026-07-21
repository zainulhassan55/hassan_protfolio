import type {
  AboutContent,
  Conference,
  ContactContent,
  Highlight,
  PortfolioData,
  Project,
  ResearchItem,
  SiteSettings,
  SkillGroup,
  TimelineItem,
} from '../types/portfolio'

export type {
  AboutContent,
  Conference,
  ContactContent,
  Highlight,
  PortfolioData,
  Project,
  ResearchItem,
  SiteSettings,
  SkillGroup,
  TimelineItem,
} from '../types/portfolio'

export const site: SiteSettings = {
  name: 'Zain Ul Hassan',
  shortName: 'ZUH',
  headline: 'CS Researcher in AI, Cybersecurity & Healthcare',
  tagline:
    'Computer Science graduate student and Research Assistant building secure intelligent systems for real-world healthcare and cyber defense challenges.',
  location: 'Asia University, Taiwan',
  role: 'MERN Developer · Research Assistant · CCRI',
  ccriUrl: 'https://aicybersecuritycenter.com',
  portrait: '/images/zh-portrait.jpg',
  portraitFallback: '/images/zh.png',
}

export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#work' },
  { label: 'Research', href: '#research' },
  { label: 'Conferences', href: '#conferences' },
  { label: 'Contact', href: '#contact' },
]

export const about: AboutContent = {
  lead: 'I build full-stack systems and research secure AI for cybersecurity and healthcare applications.',
  body: 'After completing my BS in Computer Science at Islamia College University Peshawar, I spent over a year and a half as a MERN Stack Developer at K2X TECH. I am now pursuing a Master’s in Computer Science and Information Engineering at Asia University, Taiwan, and serving as a Research Assistant at the International Center for AI and Cyber Security Research and Innovations (CCRI).',
}

export const highlights: Highlight[] = [
  {
    id: 'h1',
    title: 'Academic Path',
    detail: 'BS Computer Science · MS CSIE at Asia University',
    icon: 'cap',
  },
  {
    id: 'h2',
    title: 'Research Interests',
    detail: 'AI, cybersecurity, and healthcare technology',
    icon: 'lab',
  },
  {
    id: 'h3',
    title: 'Industry Projects',
    detail: 'MERN production systems built at K2X TECH',
    icon: 'bulb',
  },
]

export const timeline: TimelineItem[] = [
  {
    id: 't1',
    period: '2025 — Present',
    title: 'Research Assistant',
    org: 'CCRI, Asia University',
    detail:
      'International Center for AI and Cyber Security Research and Innovations — contributing to ongoing AI & cybersecurity research.',
  },
  {
    id: 't2',
    period: '2025 — Present',
    title: 'MS, CSIE',
    org: 'Asia University, Taiwan',
    detail:
      'Master’s in Computer Science and Information Engineering — research-focused graduate study.',
  },
  {
    id: 't3',
    period: 'Jan 2024 — Aug 2025',
    title: 'MERN Stack Developer',
    org: 'K2X TECH, Peshawar',
    detail:
      'Built and shipped production web applications across the MongoDB, Express, React, and Node stack.',
  },
  {
    id: 't4',
    period: 'Before 2024',
    title: 'BS, Computer Science',
    org: 'Islamia College University Peshawar',
    detail: 'Bachelor of Science in Computer Science — foundational CS and software engineering.',
  },
]

export const projects: Project[] = [
  {
    id: 'p1',
    title: 'Commerce Desk',
    role: 'Full-stack Developer',
    stack: ['React', 'Node.js', 'MongoDB', 'Express'],
    blurb:
      'Admin-facing dashboard for inventory, orders, and reporting — built for a regional retail client at K2X TECH.',
    year: '2025',
  },
  {
    id: 'p2',
    title: 'CampusConnect',
    role: 'Lead Frontend',
    stack: ['React', 'TypeScript', 'REST', 'Tailwind'],
    blurb:
      'Student engagement platform with auth, role-based views, and real-time notification hooks.',
    year: '2024',
  },
  {
    id: 'p3',
    title: 'Pulse Analytics',
    role: 'MERN Developer',
    stack: ['Node.js', 'Express', 'Charting', 'MongoDB'],
    blurb:
      'API-driven analytics service with scheduled jobs and exportable performance reports.',
    year: '2024',
  },
  {
    id: 'p4',
    title: 'HireFlow CRM',
    role: 'Full-stack Developer',
    stack: ['React', 'Node.js', 'JWT', 'MongoDB'],
    blurb:
      'Lightweight recruiting CRM for pipeline tracking, candidate notes, and interview scheduling.',
    year: '2024',
  },
]

export const research: ResearchItem[] = [
  {
    id: 'r1',
    title: 'Adversarial Robustness in Lightweight Vision Models',
    status: 'In progress',
    venue: 'CCRI · AI & Cybersecurity',
    blurb:
      'Efficient defense strategies for edge-deployable CNN architectures under common adversarial attack settings.',
  },
  {
    id: 'r2',
    title: 'Threat Signal Correlation for IoT Telemetry',
    status: 'Manuscript in prep',
    venue: 'CCRI · Cybersecurity',
    blurb:
      'Pipeline design for correlating anomalous device signals with known cybersecurity threat patterns.',
  },
  {
    id: 'r3',
    title: 'Privacy-Preserving AI for Healthcare Data',
    status: 'Early exploration',
    venue: 'Healthcare AI track',
    blurb:
      'Exploring secure learning approaches that protect sensitive clinical data while supporting useful model training.',
  },
]

export const conferences: Conference[] = [
  {
    id: 'c1',
    title: 'Trustworthy AI for Cyber Defense',
    event: 'Asia Pacific AI Symposium',
    role: 'Presenter',
    location: 'Taipei, Taiwan',
    date: 'Nov 2025',
    year: '2025',
  },
  {
    id: 'c2',
    title: 'Workshop on Edge Security',
    event: 'IEEE Region 10 Cyber Forum',
    role: 'Attendee',
    location: 'Taichung, Taiwan',
    date: 'Sep 2025',
    year: '2025',
  },
  {
    id: 'c3',
    title: 'AI Applications in Digital Health',
    event: 'Healthcare Informatics Forum',
    role: 'Attendee',
    location: 'Taichung, Taiwan',
    date: 'Jun 2025',
    year: '2025',
  },
  {
    id: 'c4',
    title: 'MERN Patterns for Production Systems',
    event: 'DevFest Peshawar',
    role: 'Speaker',
    location: 'Peshawar, Pakistan',
    date: 'Mar 2025',
    year: '2025',
  },
]

export const skillGroups: SkillGroup[] = [
  {
    id: 's1',
    label: 'Engineering',
    items: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Express', 'MongoDB', 'REST APIs'],
  },
  {
    id: 's2',
    label: 'Research Domains',
    items: [
      'Artificial Intelligence',
      'Cybersecurity',
      'Healthcare Technology',
      'Secure ML',
      'Technical writing',
    ],
  },
  {
    id: 's3',
    label: 'Practice',
    items: [
      'Full-stack delivery',
      'Git & collaboration',
      'API design',
      'Experiment design',
      'Research communication',
    ],
  },
]

export const contact: ContactContent = {
  email: 'zain@example.com',
  note: 'Open to research collaboration, speaking, and engineering work across AI, cybersecurity, and healthcare technology.',
  socials: [
    { label: 'CCRI', href: 'https://aicybersecuritycenter.com' },
    { label: 'LinkedIn', href: 'https://linkedin.com' },
    { label: 'GitHub', href: 'https://github.com' },
  ],
  linkedIn: 'https://linkedin.com',
}

export function getLocalPortfolio(): PortfolioData {
  return {
    site,
    about,
    contact,
    highlights,
    timeline,
    projects,
    research,
    conferences,
    skillGroups,
    navLinks,
    source: 'local',
  }
}
