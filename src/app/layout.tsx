import type { Metadata } from "next";
import "@/src/globals.css";

import { ReactQueryProvider, ThemeProvider } from "./_providers";
import { cn } from "../lib";
import { geistMono, geistSans } from "../assets/fonts";

export const metadata: Metadata = {
  title: {
    template: "%s | bugbook",
    default: "bugbook"
  },
  description: "The social media app for powernerds"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={cn(
          geistSans.variable,
          geistMono.variable,
          "bg-background text-foreground"
        )}
      >
        <ReactQueryProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
