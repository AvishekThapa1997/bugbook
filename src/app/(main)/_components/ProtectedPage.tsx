import { PropsWithChildren } from "react";

import { redirect } from "next/navigation";
import { getLoggedInUser } from "../../(auth)/_util";

const ProtectedPage = async ({ children }: PropsWithChildren) => {
  const { data } = await getLoggedInUser();
  if (!data) {
    redirect("/signup");
  }
  return <>{children}</>;
};

export { ProtectedPage };
