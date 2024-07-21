import { useEffect } from "react";
import { useToggle } from "./useToggle";

export const useIsClient = () => {
  const [isClient, setIsClient] = useToggle();
  useEffect(() => {
    setIsClient(true);
  }, [setIsClient]);
  return isClient;
};
