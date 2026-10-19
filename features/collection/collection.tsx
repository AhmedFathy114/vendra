"use client";

import { useCollections } from "@/hooks/queries/useCollectionProduct";
import { useSearchParams } from "next/navigation";
import ProductSection from "../shared/ProductSection";
import Pagination from "../shared/Pagination";
import LoadingModel from "@/components/Loaders/LoadingModel";
import { usePagination } from "@/hooks/usePagination";

function Collection({ collection }: { collection: string }) {
  const searchParams = useSearchParams();

  const pageParam = Number(searchParams.get("page") ?? 1);
  const { limit, skip, page, handlePageChange } = usePagination(pageParam);

  const { data, isError, isLoading, isFetching } = useCollections(
    collection === "new-arrival" ? "meta.createdAt" : "rating",
    "desc",
    limit,
    skip,
  );

  return (
    <>
      <LoadingModel
        key={page}
        message={`Loading ${collection}`}
        duration={1000}
      />
      <ProductSection
        key={collection}
        title={collection}
        data={data?.products ?? []}
        isError={isError}
        isLoading={isLoading}
      />
      <Pagination
        page={page}
        total={data?.total ?? 0}
        limit={limit}
        onPageChange={handlePageChange}
        disabled={isFetching}
      />
    </>
  );
}

export default Collection;
