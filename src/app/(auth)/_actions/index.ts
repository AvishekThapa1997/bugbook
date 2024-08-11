"use server";
import { SignInSchema, SignUpSchema } from "@/src/lib/validation";
import { redirect, RedirectType } from "next/navigation";
import { CONSTANTS } from "@/src/constants";
import { authService } from "../_service";
import { IAuthService } from "../_service/IAuthService";
import { Result } from "@/src/types";

class AuthActions {
  constructor(private authService: IAuthService) {}
  async signUp(signUpSchema: SignUpSchema) {
    const { data, error } = await this.authService.signUpUser(signUpSchema);
    if (data) {
      redirect("/", RedirectType.replace);
    }
    return {
      error
    };
  }

  async signIn(signInSchema: SignInSchema) {
    const { data, error } = await this.authService.signIn(signInSchema);
    if (data) {
      redirect("/");
    }
    return {
      error
    };
  }

  async checkForUsernameAvailability(
    username: string
  ): Promise<Result<string>> {
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
export const signUp = authActions.signUp.bind(authActions);
export const signIn = authActions.signIn.bind(authActions);
export const signOut = authActions.signOut.bind(authActions);
export const checkForUsernameAvailability =
  authActions.checkForUsernameAvailability.bind(authActions);
