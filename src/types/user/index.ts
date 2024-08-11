import { AppwriteUser } from "@/src/lib/app-write/types";
import { Models } from "node-appwrite";
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
