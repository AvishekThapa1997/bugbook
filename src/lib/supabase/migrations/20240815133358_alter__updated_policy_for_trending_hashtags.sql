alter policy "Users can update trending hashtag."
on "public"."trending_hashtags"
to authenticated
using (true);

