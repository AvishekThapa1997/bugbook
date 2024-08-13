"use server";
import { Client, Account, Databases } from "node-appwrite";
import { cookies } from "next/headers";

import { cache } from "react";
import { CONSTANTS } from "../../constants";

export const createSessionClient = cache(async () => {
  const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT)
    .setProject(process.env.APPWRITE_PROJECT);

  const session = cookies().get(CONSTANTS.SESSION.NAME);
  if (!session || !session.value) {
    return {};
  }

  client.setSession(session.value);

  return {
    get account() {
      return new Account(client);
    },
    get database() {
      return new Databases(client);
    }
  };
});

export const createAdminClient = cache(async () => {
  const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT)
    .setProject(process.env.APPWRITE_PROJECT)
    .setKey(process.env.APPWRITE_KEY);

  return {
    get account() {
      return new Account(client);
    },
    get database() {
      return new Databases(client);
    }
  };
});
