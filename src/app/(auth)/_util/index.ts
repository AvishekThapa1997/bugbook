import "server-only";
import { cache } from "react";

import { userRepository } from "../../../db/users";

import { UserDto } from "../../dto/userDto";

export const getLoggedInUser = cache(
  async (): Promise<UserDto | undefined | null> => {
    try {
      const { data } = await userRepository.getLoggedInUser();
      return data;
    } catch (err) {}
    return;
  }
);
