import { useContext } from "react";
import { PostAdapterContext } from "../_provider/PostServiceAdapterProvider";

export const usePostAdapter = () => {
  const postAdapter = useContext(PostAdapterContext);
  if (!postAdapter) {
    throw new Error(
      "usePostAdapter must be used within PostServiceAdapterProvider"
    );
  }
  return postAdapter;
};
