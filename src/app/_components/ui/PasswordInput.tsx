"use client";
import React, { useState } from "react";
import { Input, InputProps } from "./Input";

import { cn } from "@/src/lib";
import { Box } from "./Box";
import { Button } from "./Button";
import { Eye, EyeOff } from "@/src/app/_components/icons";
const PasswordInput = React.forwardRef<
  HTMLInputElement,
  Omit<InputProps, "type">
>(({ className, ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const handlePasswordVisibility = (event: React.MouseEvent) => {
    event.stopPropagation();
    setShowPassword(!showPassword);
  };
  return (
    <Box className='relative'>
      <Input
        {...props}
        type={showPassword ? "text" : "password"}
        ref={ref}
        className={cn("pe-8", className)}
      />
      <button
        title={showPassword ? "Hide password" : "Show password"}
        className='absolute right-2 top-2/4 -translate-y-1/2'
        type='button'
        onClick={handlePasswordVisibility}
      >
        {showPassword ? (
          <EyeOff
            strokeWidth={1.5}
            className='text-muted-foreground'
          />
        ) : (
          <Eye
            strokeWidth={1.5}
            className='text-muted-foreground'
          />
        )}
      </button>
    </Box>
  );
});
PasswordInput.displayName = "PasswordInput";
export { PasswordInput };
