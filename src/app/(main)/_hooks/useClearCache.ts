import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

export const useClearCache = () => {
  const client = useQueryClient();
  const clear = useCallback(() => {
    client.clear();
  }, [client]);
  return clear;
};
