import "server-only";
import { UserDto } from "../../app/dto/userDto";
import { SignUpSchema } from "../../lib/validation";
import { Result } from "../../types";
import { BaseRepository } from "../base/BaseRepository";
import { IUserRepository } from "./IUserRepository";

class SupabaseUserRepository extends BaseRepository implements IUserRepository {
  private constructor() {
    super();
  }
  async followUser(
    userId: UserDto["id"],
    loggedInUserId: UserDto["id"]
  ): Promise<UserDto["id"]> {
    const supabaseClient = this.getClient();
    const { data, status, error } = await supabaseClient
      .from("follows")
      .insert({ follower_id: loggedInUserId, followed_id: userId })
      .select()
      .single();
    if (error) {
      throw error;
    }
    if (status === 201) {
      return data.followed_id;
    }
    return "";
  }
  async unFollowUser(
    userId: UserDto["id"],
    loggedInUserId: UserDto["id"]
  ): Promise<UserDto["id"]> {
    const supabaseClient = this.getClient();
    const { data, status, error } = await supabaseClient
      .from("follows")
      .delete()
      .eq("follower_id", loggedInUserId)
      .eq("followed_id", userId)
      .select()
      .single();
    if (error) {
      throw error;
    }
    if (status === 200) {
      return data.followed_id;
    }
    return "";
  }

  async checkForUsernameAvailability(
    username: string
  ): Promise<Result<UserDto>> {
    return this.getUserDetails({ username });
  }

  async getUserDetails({
    email,
    username
  }: {
    email?: UserDto["email"];
    username?: UserDto["username"];
  }): Promise<Result<UserDto>> {
    const result: Result<UserDto> = {};
    const supabaseClient = this.getClient();
    const check = [
      username ? `username.eq.${username ?? ""}` : "",
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
      throw error;
    }
    if (data) {
      result.data = {
        id: data.id,
        email: data.email,
        username: data.username,
        displayName: data.display_name
      };
    }

    return result;
  }

  async getUserRecommendations(userId: UserDto["id"]): Promise<UserDto[]> {
    const supabaseClient = this.getClient();
    const { data, error } = await supabaseClient.rpc(
      "get_user_recommendations"
    );

    if (error) {
      throw error;
    }
    if (data) {
      return data.map(
        ({ id, display_name, email, username, isFollowedbyLoggedInUser }) =>
          ({
            id,
            email,
            username,
            displayName: display_name,
            isFollowedbyLoggedInUser
          }) as UserDto
      );
    }
    return [];
  }

  async signUpUser(signUpSchema: SignUpSchema): Promise<Result<UserDto>> {
    const result: Result<UserDto> = {};
    const { email, name, password, username } = signUpSchema;
    const supabaseClient = this.getClient();
    const { data, error } = await supabaseClient.auth.signUp({
      email: email.toLocaleLowerCase(),
      password,
      options: {
        data: {
          username,
          display_name: name
        }
      }
    });
    if (error) {
      throw error;
    }
    const { user } = data ?? {};
    if (user) {
      result.data = {
        id: user.id,
        email: user.email,
        displayName: user.user_metadata.display_name,
        username: user.user_metadata.username
      };
    }
    return result;
  }

  async signIn({
    email,
    password
  }: {
    email: string;
    password: string;
  }): Promise<Result<UserDto>> {
    const result: Result<UserDto> = {};
    const supabaseClient = this.getClient();
    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email,
      password
    });
    if (error) {
      throw error;
    }
    const { user } = data ?? {};
    if (user) {
      const { id, email: userEmail, user_metadata } = user;
      result.data = {
        id,
        email: userEmail,
        displayName: user_metadata.display_name,
        username: user_metadata.username
      };
    }
    return result;
  }

  async getLoggedInUser(): Promise<Result<UserDto>> {
    const result: Result<UserDto> = {};
    const supabaseClient = this.getClient();
    const { data, error } = await supabaseClient.auth.getUser();
    if (error) {
      throw error;
    }
    const { user } = data;
    if (user) {
      const { id, email, user_metadata } = user;
      result.data = {
        id,
        displayName: user_metadata.display_name,
        username: user_metadata.username,
        email: email!
      };
    }
    return result;
  }

  async signOut(): Promise<Result<void>> {
    const result: Result<void> = {};
    const supabaseClient = this.getClient();
    const { error } = await supabaseClient.auth.signOut();
    if (error) {
      throw error;
    }
    return result;
  }
}

const userRepository = SupabaseUserRepository.getInstance() as IUserRepository;
export { userRepository };
