import { PostDto } from "../../app/dto/postDto";
import { TrendingTopicDto } from "../../app/dto/trendingTopicDto";
import { CreatePostSchema } from "../../lib/validation";
import { Result } from "../../types";

export interface IPostService {
  getPosts: () => Promise<Result<PostDto[]>>;
  createPost: (createPostSchema: CreatePostSchema) => Promise<Result<PostDto>>;
  getTrendingTopics: () => Promise<Result<TrendingTopicDto[]>>;
}
