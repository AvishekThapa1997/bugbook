export const dynamic = "force-dynamic";
import { ProtectedPage } from "../_components/ProtectedPage";
import { PostEditor } from "./_components/PostEditor";
import { Box } from "../../_components/ui";
import { PostSection } from "./_components/PostSection";
import { PostServiceAdapterProvider } from "./_provider";
import { RightSidebar } from "../_components/RightSidebar";

export default async function Home() {
  return (
    <ProtectedPage>
      <Box className='flex gap-5'>
        <PostServiceAdapterProvider>
          <Box className='basis-[40rem] space-y-5'>
            <PostEditor />
            <PostSection />
          </Box>
          <aside className='sticky top-[5.25rem] hidden h-fit flex-none basis-72 space-y-4 md:block lg:w-80'>
            <RightSidebar />
          </aside>
        </PostServiceAdapterProvider>
      </Box>
    </ProtectedPage>
  );
}
