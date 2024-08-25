import "server-only";
import { BadRequestError } from "../../error/BadRequestError";
import { EmailOrUsernameAlreadyExistError } from "../../error/EmailOrUsernameAlreadyExistError";
import { InvalidCredentials } from "../../error/InvalidCredentials";
import { handleError } from "../../handleError";

import { isEmail } from "../../lib/util";
import {
  parseSchema,
  signInSchema,
  SignInSchema,
  signUpSchema,
  SignUpSchema
} from "../../lib/validation";
import { ErrorData, FieldError, Result } from "../../types";
import { UserDto } from "../../app/dto/userDto";
import { IAuthService } from "./IAuthService";
import { IUserRepository } from "../../db/users/IUserRepository";

import { CONSTANTS } from "../../constants";
import { userRepository } from "../../db/users";
import { BaseService } from "../base";

class SupabaseAuthServiceImpl extends BaseService implements IAuthService {
  private constructor(private userRepository: IUserRepository) {
    super();
  }

  async signUpUser(
    signUpData: SignUpSchema
  ): Promise<Result<UserDto, FieldError<SignUpSchema>[]>> {
    const result: Result<UserDto, FieldError<SignUpSchema>[]> = {};
    try {
      const { data: parsedSignUpData, errors } = parseSchema(
        signUpSchema,
        signUpData
      );
      if (!parsedSignUpData) {
        result.error = errors;
        return result;
      }
      const { email, password, name, username } = parsedSignUpData;
      const existingUserResult = await this.userRepository.getUserDetails({
        email,
        username
      });
      if (existingUserResult.data?.email === email) {
        result.error = {
          code: CONSTANTS.ERROR_STATUS_CODE.CONFLICT,
          message: CONSTANTS.ERROR_MESSAGE.EMAIL_ID_IS_ALREADY_REGISTERED
        };
      }
      if (existingUserResult.data?.username === username) {
        if (result.error) {
          const _error: FieldError<SignUpSchema> = {
            field: "username",
            message: CONSTANTS.ERROR_MESSAGE.USERNAME_IS_NOT_AVAILABLE
          };
          result.error = result.error
            ? ([
                {
                  field: "email",
                  message: (result.error as ErrorData).message
                },
                _error
              ] as FieldError<SignUpSchema>[])
            : _error;
          return result;
        }
        throw new EmailOrUsernameAlreadyExistError(
          CONSTANTS.ERROR_MESSAGE.USERNAME_IS_NOT_AVAILABLE
        );
      }
      if (result.error) {
        return result;
      }
      const { data: user } = await this.userRepository.signUpUser({
        email,
        name,
        password,
        username
      });
      result.data = user;
    } catch (err) {
      result.error = handleError(err);
    }
    return result;
  }

  async signIn(signInData: SignInSchema): Promise<Result<UserDto>> {
    const result: Result<UserDto> = {};
    try {
      const { data: parsedSignInData } = parseSchema(signInSchema, signInData);
      if (!parsedSignInData) {
        throw new BadRequestError();
      }
      const { password, username } = parsedSignInData;
      let userEmail = username;
      if (!isEmail(userEmail)) {
        const { data } = await this.userRepository.getUserDetails({
          username
        });
        if (!data) {
          throw new InvalidCredentials();
        }
        userEmail = data.email!;
      }
      const { data } = await this.userRepository.signIn({
        email: userEmail,
        password
      });
      result.data = data;
    } catch (err) {
      result.error = handleError(err);
    }
    return result;
  }

  async signOut(): Promise<Result<void>> {
    const result: Result<void> = {};
    try {
      this.userRepository.signOut();
    } catch (err) {
      result.error = handleError(err);
    }
    return result;
  }
  async checkForUsernameAvailability(
    username: string
  ): Promise<Result<string>> {
    const result: Result<string, FieldError<{ username: string }>> = {};
    try {
      if (!username) {
        throw new BadRequestError();
      }
      const { data } =
        await this.userRepository.checkForUsernameAvailability(username);
      result.data = data?.id ?? "";
    } catch (err) {
      result.error = handleError(err);
    }
    return result;
  }
}

const authService = SupabaseAuthServiceImpl.getInstance(
  userRepository
) as SupabaseAuthServiceImpl;
export { authService };
