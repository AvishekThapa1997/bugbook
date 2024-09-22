import { TrendingTopicDto } from "../../../app/dto/trendingTopicDto";
import { api } from "../../../lib/axios";
import { PostCursor, PostPaginationResult, Result } from "../../../types";
const BASE_URL = "/api/posts";
export const getPosts = async (
  cursor?: PostCursor,
  onlyForFollowers?: boolean
) => {
  const searchParams = new URLSearchParams();
  if (cursor) {
    searchParams.set("id", cursor.id);
    searchParams.set("createdAt", cursor.createdAt);
  }
  if (onlyForFollowers) {
    searchParams.set("onlyForFollowers", "true");
  }
  const url = `${BASE_URL}${searchParams.size > 0 ? `?${searchParams.toString()}` : ""}`;
  const { data } = await api.get<Result<PostPaginationResult>>(url);
  return data;
};

export const getTrendingTopics = async () => {
  const { data } = await api.get<Result<TrendingTopicDto[]>>(
    `${BASE_URL}/trending-topics`
  );
  return data;
};

export const deletePost = async (postId: string) => {
  const { data } = await api.delete<Result<string>>(`${BASE_URL}/${postId}`);
  return data;
};
