-- Pixley website — /feedback page tables
-- Run once in Supabase → SQL Editor. Safe to re-run.
--
-- What this creates:
--   bug_reports        — private. The public can insert, nobody can read via the anon key.
--   feature_requests   — public list. Anyone can read approved items (never the submitter's
--                        email). New suggestions land as 'pending' until you approve them.
--   feature_votes      — private. One vote per (feature, browser). Only touched via RPCs.
--   toggle_feature_vote(feature_id, voter_id) — vote / un-vote, returns the new count.
--   my_feature_votes(voter_id)                — which features this browser has voted on.
--
-- Moderating: in Table Editor → feature_requests, change status from 'pending' to 'open'
-- to publish a suggestion. Other statuses ('planned', 'in_progress', 'shipped') show as
-- badges on the site. 'declined' and 'pending' are hidden.

-- ─── Bug reports ─────────────────────────────────────────────────────────────
create table if not exists public.bug_reports (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  email       text not null check (char_length(email) between 3 and 255),
  description text not null check (char_length(description) between 10 and 5000),
  device      text check (device is null or char_length(device) <= 200),
  app_version text check (app_version is null or char_length(app_version) <= 50),
  user_agent  text check (user_agent is null or char_length(user_agent) <= 500),
  status      text not null default 'new'
              check (status in ('new', 'triaged', 'fixed', 'wont_fix', 'duplicate'))
);

alter table public.bug_reports enable row level security;

-- Explicit grants (newer Supabase projects don't auto-expose new tables to the API).
grant usage on schema public to anon, authenticated;
revoke all on public.bug_reports from anon, authenticated;
grant insert (email, description, device, app_version, user_agent)
  on public.bug_reports to anon, authenticated;

drop policy if exists "public can submit bug reports" on public.bug_reports;
create policy "public can submit bug reports"
  on public.bug_reports for insert
  to anon, authenticated
  with check (status = 'new');
-- No select/update/delete policies → reports are only visible to you in the dashboard.

-- ─── Feature requests ────────────────────────────────────────────────────────
create table if not exists public.feature_requests (
  id              uuid primary key default gen_random_uuid(),
  created_at      timestamptz not null default now(),
  title           text not null check (char_length(title) between 3 and 120),
  description     text check (description is null or char_length(description) <= 1000),
  status          text not null default 'pending'
                  check (status in ('pending', 'open', 'planned', 'in_progress', 'shipped', 'declined')),
  vote_count      integer not null default 0,
  submitter_email text check (submitter_email is null or char_length(submitter_email) <= 255)
);

create index if not exists feature_requests_rank_idx
  on public.feature_requests (vote_count desc, created_at asc);

alter table public.feature_requests enable row level security;

drop policy if exists "public can read published feature requests" on public.feature_requests;
create policy "public can read published feature requests"
  on public.feature_requests for select
  to anon, authenticated
  using (status in ('open', 'planned', 'in_progress', 'shipped'));

drop policy if exists "public can suggest features" on public.feature_requests;
create policy "public can suggest features"
  on public.feature_requests for insert
  to anon, authenticated
  with check (status = 'pending' and vote_count = 0);

-- Column-level privacy: the public can read everything EXCEPT submitter_email.
revoke select on public.feature_requests from anon, authenticated;
grant select (id, created_at, title, description, status, vote_count)
  on public.feature_requests to anon, authenticated;
revoke insert on public.feature_requests from anon, authenticated;
grant insert (title, description, submitter_email)
  on public.feature_requests to anon, authenticated;

-- ─── Votes ───────────────────────────────────────────────────────────────────
create table if not exists public.feature_votes (
  feature_id uuid not null references public.feature_requests(id) on delete cascade,
  voter_id   text not null check (char_length(voter_id) between 16 and 64),
  created_at timestamptz not null default now(),
  primary key (feature_id, voter_id)
);

alter table public.feature_votes enable row level security;
-- No policies on purpose: the anon key can't read or write votes directly.
-- All access goes through the security-definer functions below.

create or replace function public.toggle_feature_vote(p_feature_id uuid, p_voter_id text)
returns table (voted boolean, vote_count integer)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_deleted int;
begin
  if p_voter_id is null or char_length(p_voter_id) not between 16 and 64 then
    raise exception 'invalid voter id';
  end if;

  -- Only published items can be voted on.
  perform 1 from feature_requests fr
   where fr.id = p_feature_id
     and fr.status in ('open', 'planned', 'in_progress')
   for update;
  if not found then
    raise exception 'feature not found';
  end if;

  delete from feature_votes fv
   where fv.feature_id = p_feature_id and fv.voter_id = p_voter_id;
  get diagnostics v_deleted = row_count;

  if v_deleted = 0 then
    insert into feature_votes (feature_id, voter_id) values (p_feature_id, p_voter_id);
  end if;

  update feature_requests fr
     set vote_count = (select count(*) from feature_votes fv where fv.feature_id = p_feature_id)
   where fr.id = p_feature_id;

  return query
    select (v_deleted = 0), fr.vote_count from feature_requests fr where fr.id = p_feature_id;
end;
$$;

create or replace function public.my_feature_votes(p_voter_id text)
returns setof uuid
language sql
stable
security definer
set search_path = public
as $$
  select fv.feature_id from feature_votes fv where fv.voter_id = p_voter_id;
$$;

revoke all on function public.toggle_feature_vote(uuid, text) from public;
revoke all on function public.my_feature_votes(text) from public;
grant execute on function public.toggle_feature_vote(uuid, text) to anon, authenticated;
grant execute on function public.my_feature_votes(text) to anon, authenticated;
