class BaseError extends Error {
  constructor(
    public code: number | string,
    message: string
  ) {
    super(message);
  }
}

export { BaseError };
