import { QueryClient } from "@tanstack/react-query";
import { getCategoryProducts } from "../products";

function logPrefetchError(context: string) {
  return (error: unknown) => {
    console.error(`[prefetchCategoryProducts] "${context}" failed:`, error);
  };
}

function prefetchCategoryProducts(
  queryClient: QueryClient,
  subCategory: string,
  limit = 20,
  skip = 0,
) {
  return queryClient
    .query({
      queryKey: ["category-products", subCategory, limit, skip],
      queryFn: () => getCategoryProducts(subCategory, limit, skip),
    })
    .catch(logPrefetchError(`${subCategory}`));
}

export default prefetchCategoryProducts;
