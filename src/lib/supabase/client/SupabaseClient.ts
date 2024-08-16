import "server-only";
import { createSupabaseClientForServer } from "./server";

abstract class SupabaseClient {
  getClient() {
    return createSupabaseClientForServer();
  }
}

export { SupabaseClient };
