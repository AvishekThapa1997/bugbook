import { error } from "console";
import { usePagination, useQueryHandler } from "../../../../lib/react-query";
import { PostCursor, PostPaginationResult, Result } from "../../../../types";

export const usePostFeed = (
  operation: (pageParam?: PostCursor) => Promise<Result<PostPaginationResult>>,
  initialPageParam: PostCursor = { createdAt: "", id: "" }
) => {
  const { data, ...other } = usePagination<
    Result<PostPaginationResult>,
    PostCursor
  >({
    queryKey: ["post-feed"],
    queryFn: ({ pageParam }) => operation(pageParam),
    getNextPageParam: (postResult) => {
      if (postResult?.data?.nextCursor) {
        return postResult?.data?.nextCursor;
      }
      return null;
    },
    initialPageParam,
    refetchOnWindowFocus: false
  });
  return {
    paginatedData:
      data?.pages?.flatMap((page) => page?.data?.result ?? []) ?? [],
    ...other
  };
};
