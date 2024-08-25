import { TrendingTopicDto } from "../../../app/dto/trendingTopicDto";
import { handleError } from "../../../handleError";
import { get } from "../../../lib/axios";
import { PostCursor, PostPaginationResult, Result } from "../../../types";
const BASE_URL = "/api";
export const getPosts = async (cursor?: PostCursor) => {
  const searchParams = new URLSearchParams();
  if (cursor) {
    searchParams.set("id", cursor.id);
    searchParams.set("createdAt", cursor.createdAt);
  }
  const url = `${BASE_URL}/posts${searchParams.size > 0 ? `?${searchParams.toString()}` : ""}`;
  const { data } = await get<Result<PostPaginationResult>>(url);
  return data;
};

export const getTrendingTopics = async () => {
  const { data } = await get<Result<TrendingTopicDto[]>>(
    `${BASE_URL}/trending-topics`
  );
  return data;
};
