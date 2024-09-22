"use client";
import React, { ComponentProps, PropsWithChildren } from "react";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import "./post-editor.css";
import { useCreatePost } from "../_hooks";
import { Box, Card, CardContent, LoadingButton } from "../../../_components/ui";
import { UserAvatar } from "../../_components/UserAvatar";
import { useToastNotification } from "../../_hooks";

const PostEditorSection = () => {
  return (
    <section>
      <Card className='border-0'>
        <CardContent className='flex gap-2 p-3 md:gap-4 md:p-4'>
          <UserAvatar />
          <PostEditorForm />
        </CardContent>
      </Card>
    </section>
  );
};

const Editor = (props: ComponentProps<typeof EditorContent>) => {
  return <EditorContent {...props} />;
};

const PostEditorForm = () => {
  const { mutate, isPending } = useCreatePost();
  const showToast = useToastNotification({
    position: "top-right"
  });
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        bold: false,
        italic: false
      }),
      Placeholder.configure({
        placeholder: "What's on your mind?"
      })
    ]
  });
  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const post = editor?.getText({
      blockSeparator: "/n"
    });
    editor?.setEditable(false);
    mutate(
      {
        content: post ?? ""
      },
      {
        onSuccess(data) {
          if (data.error) {
            if (data.error.code === 500)
              showToast("Failed to post. Please try again.", { type: "error" });
            else showToast(data.error.message, { type: "error" });
          } else {
            editor?.commands.clearContent();
            showToast("Post created successfully!", { type: "success" });
          }
        },
        onError(error) {
          showToast("Failed to post. Please try again.", { type: "error" });
        },
        onSettled() {
          editor?.setEditable(true);
        }
      }
    );
  };
  return (
    <form
      className='flex-grow space-y-3'
      onSubmit={onSubmit}
    >
      <Editor
        editor={editor}
        className='max-h-80 min-h-16 w-full overflow-y-auto rounded-md bg-background px-4 py-2.5 disabled:hover:cursor-not-allowed'
        disabled={isPending}
      />
      <Box className='text-end'>
        <LoadingButton
          isLoading={isPending}
          className='rounded-full px-6 capitalize tracking-wider'
        >
          post
        </LoadingButton>
      </Box>
    </form>
  );
};

Editor.displayName = "Editor";

export { PostEditorSection };
