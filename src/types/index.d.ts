import { InputProps } from "../app/_components/ui";

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

export type AppRoute = "/" | "/messges" | "/notifications" | "/bookmarks";

export interface HashTag {
  id: string;
  name: string;
}

type InputEventAction<T> = {
  [key in keyof T]: InputProps;
};
