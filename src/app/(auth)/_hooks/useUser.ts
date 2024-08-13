import { useContext } from "react";
import { UserContext } from "../../(main)/_providers";

export const useUser = () => {
  const user = useContext(UserContext);
  if (!user) {
    throw new Error("useUser must wrapped within UserProvider");
  }
  return user;
};
