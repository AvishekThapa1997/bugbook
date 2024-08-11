import { SignInSchema, SignUpSchema } from "@/src/lib/validation";
import { FieldError, Result } from "@/src/types";
import { UserDto } from "@/app/dto/userDto";

export interface IAuthService {
  signUpUser: (
    signUpSchema: SignUpSchema
  ) => Promise<Result<UserDto, FieldError<SignUpSchema>[]>>;
  signIn: (signInSchema: SignInSchema) => Promise<Result<UserDto>>;
  getLoggedInUser: () => Promise<Result<UserDto>>;
  signOut: () => Promise<Result<void>>;
  checkForUsernameAvailability: (username: string) => Promise<Result<string>>;
}
