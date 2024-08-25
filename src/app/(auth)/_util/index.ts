import "server-only";
import { cache } from "react";

import { userRepository } from "../../../db/users";
import { Result } from "../../../types";
import { UserDto } from "../../dto/userDto";
import { handleError } from "../../../handleError";

export const getLoggedInUser = cache(
  async (): Promise<ReturnType<typeof userRepository.getLoggedInUser>> => {
    try {
      const res = await userRepository.getLoggedInUser();
      return res;
    } catch (err) {
      const res: Result<UserDto> = {};
      res.error = handleError(err);
      return res;
    }
  }
);
