import React from "react";
import { Box, Skeleton } from "../../../_components/ui";

const PostsLoadingSkeleton = () => {
  return (
    <Box className='space-y-3'>
      {Array.from({ length: 10 })
        .fill("")
        .map((_, index) => (
          <PostSkeleton key={index} />
        ))}
    </Box>
  );
};

const PostSkeleton = () => {
  return (
    <Box className='rounded-xl bg-card p-4'>
      <Box className='mb-2 flex items-center gap-4'>
        <Skeleton className='size-12 rounded-full' />
        <Box className='flex-grow space-y-2'>
          <Skeleton className='h-4 w-full rounded-sm' />
          <Skeleton className='h-4 w-full rounded-sm' />
        </Box>
      </Box>
      <Skeleton className='h-28' />
    </Box>
  );
};
export { PostsLoadingSkeleton };
