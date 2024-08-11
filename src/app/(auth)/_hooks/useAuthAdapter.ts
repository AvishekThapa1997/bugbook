import { useContext } from "react";
import { AuthServiceAdapterContext } from "../_provider";

export const useAuthAdapter = () => {
  const adapterContext = useContext(AuthServiceAdapterContext);
  if (!adapterContext) {
    throw new Error(
      "useAuthAdapter must be use with AuthServiceAdapterProvider"
    );
  }
  return adapterContext;
};
