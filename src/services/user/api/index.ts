import { UserDto } from "../../../app/dto/userDto";
import { api } from "../../../lib/axios";
import { Result } from "../../../types";
const BASE_URL = "/api/users";
export const getUserRecommendations = async () => {
  const { data } = await api.get<Result<UserDto[]>>(
    `${BASE_URL}/recommendations`
  );
  return data;
};

export const followUser = async (userId: string) => {
  const { data } = await api.post<Result<UserDto["id"]>, { userId: string }>(
    `${BASE_URL}/${userId}/followers`
  );
  return data;
};

export const unFollowUser = async (userId: string) => {
  const { data } = await api.delete<Result<UserDto["id"]>>(
    `${BASE_URL}/${userId}/followers`
  );
  return data;
};
