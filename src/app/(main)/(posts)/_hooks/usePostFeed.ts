import { QueryKey } from "@tanstack/react-query";
import { usePagination } from "../../../../lib/react-query";
import { PostCursor, PostPaginationResult, Result } from "../../../../types";

export const usePostFeed = ({
  operation,
  queryKey,
  initialPageParam = { createdAt: "", id: "" }
}: {
  operation: (pageParam?: PostCursor) => Promise<Result<PostPaginationResult>>;
  initialPageParam?: PostCursor;
  queryKey: QueryKey;
}) => {
  const { data, ...other } = usePagination<
    Result<PostPaginationResult>,
    PostCursor | undefined
  >({
    queryKey,
    queryFn: ({ pageParam }) => operation(pageParam),
    getNextPageParam: (postResult) => {
      if (postResult?.data?.nextCursor) {
        return postResult?.data?.nextCursor;
      }
      return;
    },
    initialPageParam,
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 2 * 60 * 1000
  });
  return {
    paginatedData:
      data?.pages?.flatMap((page) => page?.data?.result ?? []) ?? [],
    ...other
  };
};
