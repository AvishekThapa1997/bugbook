export const extractHashTags = (post: string) =>
  post.match(/#\w+/g)?.map((res) => res) ?? [];
