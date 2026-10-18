"use client";

import ProductCard from "@/components/cards/ProductCard";
import ReusableSection from "@/components/shared/ReusableSection";
import { useCategoryProduct } from "@/hooks/queries/useCategoryProduct";
import type { NavigationLink, Product } from "@/types/type";

function SubCategorySection({ subCategory }: { subCategory: NavigationLink }) {
  const slug = subCategory.slug.split("/").filter(Boolean).at(-1) ?? "";
  const { categoryProducts, isLoading, isError } = useCategoryProduct(slug);

  if (isError) {
    return (
      <section
        aria-label={subCategory.title}
        className="mx-auto w-full max-w-[1920px] px-4 py-6 sm:px-6 lg:px-10"
      >
        <h2 className="text-2xl font-bold tracking-tight text-foreground capitalize sm:text-3xl">
          {subCategory.title}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          We couldn&apos;t load this collection right now. Please try again
          later.
        </p>
      </section>
    );
  }

  return (
    <ReusableSection<Product>
      title={subCategory.title}
      data={categoryProducts?.products.slice(0, 10) ?? []}
      render={(product) => <ProductCard product={product} />}
      viewAllHref={subCategory.slug}
      getKey={(product) => product.id}
      isLoading={isLoading}
    />
  );
}

export default SubCategorySection;
