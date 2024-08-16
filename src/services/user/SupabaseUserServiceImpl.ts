import { BadRequestError } from "../../error/BadRequestError";
import { handleError } from "../../handleError";
import { Result } from "../../types";
import { UserDto } from "../../app/dto/userDto";
import { IUserService } from "./IUserService";
import { BaseService } from "../base";

class SupabaseUserServiceImpl extends BaseService implements IUserService {
  constructor() {
    super();
  }
  async getUserRecommendations() {
    const result: Result<UserDto[]> = {};
    try {
      await this.getLoggedInUser();
      const supabaseClient = this.getClient();
      const { data, error } = await supabaseClient.rpc(
        "get_user_recommendations"
      );
      if (error) {
        throw error;
      }
      result.data = data.map(
        ({ id, display_name, email, username }) =>
          ({
            id,
            email,
            username,
            displayName: display_name
          }) as UserDto
      );
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
      await this.getLoggedInUser();
      const supabaseClient = this.getClient();
      const check = [
        username ? `username.eq.${username.toLocaleLowerCase() ?? ""}` : "",
        email ? `email.eq.${email.toLocaleLowerCase() ?? ""}` : ""
      ]
        .filter(Boolean)
        .join(",");

      const { data, error } = await supabaseClient
        .from("profiles")
        .select("*")
        .or(check)
        .maybeSingle();

      if (error) {
        return result;
      }
      if (data) {
        result.data = {
          id: data.id,
          email: data.email,
          username: data.username,
          displayName: data.display_name
        };
        return result;
      }
    } catch (err) {
      result.error = handleError(err);
    }
    return result;
  }
}

const userService = new SupabaseUserServiceImpl() as IUserService;
export { userService };
