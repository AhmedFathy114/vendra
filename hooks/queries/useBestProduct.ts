"use client";

import { getBestProducts } from "@/services/products";
import { ProductsResponse } from "@/types/type";
import { useQuery } from "@tanstack/react-query";

export function useBestProduct() {
  const { data: bestProduct, isPending: isLoading } =
    useQuery<ProductsResponse>({
      queryKey: ["best-sellers"],
      queryFn: () => getBestProducts("rating", "desc"),
      staleTime: 60 * 1000,
    });

  return { bestProduct, isLoading };
}
