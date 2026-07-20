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

export type Conference = {
  id: string
  title: string
  event: string
  role: 'Speaker' | 'Presenter' | 'Attendee' | 'Poster'
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

export const site = {
  name: 'Zain Ul Hassan',
  shortName: 'ZUH',
  headline: 'Software Engineer & Research Assistant',
  tagline:
    'Building reliable full-stack web systems and contributing to AI and cybersecurity research at Asia University, Taiwan.',
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

export const about = {
  lead: 'I design and build full-stack web applications, then bring that engineering rigor into AI and cybersecurity research.',
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
    detail: 'AI, cybersecurity, and secure intelligent systems',
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
    venue: 'CCRI research track',
    blurb:
      'Exploring efficient defense strategies for edge-deployable CNN architectures under common attack settings.',
  },
  {
    id: 'r2',
    title: 'Threat Signal Correlation for IoT Telemetry',
    status: 'Manuscript in prep',
    venue: 'Working paper',
    blurb:
      'Pipeline design for correlating anomalous device signals with known cybersecurity threat patterns.',
  },
  {
    id: 'r3',
    title: 'Secure Federated Learning for Campus Networks',
    status: 'Early exploration',
    blurb:
      'Privacy-preserving model training across institutional nodes without centralizing raw traffic data.',
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
    note: 'Dummy entry — replace with real talks and papers.',
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
    title: 'MERN Patterns for Production Systems',
    event: 'DevFest Peshawar',
    role: 'Speaker',
    location: 'Peshawar, Pakistan',
    date: 'Mar 2025',
    year: '2025',
    note: 'Industry talk drawn from shipping work at K2X TECH.',
  },
  {
    id: 'c4',
    title: 'Poster: Telemetry Anomaly Scoring',
    event: 'National Computing Colloquium',
    role: 'Poster',
    location: 'Islamabad, Pakistan',
    date: 'Dec 2024',
    year: '2024',
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
    label: 'Research',
    items: ['AI / ML foundations', 'Cybersecurity concepts', 'Technical writing', 'Experiment design'],
  },
  {
    id: 's3',
    label: 'Practice',
    items: ['Agile delivery', 'Git', 'API design', 'UI implementation', 'Debugging & profiling'],
  },
]

export const contact = {
  email: 'zain@example.com',
  note: 'Feel free to contact me for collaboration, research, or questions.',
  socials: [
    { label: 'CCRI', href: 'https://aicybersecuritycenter.com' },
    { label: 'LinkedIn', href: 'https://linkedin.com' },
    { label: 'GitHub', href: 'https://github.com' },
  ],
  linkedIn: 'https://linkedin.com',
}
