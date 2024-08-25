"use client";
import { createContext, PropsWithChildren } from "react";
import { CreatePostSchema } from "../../../../lib/validation";
import { PostPaginationResult, Result } from "../../../../types";
import { PostDto } from "../../../dto/postDto";
import * as postActions from "../_actions";
import { TrendingTopicDto } from "../../../dto/trendingTopicDto";
import { getPosts, getTrendingTopics } from "../../../../services/post/api";

export interface PostAdapter {
  getPosts: () => Promise<Result<PostPaginationResult>>;
  createPost: (createPostSchema: CreatePostSchema) => Promise<Result<PostDto>>;
  getTrendingTopics: () => Promise<Result<TrendingTopicDto[]>>;
}

export const PostAdapterContext = createContext<PostAdapter | null>(null);

const postAdapter: PostAdapter = {
  getPosts: () => getPosts(),
  createPost: (createPostSchema: CreatePostSchema) =>
    postActions.createPost(createPostSchema),
  getTrendingTopics: () => getTrendingTopics()
};

export const PostServiceAdapterProvider = ({ children }: PropsWithChildren) => {
  return (
    <PostAdapterContext.Provider value={postAdapter}>
      {children}
    </PostAdapterContext.Provider>
  );
};
