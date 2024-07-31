"use client";

import { User } from "@/src/types/user";
import { createContext, PropsWithChildren } from "react";

export const UserContext = createContext<User | null | undefined>(null);

interface UserProviderProps extends PropsWithChildren {
  user?: User;
}

export const UserProvider = ({ user, children }: UserProviderProps) => {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
