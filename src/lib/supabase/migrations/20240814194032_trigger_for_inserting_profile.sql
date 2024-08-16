create or replace function create_profile ()
returns trigger
language plpgsql
security definer
as $$
begin
    insert into public.profiles(id,email,username,display_name)
        values (new.id,new.email,new.raw_user_meta_data ->> 'username',new.raw_user_meta_data ->> 'display_name');
    return new;    
end;
$$;

create or replace trigger create_profile_trigger
after insert on auth.users for each row
execute function create_profile ();