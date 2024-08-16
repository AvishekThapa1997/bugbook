create table trending_hashtags (
    name text primary key references public.hashtags(name)
        on delete cascade
        on update cascade,
    trending_score integer default 1,
    last_used_at timestamptz not null default now()
);

create policy "Users can see trending hashtags."
on trending_hashtags for select
to authenticated
using (true);

create policy "Users can add trending hashtag."
on trending_hashtags for insert
to authenticated
with check (true);