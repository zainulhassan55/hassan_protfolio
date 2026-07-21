import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { usePortfolio } from '../../context/PortfolioContext'
import {
  deleteConference,
  deleteProject,
  deleteResearchItem,
  deleteSkillGroup,
  deleteTimelineItem,
  updateSiteSettings,
  uploadPortrait,
  upsertConference,
  upsertProject,
  upsertResearchItem,
  upsertSkillGroup,
  upsertTimelineItem,
  type SiteSettingsInput,
} from '../../lib/portfolioApi'
import type {
  Conference,
  ConferenceRole,
  Project,
  ResearchItem,
  SkillGroup,
  TimelineItem,
} from '../../types/portfolio'

type Tab =
  | 'settings'
  | 'portrait'
  | 'timeline'
  | 'projects'
  | 'research'
  | 'conferences'
  | 'skills'

const tabs: { id: Tab; label: string }[] = [
  { id: 'settings', label: 'Site' },
  { id: 'portrait', label: 'Portrait' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'projects', label: 'Projects' },
  { id: 'research', label: 'Research' },
  { id: 'conferences', label: 'Conferences' },
  { id: 'skills', label: 'Skills' },
]

const conferenceRoles: ConferenceRole[] = ['Speaker', 'Presenter', 'Attendee', 'Poster']

