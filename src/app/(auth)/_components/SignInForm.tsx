"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema, SignInSchema } from "@/src/lib/validation";
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
} from "@/app/_components/ui";
import { cn } from "@/src/lib";

import { useIsClient } from "@/app/_hooks";
import { InputField } from "@/src/app/(auth)/_types";
import { useUserSignIn } from "@/auth/_hooks";
import { CONSTANTS } from "@/src/constants";
import { ErrorMessage } from "@/app/_components/common/ErrorMessage";

const loginFields = [
  {
    name: "username",
    type: "text",
    label: "username/Email",
    placeholder: "Enter username/email"
  },
  {
    name: "password",
    type: "password",
    label: "password",
    placeholder: "Enter password"
  }
] as InputField[];
const SignInForm = ({ className }: BaseProps) => {
  const { isPending, mutateAsync } = useUserSignIn();
  const isClient = useIsClient();
  const loginForm = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      username: "",
      password: ""
    }
  });
  const {
    handleSubmit,
    setError,

    formState: { errors }
  } = loginForm;

  async function onSubmit(signUpValues: SignInSchema) {
    const { error } = (await mutateAsync(signUpValues)) ?? {};
    if (error) {
      setError(`root.${CONSTANTS.ERROR_MESSAGE.SERVER_ERROR}`, {
        message: error.message
      });
    }
  }
  const serverErrorMessage =
    errors.root?.[CONSTANTS.ERROR_MESSAGE.SERVER_ERROR]?.message;
  return (
    <Form {...loginForm}>
      {!!serverErrorMessage && <ErrorMessage message={serverErrorMessage} />}
      <form
        className={cn("space-y-2", className)}
        onSubmit={handleSubmit(onSubmit)}
        noValidate={isClient}
        name='signin-form'
      >
        {loginFields.map(({ label, name, type, placeholder }) => (
          <FormField
            control={loginForm.control}
            name={name as keyof SignInSchema}
            key={name}
            render={({ field }) => (
              <FormItem className='space-y-1'>
                <FormLabel className='capitalize'>{label}</FormLabel>
                <FormControl>
                  {type === "password" ? (
                    <PasswordInput
                      placeholder={placeholder}
                      required
                      disabled={isPending}
                      {...field}
                    />
                  ) : (
                    <Input
                      type={type}
                      placeholder={placeholder}
                      required
                      disabled={isPending}
                      {...field}
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
            type='submit'
            isLoading={isPending}
          >
            Login
          </LoadingButton>
        </Box>
      </form>
    </Form>
  );
};

export { SignInForm };
