import { handleError } from "../../../../../handleError";
import { getErrorCode } from "../../../../../lib/util";
import { userService } from "../../../../../services/user";
import { Result } from "../../../../../types";
import { UserDto } from "../../../../dto/userDto";

export const GET = async (req: Request) => {
  try {
    const result = await userService.getUserRecommendations();
    return Response.json(result, { status: 200 });
  } catch (err) {
    const result: Result<UserDto[]> = {};
    const error = handleError(err);
    result.error = error;
    return Response.json(result, { status: getErrorCode(error) });
  }
};
