"use client";
import { useTrendingTopics } from "../(posts)/_hooks";
import { useUserRecommendations } from "../users/_hooks/useUserRecommendations";
import { FollowRecommendations } from "./FollowRecommendations";
import { TrendingTopics } from "./TrendingTopics";

const RightSidebar = () => {
  const { isUserRecommendationsGettingFetched, userRecommendations } =
    useUserRecommendations();
  const { isTrendingTopicsGettingFetched, trendingTopics } =
    useTrendingTopics();
  const isFetching =
    isUserRecommendationsGettingFetched || isTrendingTopicsGettingFetched;
  if (isFetching) {
    return <p>Loading...</p>;
  }
  if (!isFetching && !userRecommendations && !trendingTopics) {
    return null;
  }
  return (
    <>
      <FollowRecommendations userRecommendations={userRecommendations!} />
      <TrendingTopics trendingTopics={trendingTopics!} />
    </>
  );
};

export { RightSidebar };
