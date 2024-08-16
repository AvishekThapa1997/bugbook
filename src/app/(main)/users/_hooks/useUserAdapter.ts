import { useContext } from "react";
import { UserAdapterContext } from "../_provider/UserServiceAdapterProvider";

export const useUserAdapter = () => {
  const userAdapter = useContext(UserAdapterContext);
  if (!userAdapter) {
    throw new Error(
      "useUserAdapter must be called within UserServiceAdapterProvider"
    );
  }
  return userAdapter;
};
