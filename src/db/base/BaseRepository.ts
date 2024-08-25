import "server-only";
import { createSupabaseClientForServer } from "../../lib/supabase/client/server";
import { IBaseRepository } from "./IBaseRepository";
import { Singleton } from "../../app/(auth)/_util/SingletonClass";

export abstract class BaseRepository
  extends Singleton
  implements IBaseRepository<ReturnType<typeof createSupabaseClientForServer>>
{
  getClient() {
    return createSupabaseClientForServer();
  }
}
