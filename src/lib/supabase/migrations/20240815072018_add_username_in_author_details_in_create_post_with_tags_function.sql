create or replace function create_post_with_hashtags(
    post_content text,
    hash_tags text[]
) returns jsonb as $$
declare
    new_hashtag text;
    hash_tag text;
    post_record record;
    author_record record;
    existing_count int;
    new_post jsonb;
begin
    -- insert the post into the posts table
    if auth.uid() is null then
      raise exception 'User is not authorized.'
      using errcode = 401;
    end if;
    insert into public.posts (content,author_id) values (post_content,auth.uid())
    returning id,content,author_id,created_at,updated_at into post_record;
    -- loop through the array of tags
    foreach hash_tag in array hash_tags
    loop
        -- insert tag into the tags table if it does not exist, and get the tag_id
        insert into public.hashtags (name,owner_id)
        values (hash_tag,auth.uid())
        on conflict (name) do nothing
        returning name into new_hashtag;
        if new_hashtag is null then
           
            select name into new_hashtag from hashtags where name = hash_tag limit 1;
            -- update the existing tags count and last_used_at
            update trending_hashtags set trending_score = trending_score + 1,last_used_at = now() where name = new_hashtag;
        else
            -- insert the tags into trending_hashtags
            insert into public.trending_hashtags (name) values(new_hashtag);
        end if;

        -- insert the relationship into the post_tags table
        insert into public.posts_hashtags (post_id,hashtag_name) values (post_record.id, new_hashtag) on conflict(post_id,hashtag_name) do nothing;
    end loop;
    select id,display_name,username into author_record from public.profiles where id = auth.uid();
    -- convert the record to JSONB
    new_post := jsonb_build_object(
        'id', post_record.id,
        'content', post_record.content,
        'created_at', post_record.created_at,
        'updated_at', post_record.updated_at,
        'author', jsonb_build_object(
            'id', author_record.id,
            'display_name', author_record.display_name,
            'username', author_record.username
        )
    );
    return new_post;
end;
$$ language plpgsql;