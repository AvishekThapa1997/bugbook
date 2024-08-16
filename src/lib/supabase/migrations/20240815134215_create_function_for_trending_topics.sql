create or replace function get_trending_topics()
returns setof jsonb
as $$
begin
    return query
    select 
        jsonb_build_object(
            'name',th.name,
            'total_posts',count(*)
        )   as trending_topics
    from 
        public.posts_hashtags ph
    join 
        trending_hashtags th 
    on 
        th.name = ph.hashtag_name
    where 
        th.last_used_at >= (current_timestamp - INTERVAL '1 day') and th.last_used_at < current_timestamp 
    group by 
        th.name 
    order by 
        count(*) desc 
    limit 5;
end;
$$ language plpgsql;