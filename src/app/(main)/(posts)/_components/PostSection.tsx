"use client";

import { PropsWithChildren } from "react";
import { ErrorMessage } from "../../../_components/common/ErrorMessage";
import {
  Box,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "../../../_components/ui";
import { InfiniteScrollingContainer } from "../../_components/InfiniteScrollingContainer";
import { usePostFeed } from "../_hooks";
import { usePostAdapter } from "../_hooks/usePostAdapter";
import { DeletePostConfirmationDialog } from "./DeletePostConfirmationDialog";
import Posts from "./Posts";
import { PostsLoadingSkeleton } from "./PostsLoadingSkeleton";
import { DeletePostConfirmationDialogProvider } from "../_provider/DeletePostConfirmationDialogProvider";
import { PostDto } from "../../../dto/postDto";

const GlobalPostSection = ({ children }: PropsWithChildren) => {
  return (
    <>
      <DeletePostConfirmationDialog />
      <Box className='pb-5'>{children}</Box>
    </>
  );
};

const PostContainer = () => {
  return (
    <DeletePostConfirmationDialogProvider>
      <Tabs defaultValue='global'>
        <TabsList>
          <TabsTrigger value='global'>For you</TabsTrigger>
          <TabsTrigger value='followers'>Followers</TabsTrigger>
        </TabsList>
        <TabsContent value='global'>
          <GlobalPostSection>
            <FeedList fetchForOnlyFollowers={false} />
          </GlobalPostSection>
        </TabsContent>
        <TabsContent value='followers'>
          <FeedList fetchForOnlyFollowers={true} />
        </TabsContent>
      </Tabs>
    </DeletePostConfirmationDialogProvider>
  );
};

interface FeedListProps {
  fetchForOnlyFollowers?: boolean;
}

const FeedList = ({ fetchForOnlyFollowers }: FeedListProps) => {
  const { getPosts } = usePostAdapter();
  const { paginatedData, error, isFetching } = usePostFeed({
    operation: (params) => getPosts(params, fetchForOnlyFollowers),
    queryKey: [
      "feed",
      fetchForOnlyFollowers ? "followers-post-feed" : "post-feed"
    ]
  });
  return (
    <PostList
      paginatedData={paginatedData}
      error={error}
      isFetching={isFetching}
    />
  );
};
interface PostListProps {
  paginatedData?: PostDto[];
  error?: Error | null;
  isFetching: boolean;
}
const PostList = ({ paginatedData, error, isFetching }: PostListProps) => {
  const isDataAvailable =
    !isFetching &&
    paginatedData &&
    Array.isArray(paginatedData) &&
    paginatedData.length > 0;
  const errorMessage = error ? error.message : null;
  return (
    <>
      {isFetching && !isDataAvailable && <PostsLoadingSkeleton />}
      {errorMessage && <ErrorMessage message={errorMessage} />}
      {isDataAvailable && (
        <InfiniteScrollingContainer>
          <Posts posts={paginatedData ?? []} />
        </InfiniteScrollingContainer>
      )}
    </>
  );
};

export { PostContainer as PostSection };
