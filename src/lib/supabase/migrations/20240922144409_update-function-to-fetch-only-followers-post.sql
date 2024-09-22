drop function if exists get_followers_posts();
create or replace function get_followers_posts(limit_val INT DEFAULT 10, cursor JSONB DEFAULT NULL)
returns setof jsonb
as $$
begin    
    -- Return posts with author details in a JSONB structure
    return query
    select
        jsonb_build_object(
            'id', p.id,
            'content', p.content,
            'created_at', p.created_at,
            'updated_at', p.updated_at,
            'author', jsonb_build_object(
                'id', pr.id,
                'display_name', pr.display_name,
                'username', pr.username
            )
        ) as post
    from
        public.posts p
    join
        public.follows fw on p.author_id = fw.followed_id
    join
        public.profiles pr on pr.id = fw.followed_id    
    where
        (cursor IS NULL) OR
        (p.created_at, p.id) < (
            (cursor->>'created_at')::timestamp, 
            (cursor->>'id')::uuid
        )
    order by
        p.created_at desc,p.id
    limit limit_val + 1;
end;
$$ language plpgsql;