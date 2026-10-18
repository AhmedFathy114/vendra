"use client";

import { getCategoryProducts } from "@/services/products";
import { ProductsResponse } from "@/types/type";
import { useQuery } from "@tanstack/react-query";

export function useCategoryProduct(category: string) {
  const {
    data: categoryProducts,
    isPending: isLoading,
    isError,
    error,
  } = useQuery<ProductsResponse>({
    queryKey: ["category-products", category],
    queryFn: () => getCategoryProducts(category),
    enabled: !!category,
  });

  return { categoryProducts, isLoading, isError, error };
}
