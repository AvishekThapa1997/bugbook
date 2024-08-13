"use client";

import {
  Button,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from "../../_components/ui";

import Link from "next/link";
import { LogOut, Monitor, Moon, Sun, UserIcon } from "../../_components/icons";
import { useUser } from "../../(auth)/_hooks";
import { useAppTheme } from "../../_hooks";
import { cn } from "../../../lib";
import { UserAvatar } from "./UserAvatar";
import { signOut } from "../../(auth)/_actions";
import { BaseProps } from "../../../types";

const UserButton = ({ className }: BaseProps) => {
  const user = useUser();
  const { setTheme, theme } = useAppTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className={cn(className)}
      >
        <Button
          title='User Profile'
          variant='ghost'
          className='aspect-square rounded-full p-0 hover:bg-transparent'
        >
          <UserAvatar url={user.profileImage} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Welcome {user.displayName}!</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link
            href={`/users/deded`}
            className='flex items-center'
          >
            <UserIcon className='mr-2 size-4' />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Monitor className='mr-2 size-4' />
            <span>Theme</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                <Monitor className='mr-2 size-4' />
                <span>System default</span>
                <DropdownMenuCheckboxItem checked={theme === "system"} />
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("light")}>
                <Sun className='mr-2 size-4' />
                <span>Light</span>
                <DropdownMenuCheckboxItem checked={theme === "light"} />
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                <Moon className='mr-2 size-4' />
                <span>Dark</span>
                <DropdownMenuCheckboxItem checked={theme === "dark"} />
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>
          <LogOut className='mr-2 size-4' />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { UserButton };
