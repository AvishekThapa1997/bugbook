import { PropsWithChildren } from "react";

import { redirect } from "next/navigation";
import { Header } from "./_components/Header";

import { getLoggedInUser } from "../(auth)/_util";
import { UserProvider } from "./_providers";
import { Box } from "../_components/ui";
import { DesktopNavigation } from "./_components/DesktopNavigation";
import { MobileNavigation } from "./_components/MobileNavigation";

const MainLayout = async ({ children }: PropsWithChildren) => {
  const { data } = await getLoggedInUser();
  if (!data) {
    redirect("/signup");
  }
  return (
    <UserProvider user={data}>
      <Header />
      <Box className='mx-auto flex max-w-7xl grow gap-5 p-5'>
        <DesktopNavigation className='xl:basis-72' />
        <main className='flex-grow'>{children}</main>
      </Box>
      <MobileNavigation />
    </UserProvider>
  );
};

export default MainLayout;
