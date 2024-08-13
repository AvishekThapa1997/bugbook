import { Models } from "node-appwrite";
import { User } from "../../../../types/user";

export interface Post {
  id: string;
  content: string;
  author: User;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export const mapPost = (postModel: Models.Document): Post => {
  return {
    id: postModel.$id,
    author: JSON.parse(postModel.author),
    content: postModel.content,
    userId: postModel.userId,
    updatedAt: postModel.$updatedAt,
    createdAt: postModel.$createdAt
  };
};