export function AdminDashboardPage() {
  const { user, signOut } = useAuth()
  const { data, refresh, loading } = usePortfolio()
  const [tab, setTab] = useState<Tab>('settings')
  const [busy, setBusy] = useState(false)
  const [notice, setNotice] = useState('')
  const [error, setError] = useState('')

  async function run(action: () => Promise<void>, success: string) {
    setBusy(true)
    setNotice('')
    setError('')
    try {
      await action()
      await refresh()
      setNotice(success)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
      <header className="border-b border-[var(--color-line)] bg-[var(--color-surface)]">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div>
            <p className="section-label">Portfolio CMS</p>
            <h1 className="font-display text-2xl text-[var(--color-heading)]">Admin</h1>
            <p className="mt-1 text-sm text-[var(--color-text-faint)]">{user?.email}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link to="/" className="btn btn-secondary btn-sm">
              View site
            </Link>
            <button type="button" className="btn btn-ghost btn-sm" onClick={() => void signOut()}>
              Sign out
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="mb-6 flex flex-wrap gap-2">
          {tabs.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`rounded-md border px-3 py-1.5 text-sm font-medium transition-colors ${
                tab === item.id
                  ? 'border-[var(--color-accent)] bg-[var(--color-accent)]/10 text-[var(--color-accent)]'
                  : 'border-[var(--color-line)] text-[var(--color-text-soft)] hover:border-[var(--color-line-strong)]'
              }`}
              onClick={() => setTab(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>

        <p className="mb-4 text-xs text-[var(--color-text-faint)]">
          Data source: {data.source}
          {loading ? ' · refreshing…' : ''}
        </p>

        {notice && <p className="mb-4 text-sm text-[var(--color-accent)]">{notice}</p>}
        {error && <p className="mb-4 text-sm text-red-300">{error}</p>}

        {tab === 'settings' && (
          <SettingsPanel
            busy={busy}
            data={data}
            onSave={(input) => run(() => updateSiteSettings(input), 'Site settings saved.')}
          />
        )}
        {tab === 'portrait' && (
          <PortraitPanel
            busy={busy}
            portrait={data.site.portrait}
            onUpload={(file) => run(() => uploadPortrait(file).then(() => undefined), 'Portrait updated.')}
          />
        )}
        {tab === 'timeline' && (
          <TimelinePanel
            busy={busy}
            items={data.timeline}
            onSave={(item, sort_order) =>
              run(() => upsertTimelineItem({ ...item, sort_order }), 'Timeline item saved.')
            }
            onDelete={(id) => run(() => deleteTimelineItem(id), 'Timeline item deleted.')}
          />
        )}
        {tab === 'projects' && (
          <ProjectsPanel
            busy={busy}
            items={data.projects}
            onSave={(item, sort_order) =>
              run(() => upsertProject({ ...item, sort_order }), 'Project saved.')
            }
            onDelete={(id) => run(() => deleteProject(id), 'Project deleted.')}
          />
        )}
        {tab === 'research' && (
          <ResearchPanel
            busy={busy}
            items={data.research}
            onSave={(item, sort_order) =>
              run(() => upsertResearchItem({ ...item, sort_order }), 'Research item saved.')
            }
            onDelete={(id) => run(() => deleteResearchItem(id), 'Research item deleted.')}
          />
        )}
        {tab === 'conferences' && (
          <ConferencesPanel
            busy={busy}
            items={data.conferences}
            onSave={(item, sort_order) =>
              run(() => upsertConference({ ...item, sort_order }), 'Conference saved.')
            }
            onDelete={(id) => run(() => deleteConference(id), 'Conference deleted.')}
          />
        )}
        {tab === 'skills' && (
          <SkillsPanel
            busy={busy}
            items={data.skillGroups}
            onSave={(item, sort_order) =>
              run(() => upsertSkillGroup({ ...item, sort_order }), 'Skill group saved.')
            }
            onDelete={(id) => run(() => deleteSkillGroup(id), 'Skill group deleted.')}
          />
        )}
      </div>
    </div>
  )
}

function SettingsPanel({
  data,
  busy,
  onSave,
}: {
  data: ReturnType<typeof usePortfolio>['data']
  busy: boolean
  onSave: (input: SiteSettingsInput) => void
}) {
  const [form, setForm] = useState<SiteSettingsInput>(() => toSettingsInput(data))

  useEffect(() => {
    setForm(toSettingsInput(data))
  }, [data])

  function onSubmit(event: FormEvent) {
    event.preventDefault()
    onSave(form)
  }

  return (
    <form onSubmit={onSubmit} className="admin-panel grid gap-4 md:grid-cols-2">
      {(
        [
          ['name', 'Name'],
          ['short_name', 'Short name'],
          ['role', 'Role line'],
          ['headline', 'Headline'],
          ['location', 'Location'],
          ['ccri_url', 'CCRI URL'],
          ['contact_email', 'Contact email'],
          ['linkedin_url', 'LinkedIn URL'],
          ['github_url', 'GitHub URL'],
          ['portrait_url', 'Portrait URL'],
          ['portrait_fallback', 'Portrait fallback'],
        ] as const
      ).map(([key, label]) => (
        <label key={key} className="block text-sm md:col-span-1">
          <span className="mb-1.5 block text-[var(--color-text-faint)]">{label}</span>
          <input
            className="admin-input"
            value={form[key]}
            onChange={(e) => setForm((prev) => ({ ...prev, [key]: e.target.value }))}
          />
        </label>
      ))}
      <label className="block text-sm md:col-span-2">
        <span className="mb-1.5 block text-[var(--color-text-faint)]">Tagline</span>
        <textarea
          className="admin-input min-h-24"
          value={form.tagline}
          onChange={(e) => setForm((prev) => ({ ...prev, tagline: e.target.value }))}
        />
      </label>
      <label className="block text-sm md:col-span-2">
        <span className="mb-1.5 block text-[var(--color-text-faint)]">About lead</span>
        <textarea
          className="admin-input min-h-20"
          value={form.about_lead}
          onChange={(e) => setForm((prev) => ({ ...prev, about_lead: e.target.value }))}
        />
      </label>
      <label className="block text-sm md:col-span-2">
        <span className="mb-1.5 block text-[var(--color-text-faint)]">About body</span>
        <textarea
          className="admin-input min-h-32"
          value={form.about_body}
          onChange={(e) => setForm((prev) => ({ ...prev, about_body: e.target.value }))}
        />
      </label>
      <label className="block text-sm md:col-span-2">
        <span className="mb-1.5 block text-[var(--color-text-faint)]">Contact note</span>
        <textarea
          className="admin-input min-h-20"
          value={form.contact_note}
          onChange={(e) => setForm((prev) => ({ ...prev, contact_note: e.target.value }))}
        />
      </label>
      <div className="md:col-span-2">
        <button type="submit" className="btn btn-primary" disabled={busy}>
          Save settings
        </button>
      </div>
    </form>
  )
}

function PortraitPanel({
  portrait,
  busy,
  onUpload,
}: {
  portrait: string
  busy: boolean
  onUpload: (file: File) => void
}) {
  return (
    <div className="admin-panel space-y-4">
      <img
        src={portrait}
        alt="Current portrait"
        className="h-48 w-48 rounded-lg object-cover object-top"
      />
      <label className="block text-sm">
        <span className="mb-1.5 block text-[var(--color-text-faint)]">Upload new portrait</span>
        <input
          type="file"
          accept="image/*"
          disabled={busy}
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) onUpload(file)
          }}
        />
      </label>
    </div>
  )
}

