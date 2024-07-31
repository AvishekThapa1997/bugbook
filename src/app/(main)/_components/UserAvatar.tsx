import { BaseProps } from "@/src/types";
import React from "react";
import avatarPlaceholder from "@/src/assets/image/avatar-placeholder.webp";
import { cn } from "@/src/lib";
import Image from "next/image";

interface UserAvatarProps extends BaseProps {
  url?: string | null;
  size?: number;
}

const UserAvatar = ({ className, size, url }: UserAvatarProps) => {
  const imageUrl = !!url ? url : avatarPlaceholder;
  return (
    <Image
      alt='User avatar'
      src={imageUrl}
      width={size ?? 40}
      height={size ?? 40}
      className={cn(
        "aspect-square h-fit rounded-full bg-secondary object-cover",
        className
      )}
    />
  );
};

UserAvatar.displayName = "UserAvatar";

export { UserAvatar };
