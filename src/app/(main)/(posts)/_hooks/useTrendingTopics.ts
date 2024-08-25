import { usePostAdapter } from "./usePostAdapter";
import { useQueryHandler } from "../../../../lib/react-query";
import { handleError } from "../../../../handleError";

export const useTrendingTopics = () => {
  const { getTrendingTopics } = usePostAdapter();
  const {
    data: result,
    isFetching: isTrendingTopicsGettingFetched,
    error
  } = useQueryHandler({
    queryKey: ["trending-topics"],
    queryFn: () => getTrendingTopics(),
    refetchOnWindowFocus: false
  });
  return {
    trendingTopics: result?.data,
    isTrendingTopicsGettingFetched,
    trendingTopicsError: handleError(error) || result?.error
  };
};
