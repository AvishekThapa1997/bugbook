import React, { Suspense } from "react";
import { Trendings } from "./Trendings";

const RightSidebar = () => {
  return (
    <aside className='sticky top-[5.25rem] hidden h-fit w-72 flex-none space-y-4 md:block lg:w-80'>
      <Trendings />
    </aside>
  );
};

export { RightSidebar };
