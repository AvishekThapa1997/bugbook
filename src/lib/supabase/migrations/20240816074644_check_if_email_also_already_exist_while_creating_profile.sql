create or replace function create_profile ()
returns trigger
language plpgsql
security definer
as $$
declare
    existing_profile text;
begin
    select id into existing_profile from public.profiles where username = lower(new.raw_user_meta_data ->> 'username') or email = new.email;
    if existing_profile is not null then
        raise exception 'Account with same email/username already exists.'
        using errcode = 409;
    end if;
    insert into public.profiles(id,email,username,display_name)
        values (new.id,new.email,lower(new.raw_user_meta_data ->> 'username'),new.raw_user_meta_data ->> 'display_name');
    return new;    
end;
$$;