import { CONSTANTS } from "@/src/constants";
import zod from "zod";
const requiredString = zod.string().trim();
export const signUpSchema = zod
  .object({
    email: requiredString.email({
      message: CONSTANTS.ERROR_MESSAGE.INVALID_EMAIL
    }),
    username: requiredString.regex(/^[a-zA-Z\d_-]+$/, {
      message: CONSTANTS.ERROR_MESSAGE.INVALID_USERNAME
    }),
    password: requiredString
      .min(CONSTANTS.PASSWORD_LENGTH.MIN, {
        message: CONSTANTS.ERROR_MESSAGE.INVALID_PASSWORD
      })
      .max(CONSTANTS.PASSWORD_LENGTH.MAX, {
        message: CONSTANTS.ERROR_MESSAGE.INVALID_PASSWORD
      }),
    confirmPassword: requiredString
  })
  .readonly()
  .refine((data) => {
    data.password !== data.confirmPassword,
      {
        message: CONSTANTS.ERROR_MESSAGE.PASSWORD_DID_NOT_MATCH,
        path: ["confirmPassword"]
      };
  });

export const signInSchema = zod.object({
  username: requiredString,
  password: requiredString
});

export type SignUpSchema = zod.infer<typeof signUpSchema>;
export type signInSchema = zod.infer<typeof signInSchema>;
