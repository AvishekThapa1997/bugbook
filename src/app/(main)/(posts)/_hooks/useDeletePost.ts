import {
  InfiniteData,
  QueryFilters,
  useQueryClient
} from "@tanstack/react-query";
import { useMutationHandler } from "../../../../lib/react-query";
import { usePostAdapter } from "./usePostAdapter";
import { PostCursor, PostPaginationResult, Result } from "../../../../types";

export const useDeletePost = (postId: string) => {
  const { deletePost } = usePostAdapter();
  const queryClient = useQueryClient();
  return useMutationHandler({
    mutationFn: () => deletePost(postId),
    async onSuccess(result) {
      const queryFilter: QueryFilters = { queryKey: ["post-feed"] };
      await queryClient.cancelQueries(queryFilter);
      queryClient.setQueriesData<
        InfiniteData<Result<PostPaginationResult>, PostCursor | null>
      >(queryFilter, (oldData) => {
        if (!oldData) {
          return {
            pageParams: [],
            pages: []
          };
        }
        return {
          pageParams: oldData.pageParams,
          pages: oldData.pages.map((page) => ({
            data: {
              result:
                page?.data?.result?.filter((post) => post.id !== result.data) ??
                [],
              nextCursor: page?.data?.nextCursor
            }
          }))
        };
      });
    }
  });
};
