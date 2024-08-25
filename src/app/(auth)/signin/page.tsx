import { Metadata } from "next";
import React from "react";

import Image from "next/image";
import loginImage from "@/src/assets/image/login-image.webp";

import Link from "next/link";
import { Box } from "../../_components/ui";
import { SignInForm } from "../_components/SignInForm";

export const metadata = {
  title: "Sign in"
} as Metadata;

const SignInPage = () => {
  return (
    <main className='flex h-svh items-center px-4'>
      <Box className='relative mx-auto flex max-h-[40rem] min-h-[30rem] max-w-96 basis-full overflow-hidden overflow-y-auto rounded-md bg-card p-0 shadow-xl md:max-w-4xl'>
        <Box className='basis-full space-y-4 p-6 md:basis-1/2 md:p-10'>
          <Box className='space-y-1 text-center'>
            <h1 className='text-2xl font-bold md:text-3xl'>
              Sign in to bugbook
            </h1>
          </Box>
          <SignInForm />
          <p className='space-x-1 text-center text-muted-foreground'>
            <span>Don&apos;t have an account?</span>
            <Link
              href='/signup'
              className='text-foreground underline'
              replace
            >
              Sign up
            </Link>
          </p>
        </Box>
        <Box className='hidden basis-1/2 md:block'>
          <Image
            src={loginImage}
            alt='A man using computer'
            className='cove h-full object-cover'
          />
        </Box>
      </Box>
    </main>
  );
};

export default SignInPage;
