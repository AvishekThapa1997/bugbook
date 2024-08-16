"use client";

import { SignInSchema, SignUpSchema } from "../../../lib/validation";
import { signUp, signIn, checkForUsernameAvailability } from "../_actions";
import * as React from "react";

export interface AuthAdapter {
  signUpUser: (signUpSchema: SignUpSchema) => ReturnType<typeof signUp>;
  signInUser: (signInSchema: SignInSchema) => ReturnType<typeof signIn>;
  checkUsernameAvailablity: (
    username: string
  ) => ReturnType<typeof checkForUsernameAvailability>;
}

export const AuthServiceAdapterContext =
  React.createContext<AuthAdapter | null>(null);

const authAdapter: AuthAdapter = {
  async signUpUser(signUpSchema) {
    return signUp(signUpSchema);
  },
  async signInUser(signInSchema) {
    return signIn(signInSchema);
  },
  async checkUsernameAvailablity(username) {
    return checkForUsernameAvailability(username);
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
