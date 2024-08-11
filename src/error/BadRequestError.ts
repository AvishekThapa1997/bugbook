import { number } from "zod";
import { BaseError } from "./BaseError";
import { CONSTANTS } from "../constants";

class BadRequestError extends BaseError {
  constructor() {
    super(
      CONSTANTS.ERROR_STATUS_CODE.BAD_REQUEST,
      CONSTANTS.ERROR_MESSAGE.BAD_REQUEST
    );
  }
}
export { BadRequestError };
