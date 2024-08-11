import { PropsWithChildren } from "react";
import { getLoggedInUser } from "@/src/app/(auth)/_util";
import { redirect } from "next/navigation";

const ProtectedPage = async ({ children }: PropsWithChildren) => {
  const { data } = await getLoggedInUser();
  if (!data) {
    redirect("/signup");
  }
  return <>{children}</>;
};

export { ProtectedPage };
