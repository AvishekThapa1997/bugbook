import { CONSTANTS } from "../constants";
import { BaseError } from "./BaseError";

class InvalidCredentials extends BaseError {
  constructor() {
    super(
      CONSTANTS.ERROR_STATUS_CODE.UNAUTHORIZED,
      CONSTANTS.ERROR_MESSAGE.INVALID_LOGIN_CREDENTIALS
    );
  }
}
export { InvalidCredentials };
