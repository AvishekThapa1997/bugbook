import { CONSTANTS } from "../constants";
import { BaseError } from "./BaseError";

export class EmailOrUsernameAlreadyExistError extends BaseError {
  constructor(message: string) {
    super(CONSTANTS.ERROR_STATUS_CODE.CONFLICT, message);
  }
}
