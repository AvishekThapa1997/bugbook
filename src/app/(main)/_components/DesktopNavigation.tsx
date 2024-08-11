import React from "react";
import { Navigation } from "./Navigation";
import { cn } from "@/src/lib";
import { BaseProps } from "@/src/types";

const DesktopNavigation = ({ className }: BaseProps) => {
  return (
    <aside
      className={cn("sticky top-[5.25rem] hidden h-fit sm:block", className)}
    >
      <Navigation className='flex-none space-y-2 rounded-2xl p-3 md:p-4' />
    </aside>
  );
};

export { DesktopNavigation };
