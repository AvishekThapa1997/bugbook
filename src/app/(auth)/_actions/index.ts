"use server";

import { SignInSchema, SignUpSchema } from "@/src/lib/validation";
import * as authService from "../_service";
import { redirect, RedirectType } from "next/navigation";
import { cookies } from "next/headers";
import { CONSTANTS } from "@/src/constants";

export const signUp = async (signUpSchema: SignUpSchema) => {
  const { data, error } = await authService.signUpUser(signUpSchema);
  const { user, session } = data ?? {};
  if (user && session) {
    cookies().set(CONSTANTS.SESSION.NAME, session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      expires: new Date(session.expiry)
    });
    redirect("/");
  }
  return {
    error
  };
};

export const signIn = async (signInSchema: SignInSchema) => {
  const { data, error } = await authService.signIn(signInSchema);
  const { secret, expiry } = data ?? {};
  if (secret && expiry) {
    cookies().set(CONSTANTS.SESSION.NAME, secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      expires: new Date(expiry)
    });
    redirect("/");
  }
  return {
    error
  };
};

export const signOut = async () => {
  await authService.signOut();
  cookies().delete(CONSTANTS.SESSION.NAME);
  redirect("/signin", RedirectType.replace);
};
