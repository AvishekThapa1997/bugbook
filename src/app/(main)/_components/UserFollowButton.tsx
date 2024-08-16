"use client";
import React, { ComponentProps } from "react";
import { LoadingButton } from "../../_components/ui";
import { cn } from "../../../lib";

interface UserFollowButtonProps
  extends Omit<ComponentProps<typeof LoadingButton>, "isLoading"> {
  username: string;
}

const UserFollowButton = ({
  username: userId,
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
