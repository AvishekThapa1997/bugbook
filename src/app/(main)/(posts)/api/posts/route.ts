import { NextRequest } from "next/server";
import { CONSTANTS } from "../../../../../constants";
import { handleError } from "../../../../../handleError";
import { postService } from "../../../../../services/post";
import { PostCursor, PostPaginationResult, Result } from "../../../../../types";
import { getErrorCode } from "../../../../../lib/util";

export const GET = async (request: NextRequest) => {
  const result: Result<PostPaginationResult> = {};
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id") ?? undefined;
  const createdAt = searchParams.get("createdAt") ?? undefined;
  const cursor: PostCursor = { createdAt: "", id: "" };
  if (id && createdAt) {
    cursor.id = id;
    cursor.createdAt = createdAt;
  }
  try {
    const { data, error } = await postService.getPosts(cursor);
    if (error) {
      throw error;
    }
    result.data = data;
    return Response.json(result, { status: 200 });
  } catch (err) {
    const error = handleError(err);
    result.error = error;
    return Response.json(result, {
      status: getErrorCode(error)
    });
  }
};
