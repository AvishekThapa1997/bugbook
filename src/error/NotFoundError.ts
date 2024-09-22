import { CONSTANTS } from "../constants";
import { BaseError } from "./BaseError";

export class NotFoundError extends BaseError {
  constructor(message: string) {
    super(CONSTANTS.ERROR_STATUS_CODE.NOT_FOUND, message);
  }
}
