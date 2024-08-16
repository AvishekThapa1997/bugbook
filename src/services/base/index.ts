import { getLoggedInUser } from "../../app/(auth)/_util";
import { UnauthorizedError } from "../../error";
import { SupabaseClient } from "../../lib/supabase/client/SupabaseClient";

export abstract class BaseService extends SupabaseClient {
  async getLoggedInUser() {
    const { data } = await getLoggedInUser();
    if (!data) {
      throw new UnauthorizedError();
    }
    return data;
  }
}
