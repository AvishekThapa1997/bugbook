export const dynamic = "force-dynamic";
import { ProtectedPage } from "../_components/ProtectedPage";
import { PostEditor } from "./components/PostEditor";
import { Box } from "../../_components/ui";
import { RightSidebar } from "../_components/RightSidebar";

export default async function Home() {
  return (
    <ProtectedPage>
      <Box className='flex gap-5'>
        <Box className='flex-grow'>
          <PostEditor />
          {/* <Suspense fallback={<p>Loading...</p>}>
            <PostSection />
          </Suspense> */}
        </Box>
        <RightSidebar />
      </Box>
    </ProtectedPage>
  );
}
