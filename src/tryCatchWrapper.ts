import { AppwriteException } from "node-appwrite";
import { CONSTANTS } from "@/src/constants";
import { BaseError } from "./error";

const handleAppwriteError = (
  err: AppwriteException
): { code: number; message: string } => {
  const errorCode = err.code;
  console.log({ type: err.type, code: err.code });
  switch (err.type) {
    case "user_already_exists":
    case "user_email_already_exists":
      return {
        code: errorCode,
        message: CONSTANTS.ERROR_MESSAGE.EMAIL_ID_IS_ALREADY_REGISTERED
      };
    case "general_argument_invalid":
      return {
        code: errorCode,
        message: err.message
      };
    default:
      return {
        code: err.code,
        message: err.message
      };
  }
};
const handleError = (err: unknown) => {
  const errorData = {
    error: {
      message: CONSTANTS.ERROR_MESSAGE.SOMETHING_WENT_WRONG,
      code: 0
    }
  };
  if (err instanceof AppwriteException) {
    const { code, message } = handleAppwriteError(err);
    errorData.error.code = code;
    errorData.error.message = message;
  } else if (typeof err === "string") {
    errorData.error.message = err;
  } else if (err instanceof BaseError) {
    errorData.error.message = err.message;
    errorData.error.code = 0;
  }
  return errorData;
};

export const tryCatchWrapper = <ReturnType = void, ArgType = void>(
  operation: (args: ArgType) => Promise<ReturnType>
) => {
  return async (args: ArgType) => {
    try {
      return await operation(args);
    } catch (err) {
      return handleError(err) as ReturnType;
    }
  };
};
