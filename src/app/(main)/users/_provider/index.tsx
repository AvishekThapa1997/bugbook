"use client";
import { createContext, PropsWithChildren } from "react";
import { Result } from "../../../../types";

import { UserDto } from "../../../dto/userDto";
import {
  getUserRecommendations,
  followUser,
  unFollowUser
} from "../../../../services/user/api";

export interface UserAdapter {
  getUserRecommendations: () => Promise<Result<UserDto[]>>;
  followUser: (userId: string) => Promise<Result<UserDto["id"]>>;
  unFollowUser: (userId: string) => Promise<Result<UserDto["id"]>>;
}

export const UserAdapterContext = createContext<UserAdapter | null>(null);

const userAdapter: UserAdapter = {
  getUserRecommendations: () => getUserRecommendations(),
  followUser: (userId) => followUser(userId),
  unFollowUser: (userId) => unFollowUser(userId)
};

export const UserServiceAdapterProvider = ({ children }: PropsWithChildren) => {
  return (
    <UserAdapterContext.Provider value={userAdapter}>
      {children}
    </UserAdapterContext.Provider>
  );
};
