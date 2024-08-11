import { BaseError } from "./BaseError";

class SupabaseError extends BaseError {
  constructor(code: number, message: string) {
    super(code, message);
  }
}
export { SupabaseError };
