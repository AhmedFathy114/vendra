"use client";

import { useId, useMemo, useState } from "react";
import ProductCard from "@/components/cards/ProductCard";
import { Product } from "@/types/type";
import { motion } from "motion/react";
import { ArrowUpDown, ChevronDown, SlidersHorizontal } from "lucide-react";

type ProductSectionProps = {
  title?: string;
  isError: boolean;
  isLoading: boolean;
  data: Product[];
};

type SortOption =
  | "featured"
  | "newest"
  | "price-asc"
  | "price-desc"
  | "rating"
  | "discount";

type AvailabilityFilter = "all" | "in-stock" | "out-of-stock";

const skeletonCards = Array.from({ length: 5 });

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
  { value: "discount", label: "Best Discount" },
];

const availabilityOptions: { value: AvailabilityFilter; label: string }[] = [
  { value: "all", label: "All products" },
  { value: "in-stock", label: "In stock" },
  { value: "out-of-stock", label: "Out of stock" },
];

const selectClass =
  "h-10 w-full appearance-none rounded-full border border-border bg-background pl-9 pr-9 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto";

const iconClass =
  "pointer-events-none absolute top-1/2 size-4 -translate-y-1/2 text-muted-foreground";

function getFinalPrice(product: Product) {
  const discount = product.discountPercentage ?? 0;
  return discount > 0 ? product.price * (1 - discount / 100) : product.price;
}

function isOutOfStock(product: Product) {
  return product.availabilityStatus === "Out of Stock" || product.stock === 0;
}

export default function ProductSection({
  title,
  isError,
  isLoading,
  data,
}: ProductSectionProps) {
  const headingId = useId();
  const [sort, setSort] = useState<SortOption>("featured");
  const [availability, setAvailability] = useState<AvailabilityFilter>("all");
  const heading = title?.replaceAll("-", " ");
  const hasFilters = sort !== "featured" || availability !== "all";

  const filtered = data.filter((product) => {
    if (availability === "all") return true;
    return availability === "out-of-stock"
      ? isOutOfStock(product)
      : !isOutOfStock(product);
  });

  const sorted = [...filtered];

  switch (sort) {
    case "price-asc":
      sorted.sort((a, b) => getFinalPrice(a) - getFinalPrice(b));
      break;
    case "price-desc":
      sorted.sort((a, b) => getFinalPrice(b) - getFinalPrice(a));
      break;
    case "rating":
      sorted.sort((a, b) => b.rating - a.rating);
      break;
    case "discount":
      sorted.sort(
        (a, b) => (b.discountPercentage ?? 0) - (a.discountPercentage ?? 0),
      );
      break;
    case "newest":
      sorted.sort(
        (a, b) =>
          new Date(b.meta.createdAt).getTime() -
          new Date(a.meta.createdAt).getTime(),
      );
      break;
    default:
      break;
  }

  function resetFilters() {
    setSort("featured");
    setAvailability("all");
  }

  return (
    <section
      aria-labelledby={headingId}
      className="mx-auto w-full max-w-[1920px] px-4 py-8 sm:px-6 lg:px-10"
    >
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
          viewport={{ once: true, amount: 0.2 }}
          id={headingId}
          className="text-2xl font-bold capitalize tracking-tight text-foreground sm:text-4xl"
        >
          {heading}
        </motion.h2>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
          <div className="relative">
            <ArrowUpDown
              className={`${iconClass} inset-s-3`}
              aria-hidden="true"
            />
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value as SortOption)}
              disabled={isLoading || isError}
              aria-label="Sort products"
              className={selectClass}
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown
              className={`${iconClass} inset-e-3`}
              aria-hidden="true"
            />
          </div>

          <div className="relative">
            <SlidersHorizontal
              className={`${iconClass} inset-s-3`}
              aria-hidden="true"
            />
            <select
              value={availability}
              onChange={(event) =>
                setAvailability(event.target.value as AvailabilityFilter)
              }
              disabled={isLoading || isError}
              aria-label="Filter by availability"
              className={selectClass}
            >
              {availabilityOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown
              className={`${iconClass} inset-e-3`}
              aria-hidden="true"
            />
          </div>

          {hasFilters && (
            <button
              type="button"
              onClick={resetFilters}
              className="self-start text-sm font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline sm:self-auto"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {isError ? (
        <p className="rounded-2xl border border-dashed border-border bg-muted/20 px-6 py-12 text-center text-sm text-muted-foreground">
          Couldn&apos;t load {heading}. Please try again later.
        </p>
      ) : isLoading ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 lg:gap-6 xl:grid-cols-5">
          {skeletonCards.map((_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl border border-border bg-card"
            >
              <div className="aspect-4/3 animate-pulse bg-muted" />
              <div className="space-y-3 p-3 sm:p-4">
                <div className="h-3 w-1/3 animate-pulse rounded bg-muted" />
                <div className="h-4 w-full animate-pulse rounded bg-muted" />
                <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
                <div className="h-10 w-full animate-pulse rounded-lg bg-muted" />
              </div>
            </div>
          ))}
        </div>
      ) : sorted.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border bg-muted/20 px-6 py-12 text-center">
          <p className="text-sm text-muted-foreground">
            {data.length === 0
              ? `No products found in ${heading}.`
              : "No products match your filters."}
          </p>
          {data.length > 0 && (
            <button
              type="button"
              onClick={resetFilters}
              className="text-sm font-semibold text-foreground underline underline-offset-4"
            >
              Clear filters
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 lg:gap-6 xl:grid-cols-5">
          {sorted.map((product) => (
            <ProductCard
              key={`${product.id}-${sort}-${availability}`}
              product={product}
            />
          ))}
        </div>
      )}
    </section>
  );
}
