import { Box } from "../../_components/ui";
import { UserDto } from "../../dto/userDto";
import Link from "next/link";
import { UserAvatar } from "./UserAvatar";
import UserFollowButton from "./UserFollowButton";

interface FollowRecommendationsProps {
  userRecommendations: UserDto[];
}
interface RecommenderUserProps {
  user: UserDto;
}

const FollowRecommendations = ({
  userRecommendations
}: FollowRecommendationsProps) => {
  return (
    <Box className='space-y-3 rounded-xl bg-card p-4 shadow-sm md:py-5'>
      <h2 className='text-xl font-bold'>Who to follow</h2>
      <Box className='space-y-3'>
        {userRecommendations.map((user) => (
          <RecommenderUser
            user={user}
            key={user.id}
          />
        ))}
      </Box>
    </Box>
  );
};

const RecommenderUser = ({ user }: RecommenderUserProps) => {
  return (
    <Box className='flex items-center justify-between gap-3'>
      <Link
        href={`/users/${user.username}`}
        className='flex items-center gap-3'
      >
        <UserAvatar url={user.profileImage} />
        <Box className='-space-y-0.5'>
          <p
            className='line-clamp-1 break-all font-semibold hover:underline'
            title={user.displayName}
          >
            {user.displayName}
          </p>
          <p
            className='m-0 line-clamp-1 text-sm text-muted-foreground hover:underline'
            title={`@${user.username}`}
          >
            @{user.username}
          </p>
        </Box>
      </Link>
      <UserFollowButton
        userId={user.id}
        isFollowing={user.isFollowedbyLoggedInUser}
        className='w-20'
      />
    </Box>
  );
};

export { FollowRecommendations };
