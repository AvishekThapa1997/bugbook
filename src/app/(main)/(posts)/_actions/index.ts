"use server";

import { postService } from "../../../../services/post";
import { revalidatePath } from "next/cache";
import { CreatePostSchema } from "../../../../lib/validation";
import { Result } from "../../../../types";
import { PostDto } from "../../../dto/postDto";

export const createPost = async (
  createPostSchema: CreatePostSchema
): Promise<Result<PostDto>> => {
  const result = await postService.createPost(createPostSchema);
  if (result.data) {
    revalidatePath("/");
  }
  return result;
};
