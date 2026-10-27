"use client";

import { getUserCarts } from "@/services/cart";
import { useQuery } from "@tanstack/react-query";

export function useUserCart(userId: number | null) {
  const {
    data,
    isPending: isLoading,
    isError,
    error,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["user-cart", userId],
    queryFn: () => getUserCarts(userId ?? 0),
    enabled: userId !== null && userId > 0,
  });

  return {
    cart: data?.carts.at(0),
    carts: data?.carts ?? [],
    total: data?.total ?? 0,
    isLoading,
    isError,
    error,
    isFetching,
    refetch,
  };
}
