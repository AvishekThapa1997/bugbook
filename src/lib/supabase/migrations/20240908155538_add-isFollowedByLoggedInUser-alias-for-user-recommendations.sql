drop function get_user_recommendations();
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
            'username',profile.username,
            'profile_image',profile.profile_image,
            'created_at', profile.created_at,
            'updated_at', profile.updated_at,
            -- Add other columns from public.profiles
            'isFollowedbyLoggedInUser', case 
                when follow.follower_id is not null then true 
                else false 
            end
        )
    from 
        public.profiles as profile
    left join 
        public.follows as follow
    on 
        follow.followed_id = profile.id 
        and follow.follower_id = auth.uid()
    where 
        profile.id != auth.uid()
    order by 
        profile.created_at desc    
    limit 5;
end;
$$ language plpgsql;