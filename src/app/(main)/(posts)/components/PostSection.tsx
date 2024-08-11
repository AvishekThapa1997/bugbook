import { getPosts } from "../services";
import Posts from "./Posts";

const PostSection = async () => {
  const { data } = await getPosts();
  return <Posts posts={data ?? []} />;
};

export { PostSection };
