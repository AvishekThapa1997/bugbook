import React from "react";
import { Navigation } from "./Navigation";

const DesktopNavigation = () => {
  return (
    <aside>
      <Navigation className='stick top-[5.25rem] hidden h-fit flex-none space-y-2 rounded-2xl px-3 py-5 sm:block lg:px-2.5 xl:w-72' />
    </aside>
  );
};

export { DesktopNavigation };
