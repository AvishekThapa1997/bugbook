import { postService } from "../../../../services/post";
import Posts from "./Posts";

const PostSection = async () => {
  const { data, error } = await postService.getPosts();
  if (error) {
    return null;
  }
  return <Posts posts={data ?? []} />;
};

export { PostSection };
