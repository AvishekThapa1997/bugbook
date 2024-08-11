import { CONSTANTS } from "../constants";
import { BaseError } from "./BaseError";

class UnauthorizedError extends BaseError {
  constructor() {
    super(
      CONSTANTS.ERROR_STATUS_CODE.UNAUTHORIZED,
      CONSTANTS.ERROR_MESSAGE.NOT_AUTHORIZED
    );
  }
}

export { UnauthorizedError };
