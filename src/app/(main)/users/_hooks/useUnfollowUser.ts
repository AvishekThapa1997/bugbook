import { QueryKey, useQueryClient } from "@tanstack/react-query";
import { useMutationHandler } from "../../../../lib/react-query";
import { useUserAdapter } from "./useUserAdapter";
import { useMemo } from "react";
import { ErrorData, Result } from "../../../../types";
import { UserDto } from "../../../dto/userDto";
export const useUnfollowUser = (userId: string) => {
  const { unFollowUser } = useUserAdapter();
  const queryClient = useQueryClient();
  const queryKey = useMemo(() => {
    const queryKey: QueryKey = ["user-recommendations"];
    return queryKey;
  }, []);
  return useMutationHandler({
    mutationKey: ["follow-user", userId],
    mutationFn: (userId: string) => unFollowUser(userId),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey });
      const previousUserRecommendations =
        queryClient.getQueryData<Result<UserDto[], ErrorData>>(queryKey);
      const { data } = previousUserRecommendations ?? {};
      if (data) {
        queryClient.setQueryData<Result<UserDto[], ErrorData>>(queryKey, () => {
          return {
            ...previousUserRecommendations,
            data: data.map((user) => {
              return {
                ...user,
                isFollowedbyLoggedInUser:
                  user.id === userId ? false : user.isFollowedbyLoggedInUser
              };
            })
          };
        });
      }
      return { previousUserRecommendations };
    },
    onError: (err, newTodo, context) => {
      queryClient.setQueryData(queryKey, context?.previousUserRecommendations);
    }
  });
};
