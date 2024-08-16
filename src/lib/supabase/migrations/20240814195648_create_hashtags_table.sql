create table hashtags (
    id uuid primary key default gen_random_uuid(),
    name varchar not null unique,
    owner_id uuid references public.profiles(id)
        on delete cascade 
        on update cascade,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create policy "Users can view tags."
on hashtags for select
to authenticated
using (true);

create policy "Users can create hashtags."
on hashtags for insert
to authenticated
with check((select auth.uid()) = owner_id);