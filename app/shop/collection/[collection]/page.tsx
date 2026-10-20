import Collection from "@/features/collection/collection";
import { getQueryClient } from "@/lib/get-query-client";
import prefetchCollection from "@/services/prefetche/prefetchCollection";
import { getPagination } from "@/lib/pagination";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ collection: string }>;
}) {
  const { collection } = await params;

  const collectionName = collection
    .replaceAll("-", " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  const descriptions: Record<string, string> = {
    "new-arrival":
      "Discover the latest arrivals at Vendra. Explore fresh styles, new-season essentials, and trending products curated for your everyday needs.",
    "best-seller":
      "Shop Vendra's best-selling products, loved by customers for their style, quality, and everyday appeal. Find popular picks worth discovering.",
  };

  return {
    title: collectionName,
    description:
      descriptions[collection] ??
      `Explore the ${collectionName} collection at Vendra. Discover carefully selected products, find your favorites, and shop styles that fit your everyday needs.`,
  };
}

const collectionSort: Record<string, string> = {
  "new-arrival": "meta.createdAt",
  "best-seller": "rating",
};

async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ collection: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { collection } = await params;
  const { page: pageParam } = await searchParams;

  const sortBy = collectionSort[collection];

  if (!sortBy) notFound();

  const { limit, skip } = getPagination(Number(pageParam ?? 1));

  const queryClient = getQueryClient();

  await prefetchCollection(queryClient, { sortBy, order: "desc" }, limit, skip);

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Collection collection={collection} />
      </HydrationBoundary>
    </>
  );
}

export default Page;
