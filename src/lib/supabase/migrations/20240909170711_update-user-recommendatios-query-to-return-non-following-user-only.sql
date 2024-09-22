drop function if exists get_user_recommendations();

create or replace function get_user_recommendations()
returns setof jsonb
as $$
begin
    return query 
    select 
        jsonb_build_object(
            'id', profile.id,
            'display_name', profile.display_name,
            'email', profile.email,
            'username', profile.username,
            'profile_image', profile.profile_image,
            'created_at', profile.created_at,
            'updated_at', profile.updated_at,
            -- Add other columns from public.profiles
            'isFollowedbyLoggedInUser', false -- Since only non-followed profiles are returned, this will always be false
        )
    from 
        public.profiles as profile
    left join 
        public.follows as follow
    on 
        follow.followed_id = profile.id 
        and follow.follower_id = auth.uid()
    where 
        profile.id != auth.uid() -- Exclude the logged-in user's own profile
        and follow.follower_id is null -- Only return profiles not followed by the user
    order by 
        profile.created_at desc    
    limit 5;
end;
$$ language plpgsql;
