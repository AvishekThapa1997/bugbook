import React from "react";
import { Navigation } from "./Navigation";
import { cn } from "@/src/lib";
import { BaseProps } from "@/src/types";

const DesktopNavigation = ({ className }: BaseProps) => {
  return (
    <aside className={cn("hidden sm:block", className)}>
      <Navigation className='stick top-[5.25rem] h-fit flex-none space-y-2 rounded-2xl px-3 py-5 lg:px-2.5' />
    </aside>
  );
};

export { DesktopNavigation };
