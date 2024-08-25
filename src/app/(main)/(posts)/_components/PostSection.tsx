"use client";

import { ErrorMessage } from "../../../_components/common/ErrorMessage";
import { Box } from "../../../_components/ui";
import { usePostFeed } from "../_hooks";
import { usePostAdapter } from "../_hooks/usePostAdapter";
import Posts from "./Posts";

const PostSection = () => {
  const { getPosts } = usePostAdapter();
  const { paginatedData, error, isFetching } = usePostFeed(getPosts);
  const isDataAvailable =
    !isFetching &&
    paginatedData &&
    Array.isArray(paginatedData) &&
    paginatedData.length > 0;
  const errorMessage = error ? error.message : null;
  return (
    <Box className='pb-5'>
      {isFetching && !isDataAvailable && <p>Loading...</p>}
      {errorMessage && <ErrorMessage message={errorMessage} />}
      {isDataAvailable && <Posts posts={paginatedData ?? []} />}
    </Box>
  );
};

export { PostSection };
