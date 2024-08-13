import { useMutationHandler } from "../../../lib/react-query";
import { SignUpSchema } from "../../../lib/validation";
import { signUp } from "../_actions";

export const useUserSignUp = () => {
  return useMutationHandler({
    mutationFn: (signUpSchema: SignUpSchema) => {
      return signUp(signUpSchema);
    }
  });
};
