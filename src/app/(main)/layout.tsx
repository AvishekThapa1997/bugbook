import { PropsWithChildren } from "react";
import { getLoggedInUser } from "@/auth/_service";
import { redirect } from "next/navigation";
import { Header } from "./_components/Header";

import { Box } from "@/app/_components/ui";
import { DesktopNavigation } from "@/main/_components/DesktopNavigation";
import { MobileNavigation } from "@/main/_components/MobileNavigation";
import { UserProvider } from "@/main/_providers/UserProvider";

const MainLayout = async ({ children }: PropsWithChildren) => {
  const { data } = await getLoggedInUser();
  if (!data) {
    redirect("/signup");
  }
  return (
    <UserProvider user={data}>
      <Header />
      <Box className='mx-auto flex max-w-7xl grow gap-5 p-5'>
        <DesktopNavigation />
        <main>{children}</main>
      </Box>
      <MobileNavigation />
    </UserProvider>
  );
};

export default MainLayout;
