import zod, { ZodError, ZodSchema } from "zod";
import { CONSTANTS } from "../../constants";

export const signUpSchema = zod
  .object({
    username: zod
      .string({ message: CONSTANTS.ERROR_MESSAGE.USERNAME_REQUIRED })
      .regex(/^[\w\s_-]+$/, {
        message: CONSTANTS.ERROR_MESSAGE.INVALID_USERNAME
      })
      .min(6, {
        message: CONSTANTS.ERROR_MESSAGE.USERNAME_NUM_OF_CHARACTERS_REQUIREMENT
      }),
    name: zod.string().min(6, {
      message: CONSTANTS.ERROR_MESSAGE.NAME_NUM_OF_CHARACTERS_REQUIREMENT
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
      })
  })
  .readonly();

export const signInSchema = zod
  .object({
    username: zod.string().trim(),
    password: zod.string().trim()
  })
  .readonly();

export const createPostSchema = zod.object({
  content: zod
    .string({ message: CONSTANTS.ERROR_MESSAGE.POST_CONTENT_IS_REQUIRED })
    .max(CONSTANTS.POST_CONTENT_MAX_LENGTH, {
      message: CONSTANTS.ERROR_MESSAGE.POST_MAX_LENGTH
    })
});

export type SignUpSchema = zod.infer<typeof signUpSchema>;
export type SignInSchema = zod.infer<typeof signInSchema>;
export type CreatePostSchema = zod.infer<typeof createPostSchema>;

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
