import { Result } from "../../types";
import { UserDto } from "../../app/dto/userDto";

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
