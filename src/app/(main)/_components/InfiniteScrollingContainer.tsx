"use client";

import { PropsWithChildren } from "react";
import { useIntersectionObserver } from "../_hooks/useIntersectionObserver";

interface InfiniteScrollingContainerProps extends PropsWithChildren {}

const InfiniteScrollingContainer = ({
  children
}: InfiniteScrollingContainerProps) => {
  const ref = useIntersectionObserver<HTMLDivElement>({
    onInView() {
      console.log("Item is visibile");
    },
    rootMargin: "200px"
  });
  return (
    <>
      {children}
      <div ref={ref} />
    </>
  );
};

export { InfiniteScrollingContainer };
