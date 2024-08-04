import { getLoggedInUser } from "@/auth/_service";
import { ProtectedPage } from "./_components/ProtectedPage";
import { PostEditor } from "./_features/posts/components/PostEditor";

export default async function Home() {
  const { data, error } = await getLoggedInUser();
  return (
    <ProtectedPage>
      <PostEditor />
    </ProtectedPage>
  );
}
