import "server-only";
import { redirect, RedirectType } from "next/navigation";
import { IAuthService } from "../../../services/auth/IAuthService";
import { SignInSchema, SignUpSchema } from "../../../lib/validation";
import { CONSTANTS } from "../../../constants";

export const createAuthActions = (authService: IAuthService) => {
  const signUpUser = async (signUpSchema: SignUpSchema) => {
    const { data, error } = await authService.signUpUser(signUpSchema);
    if (data) {
      redirect("/", RedirectType.replace);
    }
    return {
      error
    };
  };

  const signIn = async (signInSchema: SignInSchema) => {
    const { data, error } = await authService.signIn(signInSchema);
    if (data) {
      redirect("/");
    }
    return {
      error
    };
  };

  const checkUsernameAvailablity = async (username: string) => {
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

  const signOut = async () => {
    const { error } = await authService.signOut();
    if (error) {
      return { error };
    }
    redirect("/signin");
  };
  return { signUpUser, signIn, checkUsernameAvailablity, signOut };
};
