import { usePostAdapter } from "./usePostAdapter";
import { useQueryHandler } from "../../../../lib/react-query";

export const useTrendingTopics = () => {
  const { getTrendingTopics } = usePostAdapter();
  const {
    data: result,
    isFetching: isTrendingTopicsGettingFetched,
    error
  } = useQueryHandler({
    queryKey: ["trending-topics"],
    queryFn: () => getTrendingTopics()
  });
  return {
    trendingTopics: result?.data,
    isTrendingTopicsGettingFetched,
    trendingTopicsError: error || result?.error
  };
};
