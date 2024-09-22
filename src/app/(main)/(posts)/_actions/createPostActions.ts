import "server-only";
import { revalidatePath } from "next/cache";
import { CreatePostSchema } from "../../../../lib/validation";
import { Result } from "../../../../types";
import { PostDto } from "../../../dto/postDto";
import { IPostService } from "../../../../services/post";

export const createPostActions = (postService: IPostService) => {
  const createPost = async (
    createPostSchema: CreatePostSchema
  ): Promise<Result<PostDto>> => {
    const result = await postService.createPost(createPostSchema);
    if (result.data) {
      revalidatePath("/");
    }
    return result;
  };
  return { createPost };
};
