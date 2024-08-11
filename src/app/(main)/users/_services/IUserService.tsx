import { UserDto } from "@/src/app/dto/userDto";
import { Result } from "@/src/types";

export interface IUserService {
  getUserDetails({
    email,
    username
  }: {
    email?: UserDto["email"];
    username?: UserDto["username"];
  }): Promise<Result<UserDto>>;

  getUserRecommendations(): Promise<Result<UserDto[]>>;
}
