create
or replace function get_posts()
returns setof posts 
as $$
begin
 -- error if user is not authorized
 if auth.uid() is null then
  raise exception 'User is not authorized.'
  using errcode = 401;
 end if;
 -- if authrozied return posts  
 return query select * from public.posts order by created_at desc limit 5;
end;
$$ language plpgsql;