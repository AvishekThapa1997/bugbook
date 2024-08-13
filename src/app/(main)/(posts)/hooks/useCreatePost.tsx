import { useMutationHandler } from "../../../../lib/react-query";
import { CreatePostSchema } from "../../../../lib/validation";
import { createPost } from "../actions";

export const useCreatePost = () => {
  return useMutationHandler({
    mutationFn: (createPostSchema: CreatePostSchema) =>
      createPost(createPostSchema)
  });
};
