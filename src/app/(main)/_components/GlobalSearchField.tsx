"use client";

import { CircleXIcon, SearchIcon } from "lucide-react";
import { Box, Input } from "@/app/_components/ui";
import React, { useState } from "react";
import { BaseProps } from "@/src/types";
import { cn } from "@/src/lib";
import { useRouter } from "next/navigation";

const GlobalSearchField = ({ className }: BaseProps) => {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const resetQuery = () => {
    setQuery("");
  };
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!query) {
      return;
    }
    router.push(`/search?q=${encodeURIComponent(query)}`);
  }
  return (
    <Box className={cn("relative", className)}>
      {
        // <form onSubmit={handleSubmit} method="GET" action="/search"> this works without js
      }
      <form onSubmit={handleSubmit}>
        <Input
          name='q'
          placeholder='Search'
          className='pe-7'
          value={query}
          onChange={handleChange}
        />
        <span className='absolute right-2 top-1/2 -translate-y-2/4'>
          {query.length > 0 ? (
            <CircleXIcon
              className='size-4 cursor-pointer text-muted-foreground'
              role='button'
              onClick={resetQuery}
            />
          ) : (
            <SearchIcon className='size-4 text-muted-foreground' />
          )}
        </span>
      </form>
    </Box>
  );
};

export { GlobalSearchField };
