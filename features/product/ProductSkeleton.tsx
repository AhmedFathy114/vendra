function ProductSkeleton() {
  return (
    <section
      role="status"
      aria-label="Loading product"
      className="mx-auto w-full max-w-360 px-4 py-6 sm:px-6 sm:py-8 lg:px-10"
    >
      <span className="sr-only">Loading product</span>

      <div className="mb-6 h-4 w-64 animate-pulse rounded bg-muted" />

      <div className="grid gap-8 lg:grid-cols-2 xl:gap-14">
        <div>
          <div className="aspect-square animate-pulse rounded-3xl bg-muted" />
          <div className="mt-3 grid grid-cols-4 gap-3 sm:grid-cols-5">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="aspect-square animate-pulse rounded-xl bg-muted"
              />
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="h-3 w-40 animate-pulse rounded bg-muted" />
          <div className="h-10 w-11/12 animate-pulse rounded bg-muted" />
          <div className="h-10 w-2/3 animate-pulse rounded bg-muted" />
          <div className="h-6 w-48 animate-pulse rounded bg-muted" />
          <div className="h-9 w-56 animate-pulse rounded bg-muted" />

          <div className="space-y-2 pt-2">
            <div className="h-4 w-full animate-pulse rounded bg-muted" />
            <div className="h-4 w-full animate-pulse rounded bg-muted" />
            <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
          </div>

          <div className="grid gap-3 pt-2 sm:grid-cols-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="h-20 animate-pulse rounded-2xl bg-muted"
              />
            ))}
          </div>

          <div className="flex gap-3 pt-2">
            <div className="h-12 w-36 animate-pulse rounded-xl bg-muted" />
            <div className="h-12 flex-1 animate-pulse rounded-xl bg-muted" />
          </div>
        </div>
      </div>

      <div className="mt-12 grid gap-8 border-t border-border pt-10 lg:grid-cols-2">
        <div className="space-y-3">
          <div className="h-7 w-40 animate-pulse rounded bg-muted" />
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-5 w-full animate-pulse rounded bg-muted"
            />
          ))}
        </div>

        <div className="space-y-3">
          <div className="h-7 w-44 animate-pulse rounded bg-muted" />
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="h-24 animate-pulse rounded-2xl bg-muted"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductSkeleton;
