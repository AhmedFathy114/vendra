function CartSkeleton() {
  return (
    <section
      role="status"
      aria-label="Loading cart"
      className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-10"
    >
      <span className="sr-only">Loading cart</span>

      <div className="mb-8 space-y-3">
        <div className="h-3 w-28 animate-pulse rounded bg-muted" />
        <div className="h-9 w-48 animate-pulse rounded bg-muted" />
        <div className="h-4 w-80 max-w-full animate-pulse rounded bg-muted" />
      </div>

      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="flex gap-4 rounded-3xl border border-border bg-card p-4 shadow-sm sm:p-5"
            >
              <div className="size-24 shrink-0 animate-pulse rounded-2xl bg-muted sm:size-28" />
              <div className="flex flex-1 flex-col justify-between gap-3">
                <div className="space-y-2">
                  <div className="h-5 w-2/3 animate-pulse rounded bg-muted" />
                  <div className="h-4 w-28 animate-pulse rounded bg-muted" />
                </div>
                <div className="flex items-center justify-between gap-2">
                  <div className="h-6 w-20 animate-pulse rounded-full bg-muted" />
                  <div className="h-5 w-24 animate-pulse rounded bg-muted" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-3xl border border-border bg-card p-5 shadow-sm sm:p-6">
          <div className="h-6 w-36 animate-pulse rounded bg-muted" />
          <div className="mt-5 space-y-3">
            <div className="h-4 w-full animate-pulse rounded bg-muted" />
            <div className="h-4 w-full animate-pulse rounded bg-muted" />
            <div className="h-6 w-2/3 animate-pulse rounded bg-muted" />
          </div>
          <div className="mt-4 h-20 animate-pulse rounded-2xl bg-muted/70" />
          <div className="mt-5 h-11 w-full animate-pulse rounded-xl bg-muted" />
        </div>
      </div>
    </section>
  );
}

export default CartSkeleton;
