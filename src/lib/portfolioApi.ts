import { ADMIN_EMAIL, MEDIA_BUCKET } from './constants'
import { getLocalPortfolio } from '../data/content'
import { isSupabaseConfigured, supabase } from './supabase'
import type {
  Conference,
  ConferenceRole,
  Highlight,
  PortfolioData,
  Project,
  ResearchItem,
  SkillGroup,
  TimelineItem,
} from '../types/portfolio'

type SiteSettingsRow = {
  id: number
  name: string
  short_name: string
  headline: string
  tagline: string
  location: string
  role: string
  ccri_url: string | null
  portrait_url: string | null
  portrait_fallback: string | null
  about_lead: string
  about_body: string
  contact_email: string
  contact_note: string
  linkedin_url: string | null
  github_url: string | null
}

type TimelineRow = {
  id: string
  period: string
  title: string
  org: string
  detail: string
  sort_order: number
}

type ProjectRow = {
  id: string
  title: string
  role: string
  blurb: string
  year: string
  stack: string[] | null
  href: string | null
  sort_order: number
}

type ResearchRow = {
  id: string
  title: string
  status: string
  venue: string | null
  blurb: string
  sort_order: number
}

type ConferenceRow = {
  id: string
  title: string
  event: string
  role: string
  location: string
  date: string
  year: string
  url: string | null
  note: string | null
  sort_order: number
}

type SkillGroupRow = {
  id: string
  label: string
  items: string[] | null
  sort_order: number
}

type HighlightRow = {
  id: string
  title: string
  detail: string
  icon: string
  sort_order: number
}

function mapPortfolio(
  settings: SiteSettingsRow,
  timeline: TimelineRow[],
  projects: ProjectRow[],
  research: ResearchRow[],
  conferences: ConferenceRow[],
  skillGroups: SkillGroupRow[],
  highlights: HighlightRow[],
): PortfolioData {
  const ccriUrl = settings.ccri_url || 'https://aicybersecuritycenter.com'
  const linkedIn = settings.linkedin_url || 'https://linkedin.com'
  const github = settings.github_url || 'https://github.com'

  return {
    site: {
      name: settings.name,
      shortName: settings.short_name,
      headline: settings.headline,
      tagline: settings.tagline,
      location: settings.location,
      role: settings.role,
      ccriUrl,
      portrait: settings.portrait_url || '/images/zh-portrait.jpg',
      portraitFallback: settings.portrait_fallback || '/images/zh.png',
    },
    about: {
      lead: settings.about_lead,
      body: settings.about_body,
    },
    contact: {
      email: settings.contact_email,
      note: settings.contact_note,
      linkedIn,
      socials: [
        { label: 'CCRI', href: ccriUrl },
        { label: 'LinkedIn', href: linkedIn },
        { label: 'GitHub', href: github },
      ],
    },
    timeline: timeline.map(
      (row): TimelineItem => ({
        id: row.id,
        period: row.period,
        title: row.title,
        org: row.org,
        detail: row.detail,
      }),
    ),
    projects: projects.map(
      (row): Project => ({
        id: row.id,
        title: row.title,
        role: row.role,
        blurb: row.blurb,
        year: row.year,
        stack: row.stack ?? [],
        href: row.href ?? undefined,
      }),
    ),
    research: research.map(
      (row): ResearchItem => ({
        id: row.id,
        title: row.title,
        status: row.status,
        venue: row.venue ?? undefined,
        blurb: row.blurb,
      }),
    ),
    conferences: conferences.map(
      (row): Conference => ({
        id: row.id,
        title: row.title,
        event: row.event,
        role: row.role as ConferenceRole,
        location: row.location,
        date: row.date,
        year: row.year,
        url: row.url ?? undefined,
        note: row.note ?? undefined,
      }),
    ),
    skillGroups: skillGroups.map(
      (row): SkillGroup => ({
        id: row.id,
        label: row.label,
        items: row.items ?? [],
      }),
    ),
    highlights: highlights.map(
      (row): Highlight => ({
        id: row.id,
        title: row.title,
        detail: row.detail,
        icon: (row.icon as Highlight['icon']) || 'cap',
      }),
    ),
    navLinks: getLocalPortfolio().navLinks,
    source: 'supabase',
  }
}

