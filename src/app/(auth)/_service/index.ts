import "server-only";
import { CONSTANTS } from "@/src/constants";
import { createAdminClient, createSessionClient } from "@/src/lib/app-write";
import {
  parseSchema,
  signInSchema,
  SignInSchema,
  signUpSchema,
  SignUpSchema
} from "@/src/lib/validation";
import { FieldError, Result } from "@/src/types";
import { mapUser, User } from "@/src/types/user";

import { tryCatchWrapper } from "@/src/tryCatchWrapper";
import { ID } from "node-appwrite";
import { cache } from "react";
import { getResourceOwnerPermission } from "@/src/lib/app-write/permission";
import { UnauthorizedError } from "@/src/error";

export const signIn = tryCatchWrapper<
  Result<{ expiry: string; secret: string }>,
  SignInSchema
>(async (signInData: SignInSchema) => {
  const { account } = await createAdminClient();
  const { data: parsedSignInData, errors } = parseSchema(
    signInSchema,
    signInData
  );
  if (!parsedSignInData) {
    return {
      error: {
        message: CONSTANTS.ERROR_MESSAGE.INVALID_LOGIN_CREDENTIALS
      }
    };
  }
  const session = await account.createEmailPasswordSession(
    parsedSignInData.email,
    parsedSignInData.password
  );
  return {
    data: {
      expiry: session.expire,
      secret: session.secret
    }
  };
});

export const signUpUser = tryCatchWrapper<
  Result<
    { user: User; session: { expiry: string; secret: string } },
    FieldError<SignUpSchema>[]
  >,
  SignUpSchema
>(async (signUpData: SignUpSchema) => {
  const { data: parsedSignUpData, errors } = parseSchema(
    signUpSchema,
    signUpData
  );
  if (!parsedSignUpData) {
    return { error: errors };
  }
  const { email, password, name } = parsedSignUpData;
  const { account, database } = await createAdminClient();
  const appWriteUser = await account.create(ID.unique(), email, password, name);
  await database.createDocument(
    process.env.APPWRITE_DB_ID,
    process.env.APPWRITE_USER_COLLECTION_ID,
    appWriteUser.$id,
    {
      email: appWriteUser.email,
      name: appWriteUser.name
    },
    getResourceOwnerPermission(appWriteUser.$id)
  );
  const { data: sessioData } = await signIn({ email, password });
  const { expiry, secret } = sessioData!;
  const user = mapUser(appWriteUser);
  return {
    data: {
      user,
      session: {
        expiry,
        secret
      }
    }
  };
});

export const getLoggedInUser = cache(
  tryCatchWrapper<Result<User>>(async () => {
    const { account } = await createSessionClient();
    if (!account) {
      throw new UnauthorizedError();
    }

    const [_user, userSession] = await Promise.all([
      account.get(),
      account.getSession("current")
    ]);
    const isEmailProvider = userSession.provider === "email";
    const sessionExpiryDate = new Date(
      isEmailProvider
        ? userSession.expire
        : userSession.providerAccessTokenExpiry
    );
    // Check if atmost 1 hour left for token expiration otherwise update session
    const isSessionValid =
      sessionExpiryDate.getTime() - Date.now() > 24 * 60 * 60 * 1000;
    if (!isSessionValid) {
      await account.updateSession(userSession.$id);
    }
    const user = mapUser(_user);
    return {
      data: user
    };
  })
);

export const signOut = tryCatchWrapper(async () => {
  const { account } = await createSessionClient();
  if (!account) {
    return {
      error: {
        code: 401,
        message: CONSTANTS.ERROR_MESSAGE.NOT_AUTHORIZED
      }
    };
  }
  await account.deleteSession("current");
});
