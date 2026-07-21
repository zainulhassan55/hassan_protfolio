-- Portfolio backend schema, RLS, storage, and seed
-- Run in Supabase SQL Editor (Dashboard → SQL → New query)
--
-- After running:
-- 1. Auth → Providers → Email: enable magic link / email OTP
-- 2. Auth → URL Configuration: add http://localhost:5173/admin
--    (and your production /admin URL when deployed)
-- 3. Copy Project URL + anon key into .env.local

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Admin allowlist
-- ---------------------------------------------------------------------------
create table if not exists public.admin_allowlist (
  email text primary key,
  created_at timestamptz not null default now()
);

insert into public.admin_allowlist (email)
values ('zainprog56@gmail.com')
on conflict (email) do nothing;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_allowlist a
    where lower(a.email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to anon, authenticated;

-- ---------------------------------------------------------------------------
-- Tables
-- ---------------------------------------------------------------------------
create table if not exists public.site_settings (
  id integer primary key default 1 check (id = 1),
  name text not null,
  short_name text not null,
  headline text not null,
  tagline text not null,
  location text not null,
  role text not null,
  ccri_url text,
  portrait_url text,
  portrait_fallback text,
  about_lead text not null,
  about_body text not null,
  contact_email text not null,
  contact_note text not null,
  linkedin_url text,
  github_url text,
  updated_at timestamptz not null default now()
);

create table if not exists public.timeline_items (
  id uuid primary key default gen_random_uuid(),
  period text not null,
  title text not null,
  org text not null,
  detail text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  role text not null,
  blurb text not null,
  year text not null,
  stack text[] not null default '{}',
  href text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.research_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  status text not null,
  venue text,
  blurb text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.conferences (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  event text not null,
  role text not null check (role in ('Speaker', 'Presenter', 'Attendee', 'Poster')),
  location text not null,
  date text not null,
  year text not null,
  url text,
  note text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.skill_groups (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  items text[] not null default '{}',
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.highlights (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  detail text not null,
  icon text not null check (icon in ('cap', 'lab', 'bulb')),
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- RLS
-- ---------------------------------------------------------------------------
alter table public.admin_allowlist enable row level security;
alter table public.site_settings enable row level security;
alter table public.timeline_items enable row level security;
alter table public.projects enable row level security;
alter table public.research_items enable row level security;
alter table public.conferences enable row level security;
alter table public.skill_groups enable row level security;
alter table public.highlights enable row level security;

-- Allowlist: admins can read their own allowlist row (optional)
drop policy if exists "Admin can read allowlist" on public.admin_allowlist;
create policy "Admin can read allowlist"
  on public.admin_allowlist for select
  to authenticated
  using (public.is_admin());

-- Public read
drop policy if exists "Public read site_settings" on public.site_settings;
create policy "Public read site_settings"
  on public.site_settings for select
  to anon, authenticated
  using (true);

drop policy if exists "Public read timeline_items" on public.timeline_items;
create policy "Public read timeline_items"
  on public.timeline_items for select
  to anon, authenticated
  using (true);

drop policy if exists "Public read projects" on public.projects;
create policy "Public read projects"
  on public.projects for select
  to anon, authenticated
  using (true);

drop policy if exists "Public read research_items" on public.research_items;
create policy "Public read research_items"
  on public.research_items for select
  to anon, authenticated
  using (true);

drop policy if exists "Public read conferences" on public.conferences;
create policy "Public read conferences"
  on public.conferences for select
  to anon, authenticated
  using (true);

drop policy if exists "Public read skill_groups" on public.skill_groups;
create policy "Public read skill_groups"
  on public.skill_groups for select
  to anon, authenticated
  using (true);

drop policy if exists "Public read highlights" on public.highlights;
create policy "Public read highlights"
  on public.highlights for select
  to anon, authenticated
  using (true);

-- Admin write
drop policy if exists "Admin write site_settings" on public.site_settings;
create policy "Admin write site_settings"
  on public.site_settings for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "Admin write timeline_items" on public.timeline_items;
create policy "Admin write timeline_items"
  on public.timeline_items for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "Admin write projects" on public.projects;
create policy "Admin write projects"
  on public.projects for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "Admin write research_items" on public.research_items;
create policy "Admin write research_items"
  on public.research_items for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "Admin write conferences" on public.conferences;
create policy "Admin write conferences"
  on public.conferences for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "Admin write skill_groups" on public.skill_groups;
create policy "Admin write skill_groups"
  on public.skill_groups for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "Admin write highlights" on public.highlights;
create policy "Admin write highlights"
  on public.highlights for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- ---------------------------------------------------------------------------
-- Storage bucket for portrait / media
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do update set public = excluded.public;

drop policy if exists "Public read media" on storage.objects;
create policy "Public read media"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'media');

drop policy if exists "Admin upload media" on storage.objects;
create policy "Admin upload media"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'media' and public.is_admin());

drop policy if exists "Admin update media" on storage.objects;
create policy "Admin update media"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'media' and public.is_admin())
  with check (bucket_id = 'media' and public.is_admin());

drop policy if exists "Admin delete media" on storage.objects;
create policy "Admin delete media"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'media' and public.is_admin());

-- ---------------------------------------------------------------------------
-- Seed (idempotent for site_settings; list tables clear + reinsert)
-- ---------------------------------------------------------------------------
insert into public.site_settings (
  id, name, short_name, headline, tagline, location, role,
  ccri_url, portrait_url, portrait_fallback,
  about_lead, about_body, contact_email, contact_note, linkedin_url, github_url
) values (
  1,
  'Zain Ul Hassan',
  'ZUH',
  'CS Researcher in AI, Cybersecurity & Healthcare',
  'Computer Science graduate student and Research Assistant building secure intelligent systems for real-world healthcare and cyber defense challenges.',
  'Asia University, Taiwan',
  'MERN Developer · Research Assistant · CCRI',
  'https://aicybersecuritycenter.com',
  '/images/zh-portrait.jpg',
  '/images/zh.png',
  'I build full-stack systems and research secure AI for cybersecurity and healthcare applications.',
  'After completing my BS in Computer Science at Islamia College University Peshawar, I spent over a year and a half as a MERN Stack Developer at K2X TECH. I am now pursuing a Master''s in Computer Science and Information Engineering at Asia University, Taiwan, and serving as a Research Assistant at the International Center for AI and Cyber Security Research and Innovations (CCRI).',
  'zain@example.com',
  'Open to research collaboration, speaking, and engineering work across AI, cybersecurity, and healthcare technology.',
  'https://linkedin.com',
  'https://github.com'
)
on conflict (id) do update set
  name = excluded.name,
  short_name = excluded.short_name,
  headline = excluded.headline,
  tagline = excluded.tagline,
  location = excluded.location,
  role = excluded.role,
  ccri_url = excluded.ccri_url,
  portrait_url = coalesce(public.site_settings.portrait_url, excluded.portrait_url),
  portrait_fallback = excluded.portrait_fallback,
  about_lead = excluded.about_lead,
  about_body = excluded.about_body,
  contact_email = excluded.contact_email,
  contact_note = excluded.contact_note,
  linkedin_url = excluded.linkedin_url,
  github_url = excluded.github_url,
  updated_at = now();

-- Only seed list tables when empty (safe re-run)
do $$
begin
  if not exists (select 1 from public.timeline_items) then
    insert into public.timeline_items (period, title, org, detail, sort_order) values
      ('2025 — Present', 'Research Assistant', 'CCRI, Asia University',
       'International Center for AI and Cyber Security Research and Innovations — contributing to ongoing AI & cybersecurity research.', 1),
      ('2025 — Present', 'MS, CSIE', 'Asia University, Taiwan',
       'Master''s in Computer Science and Information Engineering — research-focused graduate study.', 2),
      ('Jan 2024 — Aug 2025', 'MERN Stack Developer', 'K2X TECH, Peshawar',
       'Built and shipped production web applications across the MongoDB, Express, React, and Node stack.', 3),
      ('Before 2024', 'BS, Computer Science', 'Islamia College University Peshawar',
       'Bachelor of Science in Computer Science — foundational CS and software engineering.', 4);
  end if;

  if not exists (select 1 from public.projects) then
    insert into public.projects (title, role, blurb, year, stack, sort_order) values
      ('Commerce Desk', 'Full-stack Developer',
       'Admin-facing dashboard for inventory, orders, and reporting — built for a regional retail client at K2X TECH.',
       '2025', array['React','Node.js','MongoDB','Express'], 1),
      ('CampusConnect', 'Lead Frontend',
       'Student engagement platform with auth, role-based views, and real-time notification hooks.',
       '2024', array['React','TypeScript','REST','Tailwind'], 2),
      ('Pulse Analytics', 'MERN Developer',
       'API-driven analytics service with scheduled jobs and exportable performance reports.',
       '2024', array['Node.js','Express','Charting','MongoDB'], 3),
      ('HireFlow CRM', 'Full-stack Developer',
       'Lightweight recruiting CRM for pipeline tracking, candidate notes, and interview scheduling.',
       '2024', array['React','Node.js','JWT','MongoDB'], 4);
  end if;

  if not exists (select 1 from public.research_items) then
    insert into public.research_items (title, status, venue, blurb, sort_order) values
      ('Adversarial Robustness in Lightweight Vision Models', 'In progress', 'CCRI · AI & Cybersecurity',
       'Efficient defense strategies for edge-deployable CNN architectures under common adversarial attack settings.', 1),
      ('Threat Signal Correlation for IoT Telemetry', 'Manuscript in prep', 'CCRI · Cybersecurity',
       'Pipeline design for correlating anomalous device signals with known cybersecurity threat patterns.', 2),
      ('Privacy-Preserving AI for Healthcare Data', 'Early exploration', 'Healthcare AI track',
       'Exploring secure learning approaches that protect sensitive clinical data while supporting useful model training.', 3);
  end if;

  if not exists (select 1 from public.conferences) then
    insert into public.conferences (title, event, role, location, date, year, sort_order) values
      ('Trustworthy AI for Cyber Defense', 'Asia Pacific AI Symposium', 'Presenter', 'Taipei, Taiwan', 'Nov 2025', '2025', 1),
      ('Workshop on Edge Security', 'IEEE Region 10 Cyber Forum', 'Attendee', 'Taichung, Taiwan', 'Sep 2025', '2025', 2),
      ('AI Applications in Digital Health', 'Healthcare Informatics Forum', 'Attendee', 'Taichung, Taiwan', 'Jun 2025', '2025', 3),
      ('MERN Patterns for Production Systems', 'DevFest Peshawar', 'Speaker', 'Peshawar, Pakistan', 'Mar 2025', '2025', 4);
  end if;

  if not exists (select 1 from public.skill_groups) then
    insert into public.skill_groups (label, items, sort_order) values
      ('Engineering', array['JavaScript','TypeScript','React','Node.js','Express','MongoDB','REST APIs'], 1),
      ('Research Domains', array['Artificial Intelligence','Cybersecurity','Healthcare Technology','Secure ML','Technical writing'], 2),
      ('Practice', array['Full-stack delivery','Git & collaboration','API design','Experiment design','Research communication'], 3);
  end if;

  if not exists (select 1 from public.highlights) then
    insert into public.highlights (title, detail, icon, sort_order) values
      ('Academic Path', 'BS Computer Science · MS CSIE at Asia University', 'cap', 1),
      ('Research Interests', 'AI, cybersecurity, and healthcare technology', 'lab', 2),
      ('Industry Projects', 'MERN production systems built at K2X TECH', 'bulb', 3);
  end if;
end $$;
