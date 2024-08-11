import { useMutationHandler } from "@/src/lib/react-query";
import { signUp } from "@/auth/_actions";
import { SignUpSchema } from "@/src/lib/validation";

export const useUserSignUp = () => {
  return useMutationHandler({
    mutationFn: (signUpSchema: SignUpSchema) => {
      return signUp(signUpSchema);
    }
  });
};
