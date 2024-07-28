import { PropsWithChildren } from "react";
import { getLoggedInUser } from "../(auth)/_service";
import { redirect } from "next/navigation";
import { Header } from "../_components/common/Header";
import { UserProvider } from "../_providers";

const MainLayout = async ({ children }: PropsWithChildren) => {
  const { data } = await getLoggedInUser();
  if (!data) {
    redirect("/signup");
  }
  return (
    <UserProvider user={data}>
      <Header />
      {children}
    </UserProvider>
  );
};

export default MainLayout;
