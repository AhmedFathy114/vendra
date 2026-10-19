"use client";

import { getCollections } from "@/services/products";
import { ProductsResponse } from "@/types/type";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export function useCollections(
  sortBy: string,
  order: string = "desc",
  limit = 20,
  skip = 0,
) {
  const {
    data,
    isPending: isLoading,
    isFetching,
    isError,
  } = useQuery<ProductsResponse>({
    queryKey: ["collection", sortBy, order, limit, skip],
    queryFn: () => getCollections(sortBy, order, limit, skip),
    placeholderData: keepPreviousData,
    staleTime: 60 * 1000,
  });

  return { data, isLoading, isFetching, isError };
}
