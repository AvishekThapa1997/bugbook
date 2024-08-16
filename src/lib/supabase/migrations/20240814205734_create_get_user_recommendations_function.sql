create
or replace function get_user_recommendations()
returns setof profiles 
as $$
begin
 -- error if user is not authorized
 if auth.uid() is null then
  raise exception 'User is not authorized.'
  using errcode = 401;
 end if;
 -- if authrozied return profiles  
 return query select * from public.profiles where id != auth.uid() order by created_at desc limit 5;
end;
$$ language plpgsql;