import { getSingleProduct } from "@/services/products";
import { useQuery } from "@tanstack/react-query";

export function useSingleProduct(productId: number) {
  const {
    data: product,
    isPending: isLoading,
    isError,
  } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getSingleProduct(productId),
    enabled: !!productId,
  });

  return { product, isLoading, isError };
}
