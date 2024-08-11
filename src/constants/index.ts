export const CONSTANTS = {
  ERROR_MESSAGE: {
    SOMETHING_WENT_WRONG: "Something went wrong.Please try again later.",
    INVALID_EMAIL: "Inavlid email address.",
    INVALID_PASSWORD: "Password should contain 8-16 characters.",
    INVALID_USERNAME: "Only letter,spaces,_ and - are allowed.",
    PASSWORD_DID_NOT_MATCH: "Password did not match.",
    NOT_AUTHORIZED: "Not Authorized.",
    EMAIL_REQUIRED: "Email is required.",
    USERNAME_REQUIRED: "Username is required.",
    PASSWORD_REQUIRED: "Password is required.",
    SERVER_ERROR: "serverError",
    EMAIL_ID_IS_ALREADY_REGISTERED: "Email id is already registered.",
    INVALID_INPUTS: "One or more inputs are invalid.",
    INVALID_LOGIN_CREDENTIALS: "Invalid credentials.",
    POST_CONTENT_IS_REQUIRED: "Post content is required.",
    POST_MAX_LENGTH: "Post can contain upto 10000 characters.",
    BAD_REQUEST: "Unable to process request.",
    USERNAME_IS_NOT_AVAILABLE: "Username is not available.",
    USERNAME_NUM_OF_CHARACTERS_REQUIREMENT:
      "Username should contain 6-30 characters.",
    NAME_NUM_OF_CHARACTERS_REQUIREMENT: "Name should contain 4-50 characters."
  },
  ERROR_STATUS_CODE: {
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    SERVER_ERROR: 500,
    BAD_REQUEST: 400,
    CONFLICT: 409
  },
  PASSWORD_LENGTH: {
    MIN: 8,
    MAX: 16
  },
  SESSION: {
    EXPIRATION: 5 * 24 * 60 * 60, // 5 day (in seconds)
    NAME: "session"
  },
  POST_CONTENT_MAX_LENGTH: 10000
};
