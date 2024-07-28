import { cn } from "@/src/lib";
import { BaseProps } from "@/src/types";
import React from "react";
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
