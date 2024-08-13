import { useMutationHandler } from "../../../lib/react-query";
import { useAuthAdapter } from "./useAuthAdapter";

export const useCheckForUsernameAvailability = () => {
  const { checkUsernameAvailablity } = useAuthAdapter();
  return useMutationHandler({
    mutationFn: (username: string) => checkUsernameAvailablity(username)
  });
};
