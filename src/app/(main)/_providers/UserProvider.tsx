"use client";

import { createContext, PropsWithChildren } from "react";
import { UserDto } from "../../dto/userDto";

export const UserContext = createContext<UserDto | null | undefined>(null);

interface UserProviderProps extends PropsWithChildren {
  user: UserDto | null | undefined;
}

export const UserProvider = ({ user, children }: UserProviderProps) => {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
