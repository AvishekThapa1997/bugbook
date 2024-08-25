"use server";

import { redirect, RedirectType } from "next/navigation";

import { authService } from "../../../services/auth";
import { IAuthService } from "../../../services/auth/IAuthService";
import { SignInSchema, SignUpSchema } from "../../../lib/validation";
import { Result } from "../../../types";
import { CONSTANTS } from "../../../constants";
import { AuthAdapter } from "../_provider";

export const signUpUser = async (signUpSchema: SignUpSchema) => {
  const { data, error } = await authService.signUpUser(signUpSchema);
  if (data) {
    redirect("/", RedirectType.replace);
  }
  return {
    error
  };
};

export const signIn = async (signInSchema: SignInSchema) => {
  const { data, error } = await authService.signIn(signInSchema);
  if (data) {
    redirect("/");
  }
  return {
    error
  };
};

export const checkUsernameAvailablity = async (username: string) => {
  const { data } = await authService.checkForUsernameAvailability(username);
  if (data) {
    return {
      error: {
        code: CONSTANTS.ERROR_STATUS_CODE.CONFLICT,
        message: CONSTANTS.ERROR_MESSAGE.USERNAME_IS_NOT_AVAILABLE
      }
    };
  }
  return {
    data: `${username} is available.`
  };
};

export const signOut = async () => {
  const { error } = await authService.signOut();
  if (error) {
    return { error };
  }
  redirect("/signin");
};
