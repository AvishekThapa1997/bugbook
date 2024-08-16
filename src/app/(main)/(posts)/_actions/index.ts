"use server";

import { IPostService, postService } from "../../../../services/post";

import { revalidatePath } from "next/cache";

import { CreatePostSchema } from "../../../../lib/validation";
import { Result } from "../../../../types";
import { PostDto } from "../../../dto/postDto";
import { PostAdapter } from "../_provider";

class PostAction implements PostAdapter {
  constructor(private postService: IPostService) {}
  async createPost(
    createPostSchema: CreatePostSchema
  ): Promise<Result<PostDto>> {
    const result = await this.postService.createPost(createPostSchema);
    if (result.data) {
      revalidatePath("/");
    }
    return result;
  }
  async getPosts(): Promise<Result<PostDto[]>> {
    return postService.getPosts();
  }
  async getTrendingTopics() {
    return postService.getTrendingTopics();
  }
}

const postAction = new PostAction(postService);
export const createPost: typeof postAction.createPost =
  postAction.createPost.bind(postAction);
export const getPosts: typeof postAction.getPosts =
  postAction.getPosts.bind(postAction);
export const getTrendingTopics: typeof postAction.getTrendingTopics =
  postAction.getTrendingTopics.bind(postAction);
