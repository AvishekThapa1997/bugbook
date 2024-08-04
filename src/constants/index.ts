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
    INVALID_LOGIN_CREDENTIALS: "Invalid email/password.",
    POST_CONTENT_IS_REQUIRED: "Post content is required.",
    POST_MAX_LENGTH: "Post can contain upto 10000 characters."
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
