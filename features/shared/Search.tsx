"use client";

import { useSearch } from "@/hooks/queries/useSearch";
import { usePagination } from "@/hooks/usePagination";
import { Search as SearchIcon } from "lucide-react";
import Link from "next/link";
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

  if (!title) {
    return (
      <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-xl rounded-3xl border border-dashed border-border bg-muted/20 px-6 py-12 text-center">
          <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
            <SearchIcon className="size-6" aria-hidden="true" />
          </span>
          <h1 className="mt-5 text-2xl font-bold tracking-tight">
            Search products
          </h1>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Use the search bar in the header to find products by name.
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-foreground px-6 text-sm font-semibold text-background transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/30"
          >
            Continue shopping
          </Link>
        </div>
      </section>
    );
  }

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
