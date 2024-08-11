import React, { Suspense } from "react";

import { redirect } from "next/navigation";

import Link from "next/link";
import { UserAvatar } from "./UserAvatar";
import UserFollowButton from "./UserFollowButton";
import { getTrendingHashtags } from "../(posts)/services";
import { userService } from "../users/_services";
import { UserDto } from "../../dto/userDto";
import { Box } from "../../_components/ui";
import { CONSTANTS } from "../../../constants";

interface RecommenderUserProps {
  user: UserDto;
}

const Trendings = () => {
  return (
    <Box className='space-y-3'>
      <Suspense fallback={<p>loading...</p>}>
        <FollowRecommendations />
        {/* <TrendingHashTags /> */}
      </Suspense>
    </Box>
  );
};

const FollowRecommendations = async () => {
  const { data: users, error } = await userService.getUserRecommendations();
  if (error && error.code === CONSTANTS.ERROR_STATUS_CODE.UNAUTHORIZED) {
    redirect("/signin?message=Session expired.Please login again.");
  }
  if (!error && !users) {
    return null;
  }

  return (
    <Box className='space-y-3 rounded-xl bg-card p-4 shadow-sm md:p-5'>
      <h2 className='text-xl font-bold'>Who to follow</h2>
      <Box className='space-y-3'>
        {users?.map((user) => (
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
        href={`/users/${user.username}`}
        className='flex items-center gap-3'
      >
        <UserAvatar url={user.profileImage} />
        <Box className='space-y-0.5'>
          <p className='line-clamp-1 break-all font-semibold hover:underline'>
            {user.displayName}
          </p>
          <p className='text-sm text-muted-foreground hover:underline'>
            @{user.username}
          </p>
        </Box>
      </Link>
      <UserFollowButton userId={user.username} />
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
