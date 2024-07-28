import { SignInSchema } from "../lib/validation";

export interface BaseProps {
  className?: string;
}

export interface ErrorData {
  code?: number | string;
  message?: string;
}

export interface Result<Type, ErrorType = ErrorData> {
  data?: Type | null;
  error?: ErrorType | ErrorData;
}

export type FieldError<T> = {
  field: keyof T;
  message: string;
};
