import "server-only";
import { tryCatchWrapper } from "@/src/tryCatchWrapper";
import { Result } from "@/src/types";
import { mapUser, User } from "@/src/types/user";
import { getLoggedInUser } from "../../(auth)/_util";
import { createSessionClient } from "@/src/lib/app-write";
import { ServerError } from "@/src/error";
import { Query } from "node-appwrite";

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
    const users = _users.documents.map(mapUser);
    return {
      data: users
    };
  }
);
