"use client";
import React, { createContext, PropsWithChildren } from "react";
import { ThemeProvider as NextThemeProvider, useTheme } from "next-themes";

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

export default ThemeProvider;
