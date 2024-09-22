import "server-only";
import { UserDto } from "../../app/dto/userDto";
import { FieldError, Result } from "../../types";
import { SignUpSchema } from "../../lib/validation";

export interface IUserRepository {
  getUserDetails({
    email,
    username
  }: {
    email?: UserDto["email"];
    username?: UserDto["username"];
  }): Promise<Result<UserDto>>;

  getUserRecommendations(userId: UserDto["id"]): Promise<UserDto[] | undefined>;
  checkForUsernameAvailability(username: string): Promise<Result<UserDto>>;
  signUpUser: (signUpSchema: SignUpSchema) => Promise<Result<UserDto>>;
  signIn: ({
    email,
    password
  }: {
    email: string;
    password: string;
  }) => Promise<Result<UserDto>>;
  getLoggedInUser: () => Promise<Result<UserDto>>;
  signOut: () => Promise<Result<void>>;
  followUser: (
    userId: UserDto["id"],
    loggedInUserId: UserDto["id"]
  ) => Promise<UserDto["id"] | null>;
  unFollowUser: (
    userId: UserDto["id"],
    loggedInUserId: UserDto["id"]
  ) => Promise<UserDto["id"] | null>;
}
