"use client";

import { SignInSchema, SignUpSchema } from "../../../lib/validation";
import { signUpUser, signIn, checkUsernameAvailablity } from "../_actions";
import * as React from "react";

export interface AuthAdapter {
  signUpUser: (signUpSchema: SignUpSchema) => ReturnType<typeof signUpUser>;
  signInUser: (signInSchema: SignInSchema) => ReturnType<typeof signIn>;
  checkUsernameAvailablity: (
    username: string
  ) => ReturnType<typeof checkUsernameAvailablity>;
}

export const AuthServiceAdapterContext =
  React.createContext<AuthAdapter | null>(null);

const authAdapter: AuthAdapter = {
  async signUpUser(signUpSchema) {
    return signUpUser(signUpSchema);
  },
  async signInUser(signInSchema) {
    return signIn(signInSchema);
  },
  async checkUsernameAvailablity(username) {
    return checkUsernameAvailablity(username);
  }
};

const AuthServiceAdapterProvider = ({ children }: React.PropsWithChildren) => {
  return (
    <AuthServiceAdapterContext.Provider value={authAdapter}>
      {children}
    </AuthServiceAdapterContext.Provider>
  );
};

export { AuthServiceAdapterProvider };
