import {
  useQuery,
  useMutation,
  UseQueryOptions,
  UseMutationOptions,
  DefaultError,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  InfiniteData,
  QueryKey
} from "@tanstack/react-query";

export const useQueryHandler = <Data>(queryOptions: UseQueryOptions<Data>) =>
  useQuery(queryOptions);

export const usePagination = <Data, PageParam>(
  infiniteQueryOptions: UseInfiniteQueryOptions<
    Data,
    Error,
    InfiniteData<Data, PageParam>,
    Data,
    QueryKey,
    PageParam
  >
) => {
  return useInfiniteQuery<
    Data,
    DefaultError,
    InfiniteData<Data, PageParam>,
    QueryKey,
    PageParam
  >(infiniteQueryOptions);
};

export const useMutationHandler = <Data, Param>(
  mutationOptions: UseMutationOptions<Data, DefaultError, Param>
) => useMutation(mutationOptions);
