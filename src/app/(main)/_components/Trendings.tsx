import React, { Suspense } from "react";
import { getUsers } from "../_services";
import { CONSTANTS } from "@/src/constants";
import { redirect } from "next/navigation";
import { Box, Button } from "@/app/_components/ui";
import { User } from "@/src/types/user";
import Link from "next/link";
import { UserAvatar } from "./UserAvatar";
import UserFollowButton from "./UserFollowButton";
import { getTrendingHashtags } from "../(posts)/services";

interface RecommenderUserProps {
  user: User;
}

const Trendings = () => {
  return (
    <Box className='space-y-3'>
      <Suspense fallback={<p>loading...</p>}>
        <FollowRecommendations />
        <TrendingHashTags />
      </Suspense>
    </Box>
  );
};

const FollowRecommendations = async () => {
  const { data: usersToFollow, error } = await getUsers({ limit: 5 });
  if (
    !usersToFollow &&
    error?.code === CONSTANTS.ERROR_STATUS_CODE.UNAUTHORIZED
  ) {
    redirect("/signin");
  }
  if (!usersToFollow && error) {
    return null;
  }
  return (
    <Box className='space-y-3 rounded-xl bg-card p-3 shadow-sm md:p-4'>
      <h2 className='text-xl font-bold'>Who to follow</h2>
      <Box className='space-y-3'>
        {usersToFollow?.map((user) => (
          <RecommenderUser
            user={user}
            key={user.id}
          />
        ))}
      </Box>
    </Box>
  );
};

const RecommenderUser = ({ user }: RecommenderUserProps) => {
  return (
    <Box className='flex items-center justify-between'>
      <Link
        href={`/users/${user.id}`}
        className='flex items-center gap-3'
      >
        <UserAvatar url={user.profileImage} />
        <Box>
          <p className='line-clamp-1 break-all font-semibold hover:underline'>
            {user.name}
          </p>
        </Box>
      </Link>
      <UserFollowButton userId={user.id} />
    </Box>
  );
};

const TrendingHashTags = async () => {
  const { data: trendingHashtags } = await getTrendingHashtags();
  if (!trendingHashtags || trendingHashtags.length === 0) return null;
  return (
    <Box className='space-y-3 rounded-xl bg-card p-3 shadow-sm md:p-4'>
      <h2 className='text-xl font-bold'>Trending</h2>
      <Box className='space-y-4'>{JSON.stringify(trendingHashtags)}</Box>
    </Box>
  );
};
export { Trendings };
