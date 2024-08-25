export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          operationName?: string;
          query?: string;
          variables?: Json;
          extensions?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      hashtags: {
        Row: {
          created_at: string;
          id: string;
          name: string;
          owner_id: string | null;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          name: string;
          owner_id?: string | null;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          name?: string;
          owner_id?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "hashtags_owner_id_fkey";
            columns: ["owner_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      posts: {
        Row: {
          author_id: string | null;
          content: string;
          created_at: string;
          id: string;
          updated_at: string;
        };
        Insert: {
          author_id?: string | null;
          content: string;
          created_at?: string;
          id?: string;
          updated_at?: string;
        };
        Update: {
          author_id?: string | null;
          content?: string;
          created_at?: string;
          id?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "posts_author_id_fkey";
            columns: ["author_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      posts_hashtags: {
        Row: {
          hashtag_name: string;
          post_id: string;
        };
        Insert: {
          hashtag_name: string;
          post_id: string;
        };
        Update: {
          hashtag_name?: string;
          post_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "posts_hashtags_hashtag_name_fkey";
            columns: ["hashtag_name"];
            isOneToOne: false;
            referencedRelation: "hashtags";
            referencedColumns: ["name"];
          },
          {
            foreignKeyName: "posts_hashtags_post_id_fkey";
            columns: ["post_id"];
            isOneToOne: false;
            referencedRelation: "posts";
            referencedColumns: ["id"];
          }
        ];
      };
      profiles: {
        Row: {
          created_at: string | null;
          display_name: string;
          email: string;
          id: string;
          profile_image: string | null;
          updated_at: string | null;
          username: string;
        };
        Insert: {
          created_at?: string | null;
          display_name: string;
          email: string;
          id: string;
          profile_image?: string | null;
          updated_at?: string | null;
          username: string;
        };
        Update: {
          created_at?: string | null;
          display_name?: string;
          email?: string;
          id?: string;
          profile_image?: string | null;
          updated_at?: string | null;
          username?: string;
        };
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey";
            columns: ["id"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      trending_hashtags: {
        Row: {
          last_used_at: string;
          name: string;
          trending_score: number | null;
        };
        Insert: {
          last_used_at?: string;
          name: string;
          trending_score?: number | null;
        };
        Update: {
          last_used_at?: string;
          name?: string;
          trending_score?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "trending_hashtags_name_fkey";
            columns: ["name"];
            isOneToOne: true;
            referencedRelation: "hashtags";
            referencedColumns: ["name"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      create_post_with_hashtags: {
        Args: {
          post_content: string;
          hash_tags: string[];
        };
        Returns: {
          id: string;
          content: string;
          created_at: string;
          updated_at: string;
          author: {
            id: string;
            username: string;
            display_name: string;
          };
        };
      };
      get_posts: {
        Args: {
          limit_val?: number;
          cursor?: {
            id: string;
            created_at: string;
          };
        };
        Returns: {
          id: string;
          content: string;
          created_at: string;
          updated_at: string;
          author: {
            id: string;
            username: string;
            display_name: string;
          };
        }[];
      };
      get_trending_topics: {
        Args: Record<PropertyKey, never>;
        Returns: {
          name: string;
          total_posts: string;
        }[];
      };
      get_user_recommendations: {
        Args: Record<PropertyKey, never>;
        Returns: {
          created_at: string | null;
          display_name: string;
          email: string;
          id: string;
          profile_image: string | null;
          updated_at: string | null;
          username: string;
        }[];
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never;
