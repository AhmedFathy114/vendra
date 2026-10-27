import Search from "@/features/shared/Search";
import { getQueryClient } from "@/lib/get-query-client";
import { getPagination } from "@/lib/pagination";
import { prefetchSearch } from "@/services/prefetche/prefetchSearch";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

async function Page({
  searchParams,
}: {
  searchParams: Promise<{ title?: string; page?: string }>;
}) {
  const { title: rawTitle, page } = await searchParams;
  const title = rawTitle?.trim() ?? "";

  const { limit, skip } = getPagination(Number(page ?? 1));

  const queryClient = getQueryClient();

  if (title) {
    await prefetchSearch(queryClient, title, limit, skip);
  }

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Search title={title} />
      </HydrationBoundary>
    </>
  );
}

export default Page;
