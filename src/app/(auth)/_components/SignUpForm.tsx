"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, SignUpSchema } from "@/src/lib/validation";
import { BaseProps } from "@/src/types";
import React from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input
} from "../../_components/ui";
import { cn } from "@/src/lib";

import { useIsClient } from "../../_hooks";
import { InputField } from "../types";

const signUpFields = [
  {
    name: "username",
    type: "text",
    label: "username",
    placeholder: "Enter username"
  },
  {
    name: "email",
    type: "email",
    label: "email",
    placeholder: "Enter email"
  },
  {
    name: "password",
    type: "password",
    label: "password",
    placeholder: "Enter password"
  },
  {
    name: "confirmPassword",
    type: "password",
    label: "confirm password",
    placeholder: "Confirm Password"
  }
] as InputField[];
const SignUpForm = ({ className }: BaseProps) => {
  const isClient = useIsClient();
  const signupForm = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: ""
    }
  });

  function onSubmit(signUpValues: SignUpSchema) {}
  return (
    <Form {...signupForm}>
      <form
        className={cn("space-y-2", className)}
        onSubmit={signupForm.handleSubmit(onSubmit)}
        noValidate={isClient}
      >
        {signUpFields.map(({ label, name, type, placeholder }) => (
          <FormField
            control={signupForm.control}
            name={name as keyof SignUpSchema}
            key={name}
            render={({ field }) => (
              <FormItem className='space-y-1'>
                <FormLabel className='capitalize'>{label}</FormLabel>
                <FormControl>
                  <Input
                    type={type}
                    placeholder={placeholder}
                    required
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
        ))}
        <Box>
          <Button
            className='mt-2 w-full'
            type='submit'
          >
            Create account
          </Button>
        </Box>
      </form>
    </Form>
  );
};

export { SignUpForm };
