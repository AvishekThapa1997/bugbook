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

import { IPostService } from "./IPostService";
import { getLoggedInUser as _getLoggedInUser } from "../../app/(auth)/_util";
import { NotFoundError, UnauthorizedError } from "../../error";

export * from "./IPostService";

const createPostService = (
  postRepository: IPostRepository,
  getLoggedInUser: () => ReturnType<Awaited<typeof _getLoggedInUser>>
): IPostService => {
  async function getPosts(
    cursor: PostCursor,
    onlyFollowersPost?: boolean
  ): Promise<Result<PostPaginationResult>> {
    const result: Result<PostPaginationResult> = {};
    try {
      const loggedInUser = await getLoggedInUser();
      if (!loggedInUser) {
        throw new UnauthorizedError();
      }
      const { id: loggedInUserId } = loggedInUser;
      const { data } = await postRepository.getPosts(
        loggedInUserId,
        cursor,
        onlyFollowersPost
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
  async function createPost(
    createPostData: CreatePostSchema
  ): Promise<Result<PostDto>> {
    const result: Result<PostDto> = {};
    try {
      const loggedInUser = await getLoggedInUser();
      if (!loggedInUser) {
        throw new UnauthorizedError();
      }
      const { id: loggedInUserId } = loggedInUser;
      const { data: createSchemaParsedData } = parseSchema(
        createPostSchema,
        createPostData
      );
      if (!createSchemaParsedData) {
        throw new BadRequestError();
      }
      const { content } = createSchemaParsedData;
      const tags = extractHashTags(createSchemaParsedData.content);
      const { data } = await postRepository.createPost(
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
  async function getTrendingTopics(): Promise<Result<TrendingTopicDto[]>> {
    const result: Result<TrendingTopicDto[]> = {};
    try {
      const loggedInUser = await getLoggedInUser();
      if (!loggedInUser) {
        throw new UnauthorizedError();
      }
      const { data } = await postRepository.getTrendingTopics();
      result.data = data;
      return result;
    } catch (err) {
      result.error = handleError(err);
    }
    return result;
  }
  async function deletePost(postId: PostDto["id"]) {
    const result: Result<PostDto["id"]> = {};
    try {
      const loggedInUser = await getLoggedInUser();
      if (!loggedInUser) {
        throw new UnauthorizedError();
      }
      const { id } = loggedInUser;
      const post = await postRepository.getPostById(postId);
      if (!post) {
        throw new NotFoundError("Post not found.");
      }
      if (post.author.id !== id) {
        throw new UnauthorizedError();
      }
      const data = await postRepository.deletePost(post.id, post.author.id);
      if (data) {
        result.data = data;
      }
      return result;
    } catch (err) {
      result.error = handleError(err);
      return result;
    }
  }

  return {
    getPosts,
    createPost,
    getTrendingTopics,
    deletePost
  };
};

export const postService = createPostService(postRepository, _getLoggedInUser);
