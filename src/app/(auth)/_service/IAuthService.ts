import { SignInSchema, SignUpSchema } from "../../../lib/validation";
import { FieldError, Result } from "../../../types";
import { UserDto } from "../../dto/userDto";

export interface IAuthService {
  signUpUser: (
    signUpSchema: SignUpSchema
  ) => Promise<Result<UserDto, FieldError<SignUpSchema>[]>>;
  signIn: (signInSchema: SignInSchema) => Promise<Result<UserDto>>;
  getLoggedInUser: () => Promise<Result<UserDto>>;
  signOut: () => Promise<Result<void>>;
  checkForUsernameAvailability: (username: string) => Promise<Result<string>>;
}
