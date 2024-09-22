"use client";
import React from "react";
import { MoreHorizontal, Trash2 } from "../../../_components/icons";
import {
  Box,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "../../../_components/ui";
import { useUser } from "../../../(auth)/_hooks";
import { PostDto } from "../../../dto/postDto";
import { BaseProps } from "../../../../types";
import { cn } from "../../../../lib";
import { useDeletePostConfirmationDialog } from "../_hooks/useDeletePostConfirmationDialog";

interface PostActionProps extends BaseProps {
  postId: string;
  authorId: PostDto["author"]["id"];
}

const PostActions = ({ postId, authorId, className }: PostActionProps) => {
  const user = useUser();
  const { setPostId } = useDeletePostConfirmationDialog();
  if (user.id !== authorId) {
    return null;
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size='icon'
          variant='ghost'
          className={cn("opacity-0 transition-opacity", className)}
        >
          <MoreHorizontal className='size-5 text-muted-foreground' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        sideOffset={-10}
        align='end'
      >
        <DropdownMenuItem onClick={() => setPostId(postId)}>
          <Box className='flex items-center gap-3'>
            <Trash2 className='size-4 text-red-500' />
            <span>Delete</span>
          </Box>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { PostActions };
