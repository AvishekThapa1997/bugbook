import "server-only";
import { BadRequestError } from "../../error/BadRequestError";
import { handleError } from "../../handleError";
import { Result } from "../../types";
import { UserDto } from "../../app/dto/userDto";
import { IUserService } from "./IUserService";
import { BaseService } from "../base";
import { IUserRepository } from "../../db/users/IUserRepository";
import { userRepository } from "../../db/users";

class SupabaseUserServiceImpl extends BaseService implements IUserService {
  private constructor(private userRepository: IUserRepository) {
    super();
  }
  async getUserRecommendations() {
    const result: Result<UserDto[]> = {};
    try {
      await this.getLoggedInUser();
      const { data } = await this.userRepository.getUserRecommendations();
      result.data = data;
      return result;
    } catch (err) {
      result.error = handleError(err);
      return result;
    }
  }

  async getUserDetails({
    email,
    username
  }: {
    email?: UserDto["email"];
    username?: UserDto["username"];
  }): Promise<Result<UserDto>> {
    const result: Result<UserDto> = {};
    try {
      if (!username && !email) {
        throw new BadRequestError();
      }
      const { data } = await this.userRepository.getUserDetails({
        email,
        username
      });
      result.data = data;
      return result;
    } catch (err) {
      result.error = handleError(err);
    }
    return result;
  }
}

const userService = SupabaseUserServiceImpl.getInstance(
  userRepository
) as IUserService;
export * from "./IUserService";
export { userService };
