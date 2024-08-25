import { AxiosError } from "axios";
import { CONSTANTS } from "./constants";
import { BaseError, SupabaseError } from "./error";
import { PostgrestError } from "@supabase/supabase-js";

const handleSupabaseError = (supabaseError: SupabaseError) => {
  const { code, message } = supabaseError;

  switch (code) {
    case "email_exists":
    case "user_already_exists":
      return {
        code: code,
        message: CONSTANTS.ERROR_MESSAGE.EMAIL_ID_IS_ALREADY_REGISTERED
      };
    case "weak_password":
      return {
        code: code,
        message: CONSTANTS.ERROR_MESSAGE.INVALID_PASSWORD
      };
    default:
      return {
        code,
        message
      };
  }
};

export const handleError = (err: unknown) => {
  if (err instanceof SupabaseError) {
    return handleSupabaseError(err);
  } else if (err instanceof BaseError) {
    return {
      code: err.code,
      message: err.message
    };
  } else if (err instanceof AxiosError) {
    return err?.response?.data;
  } else if (typeof err === "string") {
    return {
      code: CONSTANTS.ERROR_STATUS_CODE.SERVER_ERROR,
      message: err
    };
  } else {
    return {
      code: CONSTANTS.ERROR_STATUS_CODE.SERVER_ERROR,
      message: CONSTANTS.ERROR_MESSAGE.SOMETHING_WENT_WRONG
    };
  }
};
