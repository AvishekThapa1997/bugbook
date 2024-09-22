"use client";
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

import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useRef, useTransition } from "react";
import { useForm } from "react-hook-form";
import { InputField } from "../_types";
import { BaseProps, InputEventAction } from "../../../types";
import { useIsClient } from "../../_hooks";
import { signUpSchema, SignUpSchema } from "../../../lib/validation";
import { CONSTANTS } from "../../../constants";
import { useCheckForUsernameAvailability } from "../_hooks";
import { ErrorMessage } from "../../_components/common/ErrorMessage";
import { cn } from "../../../lib";
import { useAuthAdapter } from "../_hooks/useAuthAdapter";

const signUpFields = [
  {
    name: "username",
    type: "text",
    label: "username",
    placeholder: "Enter name",
    minLength: 6,
    maxLength: 30
  },
  {
    name: "email",
    type: "email",
    label: "email",
    placeholder: "Enter email"
  },
  {
    name: "name",
    type: "text",
    label: "name",
    placeholder: "Full Name",
    minLength: 6,
    maxLength: 50
  },
  {
    name: "password",
    type: "password",
    label: "password",
    placeholder: "Enter password",
    minLenght: 8,
    maxLength: 16
  }
] as InputField[];
const SignUpForm = ({ className }: BaseProps) => {
  const prevUsernameRef = useRef<string>("");
  const { signUpUser } = useAuthAdapter();
  const [isPending, startTransition] = useTransition();
  const {
    isPending: isCheckingForUsernameAvailability,
    mutateAsync: checkForUsernameAvailability
  } = useCheckForUsernameAvailability();
  const isClient = useIsClient();
  const signupForm = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      name: "",
      password: ""
    }
  });
  const {
    setError,
    handleSubmit,
    clearErrors,

    formState: { errors }
  } = signupForm;

  async function onSubmit(signUpValues: SignUpSchema) {
    startTransition(async () => {
      const { error } = (await signUpUser(signUpValues)) ?? {};
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
    });
  }
  const serverErrorMessage =
    errors.root?.[CONSTANTS.ERROR_MESSAGE.SERVER_ERROR]?.message;

  const inputEventAction = useMemo<
    Partial<InputEventAction<SignUpSchema>>
  >(() => {
    return {
      username: {
        onBlur: async (event) => {
          const username = event.target.value;
          const prevUsername = prevUsernameRef.current;
          if (!username || username.length < 2 || prevUsername === username) {
            return;
          }
          prevUsernameRef.current = username;
          const { error } = await checkForUsernameAvailability(username);
          if (error && error.code === CONSTANTS.ERROR_STATUS_CODE.CONFLICT) {
            return setError("username", { message: error.message });
          }
          clearErrors("username");
        }
      }
    };
  }, [checkForUsernameAvailability, setError, clearErrors]);

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
          {signUpFields.map(
            ({ label, name, type, placeholder, maxLength, minLength }) => (
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
                          minLength={minLength}
                          maxLength={maxLength}
                        />
                      ) : (
                        <Input
                          type={type}
                          placeholder={placeholder}
                          required
                          {...field}
                          disabled={isPending}
                          {...(inputEventAction[field.name]
                            ? inputEventAction[field.name]
                            : {})}
                          minLength={minLength}
                          maxLength={maxLength}
                        />
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
            )
          )}
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
