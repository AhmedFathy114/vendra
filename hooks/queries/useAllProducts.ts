"use client";

import { getAllProducts } from "@/services/products";
import { ProductsResponse } from "@/types/type";
import { useQuery } from "@tanstack/react-query";

export function useAllProducts() {
  const { data: Products, isPending: isLoading } = useQuery<ProductsResponse>({
    queryKey: ["all-products"],
    queryFn: getAllProducts,
  });

  return { Products, isLoading };
}
