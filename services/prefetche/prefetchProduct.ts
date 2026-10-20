import { QueryClient } from "@tanstack/react-query";
import { getSingleProduct } from "../products";

function logPrefetchError(context: string) {
  return (error: unknown) => {
    console.error(`[prefetchProduct] "${context}" failed:`, error);
  };
}

export function prefetchProduct(queryClient: QueryClient, productId: number) {
  return queryClient
    .query({
      queryKey: ["product", productId],
      queryFn: () => getSingleProduct(productId),
    })
    .catch(logPrefetchError(`${productId}`));
}
