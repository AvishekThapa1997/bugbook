"use client";

import { BaseProps } from "@/src/types";
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
} from "@/app/_components/ui";
import { UserAvatar } from "@/main/_components/UserAvatar";
import Link from "next/link";
import { LogOut, Monitor, Moon, Sun, UserIcon } from "lucide-react";
import { cn } from "@/src/lib";
import { useAppTheme } from "@/app/_hooks";
import { signOut } from "@/auth/_actions";
import { useUser } from "@/auth/_hooks";

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
        <DropdownMenuLabel>Welcome {user.name}!</DropdownMenuLabel>
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
