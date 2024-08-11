import { PropsWithChildren } from "react";
import { AuthServiceAdapterProvider } from "./_provider";

const AuthLayout = async ({ children }: PropsWithChildren) => {
  return <AuthServiceAdapterProvider>{children}</AuthServiceAdapterProvider>;
};

export default AuthLayout;
