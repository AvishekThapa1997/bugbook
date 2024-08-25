"use client";
import { createContext, PropsWithChildren } from "react";
import { Result } from "../../../../types";

import { UserDto } from "../../../dto/userDto";
import { getUserRecommendations } from "../../../../services/user/api";

export interface UserAdapter {
  getUserRecommendations: () => Promise<Result<UserDto[]>>;
}

export const UserAdapterContext = createContext<UserAdapter | null>(null);

const userAdapter: UserAdapter = {
  getUserRecommendations: () => getUserRecommendations()
};

export const UserServiceAdapterProvider = ({ children }: PropsWithChildren) => {
  return (
    <UserAdapterContext.Provider value={userAdapter}>
      {children}
    </UserAdapterContext.Provider>
  );
};
