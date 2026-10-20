"use client";

import { PaginationProps } from "@/types/type";
import { ChevronLeft, ChevronRight } from "lucide-react";

const buttonClass =
  "flex h-9 min-w-9 items-center justify-center gap-1.5 rounded-full border border-border px-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-40";

function getPageNumbers(currentPage: number, totalPages: number) {
  const pages = new Set<number>([
    1,
    totalPages,
    currentPage - 1,
    currentPage,
    currentPage + 1,
  ]);

  return [...pages]
    .filter((page) => page >= 1 && page <= totalPages)
    .sort((a, b) => a - b);
}

export default function Pagination({
  page,
  total,
  limit,
  onPageChange,
  disabled = false,
}: PaginationProps) {
  const totalPages = limit > 0 ? Math.ceil(total / limit) : 0;

  if (totalPages <= 1) return null;

  const currentPage = Math.min(Math.max(page, 1), totalPages);
  const pages = getPageNumbers(currentPage, totalPages);

  return (
    <nav
      aria-label="Pagination"
      className="mx-auto flex w-full max-w-[1920px] flex-col items-center justify-between gap-4 px-4 pb-10 pt-2 sm:flex-row sm:px-6 lg:px-10"
    >
      <p aria-live="polite" className="text-sm text-muted-foreground">
        Page{" "}
        <span className="font-semibold text-foreground">{currentPage}</span> of{" "}
        <span className="font-semibold text-foreground">{totalPages}</span>
      </p>

      <div className="flex flex-wrap items-center justify-center gap-2">
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={disabled || currentPage <= 1}
          aria-label="Previous page"
          className={`${buttonClass} bg-background text-foreground hover:bg-muted cursor-pointer`}
        >
          <ChevronLeft className="size-4" aria-hidden="true" />
          <span className="sm:inline">Previous</span>
        </button>

        <div className="hidden items-center gap-2 sm:flex">
          {pages.map((item, index) => {
            const previous = pages[index - 1];
            const showGap = previous !== undefined && item - previous > 1;

            return (
              <span key={item} className="flex items-center gap-2">
                {showGap && (
                  <span
                    aria-hidden="true"
                    className="flex size-9 items-center justify-center text-sm text-muted-foreground"
                  >
                    ...
                  </span>
                )}

                <button
                  type="button"
                  onClick={() => onPageChange(item)}
                  disabled={disabled}
                  aria-label={`Page ${item}`}
                  aria-current={item === currentPage ? "page" : undefined}
                  className={`${buttonClass} ${
                    item === currentPage
                      ? "border-foreground bg-foreground text-background"
                      : "bg-background text-foreground hover:bg-muted"
                  } cursor-pointer`}
                >
                  {item}
                </button>
              </span>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={disabled || currentPage >= totalPages}
          aria-label="Next page"
          className={`${buttonClass} bg-background text-foreground hover:bg-muted cursor-pointer`}
        >
          <span className=" sm:inline">Next</span>
          <ChevronRight className="size-4" aria-hidden="true" />
        </button>
      </div>
    </nav>
  );
}
