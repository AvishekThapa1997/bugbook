"use server";
import { authService } from "../../../services/auth";
import { createAuthActions } from "./createAuthActions";
export const { checkUsernameAvailablity, signIn, signOut, signUpUser } =
  createAuthActions(authService);
