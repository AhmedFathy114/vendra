import { QueryClient } from "@tanstack/react-query";
import { getCategoryProducts } from "../products";

function logPrefetchError(context: string) {
  return (error: unknown) => {
    console.error(`[prefetchCategory] "${context}" failed:`, error);
  };
}

function prefetchCategory(queryClient: QueryClient, categories: string[]) {
  return Promise.all(
    categories.map((category) =>
      queryClient
        .query({
          queryKey: ["category-products", category],
          queryFn: () => getCategoryProducts(category),
        })
        .catch(logPrefetchError(category)),
    ),
  );
}

export default prefetchCategory;
