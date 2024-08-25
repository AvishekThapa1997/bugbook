export interface UserDto {
  id: string;
  email?: string | null;
  displayName: string;
  username: string;
  profileImage?: string;
}
