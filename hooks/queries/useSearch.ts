import { getSearchProduct } from "@/services/products";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export function useSearch(title: string, limit = 20, skip = 0) {
  const {
    data: products,
    isPending: isLoading,
    isError,
    isFetching,
  } = useQuery({
    queryKey: ["search", title, limit, skip],
    queryFn: () => getSearchProduct(title, limit, skip),
    placeholderData: keepPreviousData,
    enabled: !!title,
  });

  return { products, isLoading, isError, isFetching };
}
