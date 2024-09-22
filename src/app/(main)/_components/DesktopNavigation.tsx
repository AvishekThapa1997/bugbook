import React from "react";
import { Navigation } from "./Navigation";
import { BaseProps } from "../../../types";
import { cn } from "../../../lib";

const DesktopNavigation = ({ className }: BaseProps) => {
  return (
    <aside className={cn("sticky hidden h-fit sm:block", className)}>
      <Navigation className='flex-none space-y-2 rounded-2xl p-3 md:p-4' />
    </aside>
  );
};

export { DesktopNavigation };
