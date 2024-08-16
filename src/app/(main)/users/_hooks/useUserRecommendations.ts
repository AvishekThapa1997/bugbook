import { useQueryHandler } from "../../../../lib/react-query";
import { useUserAdapter } from "./useUserAdapter";

export const useUserRecommendations = () => {
  const { getUserRecommendations } = useUserAdapter();
  const {
    data: result,
    isFetching,
    error
  } = useQueryHandler({
    queryKey: ["user-recommendations"],
    queryFn: () => getUserRecommendations()
  });
  return {
    userRecommendations: result?.data,
    isUserRecommendationsGettingFetched: isFetching,
    userRecommendationError: error || result?.error
  };
};
