import { extractHashTags } from "../../app/(main)/(posts)/_util";
import { PostDto } from "../../app/dto/postDto";
import { TrendingTopicDto } from "../../app/dto/trendingTopicDto";
import { CONSTANTS } from "../../constants";
import { UnauthorizedError } from "../../error";
import { BadRequestError } from "../../error/BadRequestError";
import { handleError } from "../../handleError";

import {
  createPostSchema,
  CreatePostSchema,
  parseSchema
} from "../../lib/validation";
import { Result } from "../../types";
import { BaseService } from "../base";
import { IPostService } from "./IPostService";

class SupabasePostServiceImpl extends BaseService implements IPostService {
  async getPosts(): Promise<Result<PostDto[]>> {
    const result: Result<PostDto[]> = {};
    try {
      await this.getLoggedInUser();
      const supabaseClient = this.getClient();
      const { data, error, status } = await supabaseClient.rpc("get_posts");
      if (error) {
        throw error;
      }
      if (status === 200 && Array.isArray(data) && data.length > 0) {
        result.data = data.map((post) => ({
          id: post.id,
          content: post.content,
          created_at: post.created_at,
          updated_at: post.updated_at,
          author: {
            id: post.author.id,
            displayName: post.author.display_name,
            username: post.author.username
          }
        }));
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
      const supabaseClient = this.getClient();
      await this.getLoggedInUser();
      const { data: createSchemaParsedData, errors } = parseSchema(
        createPostSchema,
        createPostData
      );
      if (!createSchemaParsedData) {
        throw new BadRequestError();
      }
      const tags = extractHashTags(createSchemaParsedData.content);
      const { data, error, status } = await supabaseClient.rpc(
        "create_post_with_hashtags",
        {
          hash_tags: tags,
          post_content: createSchemaParsedData.content
        }
      );
      if (error) {
        if (error.code === `${CONSTANTS.ERROR_STATUS_CODE.UNAUTHORIZED}`) {
          throw new UnauthorizedError();
        }
        throw error;
      }
      if (data && status === 200) {
        result.data = {
          id: data.id,
          content: data.content,
          created_at: data.created_at,
          updated_at: data.updated_at,
          author: {
            id: data.author.id,
            username: data.author.username,
            displayName: data.author.display_name
          }
        };
      }
    } catch (err) {
      result.error = handleError(err);
    }
    return result;
  }

  async getTrendingTopics(): Promise<Result<TrendingTopicDto[]>> {
    const result: Result<TrendingTopicDto[]> = {};
    try {
      await this.getLoggedInUser();
      const supabaseClient = this.getClient();
      const { data, status, error } = await supabaseClient.rpc(
        "get_trending_topics"
      );
      if (error) {
        throw error;
      }
      result.data = data.map(({ name, total_posts }) => ({
        name,
        total_posts: Number(total_posts)
      }));
      return result;
    } catch (err) {
      result.error = handleError(err);
    }
    return result;
  }
}

export const postService: IPostService = new SupabasePostServiceImpl();
