import "server-only";
import { PostDto } from "../../app/dto/postDto";
import { TrendingTopicDto } from "../../app/dto/trendingTopicDto";
import { CreatePostSchema } from "../../lib/validation";
import { PostCursor, Result } from "../../types";

export interface IPostRepository {
  getPosts: (
    currentLoggedInUserId: string,
    nextCursor: PostCursor
  ) => Promise<Result<PostDto[]>>;
  createPost: (
    currentLoggedInUserId: string,
    createPostSchema: CreatePostSchema,
    tags: string[]
  ) => Promise<Result<PostDto>>;
  getTrendingTopics: () => Promise<Result<TrendingTopicDto[]>>;
}
