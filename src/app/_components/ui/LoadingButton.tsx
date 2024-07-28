import React, { ComponentProps } from "react";
import { Button } from "./Button";
import { cn } from "@/src/lib";
import { Loader2 } from "@/src/app/_components/icons";

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
      className={cn("flex items-center gap-2", className)}
      {...props}
    >
      {isLoading && <Loader2 className='size-5 animate-spin' />}
      <span>{children}</span>
    </Button>
  );
};

export { LoadingButton };
