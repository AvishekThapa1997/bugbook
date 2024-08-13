import { IUserService, userService } from "../user";
import { CONSTANTS } from "../../constants";
import { UnauthorizedError } from "../../error";
import { BadRequestError } from "../../error/BadRequestError";
import { EmailOrUsernameAlreadyExistError } from "../../error/EmailOrUsernameAlreadyExistError";
import { InvalidCredentials } from "../../error/InvalidCredentials";
import { handleError } from "../../handleError";
import { SupabaseClient } from "../../lib/supabase/SupabaseClient";
import { isEmail } from "../../lib/util";
import {
  parseSchema,
  signInSchema,
  SignInSchema,
  signUpSchema,
  SignUpSchema
} from "../../lib/validation";
import { FieldError, Result } from "../../types";
import { UserDto } from "../../app/dto/userDto";
import { IAuthService } from "./IAuthService";

class SupabaseAuthServiceImpl extends SupabaseClient implements IAuthService {
  constructor(private userService: IUserService) {
    super();
  }

  async checkForUsernameAvailability(
    username: string
  ): Promise<Result<string>> {
    const result: Result<string, FieldError<{ username: string }>> = {};
    try {
      if (!username) {
        throw new BadRequestError();
      }
      const { data, error } = await this.userService.getUserDetails({
        username
      });

      if (error) {
        result.error = error;
        return result;
      }
      if (data?.id) {
        result.data = data.id;
        return result;
      }
    } catch (err) {
      result.error = handleError(err);
    }
    return result;
  }

  async signUpUser(
    signUpData: SignUpSchema
  ): Promise<Result<UserDto, FieldError<SignUpSchema>[]>> {
    const result: Result<UserDto, FieldError<SignUpSchema>[]> = {};
    try {
      const supabaseClient = this.getClient();
      const { data: parsedSignUpData, errors } = parseSchema(
        signUpSchema,
        signUpData
      );
      if (!parsedSignUpData) {
        result.error = errors;
        return result;
      }
      const { email, password, name, username } = parsedSignUpData;
      const existingUserResult = await this.userService.getUserDetails({
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
          result.error = [
            {
              field: "email",
              message: CONSTANTS.ERROR_MESSAGE.EMAIL_ID_IS_ALREADY_REGISTERED
            },
            {
              field: "username",
              message: CONSTANTS.ERROR_MESSAGE.USERNAME_IS_NOT_AVAILABLE
            }
          ];
          return result;
        }
        throw new EmailOrUsernameAlreadyExistError(
          CONSTANTS.ERROR_MESSAGE.USERNAME_IS_NOT_AVAILABLE
        );
      }
      if (result.error) {
        return result;
      }
      const { data, error } = await supabaseClient.auth.signUp({
        email,
        password,
        options: {
          data: {
            display_name: name,
            username
          }
        }
      });
      const { user } = data;
      if (!user && error) {
        throw error;
      }
      if (user) {
        return {
          data: {
            id: user.id,
            email: user.email!,
            displayName: user.user_metadata.displayName,
            username: user.user_metadata.username
          }
        };
      }
    } catch (err) {
      result.error = handleError(err as Error);
    }
    return result;
  }
  async signIn(signInData: SignInSchema): Promise<Result<UserDto>> {
    const result: Result<UserDto> = {};
    try {
      const supabaseClient = this.getClient();
      const { data: parsedSignInData } = parseSchema(signInSchema, signInData);

      if (!parsedSignInData) {
        throw new BadRequestError();
      }
      const { password, username } = parsedSignInData;

      let userEmail = username;
      if (!isEmail(userEmail)) {
        const { data } = await this.userService.getUserDetails({
          username
        });
        if (!data) {
          throw new InvalidCredentials();
        }
        userEmail = data.email;
      }
      const { data } = await supabaseClient.auth.signInWithPassword({
        email: userEmail,
        password
      });
      if (!data.user) {
        throw new InvalidCredentials();
      }
      const {
        user: { id, email, user_metadata }
      } = data;
      result.data = {
        id,
        displayName: user_metadata.display_name,
        username: user_metadata.username,
        email: email!
      };
      return result;
    } catch (err) {
      result.error = handleError(err);
    }
    return result;
  }

  async getLoggedInUser(): Promise<Result<UserDto>> {
    const result: Result<UserDto> = {};
    try {
      const supabaseClient = this.getClient();
      const { data, error } = await supabaseClient.auth.getUser();
      if (error || !data) {
        throw new UnauthorizedError();
      }
      const { id, email, user_metadata } = data.user;
      result.data = {
        id,
        displayName: user_metadata.display_name,
        username: user_metadata.username,
        email: email!
      };
      return result;
    } catch (err) {
      result.error = handleError(err);
    }
    return result;
  }

  async signOut() {
    const result: Result<void> = {};
    try {
      const supabaseClient = this.getClient();
      const { error } = await supabaseClient.auth.signOut();
      if (error) {
        throw error;
      }
    } catch (err) {
      result.error = handleError(err);
    }
    return result;
  }
}

export const authService = new SupabaseAuthServiceImpl(
  userService
) as IAuthService;
