create table posts_hashtags (
    post_id uuid references public.posts(id)
        on update cascade
        on delete cascade,
    hashtag_name varchar references public.hashtags(name)
        on update cascade
        on delete cascade,
    primary key (post_id,hashtag_name)
);

create policy "User can see which tags with posts."
on posts_hashtags for select
to authenticated
using(true);

create policy "Users can add tags in posts."
on posts_hashtags for insert
to authenticated
with check(true);