"use client";
import React, { ComponentProps } from "react";
import { LoadingButton } from "../../_components/ui";
import { cn } from "../../../lib";
import { useFollowUser, useUnfollowUser } from "../users/_hooks";
import { useToastNotification } from "../_hooks";
import { CONSTANTS } from "../../../constants";

interface UserFollowButtonProps
  extends Omit<ComponentProps<typeof LoadingButton>, "isLoading"> {
  userId: string;
  isFollowing?: boolean;
}

const UserFollowButton = ({
  userId,
  isFollowing,
  className,
  ...props
}: UserFollowButtonProps) => {
  const buttonText = isFollowing ? "Unfollow" : "Follow";
  const { mutate: follow, isPending: isFollowApiCallInProgress } =
    useFollowUser(userId);
  const { mutate: unfollow, isPending: isUnfollowApiCallInProgress } =
    useUnfollowUser(userId);
  const toast = useToastNotification();
  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const onError = () => {
      toast(CONSTANTS.ERROR_MESSAGE.SOMETHING_WENT_WRONG, {
        position: "top-right",
        type: "error",
        duration: 1000
      });
    };
    if (isFollowing) {
      unfollow(userId, { onError });
    } else {
      follow(userId, { onError });
    }
  };
  return (
    <LoadingButton
      isLoading={false}
      size='sm'
      className={cn("h-7 rounded-full px-5 py-0.5 capitalize", className)}
      variant={isFollowing ? "secondary" : "default"}
      onClick={handleClick}
      {...props}
    >
      {buttonText}
    </LoadingButton>
  );
};

export default UserFollowButton;
