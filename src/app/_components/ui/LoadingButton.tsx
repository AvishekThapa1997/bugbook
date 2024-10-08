import React, { ComponentProps } from "react";
import { Button } from "./Button";
import { cn } from "../../../lib";
import { Loader2 } from "../icons";

interface LoadingButtonProps extends ComponentProps<typeof Button> {
  isLoading: boolean;
}
const LoadingButton = ({
  children,
  isLoading,
  disabled,
  className,
  ...props
}: LoadingButtonProps) => {
  return (
    <Button
      disabled={isLoading || disabled}
      className={cn("items-center gap-2", className)}
      {...props}
    >
      {isLoading && <Loader2 className='size-5 animate-spin' />}
      <span>{children}</span>
    </Button>
  );
};

export { LoadingButton };
