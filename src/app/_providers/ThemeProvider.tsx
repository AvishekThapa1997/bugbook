"use client";
import React, { PropsWithChildren } from "react";
import { ThemeProvider as NextThemeProvider } from "next-themes";
import { useIsClient } from "../_hooks";

const ThemeProvider = ({ children }: PropsWithChildren) => {
  const isClient = useIsClient();
  if (!isClient) {
    return null;
  }
  return (
    <NextThemeProvider
      enableSystem={true}
      defaultTheme='light'
      attribute='class'
    >
      {children}
    </NextThemeProvider>
  );
};

export { ThemeProvider };
