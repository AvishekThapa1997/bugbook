import { useMutationHandler } from "../../../lib/react-query";
import { SignInSchema } from "../../../lib/validation";
import { useAuthAdapter } from "./useAuthAdapter";

export const useUserSignIn = () => {
  const { signInUser } = useAuthAdapter();
  return useMutationHandler({
    mutationFn: (signInSchema: SignInSchema) => signInUser(signInSchema)
  });
};
