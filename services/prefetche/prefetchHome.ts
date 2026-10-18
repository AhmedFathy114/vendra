import { QueryClient } from "@tanstack/react-query";
import {
  getAllProducts,
  getBestProducts,
  getCategoryProducts,
} from "@/services/products";

function logPrefetchError(context: string) {
  return (error: unknown) => {
    console.error(`[prefetchHome] "${context}" failed:`, error);
  };
}

export async function prefetchHome(queryClient: QueryClient) {
  return Promise.all([
    queryClient
      .query({ queryKey: ["all-products"], queryFn: getAllProducts })
      .catch(logPrefetchError("All-products")),
    queryClient
      .query({
        queryKey: ["best-sellers"],
        queryFn: () => getBestProducts("rating", "desc"),
      })
      .catch(logPrefetchError("best-sellers")),
    queryClient
      .query({
        queryKey: ["category-products", "smartphones"],
        queryFn: () => getCategoryProducts("smartphones"),
      })
      .catch(logPrefetchError("smartphones")),
    queryClient
      .query({
        queryKey: ["category-products", "mens-shirts"],
        queryFn: () => getCategoryProducts("mens-shirts"),
      })
      .catch(logPrefetchError("mens-shirts")),
    queryClient
      .query({
        queryKey: ["category-products", "womens-dresses"],
        queryFn: () => getCategoryProducts("womens-dresses"),
      })
      .catch(logPrefetchError("womens-dresses")),
    queryClient
      .query({
        queryKey: ["category-products", "furniture"],
        queryFn: () => getCategoryProducts("furniture"),
      })
      .catch(logPrefetchError("furniture")),
  ]);
}
