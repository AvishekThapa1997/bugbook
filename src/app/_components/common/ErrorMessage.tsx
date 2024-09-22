import React from "react";
import { BaseProps } from "../../../types";
import { cn } from "../../../lib";
interface ErrorMessageProps extends BaseProps {
  message: string;
}
const ErrorMessage = ({ className, message }: ErrorMessageProps) => {
  return (
    <p
      className={cn(
        "text-center text-sm font-medium text-destructive",
        className
      )}
    >
      {message}
    </p>
  );
};

export { ErrorMessage };
