"use client";

import React from "react";
import Link from "next/link";

import { Post } from "../types/posts";
import { BaseProps } from "../../../../types";
import { Box, Card, CardContent, CardHeader } from "../../../_components/ui";
import { cn } from "../../../../lib";
import { UserAvatar } from "../../_components/UserAvatar";
import { formatRelativeDate } from "../../../../lib/util";

interface PostsProps extends BaseProps {
  posts: Post[];
}

interface PostItemProps extends BaseProps {
  post: Post;
}

const Posts = ({ posts, className }: PostsProps) => {
  return (
    <Box className={cn("mt-5 space-y-3", className)}>
      {posts.map((post) => (
        <PostItem
          key={post.id}
          post={post}
        />
      ))}
    </Box>
  );
};

const PostItem = ({ post, className }: PostItemProps) => {
  return (
    <article>
      <Card className={cn("border-0", className)}>
        <CardHeader className='flex-row gap-2 space-y-0 p-4 pb-2'>
          <Link href={`/users/${post.author.id}`}>
            <UserAvatar />
          </Link>
          <Box>
            <Link
              href={`/users/${post.author.id}`}
              className='block self-start font-medium hover:underline'
            >
              {post.author.name}
            </Link>
            <Link
              href={`/posts/${post.id}`}
              className='block text-sm text-muted-foreground hover:underline'
            >
              {formatRelativeDate(new Date(post.createdAt))}
            </Link>
          </Box>
        </CardHeader>
        <CardContent className='whitespace-pre-line break-words p-4 pt-0'>
          {post.content.replaceAll("/n", "\n")}
        </CardContent>
      </Card>
    </article>
  );
};

export default Posts;
