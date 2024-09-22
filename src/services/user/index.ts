import "server-only";
import { BadRequestError } from "../../error/BadRequestError";
import { handleError } from "../../handleError";
import { Result } from "../../types";
import { UserDto } from "../../app/dto/userDto";
import { IUserService } from "./IUserService";

import { IUserRepository } from "../../db/users/IUserRepository";
import { userRepository } from "../../db/users";
import { getLoggedInUser as _getLoggedInUser } from "../../app/(auth)/_util";
import { UnauthorizedError } from "../../error";

export const createUserService = (
  userRepository: IUserRepository,
  getLoggedInUser: () => ReturnType<typeof _getLoggedInUser>
): IUserService => {
  const userService: IUserService = {
    async getUserRecommendations() {
      const result: Result<UserDto[]> = {};
      try {
        const loggedInUser = await getLoggedInUser();
        if (!loggedInUser) {
          throw new UnauthorizedError();
        }
        const userRecommendations = await userRepository.getUserRecommendations(
          loggedInUser.id
        );
        result.data = userRecommendations;
        return result;
      } catch (err) {
        result.error = handleError(err);
        return result;
      }
    },
    async getUserDetails({ email, username }) {
      const result: Result<UserDto> = {};
      try {
        if (!username && !email) {
          throw new BadRequestError();
        }
        const { data } = await userRepository.getUserDetails({
          email,
          username
        });
        result.data = data;
        return result;
      } catch (err) {
        result.error = handleError(err);
      }
      return result;
    },
    async followUser(userId) {
      const result: Result<UserDto["id"]> = {};
      try {
        const loggedInUser = await getLoggedInUser();
        if (!loggedInUser) {
          throw new UnauthorizedError();
        }
        const { id } = loggedInUser;
        const followedId = await userRepository.followUser(userId, id);
        if (followedId) {
          result.data = followedId;
        }
      } catch (err) {
        result.error = handleError(err);
      }
      return result;
    },
    async unFollowUser(userId) {
      const result: Result<UserDto["id"]> = {};
      try {
        const loggedInUser = await getLoggedInUser();
        if (!loggedInUser) {
          throw new UnauthorizedError();
        }
        const { id } = loggedInUser;
        const followedId = await userRepository.unFollowUser(userId, id);
        if (followedId) {
          result.data = followedId;
        }
      } catch (err) {
        result.error = handleError(err);
      }
      return result;
    }
  };
  return userService;
};

export const userService = createUserService(userRepository, _getLoggedInUser);
