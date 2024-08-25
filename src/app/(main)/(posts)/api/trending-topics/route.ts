import { NextRequest } from "next/server";
import { Result } from "../../../../../types";
import { TrendingTopicDto } from "../../../../dto/trendingTopicDto";
import { postService } from "../../../../../services/post";
import { handleError } from "../../../../../handleError";
import { getErrorCode } from "../../../../../lib/util";

export const GET = async (req: NextRequest) => {
  try {
    const result = await postService.getTrendingTopics();
    return Response.json(result, { status: 200 });
  } catch (err) {
    const result: Result<TrendingTopicDto[]> = {};
    const error = handleError(err);
    return Response.json(result, {
      status: getErrorCode(error)
    });
  }
};
