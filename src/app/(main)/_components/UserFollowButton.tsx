"use client";
import React, { ComponentProps } from "react";
import { LoadingButton } from "@/app/_components/ui";
import { cn } from "@/src/lib";

interface UserFollowButtonProps
  extends Omit<ComponentProps<typeof LoadingButton>, "isLoading"> {
  userId: string;
}

const UserFollowButton = ({
  userId,
  className,
  ...props
}: UserFollowButtonProps) => {
  return (
    <LoadingButton
      isLoading={false}
      size='sm'
      className={cn("h-7 rounded-full px-5 py-0.5", className)}
      {...props}
    >
      Follow
    </LoadingButton>
  );
};

export default UserFollowButton;
