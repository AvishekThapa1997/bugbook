"use client";
import { createContext, PropsWithChildren } from "react";
import { Result } from "../../../../types";
import { getUserRecommendations } from "../_actions";
import { UserDto } from "../../../dto/userDto";

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
