import { PostDto } from "../../app/dto/postDto";
import { TrendingTopicDto } from "../../app/dto/trendingTopicDto";
import { CreatePostSchema } from "../../lib/validation";
import { PostCursor, PostPaginationResult, Result } from "../../types";

export interface IPostService {
  getPosts: (
    nextCursor: PostCursor,
    onlyFollowersPost?: boolean
  ) => Promise<Result<PostPaginationResult>>;
  createPost: (createPostSchema: CreatePostSchema) => Promise<Result<PostDto>>;
  getTrendingTopics: () => Promise<Result<TrendingTopicDto[]>>;
  deletePost: (postId: PostDto["id"]) => Promise<Result<PostDto["id"]>>;
}
