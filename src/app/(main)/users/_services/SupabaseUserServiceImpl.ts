import { UserDto } from "@/src/app/dto/userDto";
import { Result } from "@/src/types";
import { IUserService } from "./";
import { handleError } from "@/src/handleError";
import { BadRequestError } from "@/src/error/BadRequestError";
import { SupabaseClient } from "@/src/lib/supabase/SupabaseClient";

class SupabaseUserServiceImpl extends SupabaseClient implements IUserService {
  constructor() {
    super();
  }
  async getUserRecommendations() {
    const result: Result<UserDto[]> = {};
    try {
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
      const supabaseClient = this.getClient();

      const check = [
        username ? `username.eq.${username ?? ""}` : "",
        email ? `email.eq.${email ?? ""}` : ""
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
