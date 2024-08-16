import { UserDto } from "./userDto";

export interface PostDto {
  id: string;
  content: string;
  author: Pick<UserDto, "id" | "displayName" | "username">;
  updated_at: string;
  created_at: string;
}