function TimelinePanel({
  items,
  busy,
  onSave,
  onDelete,
}: {
  items: TimelineItem[]
  busy: boolean
  onSave: (item: TimelineItem, sort_order: number) => void
  onDelete: (id: string) => void
}) {
  const blank: TimelineItem = { id: '', period: '', title: '', org: '', detail: '' }
  const [draft, setDraft] = useState<TimelineItem>(blank)
  const editing = Boolean(draft.id)

  return (
    <div className="space-y-6">
      <form
        className="admin-panel grid gap-3 md:grid-cols-2"
        onSubmit={(e) => {
          e.preventDefault()
          const sort_order = editing
            ? items.findIndex((item) => item.id === draft.id) + 1 || items.length + 1
            : items.length + 1
          onSave(draft, sort_order)
          setDraft(blank)
        }}
      >
        <h2 className="md:col-span-2 font-display text-xl text-[var(--color-heading)]">
          {editing ? 'Edit timeline item' : 'Add timeline item'}
        </h2>
        {(['period', 'title', 'org'] as const).map((key) => (
          <label key={key} className="block text-sm">
            <span className="mb-1.5 block capitalize text-[var(--color-text-faint)]">{key}</span>
            <input
              className="admin-input"
              required
              value={draft[key]}
              onChange={(e) => setDraft((prev) => ({ ...prev, [key]: e.target.value }))}
            />
          </label>
        ))}
        <label className="block text-sm md:col-span-2">
          <span className="mb-1.5 block text-[var(--color-text-faint)]">Detail</span>
          <textarea
            className="admin-input min-h-24"
            required
            value={draft.detail}
            onChange={(e) => setDraft((prev) => ({ ...prev, detail: e.target.value }))}
          />
        </label>
        <div className="flex gap-2 md:col-span-2">
          <button type="submit" className="btn btn-primary" disabled={busy}>
            {editing ? 'Update' : 'Create'}
          </button>
          {editing && (
            <button type="button" className="btn btn-secondary" onClick={() => setDraft(blank)}>
              Cancel
            </button>
          )}
        </div>
      </form>

      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item.id} className="admin-panel flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="font-medium text-[var(--color-heading)]">
                {item.title} · {item.org}
              </p>
              <p className="text-sm text-[var(--color-text-faint)]">{item.period}</p>
            </div>
            <div className="flex gap-2">
              <button type="button" className="btn btn-ghost btn-sm" onClick={() => setDraft(item)}>
                Edit
              </button>
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                disabled={busy}
                onClick={() => onDelete(item.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

function ProjectsPanel({
  items,
  busy,
  onSave,
  onDelete,
}: {
  items: Project[]
  busy: boolean
  onSave: (item: Project, sort_order: number) => void
  onDelete: (id: string) => void
}) {
  const blank: Project = { id: '', title: '', role: '', stack: [], blurb: '', year: '' }
  const [draft, setDraft] = useState<Project>(blank)
  const [stackText, setStackText] = useState('')
  const editing = Boolean(draft.id)

  useEffect(() => {
    setStackText(draft.stack.join(', '))
  }, [draft])

  return (
    <div className="space-y-6">
      <form
        className="admin-panel grid gap-3 md:grid-cols-2"
        onSubmit={(e) => {
          e.preventDefault()
          const next = {
            ...draft,
            stack: stackText
              .split(',')
              .map((part) => part.trim())
              .filter(Boolean),
          }
          const sort_order = editing
            ? items.findIndex((item) => item.id === draft.id) + 1 || items.length + 1
            : items.length + 1
          onSave(next, sort_order)
          setDraft(blank)
          setStackText('')
        }}
      >
        <h2 className="md:col-span-2 font-display text-xl text-[var(--color-heading)]">
          {editing ? 'Edit project' : 'Add project'}
        </h2>
        {(['title', 'role', 'year', 'href'] as const).map((key) => (
          <label key={key} className="block text-sm">
            <span className="mb-1.5 block capitalize text-[var(--color-text-faint)]">{key}</span>
            <input
              className="admin-input"
              required={key !== 'href'}
              value={draft[key] ?? ''}
              onChange={(e) => setDraft((prev) => ({ ...prev, [key]: e.target.value }))}
            />
          </label>
        ))}
        <label className="block text-sm md:col-span-2">
          <span className="mb-1.5 block text-[var(--color-text-faint)]">Stack (comma-separated)</span>
          <input
            className="admin-input"
            value={stackText}
            onChange={(e) => setStackText(e.target.value)}
          />
        </label>
        <label className="block text-sm md:col-span-2">
          <span className="mb-1.5 block text-[var(--color-text-faint)]">Blurb</span>
          <textarea
            className="admin-input min-h-24"
            required
            value={draft.blurb}
            onChange={(e) => setDraft((prev) => ({ ...prev, blurb: e.target.value }))}
          />
        </label>
        <div className="flex gap-2 md:col-span-2">
          <button type="submit" className="btn btn-primary" disabled={busy}>
            {editing ? 'Update' : 'Create'}
          </button>
          {editing && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setDraft(blank)
                setStackText('')
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item.id} className="admin-panel flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="font-medium text-[var(--color-heading)]">
                {item.title} · {item.year}
              </p>
              <p className="text-sm text-[var(--color-text-faint)]">{item.role}</p>
            </div>
            <div className="flex gap-2">
              <button type="button" className="btn btn-ghost btn-sm" onClick={() => setDraft(item)}>
                Edit
              </button>
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                disabled={busy}
                onClick={() => onDelete(item.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

function ResearchPanel({
  items,
  busy,
  onSave,
  onDelete,
}: {
  items: ResearchItem[]
  busy: boolean
  onSave: (item: ResearchItem, sort_order: number) => void
  onDelete: (id: string) => void
}) {
  const blank: ResearchItem = { id: '', title: '', status: '', blurb: '' }
  const [draft, setDraft] = useState<ResearchItem>(blank)
  const editing = Boolean(draft.id)

  return (
    <div className="space-y-6">
      <form
        className="admin-panel grid gap-3 md:grid-cols-2"
        onSubmit={(e) => {
          e.preventDefault()
          const sort_order = editing
            ? items.findIndex((item) => item.id === draft.id) + 1 || items.length + 1
            : items.length + 1
          onSave(draft, sort_order)
          setDraft(blank)
        }}
      >
        <h2 className="md:col-span-2 font-display text-xl text-[var(--color-heading)]">
          {editing ? 'Edit research' : 'Add research'}
        </h2>
        {(['title', 'status', 'venue'] as const).map((key) => (
          <label key={key} className="block text-sm">
            <span className="mb-1.5 block capitalize text-[var(--color-text-faint)]">{key}</span>
            <input
              className="admin-input"
              required={key !== 'venue'}
              value={draft[key] ?? ''}
              onChange={(e) => setDraft((prev) => ({ ...prev, [key]: e.target.value }))}
            />
          </label>
        ))}
        <label className="block text-sm md:col-span-2">
          <span className="mb-1.5 block text-[var(--color-text-faint)]">Blurb</span>
          <textarea
            className="admin-input min-h-24"
            required
            value={draft.blurb}
            onChange={(e) => setDraft((prev) => ({ ...prev, blurb: e.target.value }))}
          />
        </label>
        <div className="flex gap-2 md:col-span-2">
          <button type="submit" className="btn btn-primary" disabled={busy}>
            {editing ? 'Update' : 'Create'}
          </button>
          {editing && (
            <button type="button" className="btn btn-secondary" onClick={() => setDraft(blank)}>
              Cancel
            </button>
          )}
        </div>
      </form>

      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item.id} className="admin-panel flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="font-medium text-[var(--color-heading)]">{item.title}</p>
              <p className="text-sm text-[var(--color-text-faint)]">{item.status}</p>
            </div>
            <div className="flex gap-2">
              <button type="button" className="btn btn-ghost btn-sm" onClick={() => setDraft(item)}>
                Edit
              </button>
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                disabled={busy}
                onClick={() => onDelete(item.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

function ConferencesPanel({
  items,
  busy,
  onSave,
  onDelete,
}: {
  items: Conference[]
  busy: boolean
  onSave: (item: Conference, sort_order: number) => void
  onDelete: (id: string) => void
}) {
  const blank: Conference = {
    id: '',
    title: '',
    event: '',
    role: 'Attendee',
    location: '',
    date: '',
    year: '',
  }
  const [draft, setDraft] = useState<Conference>(blank)
  const editing = Boolean(draft.id)

  return (
    <div className="space-y-6">
      <form
        className="admin-panel grid gap-3 md:grid-cols-2"
        onSubmit={(e) => {
          e.preventDefault()
          const sort_order = editing
            ? items.findIndex((item) => item.id === draft.id) + 1 || items.length + 1
            : items.length + 1
          onSave(draft, sort_order)
          setDraft(blank)
        }}
      >
        <h2 className="md:col-span-2 font-display text-xl text-[var(--color-heading)]">
          {editing ? 'Edit conference' : 'Add conference'}
        </h2>
        {(['title', 'event', 'location', 'date', 'year', 'url'] as const).map((key) => (
          <label key={key} className="block text-sm">
            <span className="mb-1.5 block capitalize text-[var(--color-text-faint)]">{key}</span>
            <input
              className="admin-input"
              required={key !== 'url'}
              value={draft[key] ?? ''}
              onChange={(e) => setDraft((prev) => ({ ...prev, [key]: e.target.value }))}
            />
          </label>
        ))}
        <label className="block text-sm">
          <span className="mb-1.5 block text-[var(--color-text-faint)]">Role</span>
          <select
            className="admin-input"
            value={draft.role}
            onChange={(e) =>
              setDraft((prev) => ({ ...prev, role: e.target.value as ConferenceRole }))
            }
          >
            {conferenceRoles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm md:col-span-2">
          <span className="mb-1.5 block text-[var(--color-text-faint)]">Note</span>
          <textarea
            className="admin-input min-h-20"
            value={draft.note ?? ''}
            onChange={(e) => setDraft((prev) => ({ ...prev, note: e.target.value }))}
          />
        </label>
        <div className="flex gap-2 md:col-span-2">
          <button type="submit" className="btn btn-primary" disabled={busy}>
            {editing ? 'Update' : 'Create'}
          </button>
          {editing && (
            <button type="button" className="btn btn-secondary" onClick={() => setDraft(blank)}>
              Cancel
            </button>
          )}
        </div>
      </form>

      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item.id} className="admin-panel flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="font-medium text-[var(--color-heading)]">
                {item.event} · {item.year}
              </p>
              <p className="text-sm text-[var(--color-text-faint)]">
                {item.title} · {item.role}
              </p>
            </div>
            <div className="flex gap-2">
              <button type="button" className="btn btn-ghost btn-sm" onClick={() => setDraft(item)}>
                Edit
              </button>
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                disabled={busy}
                onClick={() => onDelete(item.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

function SkillsPanel({
  items,
  busy,
  onSave,
  onDelete,
}: {
  items: SkillGroup[]
  busy: boolean
  onSave: (item: SkillGroup, sort_order: number) => void
  onDelete: (id: string) => void
}) {
  const blank: SkillGroup = { id: '', label: '', items: [] }
  const [draft, setDraft] = useState<SkillGroup>(blank)
  const [itemsText, setItemsText] = useState('')
  const editing = Boolean(draft.id)

  useEffect(() => {
    setItemsText(draft.items.join(', '))
  }, [draft])

  const preview = useMemo(
    () =>
      itemsText
        .split(',')
        .map((part) => part.trim())
        .filter(Boolean),
    [itemsText],
  )

  return (
    <div className="space-y-6">
      <form
        className="admin-panel grid gap-3"
        onSubmit={(e) => {
          e.preventDefault()
          const next = { ...draft, items: preview }
          const sort_order = editing
            ? items.findIndex((item) => item.id === draft.id) + 1 || items.length + 1
            : items.length + 1
          onSave(next, sort_order)
          setDraft(blank)
          setItemsText('')
        }}
      >
        <h2 className="font-display text-xl text-[var(--color-heading)]">
          {editing ? 'Edit skill group' : 'Add skill group'}
        </h2>
        <label className="block text-sm">
          <span className="mb-1.5 block text-[var(--color-text-faint)]">Label</span>
          <input
            className="admin-input"
            required
            value={draft.label}
            onChange={(e) => setDraft((prev) => ({ ...prev, label: e.target.value }))}
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1.5 block text-[var(--color-text-faint)]">Items (comma-separated)</span>
          <textarea
            className="admin-input min-h-24"
            required
            value={itemsText}
            onChange={(e) => setItemsText(e.target.value)}
          />
        </label>
        <div className="flex gap-2">
          <button type="submit" className="btn btn-primary" disabled={busy}>
            {editing ? 'Update' : 'Create'}
          </button>
          {editing && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setDraft(blank)
                setItemsText('')
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item.id} className="admin-panel flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="font-medium text-[var(--color-heading)]">{item.label}</p>
              <p className="text-sm text-[var(--color-text-faint)]">{item.items.join(' · ')}</p>
            </div>
            <div className="flex gap-2">
              <button type="button" className="btn btn-ghost btn-sm" onClick={() => setDraft(item)}>
                Edit
              </button>
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                disabled={busy}
                onClick={() => onDelete(item.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

function toSettingsInput(data: ReturnType<typeof usePortfolio>['data']): SiteSettingsInput {
  const github =
    data.contact.socials.find((social) => social.label === 'GitHub')?.href ?? 'https://github.com'

  return {
    name: data.site.name,
    short_name: data.site.shortName,
    headline: data.site.headline,
    tagline: data.site.tagline,
    location: data.site.location,
    role: data.site.role,
    ccri_url: data.site.ccriUrl,
    portrait_url: data.site.portrait,
    portrait_fallback: data.site.portraitFallback,
    about_lead: data.about.lead,
    about_body: data.about.body,
    contact_email: data.contact.email,
    contact_note: data.contact.note,
    linkedin_url: data.contact.linkedIn,
    github_url: github,
  }
}
