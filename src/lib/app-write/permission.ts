import { Permission, Role } from "node-appwrite";

export const getResourceOwnerPermission = (userId: string) => [
  Permission.read(Role.users()),
  Permission.delete(Role.user(userId)),
  Permission.update(Role.user(userId))
];
