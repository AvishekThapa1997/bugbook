"use server";

import { CreatePostSchema } from "@/src/lib/validation";

import * as postService from "../services";
import { CONSTANTS } from "@/src/constants";

import { redirect, RedirectType } from "next/navigation";
import { revalidatePath } from "next/cache";

export const createPost = async (createPostData: CreatePostSchema) => {
  const { data, error } = await postService.createPost(createPostData);
  if (error && error.code === CONSTANTS.ERROR_STATUS_CODE.UNAUTHORIZED) {
    redirect("/signin", RedirectType.replace);
  }
  await new Promise((res, rej) => {
    setTimeout(() => {
      res("");
    }, 5000);
  });
  revalidatePath("/");
  return { data, error };
};
