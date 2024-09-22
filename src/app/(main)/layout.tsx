import { PropsWithChildren } from "react";

import { redirect } from "next/navigation";
import { Header } from "./_components/Header";

import { getLoggedInUser } from "../(auth)/_util";
import { UserProvider } from "./_providers";
import { Box } from "../_components/ui";
import { DesktopNavigation } from "./_components/DesktopNavigation";
import { MobileNavigation } from "./_components/MobileNavigation";
import { UserServiceAdapterProvider } from "./users/_provider/";
import { Toaster } from "react-hot-toast";

const MainLayout = async ({ children }: PropsWithChildren) => {
  const data = await getLoggedInUser();
  if (!data) {
    redirect("/signin");
  }
  return (
    <>
      <UserProvider user={data}>
        <UserServiceAdapterProvider>
          <MainLayoutContent>{children}</MainLayoutContent>
        </UserServiceAdapterProvider>
      </UserProvider>
      <Toaster />
    </>
  );
};

export const MainLayoutContent = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      <Box className='mx-auto flex h-content max-w-7xl grow gap-5 p-5'>
        <DesktopNavigation className='xl:basis-72' />
        <Box className='h-full flex-grow'>{children}</Box>
      </Box>
      <MobileNavigation />
    </>
  );
};
export default MainLayout;
