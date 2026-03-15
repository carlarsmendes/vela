create table if not exists public.profiles (
  user_id uuid primary key references auth.users (id) on delete cascade,
  average_cycle_length integer,
  training_focus text check (training_focus in ('crossfit', 'running', 'both')),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.body_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  date date not null,
  weight numeric,
  waist numeric,
  hips numeric,
  bust numeric,
  thigh numeric,
  arm numeric,
  neck numeric,
  body_fat_percentage numeric,
  note text,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.period_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  start_date date not null,
  created_at timestamptz not null default timezone('utc', now())
);

create index if not exists body_entries_user_id_date_idx
  on public.body_entries (user_id, date desc, created_at desc);

create index if not exists period_entries_user_id_start_date_idx
  on public.period_entries (user_id, start_date desc, created_at desc);

alter table public.profiles enable row level security;
alter table public.body_entries enable row level security;
alter table public.period_entries enable row level security;

create policy "Users can view their own profile"
  on public.profiles
  for select
  using (auth.uid() = user_id);

create policy "Users can insert their own profile"
  on public.profiles
  for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own profile"
  on public.profiles
  for update
  using (auth.uid() = user_id);

create policy "Users can view their own body entries"
  on public.body_entries
  for select
  using (auth.uid() = user_id);

create policy "Users can insert their own body entries"
  on public.body_entries
  for insert
  with check (auth.uid() = user_id);

create policy "Users can view their own period entries"
  on public.period_entries
  for select
  using (auth.uid() = user_id);

create policy "Users can insert their own period entries"
  on public.period_entries
  for insert
  with check (auth.uid() = user_id);

create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

drop trigger if exists set_profiles_updated_at on public.profiles;
create trigger set_profiles_updated_at
before update on public.profiles
for each row
execute function public.handle_updated_at();
