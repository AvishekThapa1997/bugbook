import { Result } from "../../../../types";
import { UserDto } from "../../../dto/userDto";

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
