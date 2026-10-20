import { QueryClient } from "@tanstack/react-query";
import { getCategoryProducts } from "../products";

function logPrefetchError(context: string) {
  return (error: unknown) => {
    console.error(`[prefetchCategory] "${context}" failed:`, error);
  };
}

function prefetchCategory(queryClient: QueryClient, categories: string[]) {
  const limit = 20;
  const skip = 0;

  return Promise.all(
    categories.map((category) =>
      queryClient
        .query({
          queryKey: ["category-products", category, limit, skip],
          queryFn: () => getCategoryProducts(category, limit, skip),
        })
        .catch(logPrefetchError(category)),
    ),
  );
}

export default prefetchCategory;
