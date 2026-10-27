"use client";

import { useSearch } from "@/hooks/queries/useSearch";
import { usePagination } from "@/hooks/usePagination";
import { useSearchParams } from "next/navigation";
import Pagination from "./Pagination";
import ProductSection from "./ProductSection";
import LoadingModel from "@/components/Loaders/LoadingModel";

function Search({ title }: { title: string }) {
  const searchParams = useSearchParams();

  const pageParam = Number(searchParams.get("page") ?? 1);
  const { limit, skip, page, handlePageChange } = usePagination(pageParam);

  const { products, isLoading, isFetching, isError } = useSearch(
    title,
    limit,
    skip,
  );
  return (
    <>
      <LoadingModel
        key={page}
        message={`Loading products like ${title}`}
        duration={1000}
      />

      <ProductSection
        key={title}
        title={title}
        data={products?.products ?? []}
        isError={isError}
        isLoading={isLoading}
      />

      <Pagination
        page={page}
        total={products?.total ?? 0}
        limit={limit}
        onPageChange={handlePageChange}
        disabled={isFetching}
      />
    </>
  );
}

export default Search;
