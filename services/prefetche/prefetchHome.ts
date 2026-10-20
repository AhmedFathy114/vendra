import { QueryClient } from "@tanstack/react-query";
import { getCategoryProducts, getCollections } from "@/services/products";
import { Collection } from "@/types/type";

function logPrefetchError(context: string) {
  return (error: unknown) => {
    console.error(`[prefetchHome] "${context}" failed:`, error);
  };
}

export function prefetchHome(
  queryClient: QueryClient,
  collections: Collection[],
) {
  const limit = 20;
  const skip = 0;

  return Promise.all([
    ...collections.map((collection) =>
      queryClient
        .query({
          queryKey: [
            "collection",
            collection.sortBy,
            collection.order,
            limit,
            skip,
          ],
          queryFn: () =>
            getCollections(collection.sortBy, collection.order, limit, skip),
        })
        .catch(logPrefetchError("collection")),
    ),
    queryClient
      .query({
        queryKey: ["category-products", "smartphones", limit, skip],
        queryFn: () => getCategoryProducts("smartphones", limit, skip),
      })
      .catch(logPrefetchError("smartphones")),
    queryClient
      .query({
        queryKey: ["category-products", "mens-shirts", limit, skip],
        queryFn: () => getCategoryProducts("mens-shirts", limit, skip),
      })
      .catch(logPrefetchError("mens-shirts")),
    queryClient
      .query({
        queryKey: ["category-products", "womens-dresses", limit, skip],
        queryFn: () => getCategoryProducts("womens-dresses", limit, skip),
      })
      .catch(logPrefetchError("womens-dresses")),
    queryClient
      .query({
        queryKey: ["category-products", "furniture", limit, skip],
        queryFn: () => getCategoryProducts("furniture", limit, skip),
      })
      .catch(logPrefetchError("furniture")),
  ]);
}
