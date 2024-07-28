import { CONSTANTS } from "@/src/constants";
import { FieldError } from "@/src/types";
import zod, { ZodError, ZodSchema } from "zod";

export const signUpSchema = zod
  .object({
    name: zod
      .string({ message: CONSTANTS.ERROR_MESSAGE.USERNAME_REQUIRED })
      .regex(/^[\w\s_-]+$/, {
        message: CONSTANTS.ERROR_MESSAGE.INVALID_USERNAME
      }),
    email: zod
      .string({ message: CONSTANTS.ERROR_MESSAGE.EMAIL_REQUIRED })
      .trim()
      .email({
        message: CONSTANTS.ERROR_MESSAGE.INVALID_EMAIL
      }),
    password: zod
      .string({ message: CONSTANTS.ERROR_MESSAGE.PASSWORD_REQUIRED })
      .min(CONSTANTS.PASSWORD_LENGTH.MIN, {
        message: CONSTANTS.ERROR_MESSAGE.INVALID_PASSWORD
      })
      .max(CONSTANTS.PASSWORD_LENGTH.MAX, {
        message: CONSTANTS.ERROR_MESSAGE.INVALID_PASSWORD
      }),
    confirmPassword: zod.string().optional()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: CONSTANTS.ERROR_MESSAGE.PASSWORD_DID_NOT_MATCH,
    path: ["confirmPassword"]
  })
  .readonly();

export const signInSchema = zod
  .object({
    email: zod
      .string({ message: CONSTANTS.ERROR_MESSAGE.EMAIL_REQUIRED })
      .trim()
      .email({
        message: CONSTANTS.ERROR_MESSAGE.INVALID_EMAIL
      }),
    password: zod
      .string()
      .min(1, {
        message: CONSTANTS.ERROR_MESSAGE.PASSWORD_REQUIRED
      })
      .trim()
  })
  .readonly();

export type SignUpSchema = zod.infer<typeof signUpSchema>;
export type SignInSchema = zod.infer<typeof signInSchema>;

export const parseSchema = <T extends ZodSchema>(
  schema: T,
  data: zod.infer<typeof schema>
): {
  data?: typeof data;
  errors?: FieldError<typeof data>[];
} => {
  const res = schema.safeParse(data);
  if (res.success) {
    return { data: res.data };
  }
  const errors = handleError(res.error);
  return { errors };
};

const handleError = <T>(error: ZodError): FieldError<T>[] => {
  const result = error.issues.map(({ path, message }) => {
    const key = Array.isArray(path) ? path[0] : path;
    return {
      field: key,
      message
    } as FieldError<T>;
  });
  return result;
};
