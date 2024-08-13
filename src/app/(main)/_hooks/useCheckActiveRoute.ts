import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { AppRoute } from "../../../types";

export const useCheckActiveRoute = (currentRoute: AppRoute) => {
  const pathname = usePathname();
  return useMemo(() => pathname === currentRoute, [pathname, currentRoute]);
};