export async function fetchPortfolio(): Promise<PortfolioData> {
  const fallback = getLocalPortfolio()

  if (!isSupabaseConfigured || !supabase) {
    return fallback
  }

  try {
    const [
      settingsRes,
      timelineRes,
      projectsRes,
      researchRes,
      conferencesRes,
      skillsRes,
      highlightsRes,
    ] = await Promise.all([
      supabase.from('site_settings').select('*').eq('id', 1).maybeSingle(),
      supabase.from('timeline_items').select('*').order('sort_order', { ascending: true }),
      supabase.from('projects').select('*').order('sort_order', { ascending: true }),
      supabase.from('research_items').select('*').order('sort_order', { ascending: true }),
      supabase.from('conferences').select('*').order('sort_order', { ascending: true }),
      supabase.from('skill_groups').select('*').order('sort_order', { ascending: true }),
      supabase.from('highlights').select('*').order('sort_order', { ascending: true }),
    ])

    if (settingsRes.error || !settingsRes.data) {
      console.warn('Supabase portfolio unavailable, using local content.', settingsRes.error)
      return fallback
    }

    const errors = [
      timelineRes.error,
      projectsRes.error,
      researchRes.error,
      conferencesRes.error,
      skillsRes.error,
      highlightsRes.error,
    ].filter(Boolean)

    if (errors.length) {
      console.warn('Supabase portfolio partial error, using local content.', errors)
      return fallback
    }

    return mapPortfolio(
      settingsRes.data as SiteSettingsRow,
      (timelineRes.data ?? []) as TimelineRow[],
      (projectsRes.data ?? []) as ProjectRow[],
      (researchRes.data ?? []) as ResearchRow[],
      (conferencesRes.data ?? []) as ConferenceRow[],
      (skillsRes.data ?? []) as SkillGroupRow[],
      (highlightsRes.data ?? []) as HighlightRow[],
    )
  } catch (error) {
    console.warn('Supabase portfolio fetch failed, using local content.', error)
    return fallback
  }
}

export type SiteSettingsInput = {
  name: string
  short_name: string
  headline: string
  tagline: string
  location: string
  role: string
  ccri_url: string
  portrait_url: string
  portrait_fallback: string
  about_lead: string
  about_body: string
  contact_email: string
  contact_note: string
  linkedin_url: string
  github_url: string
}

export async function updateSiteSettings(input: SiteSettingsInput) {
  if (!supabase) throw new Error('Supabase is not configured')
  const { error } = await supabase.from('site_settings').upsert({ id: 1, ...input })
  if (error) throw error
}

async function saveRow(table: string, item: Record<string, unknown> & { id?: string }) {
  if (!supabase) throw new Error('Supabase is not configured')
  if (item.id) {
    const { error } = await supabase.from(table).upsert(item)
    if (error) throw error
    return
  }
  const { id: _unused, ...rest } = item
  void _unused
  const { error } = await supabase.from(table).insert(rest)
  if (error) throw error
}

export async function upsertTimelineItem(
  item: Omit<TimelineItem, 'id'> & { id?: string; sort_order: number },
) {
  await saveRow('timeline_items', item)
}

export async function deleteTimelineItem(id: string) {
  if (!supabase) throw new Error('Supabase is not configured')
  const { error } = await supabase.from('timeline_items').delete().eq('id', id)
  if (error) throw error
}

export async function upsertProject(
  item: Omit<Project, 'id' | 'href'> & { id?: string; href?: string; sort_order: number },
) {
  await saveRow('projects', item)
}

export async function deleteProject(id: string) {
  if (!supabase) throw new Error('Supabase is not configured')
  const { error } = await supabase.from('projects').delete().eq('id', id)
  if (error) throw error
}

export async function upsertResearchItem(
  item: Omit<ResearchItem, 'id' | 'venue'> & {
    id?: string
    venue?: string
    sort_order: number
  },
) {
  await saveRow('research_items', item)
}

export async function deleteResearchItem(id: string) {
  if (!supabase) throw new Error('Supabase is not configured')
  const { error } = await supabase.from('research_items').delete().eq('id', id)
  if (error) throw error
}

export async function upsertConference(
  item: Omit<Conference, 'id' | 'url' | 'note'> & {
    id?: string
    url?: string
    note?: string
    sort_order: number
  },
) {
  await saveRow('conferences', item)
}

export async function deleteConference(id: string) {
  if (!supabase) throw new Error('Supabase is not configured')
  const { error } = await supabase.from('conferences').delete().eq('id', id)
  if (error) throw error
}

export async function upsertSkillGroup(
  item: Omit<SkillGroup, 'id'> & { id?: string; sort_order: number },
) {
  await saveRow('skill_groups', item)
}

export async function deleteSkillGroup(id: string) {
  if (!supabase) throw new Error('Supabase is not configured')
  const { error } = await supabase.from('skill_groups').delete().eq('id', id)
  if (error) throw error
}

export async function upsertHighlight(
  item: Omit<Highlight, 'id'> & { id?: string; sort_order: number },
) {
  await saveRow('highlights', item)
}

export async function deleteHighlight(id: string) {
  if (!supabase) throw new Error('Supabase is not configured')
  const { error } = await supabase.from('highlights').delete().eq('id', id)
  if (error) throw error
}

export async function uploadPortrait(file: File): Promise<string> {
  if (!supabase) throw new Error('Supabase is not configured')

  const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg'
  const path = `portrait/profile.${ext}`

  const { error: uploadError } = await supabase.storage.from(MEDIA_BUCKET).upload(path, file, {
    upsert: true,
    contentType: file.type || 'image/jpeg',
  })
  if (uploadError) throw uploadError

  const { data } = supabase.storage.from(MEDIA_BUCKET).getPublicUrl(path)
  const publicUrl = `${data.publicUrl}?t=${Date.now()}`

  const { error: updateError } = await supabase
    .from('site_settings')
    .update({ portrait_url: publicUrl })
    .eq('id', 1)
  if (updateError) throw updateError

  return publicUrl
}

export function isAuthorizedAdminEmail(email: string | undefined | null): boolean {
  return (email ?? '').trim().toLowerCase() === ADMIN_EMAIL.toLowerCase()
}
