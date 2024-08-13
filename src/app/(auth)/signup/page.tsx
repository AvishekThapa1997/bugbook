import { Metadata } from "next";
import React from "react";

import Image from "next/image";
import signUpImage from "@/src/assets/image/signup-image.webp";
import Link from "next/link";
import { SignUpForm } from "../_components/SignUpForm";
import { Box } from "../../_components/ui";

export const metadata = {
  title: "Sign up"
} as Metadata;

const SignUpPage = () => {
  return (
    <main className='flex h-svh items-center px-4'>
      <Box className='relative mx-auto flex max-h-[40rem] max-w-96 basis-full overflow-hidden rounded-lg bg-card p-0 shadow-xl md:max-w-4xl'>
        <Box className='basis-full space-y-3 p-6 md:basis-1/2 md:p-10'>
          <Box className='space-y-1 text-center'>
            <h1 className='text-2xl font-bold md:text-3xl'>
              Sign up to bugbook
            </h1>
            <p className='text-muted-foreground'>
              A place where even <em>you</em> can find friends.
            </p>
          </Box>
          <SignUpForm />
          <p className='space-x-1 text-center text-muted-foreground'>
            <span>Already have an account?</span>
            <Link
              href='/signin'
              className='text-foreground underline'
            >
              Sign in
            </Link>
          </p>
        </Box>
        <Box className='hidden basis-1/2 md:block'>
          <Image
            src={signUpImage}
            alt='A man using computer'
            className='cove h-full object-cover'
            height={1920}
            width={1080}
          />
        </Box>
      </Box>
    </main>
  );
};

export default SignUpPage;
