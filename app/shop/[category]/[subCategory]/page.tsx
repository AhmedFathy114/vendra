import SubCategoryProducts from "@/features/subCategory/SubCategoryProducts";
import { getQueryClient } from "@/lib/get-query-client";
import { getPagination } from "@/lib/pagination";
import prefetchCategoryProducts from "@/services/prefetche/prefetchCategoryProducts";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ subCategory: string }>;
}) {
  const { subCategory } = await params;

  const subCategoryName = subCategory
    .replaceAll("-", " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  return {
    title: subCategoryName,
    description: `Explore the ${subCategoryName} collection at Vendra. Discover carefully selected products, find your favorites, and shop styles that fit your everyday needs.`,
  };
}

async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ subCategory: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { subCategory } = await params;
  const { page: pageParam } = await searchParams;
  const { limit, skip } = getPagination(Number(pageParam ?? 1));
  const queryClient = getQueryClient();
  await prefetchCategoryProducts(queryClient, subCategory, limit, skip);
  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <SubCategoryProducts subCategory={subCategory} />
      </HydrationBoundary>
    </>
  );
}

export default Page;
