import { useMutationHandler } from "@/src/lib/react-query";
import { signUp } from "../_actions";
import { SignUpSchema } from "@/src/lib/validation";

export const useUserSignUp = () => {
  return useMutationHandler({
    mutationFn: (signUpSchema: SignUpSchema) => signUp(signUpSchema)
  });
};
