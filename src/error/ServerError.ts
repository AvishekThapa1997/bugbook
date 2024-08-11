import { CONSTANTS } from "../constants";
import { BaseError } from "./BaseError";

class ServerError extends BaseError {
  constructor() {
    super(
      CONSTANTS.ERROR_STATUS_CODE.SERVER_ERROR,
      CONSTANTS.ERROR_MESSAGE.SOMETHING_WENT_WRONG
    );
  }
}

export { ServerError };
