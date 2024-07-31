import { PropsWithChildren } from "react";
import { getLoggedInUser } from "@/auth/_service";
import { redirect } from "next/navigation";

const ProtectedPage = async ({ children }: PropsWithChildren) => {
  const { data } = await getLoggedInUser();
  if (!data) {
    redirect("/signup");
  }
  return <>{children}</>;
};

export { ProtectedPage };
