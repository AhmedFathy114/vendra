"use client";

import { getCategoryProducts } from "@/services/products";
import { ProductsResponse } from "@/types/type";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export function useCategoryProduct(category: string, limit = 20, skip = 0) {
  const {
    data: categoryProducts,
    isPending: isLoading,
    isError,
    isFetching,
  } = useQuery<ProductsResponse>({
    queryKey: ["category-products", category, limit, skip],
    queryFn: () => getCategoryProducts(category, limit, skip),
    placeholderData: keepPreviousData,
    staleTime: 60 * 1000,
    enabled: !!category,
  });

  return { categoryProducts, isLoading, isError, isFetching };
}
