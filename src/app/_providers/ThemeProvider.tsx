"use client";
import React, { PropsWithChildren } from "react";
import { ThemeProvider as NextThemeProvider } from "next-themes";

const ThemeProvider = ({ children }: PropsWithChildren) => {
  return (
    <NextThemeProvider
      enableSystem={true}
      defaultTheme='system'
      attribute='class'
    >
      {children}
    </NextThemeProvider>
  );
};

export default ThemeProvider;
