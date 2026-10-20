import { Collection } from "@/types/type";
import { getCollections } from "../products";
import { QueryClient } from "@tanstack/react-query";

function logPrefetchError(context: string) {
  return (error: unknown) => {
    console.error(`[prefetchCollection] "${context}" failed:`, error);
  };
}

function prefetchCollection(
  queryClient: QueryClient,
  collection: Collection,
  limit = 20,
  skip = 0,
) {
  return queryClient
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
    .catch(logPrefetchError(`${collection.sortBy}/${collection.order}`));
}

export default prefetchCollection;
