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
            : "Something went wrong.Please try again later.";
      return { error: { message: errorMessage } } as ReturnType;
    }
  };
};
