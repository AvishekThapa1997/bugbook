"use client";
import React, { PropsWithChildren } from "react";
import { ThemeProvider as NextThemeProvider } from "next-themes";

const ThemeProvider = ({ children }: PropsWithChildren) => {
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
