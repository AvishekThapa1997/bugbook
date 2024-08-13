"use server";

import * as postService from "../../../../services/post";

import { redirect, RedirectType } from "next/navigation";
import { revalidatePath } from "next/cache";
import { CONSTANTS } from "../../../../constants";
import { CreatePostSchema } from "../../../../lib/validation";

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
