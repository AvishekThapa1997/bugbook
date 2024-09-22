"use server";

import { postService } from "../../../../services/post";
import { createPostActions } from "./createPostActions";

export const { createPost } = createPostActions(postService);
