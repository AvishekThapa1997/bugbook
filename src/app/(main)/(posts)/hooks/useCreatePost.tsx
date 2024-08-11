import { useMutationHandler } from "@/src/lib/react-query";
import { createPost } from "../actions";
import { CreatePostSchema } from "@/src/lib/validation";

export const useCreatePost = () => {
  return useMutationHandler({
    mutationFn: (createPostSchema: CreatePostSchema) =>
      createPost(createPostSchema)
  });
};
