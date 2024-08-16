import { useMutationHandler } from "../../../../lib/react-query";
import { CreatePostSchema } from "../../../../lib/validation";
import { usePostAdapter } from "./usePostAdapter";

export const useCreatePost = () => {
  const { createPost } = usePostAdapter();
  return useMutationHandler({
    mutationFn: (createPostSchema: CreatePostSchema) =>
      createPost(createPostSchema)
  });
};
