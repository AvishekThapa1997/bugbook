// src/lib/server/appwrite.js
"use server";
import { Client, Account } from "node-appwrite";
import { cookies } from "next/headers";
import { CONSTANTS } from "@/src/constants";
import { cache } from "react";

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
    }
  };
});
