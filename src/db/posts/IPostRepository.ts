import "server-only";
import { PostDto } from "../../app/dto/postDto";
import { TrendingTopicDto } from "../../app/dto/trendingTopicDto";
import { CreatePostSchema } from "../../lib/validation";
import { PostCursor, Result } from "../../types";
import { UserDto } from "../../app/dto/userDto";

export interface IPostRepository {
  getPosts: (
    currentLoggedInUserId: string,
    nextCursor: PostCursor,
    onlyForFollowers?: boolean
  ) => Promise<Result<PostDto[]>>;
  createPost: (
    currentLoggedInUserId: string,
    createPostSchema: CreatePostSchema,
    tags: string[]
  ) => Promise<Result<PostDto>>;
  getTrendingTopics: () => Promise<Result<TrendingTopicDto[]>>;
  getPostById: (postId: string) => Promise<PostDto | null>;
  deletePost: (
    postId: PostDto["id"],
    userId: UserDto["id"]
  ) => Promise<PostDto["id"]>;
}
