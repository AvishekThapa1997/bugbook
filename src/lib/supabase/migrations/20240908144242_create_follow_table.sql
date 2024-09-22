CREATE TABLE follows(
    follower_id UUID NOT NULL,
    followed_id UUID NOT NULL,
    PRIMARY KEY (follower_id, followed_id),
    CONSTRAINT fk_follower FOREIGN KEY (follower_id) REFERENCES public.profiles(id) ON DELETE CASCADE,
    CONSTRAINT fk_followed FOREIGN KEY (followed_id) REFERENCES public.profiles(id) ON DELETE CASCADE
);