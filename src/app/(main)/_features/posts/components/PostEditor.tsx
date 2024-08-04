"use client";
import React, { ComponentProps, useRef } from "react";
import { Box, Button, Card, CardContent } from "@/src/app/_components/ui";
import { UserAvatar } from "@/app/(main)/_components/UserAvatar";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import "./post-editor.css";

const PostEditor = () => {
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
  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const post = editor?.getText({
      blockSeparator: "/n"
    });
    console.log({ post });
  };
  return (
    <Card>
      <CardContent className='flex gap-2 p-3 md:gap-4 md:p-4'>
        <UserAvatar />
        <form
          className='flex-grow space-y-2'
          onSubmit={onSubmit}
        >
          <Editor
            editor={editor}
            className='max-h-80 min-h-16 w-full overflow-y-auto rounded-md bg-background px-4 py-2.5 md:min-h-0'
          />
          <Box className='text-end'>
            <Button className='capitalize'>post</Button>
          </Box>
        </form>
      </CardContent>
    </Card>
  );
};

const Editor = (props: ComponentProps<typeof EditorContent>) => {
  return <EditorContent {...props} />;
};

Editor.displayName = "Editor";

export { PostEditor };
