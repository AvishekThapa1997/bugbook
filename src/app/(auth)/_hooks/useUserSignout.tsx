import { useMutationHandler } from "@/src/lib/react-query";

export const useUserSignout = () => {
  return useMutationHandler({
    mutationFn: async () => {}
  });
};
