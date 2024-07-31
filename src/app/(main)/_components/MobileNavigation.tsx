import React from "react";
import { Navigation } from "./Navigation";

const MobileNavigation = () => {
  return (
    <Navigation className='absolute inset-x-0 bottom-0 flex justify-center gap-2 px-3 py-2 sm:hidden' />
  );
};

export { MobileNavigation };
