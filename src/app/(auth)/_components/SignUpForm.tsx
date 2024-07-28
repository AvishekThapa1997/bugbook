"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, SignUpSchema } from "@/src/lib/validation";
import { BaseProps } from "@/src/types";
import React from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  LoadingButton,
  PasswordInput
} from "../../_components/ui";
import { cn } from "@/src/lib";

import { useIsClient } from "../../_hooks";
import { InputField } from "../types";

import { CONSTANTS } from "@/src/constants";
import { ErrorMessage } from "../../_components/common/ErrorMessage";
import { useUserSignUp } from "../_hooks";

const signUpFields = [
  {
    name: "name",
    type: "text",
    label: "name",
    placeholder: "Enter name"
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
  const { isPending, mutateAsync } = useUserSignUp();
  const isClient = useIsClient();
  const signupForm = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    }
  });
  const {
    setError,
    handleSubmit,
    formState: { errors }
  } = signupForm;
  async function onSubmit(signUpValues: SignUpSchema) {
    const { error } = (await mutateAsync(signUpValues)) ?? {};
    if (!error) {
      return;
    }
    if (Array.isArray(error)) {
      error.forEach(({ field, message }) => {
        setError(
          field,
          { message },
          {
            shouldFocus: true
          }
        );
      });
      return;
    }
    setError(`root.${CONSTANTS.ERROR_MESSAGE.SERVER_ERROR}`, {
      message: error.message
    });
  }
  const serverErrorMessage =
    errors.root?.[CONSTANTS.ERROR_MESSAGE.SERVER_ERROR]?.message;
  return (
    <>
      <Form {...signupForm}>
        {!!serverErrorMessage && <ErrorMessage message={serverErrorMessage} />}
        <form
          className={cn("space-y-2", className)}
          onSubmit={handleSubmit(onSubmit)}
          noValidate={isClient}
          name='signup-form'
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
                    {type === "password" ? (
                      <PasswordInput
                        placeholder={placeholder}
                        required
                        {...field}
                        disabled={isPending}
                      />
                    ) : (
                      <Input
                        type={type}
                        placeholder={placeholder}
                        required
                        {...field}
                        disabled={isPending}
                      />
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
          ))}
          <Box>
            <LoadingButton
              className='mt-4 w-full'
              isLoading={isPending}
              type='submit'
            >
              Create account
            </LoadingButton>
          </Box>
        </form>
      </Form>
    </>
  );
};

export { SignUpForm };
