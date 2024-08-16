import { useMutationHandler } from "../../../lib/react-query";
import { SignUpSchema } from "../../../lib/validation";
import { useAuthAdapter } from "./useAuthAdapter";

export const useUserSignUp = () => {
  const { signUpUser } = useAuthAdapter();
  return useMutationHandler({
    mutationFn: (signUpSchema: SignUpSchema) => {
      return signUpUser(signUpSchema);
    }
  });
};
