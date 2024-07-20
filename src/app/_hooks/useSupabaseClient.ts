import { useContext } from "react";
import { SupabaseClientContext } from "../_providers/SupabaseClientProvider";

export const useSupabaseClient = () => {
  const supabaseClient = useContext(SupabaseClientContext);
  if (!supabaseClient) {
    throw new Error(
      "useSupabaseClient : Must be used within SupabaseClientProvider"
    );
  }
  return supabaseClient;
};
