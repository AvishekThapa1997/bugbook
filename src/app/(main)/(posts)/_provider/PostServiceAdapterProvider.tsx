"use client";
import { createContext, PropsWithChildren } from "react";
import { CreatePostSchema } from "../../../../lib/validation";
import { PostCursor, PostPaginationResult, Result } from "../../../../types";
import { PostDto } from "../../../dto/postDto";
import * as postActions from "../_actions";
import { TrendingTopicDto } from "../../../dto/trendingTopicDto";
import * as api from "../../../../services/post/api";

export interface PostAdapter {
  getPosts: (
    cursor?: PostCursor,
    onlyForFollowers?: boolean
  ) => Promise<Result<PostPaginationResult>>;
  createPost: (createPostSchema: CreatePostSchema) => Promise<Result<PostDto>>;
  getTrendingTopics: () => Promise<Result<TrendingTopicDto[]>>;
  deletePost: (postId: string) => Promise<Result<string>>;
}

export const PostAdapterContext = createContext<PostAdapter | null>(null);

const postAdapter: PostAdapter = {
  getPosts: (cursor?: PostCursor, onlyForFollowers?: boolean) =>
    api.getPosts(cursor, onlyForFollowers),
  createPost: (createPostSchema: CreatePostSchema) =>
    postActions.createPost(createPostSchema),
  getTrendingTopics: () => api.getTrendingTopics(),
  deletePost: (postId: string) => api.deletePost(postId)
};

export const PostServiceAdapterProvider = ({ children }: PropsWithChildren) => {
  return (
    <PostAdapterContext.Provider value={postAdapter}>
      {children}
    </PostAdapterContext.Provider>
  );
};
