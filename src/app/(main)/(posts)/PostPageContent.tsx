import { Box } from "../../_components/ui";
import { RightSidebar } from "../_components/RightSidebar";
import { PostEditorSection } from "./_components/PostEditorSection";
import { PostSection } from "./_components/PostSection";

export const PostPageContent = () => {
  return (
    <>
      <Box className='flex h-full gap-5'>
        <Box className='no-scrollbar h-full basis-[40rem] space-y-5 overflow-y-auto'>
          <PostEditorSection />
          <PostSection />
        </Box>
        <aside className='sticky hidden h-fit flex-none basis-72 space-y-4 md:block lg:w-80'>
          <RightSidebar />
        </aside>
      </Box>
    </>
  );
};
