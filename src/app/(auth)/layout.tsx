import { PropsWithChildren } from "react";
import { getLoggedInUser } from "./_service";
import { redirect } from "next/navigation";

const AuthLayout = async ({ children }: PropsWithChildren) => {
  const result = await getLoggedInUser();
  if (result.data) {
    redirect("/");
  }
  return <>{children}</>;
};

export default AuthLayout;
