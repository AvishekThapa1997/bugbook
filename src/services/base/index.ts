import "server-only";
import { Singleton } from "../../app/(auth)/_util/SingletonClass";
import { UnauthorizedError } from "../../error";
import { createSupabaseClientForServer } from "../../lib/supabase/client/server";

export abstract class BaseService extends Singleton {
  async getLoggedInUser() {
    const { getLoggedInUser } = await import("../../app/(auth)/_util");
    const { data } = await getLoggedInUser();
    if (!data) {
      throw new UnauthorizedError();
    }
    return data;
  }

  getClient() {
    return createSupabaseClientForServer();
  }
}
