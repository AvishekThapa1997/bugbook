create policy "Followers are viewable by authenticated user only"
on public.follows for select
to authenticated
using (true);

create policy "Only authenticated user can follow a user."
on public.follows for insert
to authenticated
with check ( (select auth.uid()) = follower_id); 

create policy "Only authenticated user can unfollow a user."
on public.follows for delete
to authenticated
using((select auth.uid()) = follower_id); 