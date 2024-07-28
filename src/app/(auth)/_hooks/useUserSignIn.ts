import { useMutationHandler } from "@/src/lib/react-query";
import { SignInSchema } from "@/src/lib/validation";
import { signIn } from "../_actions";

export const useUserSignIn = () => {
  return useMutationHandler({
    mutationFn: (signInSchema: SignInSchema) => signIn(signInSchema)
  });
};
