create table posts (
    id uuid primary key default gen_random_uuid(),
    content varchar not null,
    author_id uuid references public.profiles(id) 
        on delete cascade 
        on update cascade,
    created_at timestamptz not null default now() ,
    updated_at timestamptz not null default now()
);

create policy "Users can see posts."
on posts for select
to authenticated
using (true);

create policy "Users can posts"
on posts for insert
to authenticated
with check((select auth.uid()) = author_id);

create policy "User can update their own post."
on posts for update
to authenticated
using ((select auth.uid()) = author_id)
with check ((select auth.uid()) = author_id);

create policy "User can delete their own post."
on posts for delete
to authenticated
using ((select auth.uid()) = author_id);
