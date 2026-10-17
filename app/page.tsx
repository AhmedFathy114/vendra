import Home from "@/features/home/home";
import { prefetchHome } from "@/services/prefetche/prefetchHome";
import { getQueryClient } from "@/lib/get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default async function Page() {
  const queryClient = getQueryClient();
  await prefetchHome(queryClient);

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Home />
      </HydrationBoundary>
    </>
  );
}
