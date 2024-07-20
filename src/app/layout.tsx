import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/src/globals.css";
import ThemeProvider from "./_providers/ThemeProvider";
import { ReactQueryProvider, SupabaseClientProvider } from "./_providers";
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
        className={cn(geistSans.variable, geistMono.variable, "bg-background")}
      >
        <ReactQueryProvider>
          <SupabaseClientProvider>
            <ThemeProvider>{children}</ThemeProvider>
          </SupabaseClientProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
