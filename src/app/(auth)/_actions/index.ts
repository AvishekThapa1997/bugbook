"use server";

import { redirect, RedirectType } from "next/navigation";

import { authService } from "../../../services/auth";
import { IAuthService } from "../../../services/auth/IAuthService";
import { SignInSchema, SignUpSchema } from "../../../lib/validation";
import { Result } from "../../../types";
import { CONSTANTS } from "../../../constants";
import { AuthAdapter } from "../_provider";

class AuthActions implements AuthAdapter {
  constructor(private authService: IAuthService) {}

  async signUpUser(signUpSchema: SignUpSchema) {
    const { data, error } = await this.authService.signUpUser(signUpSchema);
    if (data) {
      redirect("/", RedirectType.replace);
    }
    return {
      error
    };
  }

  async signInUser(signInSchema: SignInSchema) {
    const { data, error } = await this.authService.signIn(signInSchema);
    if (data) {
      redirect("/");
    }
    return {
      error
    };
  }

  async checkUsernameAvailablity(username: string): Promise<Result<string>> {
    const { data } =
      await this.authService.checkForUsernameAvailability(username);
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
  }

  async signOut() {
    const { error } = await this.authService.signOut();
    if (error) {
      return { error };
    }
    redirect("/signin");
  }
}

const authActions = new AuthActions(authService);
export const signUp: typeof authActions.signUpUser =
  authActions.signUpUser.bind(authActions);
export const signIn: typeof authActions.signInUser =
  authActions.signInUser.bind(authActions);
export const signOut: typeof authActions.signOut =
  authActions.signOut.bind(authActions);
export const checkForUsernameAvailability: typeof authActions.checkUsernameAvailablity =
  authActions.checkUsernameAvailablity.bind(authActions);
