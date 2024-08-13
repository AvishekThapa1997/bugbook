import { Bell, Bookmark, Home, Mail } from "lucide-react";
import React from "react";
import { NavigationItem } from "./NavigationItem";
import { AppRoute, BaseProps } from "../../../types";
import { cn } from "../../../lib";

interface NavigationItem {
  title: string;
  icon: React.ReactNode;
  href: AppRoute;
}

const navigations: NavigationItem[] = [
  {
    title: "home",
    href: "/",
    icon: <Home />
  },
  {
    title: "notifications",
    href: "/notifications",
    icon: <Bell />
  },
  {
    title: "messages",
    href: "/messges",
    icon: <Mail />
  },
  {
    title: "bookmarks",
    href: "/bookmarks",
    icon: <Bookmark />
  }
];

interface NavigationProps
  extends BaseProps,
    Pick<React.ComponentProps<typeof NavigationItem>, "linkStyle"> {}
const Navigation = ({ className, linkStyle }: NavigationProps) => {
  return (
    <nav className={cn("bg-card shadow", className)}>
      {navigations.map(({ href, icon, title }) => (
        <NavigationItem
          key={href}
          href={href}
          icon={icon}
          title={title}
          linkStyle={linkStyle}
        />
      ))}
    </nav>
  );
};

export { Navigation };
