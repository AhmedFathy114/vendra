import { QueryClient } from "@tanstack/react-query";
import { getSearchProduct } from "../products";

function logPrefetchError(context: string) {
  return (error: unknown) => {
    console.error(`[prefetchCategory] "${context}" failed:`, error);
  };
}

export function prefetchSearch(
  queryClient: QueryClient,
  title: string,
  limit = 20,
  skip = 0,
) {
  return queryClient
    .query({
      queryKey: ["search", title, limit, skip],
      queryFn: () => getSearchProduct(title, limit, skip),
    })
    .catch(logPrefetchError(title));
}
