import { QueryClient } from "@tanstack/react-query";
import { getCategoryProducts, getCollections } from "@/services/products";
import { Collection } from "@/types/type";

function logPrefetchError(context: string) {
  return (error: unknown) => {
    console.error(`[prefetchHome] "${context}" failed:`, error);
  };
}

export async function prefetchHome(
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
