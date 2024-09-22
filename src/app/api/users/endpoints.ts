import { NextRequest } from "next/server";
import { getErrorCode } from "../../../lib/util";
import { IUserService } from "../../../services/user/IUserService";
import { UserDto } from "../../dto/userDto";
import { userService } from "../../../services/user";

const createEndPoints = (userService: IUserService) => {
  const getUserRecommendations = async (req: NextRequest) => {
    const result = await userService.getUserRecommendations();
    if (result.error) {
      return Response.json(result, { status: getErrorCode(result.error) });
    }
    return Response.json(result, { status: 200 });
  };

  const followUser = async (
    req: NextRequest,
    { params }: { params: { userId: string } }
  ) => {
    const { userId } = params;
    const result = await userService.followUser(userId);
    if (result.error) {
      return Response.json(result, { status: getErrorCode(result.error) });
    }
    return Response.json(result, { status: 200 });
  };

  const unFollowUser = async (
    req: NextRequest,
    { params }: { params: { userId: string } }
  ) => {
    const { userId } = params;
    const result = await userService.unFollowUser(userId);
    if (result.error) {
      return Response.json(result, { status: getErrorCode(result.error) });
    }
    return Response.json(result, { status: 200 });
  };
  return {
    recommendations: {
      GET: getUserRecommendations
    },
    followers: {
      POST: followUser,
      DELETE: unFollowUser
    }
  };
};

export const { followers, recommendations } = createEndPoints(userService);
