import { CONSTANTS } from "../constants";

export const tryCatchWrapper = <ReturnType = void, ArgType = void>(
  operation: (args: ArgType) => Promise<ReturnType>
) => {
  return async (args: ArgType) => {
    try {
      return operation(args);
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : typeof err === "string"
            ? err
            : CONSTANTS.ERROR_MESSAGE.SOMETHING_WENT_WRONG;
      return { error: { message: errorMessage } } as ReturnType;
    }
  };
};
