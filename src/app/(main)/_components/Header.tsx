import React from "react";
import { Logo } from "./Logo";
import { UserButton } from "./UserButton";
import { GlobalSearchField } from "./GlobalSearchField";

const Header = () => {
  return (
    <header className='sticky top-0 z-10 bg-card shadow-sm'>
      <div className='mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-5 px-5 py-3 sm:justify-center'>
        <Logo />
        <GlobalSearchField className='order-1 basis-full sm:order-none sm:basis-56' />
        <UserButton className='sm:ms-auto' />
      </div>
    </header>
  );
};

export { Header };
