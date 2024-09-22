import { PropsWithChildren } from "react";

import { redirect } from "next/navigation";
import { getLoggedInUser } from "../../(auth)/_util";

const ProtectedPage = async ({ children }: PropsWithChildren) => {
  const data = await getLoggedInUser();
  console.log({ data });
  if (!data) {
    redirect("/signin");
  }
  return <>{children}</>;
};

export { ProtectedPage };
