import "server-only";
import { extractHashTags } from "../../app/(main)/(posts)/_util";
import { PostDto } from "../../app/dto/postDto";
import { TrendingTopicDto } from "../../app/dto/trendingTopicDto";
import { CONSTANTS } from "../../constants";
import { postRepository } from "../../db/posts";
import { IPostRepository } from "../../db/posts/IPostRepository";
import { BadRequestError } from "../../error/BadRequestError";
import { handleError } from "../../handleError";

import {
  createPostSchema,
  CreatePostSchema,
  parseSchema
} from "../../lib/validation";
import { PostCursor, PostPaginationResult, Result } from "../../types";
import { BaseService } from "../base";
import { IPostService } from "./IPostService";

class SupabasePostServiceImpl extends BaseService implements IPostService {
  private constructor(private postRepository: IPostRepository) {
    super();
  }
  async getPosts(cursor: PostCursor): Promise<Result<PostPaginationResult>> {
    const result: Result<PostPaginationResult> = {};
    try {
      const { id: loggedInUserId } = await this.getLoggedInUser();
      const { data } = await this.postRepository.getPosts(
        loggedInUserId,
        cursor
      );
      if (Array.isArray(data) && data.length > 0) {
        let nextCursor: PostCursor | undefined;
        if (data.length > CONSTANTS.PAGINATION_LIMIT) {
          const lastPost = data.pop();
          if (lastPost) {
            nextCursor = {
              id: lastPost.id,
              createdAt: lastPost.created_at
            };
          }
        }
        result.data = {
          result: data,
          nextCursor
        };
        return result;
      }
    } catch (err) {
      result.error = handleError(err);
    }
    return result;
  }

  async createPost(createPostData: CreatePostSchema): Promise<Result<PostDto>> {
    const result: Result<PostDto> = {};
    try {
      const { id: loggedInUserId } = await this.getLoggedInUser();
      const { data: createSchemaParsedData } = parseSchema(
        createPostSchema,
        createPostData
      );
      if (!createSchemaParsedData) {
        throw new BadRequestError();
      }
      const { content } = createSchemaParsedData;
      const tags = extractHashTags(createSchemaParsedData.content);
      const { data } = await this.postRepository.createPost(
        loggedInUserId,
        { content },
        tags
      );
      result.data = data;
    } catch (err) {
      result.error = handleError(err);
    }
    return result;
  }

  async getTrendingTopics(): Promise<Result<TrendingTopicDto[]>> {
    const result: Result<TrendingTopicDto[]> = {};
    try {
      await this.getLoggedInUser();
      const { data } = await this.postRepository.getTrendingTopics();
      result.data = data;
      return result;
    } catch (err) {
      result.error = handleError(err);
    }
    return result;
  }
}

const postService = SupabasePostServiceImpl.getInstance(
  postRepository
) as IPostService;
export { postService };
export * from "./IPostService";
