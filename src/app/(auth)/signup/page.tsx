import { Metadata } from "next";
import React from "react";
import { Box, Card, CardContent } from "../../_components/ui";
import Image from "next/image";
import signUpImage from "@/src/assets/image/signup-image.webp";
import { SignUpForm } from "../_components";
import Link from "next/link";

export const metadata = {
  title: "Sign up"
} as Metadata;

const SignUpPage = () => {
  return (
    <Box className='flex h-svh items-center px-4'>
      <Card className='relative mx-auto max-w-96 basis-full overflow-hidden md:max-w-4xl'>
        <CardContent className='flex min-h-[30rem] p-0'>
          <Box className='basis-full space-y-4 p-6 md:basis-1/2'>
            <Box className='space-y-1'>
              <h1 className='text-3xl font-bold'>Sign up to bugbook</h1>
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
        </CardContent>
      </Card>
    </Box>
  );
};

export default SignUpPage;
