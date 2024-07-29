import { Models } from "node-appwrite";
export interface User {
  id: string;
  email: string;
  name: string;
  firstName: string;
  lastName?: string;
  profileImage?: string | null;
}

export interface Userdata {
  avatar_url?: string;
  email?: string;
  email_verified?: string;
  full_name?: string;
  iss?: string;
  name?: string;
  phone_verified?: string;
  preferred_username?: string;
  provider_id?: string;
  sub?: string;
  user_name?: string;
}

// Map from supabase  user
// export function mapUser(supabaseUser: SupabaseUser) {
//   const userMetadata = supabaseUser.user_metadata as Userdata;
//   return {
//     id: supabaseUser.id,
//     email: supabaseUser.email ?? "",
//     firstName: "",
//     lastName: "",
//     name: userMetadata.name ?? "",
//     profileImage: userMetadata.avatar_url
//   };
// }

// Map from App Write User

export function mapUser(appWriteUser: Models.User<Models.Preferences>) {
  return {
    id: appWriteUser.$id,
    email: appWriteUser.email ?? "",
    firstName: "",
    lastName: "",
    name: appWriteUser.name ?? "",
    profileImage: ""
  };
}
