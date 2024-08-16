import React from "react";
import { formatNumber } from "../../../lib/util";
import { Box } from "../../_components/ui";
import Link from "next/link";
import { TrendingTopicDto } from "../../dto/trendingTopicDto";

interface TrendingTopicsProps {
  trendingTopics: TrendingTopicDto[];
}

interface TrendingTopicItemProps {
  name: string;
  total_posts: number;
}

const TrendingTopics = ({ trendingTopics }: TrendingTopicsProps) => {
  return (
    <Box className='space-y-3 rounded-xl bg-card p-4 shadow-sm md:p-5'>
      <h2 className='text-xl font-bold'>Trending topics</h2>
      <Box className='space-y-3'>
        {trendingTopics.map(({ name, total_posts }) => (
          <TrendingTopicItem
            key={name}
            name={name}
            total_posts={total_posts}
          />
        ))}
      </Box>
    </Box>
  );
};

const TrendingTopicItem = ({ name, total_posts }: TrendingTopicItemProps) => {
  return (
    <Box className='-space-y-0.5'>
      <Link href={`/hashtags/${encodeURIComponent(name)}`}>
        <p
          className='line-clamp-1 break-all font-semibold hover:underline'
          title={name}
        >
          {name}
        </p>
        <p className='m-0 text-sm text-muted-foreground hover:underline'>
          <span>{formatNumber(total_posts)}</span>
          <span>{total_posts === 1 ? " post" : " posts"}</span>
        </p>
      </Link>
    </Box>
  );
};
export { TrendingTopics };
