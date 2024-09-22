import "server-only";
import { NextRequest } from "next/server";
import { IPostService, postService } from "../../../services/post";
import { PostCursor } from "../../../types";
import { getErrorCode } from "../../../lib/util";
import { PostDto } from "../../dto/postDto";

export const createPostEndPoints = (postService: IPostService) => {
  const getPosts = async (request: NextRequest) => {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id") ?? undefined;
    const createdAt = searchParams.get("createdAt") ?? undefined;
    const onlyForFollowers = searchParams.get("onlyForFollowers") ?? "";
    const cursor: PostCursor = { createdAt: "", id: "" };
    if (id && createdAt) {
      cursor.id = id;
      cursor.createdAt = createdAt;
    }
    const result = await postService.getPosts(cursor, !!onlyForFollowers);
    let status = 200;
    if (result.error) {
      status = getErrorCode(result.error);
    }
    return Response.json(result, { status });
  };
  const deletePost = async (
    request: NextRequest,
    { params }: { params: { postId: PostDto["id"] } }
  ) => {
    const result = await postService.deletePost(params.postId);
    if (!result.error) {
      return Response.json(result, { status: 200 });
    }
    return Response.json(result, { status: getErrorCode(result.error) });
  };

  const getTrendingTopics = async (request: NextRequest) => {
    const result = await postService.getTrendingTopics();
    if (!result.error) {
      return Response.json(result, { status: 200 });
    }
    return Response.json(result, { status: getErrorCode(result.error) });
  };

  const getFollowerPosts = async (request: NextRequest) => {
    return Response.json([], { status: 200 });
  };
  const endpoints = {
    trendingTopics: {
      GET: getTrendingTopics
    },
    postId: {
      DELETE: deletePost
    },
    posts: {
      GET: getPosts
    },
    followerPost: {
      GET: getFollowerPosts
    }
  };
  return endpoints;
};

export const { trendingTopics, posts, postId } =
  createPostEndPoints(postService);
