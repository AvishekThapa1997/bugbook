import "server-only";

import { getLoggedInUser } from "../../(auth)/_util";
import { Query } from "node-appwrite";
import { tryCatchWrapper } from "../../../tryCatchWrapper";
import { Result } from "../../../types";
import { User } from "../../../types/user";
import { createSessionClient } from "../../../lib/app-write";
import { ServerError } from "../../../error";

export const getUsers = tryCatchWrapper<Result<User[]>, { limit: number }>(
  async ({ limit }) => {
    const { data: user, error } = await getLoggedInUser();
    if (!user) {
      return { error };
    }
    const { database } = await createSessionClient();
    if (!database) {
      throw new ServerError();
    }
    const _users = await database.listDocuments(
      process.env.APPWRITE_DB_ID,
      process.env.APPWRITE_USER_COLLECTION_ID,
      [Query.notEqual("$id", user.id), Query.limit(limit)]
    );

    return {};
  }
);
