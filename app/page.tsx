import Home from "@/features/home/home";
import { prefetchHome } from "@/services/prefetche/prefetchHome";
import { getQueryClient } from "@/lib/get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Collection } from "@/types/type";

export default async function Page() {
  const collection: Collection[] = [
    { sortBy: "rating", order: "desc" },
    { sortBy: "meta.createdAt", order: "desc" },
  ];

  const queryClient = getQueryClient();
  await prefetchHome(queryClient, collection);

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Home />
      </HydrationBoundary>
    </>
  );
}
