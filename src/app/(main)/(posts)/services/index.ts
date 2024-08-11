import { cache } from "react";
import { extractHashTags } from "../util";
import { tryCatchWrapper } from "../../../../tryCatchWrapper";
import { HashTag, Result } from "../../../../types";
import { mapPost, Post } from "../types/posts";
import { getLoggedInUser } from "../../../(auth)/_util";
import { createSessionClient } from "../../../../lib/app-write";
import { ServerError, UnauthorizedError } from "../../../../error";
import { Databases, ID, Permission, Query, Role } from "node-appwrite";
import { CreatePostSchema } from "../../../../lib/validation";
import { getResourceOwnerPermission } from "../../../../lib/app-write/permission";

export const getPosts = cache(
  tryCatchWrapper<Result<Post[]>>(async () => {
    const { data: user } = await getLoggedInUser();
    const { database } = await createSessionClient();
    if (!user) {
      throw new UnauthorizedError();
    }
    if (!database) {
      throw new ServerError();
    }
    const _posts = await database.listDocuments(
      process.env.APPWRITE_DB_ID,
      process.env.APPWRITE_POST_COLLECTION_ID,
      [Query.orderDesc("$createdAt")]
    );

    return {
      data: []
    };
  })
);

export const createHashTags = async (
  hashtags: string[],
  database: Databases
) => {
  const uniqueHashTags = Array.from(new Set(hashtags));
  uniqueHashTags.forEach((hashTag) =>
    database
      .listDocuments(
        process.env.APPWRITE_DB_ID,
        process.env.APPWRITE_HASHTAG_COLLECTION_ID,
        [Query.search("name", hashTag)]
      )
      .then((result) => {
        if (result.total === 1) {
          const hashtagModel = result.documents[0];
          database.updateDocument(
            process.env.APPWRITE_DB_ID,
            process.env.APPWRITE_HASHTAG_COLLECTION_ID,
            hashtagModel.$id,
            { name: hashTag, last_used: new Date().toISOString() },
            [Permission.read(Role.users()), Permission.update(Role.users())]
          );
        } else {
          database.createDocument(
            process.env.APPWRITE_DB_ID,
            process.env.APPWRITE_HASHTAG_COLLECTION_ID,
            ID.unique(),
            { name: hashTag, last_used: new Date().toISOString() },
            [Permission.read(Role.users()), Permission.update(Role.users())]
          );
        }
      })
  );
};

export const createPost = tryCatchWrapper<Result<Post>, CreatePostSchema>(
  async (createPostSchema: CreatePostSchema) => {
    const { data: user } = await getLoggedInUser();
    if (!user) {
      throw new UnauthorizedError();
    }
    const { database } = await createSessionClient();
    if (!database) {
      throw new ServerError();
    }
    const hashtags = extractHashTags(createPostSchema.content);
    if (hashtags) {
      createHashTags(hashtags, database);
    }

    const _post = await database.createDocument(
      process.env.APPWRITE_DB_ID,
      process.env.APPWRITE_POST_COLLECTION_ID,
      ID.unique(),
      {
        content: createPostSchema.content,
        authorId: user.id,
        author: JSON.stringify(user),
        hashtags
      },
      getResourceOwnerPermission(user.id)
    );
    return {
      data: mapPost(_post)
    };
  }
);

export const getTrendingHashtags = tryCatchWrapper<Result<HashTag[]>>(
  async () => {
    const { database } = await createSessionClient();
    if (!database) {
      throw new ServerError();
    }

    const trendingHashTags = await database.listDocuments(
      process.env.APPWRITE_DB_ID,
      process.env.APPWRITE_HASHTAG_COLLECTION_ID,
      [
        Query.lessThanEqual("last_used", new Date().toISOString()), // Get entries where last_used is less than or equal to the current date
        // Get entries where last_used is greater than or equal to 24 hours ago
        Query.greaterThanEqual(
          "last_used",
          new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
        ),
        Query.orderDesc("last_used"),
        Query.limit(5)
      ]
    );
    if (trendingHashTags.total === 0) {
      return {
        data: []
      };
    }
    const hashTagsResult = trendingHashTags.documents.map(
      (hashTag) => ({ id: hashTag.$id, name: hashTag.name }) as HashTag
    );
    return {
      data: hashTagsResult
    };
  }
);
