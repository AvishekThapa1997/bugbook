"use client";
import { SignInSchema, SignUpSchema } from "@/src/lib/validation";
import {
  signOut,
  signUp,
  signIn,
  checkForUsernameAvailability as _checkForUsernameAvailability
} from "../_actions";
import * as React from "react";

type AuthAdapter = {
  signUpUser: (signUpSchema: SignUpSchema) => ReturnType<typeof signUp>;
  signInUser: (signInSchema: SignInSchema) => ReturnType<typeof signIn>;
  checkUsernameAvailablity: (
    username: string
  ) => ReturnType<typeof _checkForUsernameAvailability>;
};

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
    return _checkForUsernameAvailability(username);
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
