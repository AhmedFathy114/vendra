"use client";

import ProductCard from "@/components/cards/ProductCard";
import { Product } from "@/types/type";
import { motion } from "motion/react";

type ProductSectionProps = {
  title?: string;
  isError: boolean;
  isLoading: boolean;
  data: Product[];
};

const skeletonCards = Array.from({ length: 5 });

export default function ProductSection({
  title,
  isError,
  isLoading,
  data,
}: ProductSectionProps) {
  const heading = title?.replaceAll("-", " ");

  return (
    <section
      aria-labelledby={heading}
      className="mx-auto w-full max-w-[1920px] px-4 py-8 sm:px-6 lg:px-10"
    >
      <motion.h2
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeInOut" }}
        viewport={{ once: true, amount: 0.2 }}
        id={heading}
        className="mb-6 text-2xl font-bold capitalize tracking-tight text-foreground sm:text-4xl"
      >
        {heading}
      </motion.h2>

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
      ) : data.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-border bg-muted/20 px-6 py-12 text-center text-sm text-muted-foreground">
          No products found in {heading}.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 lg:gap-6 xl:grid-cols-5">
          {data.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
