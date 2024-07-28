import {
  useQuery,
  useMutation,
  UseQueryOptions,
  UseMutationOptions,
  DefaultError
} from "@tanstack/react-query";

export const useQueryHandler = <Data>(queryOptions: UseQueryOptions<Data>) =>
  useQuery(queryOptions);

export const useMutationHandler = <Data, Param>(
  mutationOptions: UseMutationOptions<Data, DefaultError, Param>
) => useMutation(mutationOptions);
