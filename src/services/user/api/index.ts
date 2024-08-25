import { UserDto } from "../../../app/dto/userDto";
import { get } from "../../../lib/axios";
import { Result } from "../../../types";
const BASE_URL = "/users/api";
export const getUserRecommendations = async () => {
  const { data } = await get<Result<UserDto[]>>(`${BASE_URL}/recommendations`);
  return data;
};
