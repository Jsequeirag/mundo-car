import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryKey,
  UseQueryOptions,
  UseMutationOptions,
} from "@tanstack/react-query";

export const useApiGet = <TData, TError>(
  key: QueryKey,
  fn: () => Promise<TData>,
  options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">
) => {
  return useQuery<TData, TError>({
    queryKey: key,
    queryFn: fn,
    ...options,
  });
};

export const useApiSend = <TData, TError, TVariables>(
  fn: (variables: TVariables) => Promise<TData>,
  success?: (data: TData) => void,
  error?: (err: TError) => void,
  invalidateKey?: QueryKey[],
  options?: Omit<UseMutationOptions<TData, TError, TVariables>, "mutationFn">
) => {
  const queryClient = useQueryClient();
  return useMutation<TData, TError, TVariables>({
    mutationFn: fn,
    onSuccess: (data) => {
      invalidateKey?.forEach((key) => {
        queryClient.invalidateQueries({ queryKey: key });
      });
      success?.(data);
    },
    onError: error,
    retry: 0,
    ...options,
  });
};
