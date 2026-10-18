import Category from "@/features/category/category";
import { getQueryClient } from "@/lib/get-query-client";
import { primaryLinks } from "@/lib/Links";
import prefetchCategory from "@/services/prefetche/prefetchCategory";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return primaryLinks.map((link) => ({
    category: link.slug!.split("/").at(-1)!,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  const parentCategory = primaryLinks.find(
    (link) => link.slug === `/shop/${category}`,
  );

  if (!parentCategory) {
    return {
      title: "Category not found",
    };
  }

  return {
    title: parentCategory.title,
    description: `Explore ${parentCategory.title} at Vendra. Shop ${
      parentCategory.children?.length ?? 0
    } curated subcategories and discover products for your everyday style.`,
  };
}

async function Page({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;

  const parentCategory = primaryLinks.find(
    (link) => link.slug === `/shop/${category}`,
  );

  if (!parentCategory) notFound();

  const children = parentCategory.children ?? [];

  const queryClient = getQueryClient();

  await prefetchCategory(
    queryClient,
    children.map((child) => child.slug.split("/").at(-1)!),
  );

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Category category={category} />
      </HydrationBoundary>
    </>
  );
}
export default Page;
