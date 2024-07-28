import { PropsWithChildren } from "react";
import { getLoggedInUser } from "../../(auth)/_service";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { CONSTANTS } from "@/src/constants";

const ProtectedPage = async ({ children }: PropsWithChildren) => {
  const { data } = await getLoggedInUser();
  const cookieStore = cookies();
  if (!data) {
    cookieStore.delete(CONSTANTS.SESSION.NAME);
    redirect("/signup");
  }
  return <>{children}</>;
};

export { ProtectedPage };
