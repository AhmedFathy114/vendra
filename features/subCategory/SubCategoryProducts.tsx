"use client";

import LoadingModel from "@/components/Loaders/LoadingModel";
import { usePagination } from "@/hooks/usePagination";
import { useSearchParams } from "next/navigation";
import ProductSection from "../shared/ProductSection";
import { useCategoryProduct } from "@/hooks/queries/useCategoryProduct";
import Pagination from "../shared/Pagination";

function SubCategoryProducts({ subCategory }: { subCategory: string }) {
  const searchParams = useSearchParams();

  const pageParam = Number(searchParams.get("page") ?? 1);
  const { limit, skip, page, handlePageChange } = usePagination(pageParam);

  const { categoryProducts, isError, isLoading, isFetching } =
    useCategoryProduct(subCategory, limit, skip);
  return (
    <>
      <LoadingModel
        key={page}
        message={`Loading ${subCategory}`}
        duration={1000}
      />

      <ProductSection
        key={subCategory}
        title={subCategory}
        data={categoryProducts?.products ?? []}
        isError={isError}
        isLoading={isLoading}
      />

      <Pagination
        page={page}
        total={categoryProducts?.total ?? 0}
        limit={limit}
        onPageChange={handlePageChange}
        disabled={isFetching}
      />
    </>
  );
}

export default SubCategoryProducts;
