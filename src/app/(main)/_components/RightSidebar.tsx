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

  return (
    <>
      {!isFetching && !userRecommendations && !trendingTopics && null}
      {isUserRecommendationsGettingFetched && (
        <p>fetching user recommendations</p>
      )}
      {Array.isArray(userRecommendations) && userRecommendations.length > 0 && (
        <FollowRecommendations userRecommendations={userRecommendations} />
      )}
      {isTrendingTopicsGettingFetched && <p>fetching trending topics</p>}
      {Array.isArray(trendingTopics) && trendingTopics.length > 0 && (
        <TrendingTopics trendingTopics={trendingTopics} />
      )}
    </>
  );
};

export { RightSidebar };
