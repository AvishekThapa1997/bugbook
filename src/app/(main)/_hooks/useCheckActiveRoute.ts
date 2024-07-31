import { AppRoute } from "@/src/types";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

export const useCheckActiveRoute = (currentRoute: AppRoute) => {
  const pathname = usePathname();
  return useMemo(() => pathname === currentRoute, [pathname, currentRoute]);
};
