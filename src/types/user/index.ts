import { AppwriteUser } from "../../lib/app-write/types";
export interface User {
  id: string;
  email: string;
  name: string;
  profileImage?: string | null;
}

export function mapUser(appWriteUser: AppwriteUser): User {
  return {
    id: appWriteUser.$id,
    email: appWriteUser.email ?? "",
    name: appWriteUser.name ?? "",
    profileImage: ""
  };
}
