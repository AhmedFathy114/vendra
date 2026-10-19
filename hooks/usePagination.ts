"use client";

import { getPagination } from "@/lib/pagination";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

export function usePagination(page: number, limit = 20) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const { limit: pageLimit, skip, page: safePage } = getPagination(page, limit);

  function handlePageChange(nextPage: number) {
    const params = new URLSearchParams(searchParams.toString());

    if (nextPage <= 1) {
      params.delete("page");
    } else {
      params.set("page", String(nextPage));
    }

    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
  }

  return { limit: pageLimit, skip, page: safePage, handlePageChange };
}
