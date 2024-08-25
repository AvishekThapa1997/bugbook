import { PostDto } from "../../app/dto/postDto";
import { TrendingTopicDto } from "../../app/dto/trendingTopicDto";
import { CreatePostSchema } from "../../lib/validation";
import { PostCursor, PostPaginationResult, Result } from "../../types";

export interface IPostService {
  getPosts: (nextCursor: PostCursor) => Promise<Result<PostPaginationResult>>;
  createPost: (createPostSchema: CreatePostSchema) => Promise<Result<PostDto>>;
  getTrendingTopics: () => Promise<Result<TrendingTopicDto[]>>;
}
