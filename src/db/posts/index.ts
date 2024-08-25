import { PostDto } from "../../app/dto/postDto";
import { TrendingTopicDto } from "../../app/dto/trendingTopicDto";
import { CONSTANTS } from "../../constants";
import { CreatePostSchema } from "../../lib/validation";
import { PostCursor, Result } from "../../types";
import { BaseRepository } from "../base/BaseRepository";
import { IPostRepository } from "./IPostRepository";

class SupabasePostRepositoryImpl
  extends BaseRepository
  implements IPostRepository
{
  private constructor() {
    super();
  }

  async getPosts(currentLoggedInUserId: string, cursor: PostCursor) {
    const result: Result<PostDto[]> = {};
    const supabaseClient = this.getClient();
    const { data, error } = await supabaseClient.rpc("get_posts", {
      limit_val: CONSTANTS.PAGINATION_LIMIT,
      ...(cursor.createdAt && cursor.id
        ? { cursor: { created_at: cursor.createdAt, id: cursor.id } }
        : {})
    });
    if (error) {
      throw error;
    }
    if (data) {
      const posts = data.map((post) => ({
        id: post.id,
        content: post.content,
        created_at: post.created_at,
        updated_at: post.updated_at,
        author: {
          id: post.author.id,
          displayName: post.author.display_name,
          username: post.author.username
        }
      }));
      result.data = posts;
    }

    return result;
  }
  async createPost(
    currentLoggedInUserId: string,
    createPostSchema: CreatePostSchema,
    tags: string[] = []
  ): Promise<Result<PostDto>> {
    const result: Result<PostDto> = {};
    const supabaseClient = this.getClient();
    const { data, error } = await supabaseClient.rpc(
      "create_post_with_hashtags",
      {
        post_content: createPostSchema.content,
        hash_tags: tags
      }
    );
    if (error) {
      throw error;
    }
    if (data) {
      result.data = {
        id: data.id,
        content: data.content,
        created_at: data.created_at,
        updated_at: data.updated_at,
        author: {
          id: data.author.id,
          username: data.author.username,
          displayName: data.author.display_name
        }
      };
    }
    return result;
  }
  async getTrendingTopics(): Promise<Result<TrendingTopicDto[]>> {
    const result: Result<TrendingTopicDto[]> = {};
    const supabaseClient = this.getClient();
    const { data, error } = await supabaseClient.rpc("get_trending_topics");
    if (error) {
      throw error;
    }
    if (data) {
      result.data = data.map(({ name, total_posts }) => ({
        name,
        total_posts: Number(total_posts)
      }));
    }
    return result;
  }
}

const postRepository =
  SupabasePostRepositoryImpl.getInstance() as IPostRepository;
export { postRepository };
