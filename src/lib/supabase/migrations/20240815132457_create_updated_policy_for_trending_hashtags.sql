create policy "Users can update trending hashtag."
on public.trending_hashtags for update
to authenticated
with check(true);