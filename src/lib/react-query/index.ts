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
    InfiniteData<Data, PageParam | undefined>,
    Data,
    QueryKey,
    PageParam
  >
) => {
  return useInfiniteQuery<
    Data,
    DefaultError,
    InfiniteData<Data, PageParam | undefined>,
    QueryKey,
    PageParam
  >(infiniteQueryOptions);
};

export const useMutationHandler = <Data, Param, Context = any>(
  mutationOptions: UseMutationOptions<Data, DefaultError, Param, Context>
) => useMutation(mutationOptions);
