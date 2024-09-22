// @ts-nocheck
import {
  InfiniteData,
  QueryFilters,
  useQueryClient
} from "@tanstack/react-query";
import { useMutationHandler } from "../../../../lib/react-query";
import { CreatePostSchema } from "../../../../lib/validation";
import { usePostAdapter } from "./usePostAdapter";
import { PostCursor, PostPaginationResult, Result } from "../../../../types";

export const useCreatePost = () => {
  const { createPost } = usePostAdapter();
  const queryClient = useQueryClient();
  return useMutationHandler({
    mutationFn: (createPostSchema: CreatePostSchema) =>
      createPost(createPostSchema),
    async onSuccess(data) {
      const queryFilter: QueryFilters = { queryKey: ["post-feed"] };
      if (!data.error) {
        queryClient.cancelQueries(queryFilter);
        queryClient.setQueriesData<
          InfiniteData<Result<PostPaginationResult>, PostCursor | undefined>
        >(
          queryFilter,
          (
            oldData: InfiniteData<
              Result<PostPaginationResult>,
              PostCursor | undefined
            >
          ) => {
            const firstPage = oldData?.pages[0];
            if (firstPage) {
              const newPost = data.data!;
              return {
                pageParams: oldData.pageParams ?? [],
                pages: [
                  {
                    data: {
                      result: [newPost, ...(firstPage.data?.result ?? [])],
                      nextCursor: firstPage.data?.nextCursor
                    }
                  },
                  ...oldData.pages.slice(1)
                ]
              };
            }
          }
        );
      }
      queryClient.invalidateQueries({
        queryKey: queryFilter.queryKey,
        predicate(query) {
          return !query.state.data;
        }
      });
    }
  });
};
