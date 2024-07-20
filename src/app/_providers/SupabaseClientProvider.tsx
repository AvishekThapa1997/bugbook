"use client";
import { createClient } from "@/src/lib/supabase/client";
import React, { PropsWithChildren, useState } from "react";

type SupabaseBrowserClient = ReturnType<typeof createClient>;
export const SupabaseClientContext =
  React.createContext<SupabaseBrowserClient | null>(null);

const SupabaseClientProvider = ({ children }: PropsWithChildren) => {
  const [supabaseClient] = useState(createClient());
  return (
    <SupabaseClientContext.Provider value={supabaseClient}>
      {children}
    </SupabaseClientContext.Provider>
  );
};

export { SupabaseClientProvider };
