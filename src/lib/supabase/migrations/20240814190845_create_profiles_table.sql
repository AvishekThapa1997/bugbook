create table profiles  (
    id uuid primary key references auth.users(id),
    email text not null,
    username varchar not null,
    display_name varchar not null,
    profile_image varchar,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

create policy "Profile can view by anyone."
on profiles for select
to authenticated , anon 
using (true);

create policy "User can update their profile."
on profiles for update
to authenticated 
using((select auth.uid()) = id)
with check ((select auth.uid()) = id);

create policy "User can delete their profile."
on profiles for update
to authenticated
using ((select auth.uid()) = id);