"use client";
import { AppRoute, BaseProps } from "@/src/types";
import React from "react";
import { Button } from "@/app/_components/ui";
import { cn } from "@/src/lib";
import Link from "next/link";
import { useCheckActiveRoute } from "@/main/_hooks";

interface NavigationItemProps extends BaseProps {
  title: string;
  href: AppRoute;
  icon: React.ReactNode;
  linkStyle?: BaseProps;
}

const NavigationItem = ({
  title,
  href,
  icon,
  className,
  linkStyle = {}
}: NavigationItemProps) => {
  const isActiveRoute = useCheckActiveRoute(href);
  const activeStyle = isActiveRoute ? "bg-accent" : "";
  return (
    <Button
      title={title}
      variant='ghost'
      asChild
      className={cn("flex items-center justify-start gap-3", className)}
    >
      <Link
        href={href}
        className={cn(
          "h-auto py-2.5 capitalize",
          activeStyle,
          linkStyle.className
        )}
      >
        <span>{icon}</span>
        <span className='hidden lg:inline'>{title}</span>
      </Link>
    </Button>
  );
};

export { NavigationItem };
